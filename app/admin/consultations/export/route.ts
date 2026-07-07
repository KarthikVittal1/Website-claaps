import ExcelJS from "exceljs";
import { NextResponse } from "next/server";
import { SHEET_NAME, COLUMNS, readRecords } from "@/lib/consultationStore";

export async function GET() {
  const records = await readRecords();
  if (records.length === 0) {
    return NextResponse.json({ error: "No consultation requests found yet." }, { status: 404 });
  }

  // Built fresh from the JSON records on every request, rather than loading
  // and re-saving a persisted .xlsx — ExcelJS's load-modify-save round trip
  // was silently dropping newly appended rows, so the workbook is now only
  // ever a one-shot, from-scratch generation.
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(SHEET_NAME);
  sheet.columns = COLUMNS;
  sheet.getRow(1).font = { bold: true };
  for (const record of records) {
    sheet.addRow(record);
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=\"consultation-requests.xlsx\"",
    },
  });
}
