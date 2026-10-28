import Link from "next/link";
import { Clock, ShieldCheck } from "lucide-react";

export default function ActivityFeed({ logs }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#DCE5F1] shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCE5F1]">
          <h2 className="text-base font-semibold text-[#0B1F4D] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2563EB]" /> Aktivitas Terbaru
          </h2>
          <Link
            href="/sysadmin/logs"
            className="text-xs font-medium text-[#2563EB] hover:underline"
          >
            Semua
          </Link>
        </div>

        <div className="space-y-4">
          {logs && logs.length > 0 ? (
            logs.map((log, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-3 border-b border-[#DCE5F1]/60 last:border-0 last:pb-0"
              >
                <div className="p-2 rounded-full bg-[#F3F7FC] text-[#2563EB] mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#0B1F4D] truncate">
                    {log.title}
                  </p>
                  <p className="text-[11px] text-[#5C7499]">{log.desc}</p>
                </div>
                <span className="text-[10px] text-[#5C7499] whitespace-nowrap">
                  {log.time}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#5C7499] text-center py-6">
              Belum ada aktivitas baru.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#DCE5F1]">
        <Link
          href="/sysadmin/logs"
          className="w-full block text-center py-2 text-xs font-medium text-[#2563EB] bg-[#F3F7FC] rounded-lg hover:bg-[#E2E8F0] transition-colors"
        >
          Buka Log Aktivitas Lengkap →
        </Link>
      </div>
    </div>
  );
}
