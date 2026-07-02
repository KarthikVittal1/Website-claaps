import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { EXCEL_PATH } from "@/lib/consultationStore";

export async function GET() {
  let file: Buffer;
  try {
    file = await fs.readFile(EXCEL_PATH);
  } catch {
    return NextResponse.json({ error: "No consultation requests found yet." }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=\"consultation-requests.xlsx\"",
    },
  });
}
