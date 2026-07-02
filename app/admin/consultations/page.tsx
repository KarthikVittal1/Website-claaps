import ExcelJS from "exceljs";
import { Download, LogOut } from "lucide-react";
import { EXCEL_PATH, SHEET_NAME } from "@/lib/consultationStore";
import { adminLogout } from "@/app/admin/login/actions";
import { ConsultationsTable } from "@/components/admin/ConsultationsTable";

export const dynamic = "force-dynamic";

async function loadRows() {
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.readFile(EXCEL_PATH);
  } catch {
    return [];
  }

  const sheet = workbook.getWorksheet(SHEET_NAME);
  if (!sheet) return [];

  const rows: string[][] = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // header
    rows.push(row.values instanceof Array ? row.values.slice(1).map((v) => String(v ?? "")) : []);
  });
  return rows;
}

export default async function AdminConsultationsPage() {
  const rows = await loadRows();

  return (
    <main className="min-h-screen bg-navy-950 px-6 py-10 text-offwhite-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Consultation Requests</h1>
            <p className="text-sm text-slate-400">{rows.length} submission{rows.length === 1 ? "" : "s"}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/consultations/export"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-700 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Download size={15} /> Download Excel
            </a>
            <form action={adminLogout}>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl border border-graphite-700 px-4 py-2.5 text-sm text-slate-400 hover:text-offwhite-50"
              >
                <LogOut size={15} /> Sign out
              </button>
            </form>
          </div>
        </div>

        <p className="mb-3 text-xs text-slate-400">
          Tip: double-click a Message cell to view the full text in a popup.
        </p>

        <ConsultationsTable rows={rows} />
      </div>
    </main>
  );
}
