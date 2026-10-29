"use client";

import { BarChart2, PieChart } from "lucide-react";

export default function AnalyticsCharts({
  roleDistribution,
  activeUsers,
  inactiveUsers,
}) {
  const totalUsers = activeUsers + inactiveUsers;
  const activePercentage =
    totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
  const inactivePercentage =
    totalUsers > 0 ? Math.round((inactiveUsers / totalUsers) * 100) : 0;

  // Warna aksen untuk masing-masing role
  const roleColors = [
    "bg-[#2563EB]", // Primary Blue
    "bg-[#059669]", // Success Green
    "bg-[#D97706]", // Amber Warning
    "bg-[#7C3AED]", // Purple
    "bg-[#EC4899]", // Pink
  ];

  const roleEntries = Object.entries(roleDistribution);
  const maxRoleCount = Math.max(...Object.values(roleDistribution), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Grafik 1: Distribusi Akun Berdasarkan Role (Bar Chart Visual) */}
      <div className="bg-white p-6 rounded-xl border border-[#DCE5F1] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCE5F1]">
            <h2 className="text-base font-semibold text-[#0B1F4D] flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#2563EB]" /> Distribusi Akun
              Berdasarkan Role
            </h2>
            <span className="text-xs text-[#5C7499]">
              {roleEntries.length} Role Terdaftar
            </span>
          </div>

          <div className="space-y-4 my-2">
            {roleEntries.length > 0 ? (
              roleEntries.map(([roleName, count], idx) => {
                const percentage = Math.round((count / maxRoleCount) * 100);
                const colorClass = roleColors[idx % roleColors.length];

                return (
                  <div key={roleName} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#0B1F4D] capitalize">
                        {roleName}
                      </span>
                      <span className="text-[#5C7499]">{count} Akun</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full bg-[#F3F7FC] h-3 rounded-full overflow-hidden border border-[#DCE5F1]/50">
                      <div
                        className={`h-full ${colorClass} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-[#5C7499] text-center py-6">
                Belum ada data role tersedia.
              </p>
            )}
          </div>
        </div>

        <p className="text-[11px] text-[#5C7499] mt-4 pt-3 border-t border-[#DCE5F1]">
          *Visualisasi perbandingan jumlah pengguna pada setiap tingkatan hak
          akses sistem.
        </p>
      </div>

      {/* Grafik 2: Rasio Status Akun Aktif vs Nonaktif (Donut/Pie Chart Visual) */}
      <div className="bg-white p-6 rounded-xl border border-[#DCE5F1] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCE5F1]">
            <h2 className="text-base font-semibold text-[#0B1F4D] flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#2563EB]" /> Rasio Status Akun
            </h2>
            <span className="text-xs text-[#5C7499]">
              Total {totalUsers} Akun
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            {/* Donut Chart SVG */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                {/* Background Ring (Nonaktif / Rose) */}
                <path
                  className="text-rose-100"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Foreground Ring (Aktif / Emerald) */}
                <path
                  className="text-[#059669] transition-all duration-700 ease-out"
                  strokeDasharray={`${activePercentage}, 100`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              {/* Teks Tengah Donut */}
              <div className="absolute text-center">
                <span className="block text-2xl font-bold text-[#0B1F4D]">
                  {activePercentage}%
                </span>
                <span className="block text-[10px] text-[#5C7499] font-medium">
                  Akun Aktif
                </span>
              </div>
            </div>

            {/* Legenda Grafik */}
            <div className="space-y-3 w-full sm:w-auto">
              <div className="flex items-center justify-between sm:justify-start gap-4 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#059669]"></span>
                  <span className="text-xs font-semibold text-[#0B1F4D]">
                    Akun Aktif
                  </span>
                </div>
                <span className="text-xs font-bold text-[#059669]">
                  {activeUsers} ({activePercentage}%)
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-4 p-2.5 rounded-lg bg-rose-50/50 border border-rose-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#DC2626]"></span>
                  <span className="text-xs font-semibold text-[#0B1F4D]">
                    Akun Nonaktif
                  </span>
                </div>
                <span className="text-xs font-bold text-[#DC2626]">
                  {inactiveUsers} ({inactivePercentage}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#5C7499] mt-4 pt-3 border-t border-[#DCE5F1]">
          *Menampilkan tingkat keaktifan operasional seluruh akun pengguna
          terdaftar.
        </p>
      </div>
    </div>
  );
}
