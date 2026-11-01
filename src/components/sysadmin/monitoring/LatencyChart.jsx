"use client";

import { TrendingUp, BarChart3 } from "lucide-react";

export default function LatencyChart({ databaseData }) {
  const historyData = databaseData?.latencyHistory || [];
  const maxMs = Math.max(...historyData.map((d) => d.ms), 50);
  const chartHeight = 120;

  const points = historyData.map((item, index) => {
    const x = (index / (historyData.length - 1 || 1)) * 100;
    const y = chartHeight - (item.ms / maxMs) * (chartHeight - 20) - 10;
    return { x, y, ms: item.ms, time: item.time };
  });

  const linePathD =
    points.length > 0
      ? points.reduce(
          (acc, curr, idx) =>
            `${acc} ${idx === 0 ? "M" : "L"} ${curr.x} ${curr.y}`,
          "",
        )
      : "";

  const areaPathD =
    points.length > 0
      ? `${linePathD} L 100 ${chartHeight} L 0 ${chartHeight} Z`
      : "";
  const currentLatency = databaseData?.latencyMs || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Panel Grafik Point-to-Point Latensi */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#DCE5F1] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0B1F4D] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2563EB]" /> Grafik Fluktuasi
              Latensi Database
            </h2>
            <p className="text-xs text-[#5C7499]">
              {databaseData?.measurementNote}
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F3F7FC] text-[#2563EB] border border-[#DCE5F1]">
            Line Chart Mode
          </span>
        </div>

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

              <path d={areaPathD} fill="url(#latencyGradient)" />
              <path
                d={linePathD}
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

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
            <BarChart3 className="w-4 h-4 text-[#2563EB]" /> Evaluasi Kecepatan
            Response
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
                currentLatency < 50 ? "text-emerald-600" : "text-amber-600"
              }
            >
              {currentLatency < 50 ? "Sangat Cepat (<50ms)" : "Normal (<150ms)"}
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
          <div className="font-bold text-[#0B1F4D]">Rekomendasi Performa:</div>
          <p>
            Database merespon query dalam kisaran aman tanpa adanya indikasi
            bottleneck pada koneksi Supabase.
          </p>
        </div>
      </div>
    </div>
  );
}
