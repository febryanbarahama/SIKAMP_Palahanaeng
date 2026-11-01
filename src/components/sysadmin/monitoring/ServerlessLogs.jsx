"use client";

import { Terminal, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function ServerlessLogs({ logs }) {
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Healthy":
      case "Resolved":
      case "Handled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#059669] border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {status}
          </span>
        );
      case "Warning":
      case "WARN":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#D97706] border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-[#DC2626] border border-rose-200">
            <XCircle className="w-3.5 h-3.5 shrink-0" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE5F1] shadow-sm overflow-hidden">
      <div className="p-5 border-b border-[#DCE5F1]">
        <h2 className="text-base font-bold text-[#0B1F4D] flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#2563EB]" /> Log Error & Aktivitas
          Serverless
        </h2>
        <p className="text-xs text-[#5C7499]">
          Ringkasan aktivitas sistem (Token, password, dan kredensial disensor
          demi keamanan).
        </p>
      </div>

      <div className="divide-y divide-[#DCE5F1]">
        {logs?.map((log, idx) => (
          <div
            key={idx}
            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F3F7FC]/50 transition-colors text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#5C7499]">{log.time}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-[#0B1F4D]">
                  {log.route}
                </span>
              </div>
              <p className="text-[#0B1F4D] font-medium">{log.message}</p>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-center">
              <span className="font-mono text-[11px] text-[#5C7499]">
                Level: {log.level}
              </span>
              {renderStatusBadge(log.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
