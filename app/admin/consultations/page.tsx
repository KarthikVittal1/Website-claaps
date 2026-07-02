import ExcelJS from "exceljs";

export const dynamic = "force-dynamic";
import { Download, LogOut } from "lucide-react";
import { EXCEL_PATH, SHEET_NAME } from "@/lib/consultationStore";
import { adminLogout } from "@/app/admin/login/actions";

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
  const headers = ["Submitted At", "First Name", "Last Name", "Email", "Company", "Message"];

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

        <div className="overflow-x-auto rounded-xl border border-graphite-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} className="px-4 py-8 text-center text-slate-400">
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr key={i} className="border-t border-graphite-700">
                    {row.map((cell, j) => (
                      <td key={j} className="max-w-xs truncate px-4 py-3 align-top">{cell}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
