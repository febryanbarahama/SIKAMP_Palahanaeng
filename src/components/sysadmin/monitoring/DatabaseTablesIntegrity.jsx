"use client";

import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export default function DatabaseTablesIntegrity({ tables }) {
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Healthy":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#059669] border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Healthy
          </span>
        );
      case "Warning":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#D97706] border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Warning
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-[#DC2626] border border-rose-200">
            <XCircle className="w-3.5 h-3.5 shrink-0" /> Error
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE5F1] shadow-sm overflow-hidden">
      <div className="p-5 border-b border-[#DCE5F1]">
        <h2 className="text-base font-bold text-[#0B1F4D] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2563EB]" /> Integritas Tabel
          Database
        </h2>
        <p className="text-xs text-[#5C7499]">
          Pengujian langsung ketersediaan dan performa akses tabel utama.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F3F7FC] text-[#5C7499] uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">Nama Tabel</th>
              <th className="px-6 py-3">Status Akses</th>
              <th className="px-6 py-3">Latensi Respon</th>
              <th className="px-6 py-3">Visual Indikator</th>
              <th className="px-6 py-3">Catatan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE5F1] text-[#0B1F4D]">
            {tables?.map((table, idx) => (
              <tr key={idx} className="hover:bg-[#F3F7FC]/40 transition-colors">
                <td className="px-6 py-3.5 font-mono font-bold text-[#2563EB]">
                  {table.tableName}
                </td>
                <td className="px-6 py-3.5">
                  {renderStatusBadge(table.status)}
                </td>
                <td className="px-6 py-3.5 font-semibold font-mono">
                  {table.latencyMs} ms
                </td>
                <td className="px-6 py-3.5 w-48">
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#2563EB] h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(table.latencyMs * 2, 100)}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-[#5C7499]">{table.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
