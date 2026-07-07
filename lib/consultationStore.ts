import path from "node:path";
import fs from "node:fs/promises";
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
// configured (e.g. local dev). Not durable across Azure App Service deploys.
const LOCAL_PATH = path.join(process.cwd(), "data", FILE_NAME);

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

  return localMutex.run(fn);
}

// Single-process mutex used only for the local-file fallback (dev).
class Mutex {
  private tail: Promise<unknown> = Promise.resolve();

  run<T>(fn: () => Promise<T>): Promise<T> {
    const result = this.tail.then(fn, fn);
    this.tail = result.catch(() => undefined);
    return result;
  }
}

const localMutex = new Mutex();
