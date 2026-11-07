import WelcomeBanner from "@/components/common/welcome-banner";
import { Users, Building2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PemerintahanDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Banner Global dengan kustomisasi untuk Modul Pemerintahan */}
      <WelcomeBanner
        username="Aparat Desa"
        badgeText="Pusat Administrasi & Pemerintahan"
        description="Kelola profil kepegawaian perangkat kampung, data struktur organisasi, dan tata kelola wilayah Kampung Palahanaeng secara terpadu."
        imageSrc="/ilustrasi_pemerintahan.png" // Atau ganti path gambar ilustrasi khusus jika ada
      />

      {/* Kartu Ringkasan / Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">
              Perangkat Desa Aktif
            </p>
            <p className="text-2xl font-extrabold text-[#0B1F4D]">12 Orang</p>
            <p className="text-[11px] text-emerald-600 font-semibold">
              Tersinkronisasi
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">
              Struktur Jabatan
            </p>
            <p className="text-2xl font-extrabold text-[#0B1F4D]">8 Posisi</p>
            <p className="text-[11px] text-blue-600 font-semibold">Lengkap</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">Otorisasi Sesi</p>
            <p className="text-2xl font-extrabold text-emerald-600">
              Terproteksi
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              Defense in Depth
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sub-Modul Navigasi Cepat */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#0B1F4D]">
            Sub-Modul Utama
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih area kerja yang ingin Anda kelola di dalam modul pemerintahan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/pemerintahan/perangkat"
            className="group p-5 rounded-2xl border border-slate-200 hover:border-[#2563EB] hover:shadow-md transition-all flex items-start gap-4 bg-slate-50/50 hover:bg-white"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B1F4D] group-hover:text-blue-600 transition-colors">
                Manajemen Perangkat Desa
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Kelola profil, NIK, jabatan, nomor kontak, serta masa jabatan
                aparat desa.
              </p>
            </div>
          </Link>

          <Link
            href="/pemerintahan/struktur"
            className="group p-5 rounded-2xl border border-slate-200 hover:border-[#2563EB] hover:shadow-md transition-all flex items-start gap-4 bg-slate-50/50 hover:bg-white"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B1F4D] group-hover:text-teal-600 transition-colors">
                Bagan Struktur Organisasi
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tampilkan bagan hierarki kepemimpinan Kampung Palahanaeng secara
                visual.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
