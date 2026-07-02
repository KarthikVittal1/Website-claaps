import path from "node:path";

// On Azure App Service, only /home is persistent across redeploys/restarts
// (WEBSITE_INSTANCE_ID identifies the App Service runtime). Everywhere else
// (local dev, other hosts) fall back to a data folder in the project root.
export const EXCEL_DIR = process.env.WEBSITE_INSTANCE_ID
  ? path.join(process.env.HOME ?? "/home", "data")
  : path.join(process.cwd(), "data");

export const EXCEL_PATH = path.join(EXCEL_DIR, "consultation-requests.xlsx");
export const SHEET_NAME = "Requests";

export const COLUMNS = [
  { header: "Submitted At", key: "submittedAt", width: 22 },
  { header: "First Name", key: "firstName", width: 16 },
  { header: "Last Name", key: "lastName", width: 16 },
  { header: "Email", key: "email", width: 28 },
  { header: "Company", key: "company", width: 24 },
  { header: "Message", key: "message", width: 60 },
];
