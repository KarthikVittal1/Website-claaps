"use server";

import path from "node:path";
import fs from "node:fs/promises";
import ExcelJS from "exceljs";

export type ConsultationFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// On Azure App Service, only /home is persistent across redeploys/restarts
// (WEBSITE_INSTANCE_ID identifies the App Service runtime). Everywhere else
// (local dev, other hosts) fall back to a data folder in the project root.
const EXCEL_DIR = process.env.WEBSITE_INSTANCE_ID
  ? path.join(process.env.HOME ?? "/home", "data")
  : path.join(process.cwd(), "data");
const EXCEL_PATH = path.join(EXCEL_DIR, "consultation-requests.xlsx");
const SHEET_NAME = "Requests";
const COLUMNS = [
  { header: "Submitted At", key: "submittedAt", width: 22 },
  { header: "First Name", key: "firstName", width: 16 },
  { header: "Last Name", key: "lastName", width: 16 },
  { header: "Email", key: "email", width: 28 },
  { header: "Company", key: "company", width: 24 },
  { header: "Message", key: "message", width: 60 },
];

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
