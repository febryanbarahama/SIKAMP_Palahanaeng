"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  Database,
  Server,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Globe,
  ShieldCheck,
  Clock,
  Cpu,
  Terminal,
  GitBranch,
  Info,
  TrendingUp,
  BarChart3,
  Zap,
} from "lucide-react";

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

  // --- LOGIKA PERHITUNGAN KOORDINAT GRAFIK POINT / LINE CHART SVG ---
  const historyData = data?.database?.latencyHistory || [];
  const maxMs = Math.max(...historyData.map((d) => d.ms), 50);

  // Menghitung titik koordinat (X, Y) untuk garis SVG
  const chartHeight = 120; // tinggi viewport SVG
  const points = historyData.map((item, index) => {
    const x = (index / (historyData.length - 1 || 1)) * 100; // Persentase X (0% - 100%)
    const y = chartHeight - (item.ms / maxMs) * (chartHeight - 20) - 10; // Posisi Y dari bawah
    return { x, y, ms: item.ms, time: item.time };
  });

  // Membuat string path `d` untuk garis SVG (Point to Point)
  const linePathD =
    points.length > 0
      ? points.reduce(
          (acc, curr, idx) =>
            `${acc} ${idx === 0 ? "M" : "L"} ${curr.x} ${curr.y}`,
          "",
        )
      : "";

  // Membuat area shading transparan di bawah garis
  const areaPathD =
    points.length > 0
      ? `${linePathD} L 100 ${chartHeight} L 0 ${chartHeight} Z`
      : "";

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

      {/* 3. PENGUKURAN GRAFIK LINE / POINT TO POINT CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Panel Grafik Point-to-Point Latensi */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#DCE5F1] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0B1F4D] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2563EB]" /> Grafik
                Fluktuasi Latensi Database
              </h2>
              <p className="text-xs text-[#5C7499]">
                {data?.database?.measurementNote}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F3F7FC] text-[#2563EB] border border-[#DCE5F1]">
              Line Chart Mode
            </span>
          </div>

          {/* Area Grafik SVG Point-to-Point */}
          {/* Area Grafik SVG Point-to-Point yang Lebih Proporsional */}
          <div className="pt-2">
            <div className="h-44 w-full relative max-w-4xl mx-auto">
              <svg
                viewBox={`0 0 100 ${chartHeight}`}
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="latencyGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Garis Grid Horizontal */}
                <line
                  x1="0"
                  y1="20"
                  x2="100"
                  y2="20"
                  stroke="#E2E8F0"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1="60"
                  x2="100"
                  y2="60"
                  stroke="#E2E8F0"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="100"
                  stroke="#E2E8F0"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                />

                {/* Shading Warna Transparan */}
                <path d={areaPathD} fill="url(#latencyGradient)" />

                {/* Garis Utama Point-to-Point */}
                <path
                  d={linePathD}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Titik Point Data (Nodes) yang Lebih Kecil & Presisi */}
                {points.map((pt, idx) => (
                  <g key={idx} className="group cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="3"
                      className="fill-white stroke-[#2563EB] stroke-[1.5] transition-all group-hover:r-5 group-hover:stroke-blue-700"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="1"
                      className="fill-[#2563EB]"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Label Waktu Grafik */}
            <div className="flex justify-between items-center text-[11px] text-[#5C7499] pt-3 font-mono border-t border-[#DCE5F1] mt-2">
              {historyData.map((item, idx) => (
                <div key={idx} className="text-center space-y-0.5">
                  <div className="font-bold text-[#0B1F4D]">{item.ms} ms</div>
                  <div className="text-[10px] text-[#5C7499]">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Meter Evaluasi Kecepatan Response */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCE5F1] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0B1F4D] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2563EB]" /> Evaluasi
              Kecepatan Response
            </h2>
            <p className="text-xs text-[#5C7499]">
              Status ambang batas latensi saat ini
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold text-[#0B1F4D]">
              <span>Kategori Latensi</span>
              <span
                className={
                  data?.database?.latencyMs < 50
                    ? "text-emerald-600"
                    : "text-amber-600"
                }
              >
                {data?.database?.latencyMs < 50
                  ? "Sangat Cepat (<50ms)"
                  : "Normal (<150ms)"}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
              <div
                className="h-full bg-emerald-500 w-1/3"
                title="Optimal (<50ms)"
              ></div>
              <div
                className="h-full bg-amber-500 w-1/3"
                title="Sedang (50-150ms)"
              ></div>
              <div
                className="h-full bg-rose-500 w-1/3"
                title="Kritis (>150ms)"
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#5C7499] font-mono">
              <span>0ms</span>
              <span>50ms</span>
              <span>150ms+</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F3F7FC] border border-[#DCE5F1] text-xs text-[#5C7499] space-y-1">
            <div className="font-bold text-[#0B1F4D]">
              Rekomendasi Performa:
            </div>
            <p>
              Database merespon query dalam kisaran aman tanpa adanya indikasi
              bottleneck pada koneksi Supabase.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Sistem & Infrastruktur (Penjelasan Serverless vs VPS) */}
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
      <div className="bg-white rounded-2xl border border-[#DCE5F1] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#DCE5F1]">
          <h2 className="text-base font-bold text-[#0B1F4D] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#2563EB]" /> Log Error &
            Aktivitas Serverless
          </h2>
          <p className="text-xs text-[#5C7499]">
            Ringkasan aktivitas sistem (Token, password, dan kredensial disensor
            demi keamanan).
          </p>
        </div>

        <div className="divide-y divide-[#DCE5F1]">
          {data?.serverlessLogs?.map((log, idx) => (
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

      {/* 7. Integritas Tabel Database */}
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
              {data?.database?.tables?.map((table, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#F3F7FC]/40 transition-colors"
                >
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
                  <td className="px-6 py-3.5 text-[#5C7499]">
                    {table.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
