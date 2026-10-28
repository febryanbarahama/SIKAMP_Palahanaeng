import Link from "next/link";
import { Activity, Database } from "lucide-react";

export default function InfrastructureStatus() {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#DCE5F1] shadow-sm space-y-4">
      <h2 className="text-base font-semibold text-[#0B1F4D] flex items-center gap-2">
        <Activity className="w-5 h-5 text-[#2563EB]" /> Status Infrastruktur &
        Layanan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[#F3F7FC] border border-[#DCE5F1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#2563EB]" />
            <div>
              <p className="text-sm font-medium text-[#0B1F4D]">
                Supabase PostgreSQL
              </p>
              <p className="text-xs text-[#059669] font-medium flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>{" "}
                Terhubung
              </p>
            </div>
          </div>
          <Link
            href="/sysadmin/monitoring"
            className="text-xs font-medium text-[#2563EB] hover:underline"
          >
            Detail
          </Link>
        </div>

        <div className="p-4 rounded-lg bg-[#F3F7FC] border border-[#DCE5F1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-black text-white rounded text-xs font-bold">
              ▲
            </div>
            <div>
              <p className="text-sm font-medium text-[#0B1F4D]">
                Vercel Deployment
              </p>
              <p className="text-xs text-[#059669] font-medium flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#059669]"></span>{" "}
                Production
              </p>
            </div>
          </div>
          <Link
            href="/sysadmin/monitoring"
            className="text-xs font-medium text-[#2563EB] hover:underline"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
