"use server";

import fs from "node:fs/promises";
import ExcelJS from "exceljs";
import { EXCEL_DIR, EXCEL_PATH, SHEET_NAME, COLUMNS } from "@/lib/consultationStore";

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
  await fs.mkdir(EXCEL_DIR, { recursive: true });

  const workbook = new ExcelJS.Workbook();
  let sheet;

  try {
    await workbook.xlsx.readFile(EXCEL_PATH);
    sheet = workbook.getWorksheet(SHEET_NAME);
  } catch {
    sheet = undefined;
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

  await workbook.xlsx.writeFile(EXCEL_PATH);
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
