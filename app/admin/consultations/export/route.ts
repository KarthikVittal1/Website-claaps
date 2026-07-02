import { NextResponse } from "next/server";
import { readWorkbookBuffer } from "@/lib/consultationStore";

export async function GET() {
  const file = await readWorkbookBuffer();
  if (!file) {
    return NextResponse.json({ error: "No consultation requests found yet." }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=\"consultation-requests.xlsx\"",
    },
  });
}
