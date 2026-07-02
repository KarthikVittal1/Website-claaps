"use client";

import { useState } from "react";
import { X } from "lucide-react";

const HEADERS = ["Submitted At", "First Name", "Last Name", "Email", "Company", "Message"];
const MESSAGE_COL = HEADERS.length - 1;

export function ConsultationsTable({ rows }: { rows: string[][] }) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-graphite-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-cyan-700 to-purple-500 text-xs uppercase tracking-wide text-white">
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={HEADERS.length} className="px-4 py-8 text-center text-slate-400">
                  No submissions yet.
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className="border-t border-graphite-700">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      onDoubleClick={j === MESSAGE_COL ? () => setPreview(cell) : undefined}
                      className={
                        j === MESSAGE_COL
                          ? "max-w-xs truncate px-4 py-3 align-top cursor-pointer hover:bg-navy-900"
                          : "max-w-xs truncate px-4 py-3 align-top"
                      }
                      title={j === MESSAGE_COL ? "Double-click to view full message" : undefined}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {preview !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full message"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[70vh] w-full max-w-lg overflow-y-auto rounded-xl border border-graphite-700 bg-navy-900 p-6 text-offwhite-50"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Message</h2>
              <button
                type="button"
                onClick={() => setPreview(null)}
                aria-label="Close"
                className="rounded-full p-1 text-slate-400 hover:bg-navy-950 hover:text-offwhite-50"
              >
                <X size={18} />
              </button>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{preview}</p>
          </div>
        </div>
      )}
    </>
  );
}
