import path from "node:path";
import fs from "node:fs/promises";
import type { FileHandle } from "node:fs/promises";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from "node:crypto";

export const SHEET_NAME = "Requests";
export const FILE_NAME = "consultation-requests.xlsx";

export const COLUMNS = [
  { header: "Submitted At", key: "submittedAt", width: 22 },
  { header: "First Name", key: "firstName", width: 16 },
  { header: "Last Name", key: "lastName", width: 16 },
  { header: "Email", key: "email", width: 28 },
  { header: "Company", key: "company", width: 24 },
  { header: "Message", key: "message", width: 60 },
];

const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER ?? "consultation-data";

// Local fallback path, used only when no blob storage connection string is
// configured. On Azure App Service, HOME points at the persistent /home
// (Azure Files) mount, which survives deploys and restarts — unlike
// process.cwd() (site/wwwroot), which the deploy pipeline wipes and
// replaces on every release. Falls back to cwd for local dev where HOME
// isn't set to an App Service path.
const LOCAL_PATH = path.join(process.env.HOME ?? process.cwd(), "data", FILE_NAME);

function getContainerClient() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) return null;
  const serviceClient = BlobServiceClient.fromConnectionString(connectionString);
  return serviceClient.getContainerClient(CONTAINER_NAME);
}

// Reads the current workbook bytes, or null if none exist yet.
export async function readWorkbookBuffer(): Promise<Buffer | null> {
  const container = getContainerClient();

  if (container) {
    const blob = container.getBlockBlobClient(FILE_NAME);
    if (!(await blob.exists())) return null;
    return await blob.downloadToBuffer();
  }

  try {
    return await fs.readFile(LOCAL_PATH);
  } catch {
    return null;
  }
}

// Persists the workbook bytes, overwriting whatever was there before.
export async function writeWorkbookBuffer(buffer: Buffer): Promise<void> {
  const container = getContainerClient();

  if (container) {
    await container.createIfNotExists();
    const blob = container.getBlockBlobClient(FILE_NAME);
    await blob.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
    return;
  }

  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, buffer);
}

const LOCK_FILE_NAME = "consultation-requests.lock";

// Serializes concurrent read-modify-write cycles so simultaneous submissions
// don't clobber each other's rows (blob storage has no append primitive).
export async function withWorkbookLock<T>(
  fn: () => Promise<T>
): Promise<T> {
  const container = getContainerClient();

  if (container) {
    const lockBlob = container.getBlockBlobClient(LOCK_FILE_NAME);
    await container.createIfNotExists();
    if (!(await lockBlob.exists())) {
      await lockBlob.uploadData(Buffer.alloc(0));
    }

    const leaseId = randomUUID();
    const leaseClient = lockBlob.getBlobLeaseClient(leaseId);

    let acquired = false;
    const deadline = Date.now() + 15_000;
    while (!acquired) {
      try {
        await leaseClient.acquireLease(15);
        acquired = true;
      } catch (error) {
        if (Date.now() > deadline) throw error;
        await new Promise((resolve) => setTimeout(resolve, 250 + Math.random() * 250));
      }
    }

    try {
      return await fn();
    } finally {
      await leaseClient.releaseLease();
    }
  }

  return withLocalFileLock(fn);
}

// File-based lock for the local-disk fallback, so concurrent submissions are
// serialized even across separate Node processes/instances sharing the same
// disk (e.g. multiple App Service workers) — an in-memory mutex only protects
// against races within a single process and would still lose writes here.
async function withLocalFileLock<T>(fn: () => Promise<T>): Promise<T> {
  const lockPath = path.join(path.dirname(LOCAL_PATH), LOCK_FILE_NAME);
  await fs.mkdir(path.dirname(lockPath), { recursive: true });

  const STALE_LOCK_MS = 30_000;
  const deadline = Date.now() + 15_000;
  let handle: FileHandle | null = null;
  while (!handle) {
    try {
      handle = await fs.open(lockPath, "wx");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;

      // Clear a lock left behind by a crashed process instead of jamming
      // submissions forever.
      try {
        const stat = await fs.stat(lockPath);
        if (Date.now() - stat.mtimeMs > STALE_LOCK_MS) {
          await fs.rm(lockPath, { force: true });
          continue;
        }
      } catch {
        continue;
      }

      if (Date.now() > deadline) throw error;
      await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 150));
    }
  }

  try {
    return await fn();
  } finally {
    await handle.close();
    await fs.rm(lockPath, { force: true });
  }
}
