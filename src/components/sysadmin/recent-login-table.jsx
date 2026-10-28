import Link from "next/link";
import { Clock } from "lucide-react";

export default function RecentLoginTable({ logins }) {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5F1] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-[#DCE5F1] flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F4D]">
            Riwayat Login Pengguna
          </h2>
          <p className="text-xs text-[#5C7499]">
            Daftar akses masuk sistem terakhir
          </p>
        </div>
        <Link
          href="/sysadmin/logs"
          className="text-sm font-medium text-[#2563EB] hover:underline"
        >
          Lihat Log Selengkapnya →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F3F7FC] text-[#5C7499] uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Waktu Login Terakhir</th>
              <th className="px-6 py-3">Status Akun</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE5F1]">
            {logins && logins.length > 0 ? (
              logins.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#F3F7FC]/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-[#0B1F4D]">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 text-[#5C7499] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#5C7499]" />
                    {new Date(item.last_login).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "aktif"
                          ? "bg-emerald-50 text-[#059669]"
                          : "bg-rose-50 text-[#DC2626]"
                      }`}
                    >
                      {item.status === "aktif" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-8 text-center text-[#5C7499]"
                >
                  Belum ada riwayat login tercatat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
