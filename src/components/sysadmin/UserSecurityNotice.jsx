"use client";

import { ShieldAlert } from "lucide-react";

export default function UserSecurityNotice() {
  return (
    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold text-[#D97706]">
        <ShieldAlert className="w-4 h-4" /> Catatan Keamanan
      </div>
      <p className="text-xs text-[#5C7499] leading-relaxed">
        Setelah akun dibuat, pengguna dapat login menggunakan username dan
        password awal. <br />
        Disarankan untuk segera melakukan pergantian password setelah login
        pertama.
      </p>
    </div>
  );
}
