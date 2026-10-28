import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#DCE5F1] shadow-sm">
      <h2 className="text-base font-semibold text-[#0B1F4D] mb-3">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/sysadmin/users/create"
          className="flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-[#1D4ED8] to-[#25A4FF] text-white text-sm font-medium shadow-sm hover:opacity-95 transition-opacity"
        >
          <span>Tambah Akun Baru</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#F3F7FC] text-[#0B1F4D] text-sm font-medium border border-[#DCE5F1] hover:bg-[#E2E8F0] transition-colors"
        >
          <span>Ke Halaman Modul</span>
          <ArrowUpRight className="w-4 h-4 text-[#5C7499]" />
        </Link>
      </div>
    </div>
  );
}
