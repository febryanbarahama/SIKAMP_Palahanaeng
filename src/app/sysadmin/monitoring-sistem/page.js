"use client";

import { useState, useEffect } from "react";
import { Activity, RefreshCw, Clock, GitBranch, Info } from "lucide-react";

import MetricCards from "@/components/sysadmin/monitoring/MetricCards";
import LatencyChart from "@/components/sysadmin/monitoring/LatencyChart";
import ServerlessLogs from "@/components/sysadmin/monitoring/ServerlessLogs";
import DatabaseTablesIntegrity from "@/components/sysadmin/monitoring/DatabaseTablesIntegrity";

export default function SystemMonitoringPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchHealthCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sysadmin/monitoring/health", {
        cache: "no-store",
      });
      const result = await res.json();
      setData(result);
      setLastRefreshed(new Date().toLocaleTimeString("id-ID"));
    } catch (err) {
      console.error("Gagal mengambil data monitoring:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthCheck();
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Header & Kontrol Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DCE5F1] shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#0B1F4D] flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-[#2563EB]" /> Monitoring System
          </h1>
          <p className="text-xs text-[#5C7499] mt-1">
            Pantau status koneksi database Supabase, deployment Vercel, dan
            kesehatan layanan publik secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lastRefreshed && (
            <span className="text-xs text-[#5C7499] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Terakhir diperiksa:{" "}
              <strong className="text-[#0B1F4D]">{lastRefreshed}</strong>
            </span>
          )}
          <button
            onClick={fetchHealthCheck}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#25A4FF] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Memeriksa..." : "Refresh Status"}</span>
          </button>
        </div>
      </div>

      {/* 2. Kartu Metrik Utama */}
      <MetricCards data={data} loading={loading} />

      {/* 3. Grafik Point-to-Point & Evaluasi Latensi */}
      <LatencyChart databaseData={data?.database} />

      {/* 4. Catatan Infrastruktur Serverless */}
      <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-[#0B1F4D]">
            {data?.infrastructureNote?.title ||
              "Catatan Infrastruktur Serverless"}
          </h3>
          <p className="text-xs text-[#5C7499] leading-relaxed">
            {data?.infrastructureNote?.description}
          </p>
        </div>
      </div>

      {/* 5. Build & Deployment */}
      <div className="bg-white p-6 rounded-2xl border border-[#DCE5F1] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#0B1F4D] flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#2563EB]" /> Build & Deployment
            Terbaru
          </h2>
          <p className="text-xs text-[#5C7499]">
            Target Environment:{" "}
            <strong className="text-[#0B1F4D]">
              {data?.deployment?.environment}
            </strong>{" "}
            (Domain: {data?.deployment?.domain})
          </p>
        </div>
        <a
          href={data?.deployment?.deployHistoryUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-[#DCE5F1] text-xs font-semibold text-[#0B1F4D] hover:bg-[#F3F7FC] transition-colors"
        >
          Lihat Riwayat Deployment
        </a>
      </div>

      {/* 6. Log Error Serverless */}
      <ServerlessLogs logs={data?.serverlessLogs} />

      {/* 7. Integritas Tabel Database */}
      <DatabaseTablesIntegrity tables={data?.database?.tables} />
    </div>
  );
}
