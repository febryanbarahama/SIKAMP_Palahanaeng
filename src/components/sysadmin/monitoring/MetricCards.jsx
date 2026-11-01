"use client";

import {
  Database,
  Server,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Zap,
} from "lucide-react";

export default function MetricCards({ data, loading }) {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Supabase PostgreSQL Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#DCE5F1] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          {renderStatusBadge(data?.database?.status || "Healthy")}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0B1F4D]">
            Supabase PostgreSQL
          </h3>
          <p className="text-xs text-[#5C7499]">Database Utama & Auth</p>
        </div>
        <div className="pt-2 border-t border-[#DCE5F1] flex items-center justify-between text-xs">
          <span className="text-[#5C7499]">Latensi Query Aktual:</span>
          <span className="font-bold text-[#0B1F4D] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            {loading ? "..." : `${data?.database?.latencyMs || 0} ms`}
          </span>
        </div>
      </div>

      {/* Vercel Deployment Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#DCE5F1] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          {renderStatusBadge(data?.deployment?.status || "Healthy")}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0B1F4D]">
            Vercel App Deployment
          </h3>
          <p className="text-xs text-[#5C7499]">
            Environment:{" "}
            <span className="font-semibold text-[#0B1F4D]">
              {data?.deployment?.environment || "production"}
            </span>
          </p>
        </div>
        <div className="pt-2 border-t border-[#DCE5F1] flex items-center justify-between text-xs">
          <span className="text-[#5C7499]">Commit Hash:</span>
          <span className="font-mono font-bold text-[#0B1F4D]">
            {data?.deployment?.commitHash || "latest"}
          </span>
        </div>
      </div>

      {/* Runtime Environment Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#DCE5F1] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          {renderStatusBadge("Healthy")}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0B1F4D]">
            Next.js Serverless Runtime
          </h3>
          <p className="text-xs text-[#5C7499]">Node.js API Engine</p>
        </div>
        <div className="pt-2 border-t border-[#DCE5F1] flex items-center justify-between text-xs">
          <span className="text-[#5C7499]">Otorisasi Backend:</span>
          <span className="font-semibold text-[#059669]">
            Super Admin Secured
          </span>
        </div>
      </div>
    </div>
  );
}
