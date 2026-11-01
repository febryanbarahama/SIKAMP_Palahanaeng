"use client";

import { ShieldCheck, AlertCircle, Laptop, Globe } from "lucide-react";

export default function LogsTable({ logs, loading }) {
  const formatDateTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const renderStatusBadge = (status) => {
    if (status === "success" || status === "berhasil") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#059669] border border-emerald-200">
          <ShieldCheck className="w-3 h-3" /> Berhasil
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-[#DC2626] border border-rose-200">
        <AlertCircle className="w-3 h-3" /> Gagal
      </span>
    );
  };

  const renderRoleBadge = (role) => {
    const roleLower = role?.toLowerCase() || "operator";
    if (roleLower === "superadmin" || roleLower === "super admin") {
      return (
        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          Super Admin
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
        {role}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#DCE5F1] p-12 text-center text-xs text-[#5C7499]">
        Memuat catatan audit log...
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#DCE5F1] p-12 text-center text-xs text-[#5C7499]">
        Tidak ada aktivitas audit log yang ditemukan.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#DCE5F1] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F3F7FC] text-[#5C7499] uppercase font-semibold border-b border-[#DCE5F1]">
            <tr>
              <th className="px-5 py-3.5">Waktu</th>
              <th className="px-5 py-3.5">Username</th>
              <th className="px-5 py-3.5">Role</th>
              <th className="px-5 py-3.5">Jenis Aktivitas</th>
              <th className="px-5 py-3.5">Detail Action</th>
              <th className="px-5 py-3.5">IP Address</th>
              <th className="px-5 py-3.5">Browser / Device</th>
              <th className="px-5 py-3.5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE5F1] text-[#0B1F4D]">
            {logs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-[#F3F7FC]/50 transition-colors"
              >
                <td className="px-5 py-4 font-mono text-[#5C7499] whitespace-nowrap">
                  {formatDateTime(log.created_at)}
                </td>
                <td className="px-5 py-4 font-bold text-[#0B1F4D]">
                  @{log.username || "system"}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  {renderRoleBadge(log.role)}
                </td>
                <td className="px-5 py-4 font-semibold capitalize whitespace-nowrap">
                  {log.action_type?.replace(/_/g, " ") || "Activity"}
                </td>
                <td
                  className="px-5 py-4 text-[#5C7499] max-w-xs truncate"
                  title={log.details}
                >
                  {log.details || "-"}
                </td>
                <td className="px-5 py-4 font-mono text-[#5C7499] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{log.ip_address || "127.0.0.1"}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-[#5C7499] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span
                      className="truncate max-w-[120px]"
                      title={log.user_agent}
                    >
                      {log.user_agent
                        ? log.user_agent.split(" ")[0]
                        : "Browser"}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  {renderStatusBadge(log.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
