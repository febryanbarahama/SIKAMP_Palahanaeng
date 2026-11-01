"use client";

import { History, ShieldAlert, KeyRound, UserCheck } from "lucide-react";

export default function LogStatCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Log */}
      <div className="bg-white p-5 rounded-2xl border border-[#DCE5F1] shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
          <History className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-[#5C7499] font-medium">
            Total Aktivitas Terekam
          </p>
          <h3 className="text-xl font-bold text-[#0B1F4D]">
            {stats?.totalLogs || 0}
          </h3>
        </div>
      </div>

      {/* Total Login */}
      <div className="bg-white p-5 rounded-2xl border border-[#DCE5F1] shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-[#5C7499] font-medium">Riwayat Login</p>
          <h3 className="text-xl font-bold text-[#0B1F4D]">
            {stats?.totalLogin || 0}
          </h3>
        </div>
      </div>

      {/* Aktivitas Keamanan */}
      <div className="bg-white p-5 rounded-2xl border border-[#DCE5F1] shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-[#5C7499] font-medium">
            Aktivitas Keamanan
          </p>
          <h3 className="text-xl font-bold text-[#0B1F4D]">
            {stats?.totalSecurity || 0}
          </h3>
        </div>
      </div>

      {/* Perubahan Data */}
      <div className="bg-white p-5 rounded-2xl border border-[#DCE5F1] shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-[#5C7499] font-medium">
            Perubahan Data Akun
          </p>
          <h3 className="text-xl font-bold text-[#0B1F4D]">
            {stats?.totalDataChanges || 0}
          </h3>
        </div>
      </div>
    </div>
  );
}
