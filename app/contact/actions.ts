"use server";

import ExcelJS from "exceljs";
import { SHEET_NAME, COLUMNS, readWorkbookBuffer, writeWorkbookBuffer, withWorkbookLock } from "@/lib/consultationStore";

export type ConsultationFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function appendConsultationRequest(row: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}) {
  await withWorkbookLock(async () => {
    const existing = await readWorkbookBuffer();
    let workbook = new ExcelJS.Workbook();
    let sheet;

    if (existing) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await workbook.xlsx.load(existing as any);
        sheet = workbook.getWorksheet(SHEET_NAME);
      } catch (error) {
        // A corrupted existing file must not block new submissions forever —
        // start over with a fresh workbook instance (a failed load can leave
        // the original in an unknown state) rather than throwing on every
        // future save.
        console.error("Existing consultation workbook is unreadable, starting fresh:", error);
        workbook = new ExcelJS.Workbook();
        sheet = undefined;
      }
    }

    if (!sheet) {
      sheet = workbook.addWorksheet(SHEET_NAME);
      sheet.columns = COLUMNS;
      sheet.getRow(1).font = { bold: true };
    }

    sheet.addRow({
      submittedAt: new Date().toISOString(),
      ...row,
    });

    const buffer = await workbook.xlsx.writeBuffer();
    await writeWorkbookBuffer(Buffer.from(buffer));
  });
}

export async function submitConsultationRequest(
  _prevState: ConsultationFormState,
  formData: FormData
): Promise<ConsultationFormState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName  = String(formData.get("lastName")  ?? "").trim();
  const email     = String(formData.get("email")     ?? "").trim();
  const company   = String(formData.get("company")   ?? "").trim();
  const message   = String(formData.get("message")   ?? "").trim();

  if (!firstName || !lastName || !email || !company || !message) {
    return { status: "error", message: "Please complete all required fields." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid work email address." };
  }

  try {
    await appendConsultationRequest({ firstName, lastName, email, company, message });
  } catch (error) {
    console.error("Failed to save consultation request to Excel:", error);
    return {
      status: "error",
      message: "Something went wrong while saving your request. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Thanks your request has been received. A member of the Claaps team will follow up.",
  };
}
