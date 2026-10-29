"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Eye, EyeOff, ShieldAlert, UserPlus } from "lucide-react";

export default function CreateUserForm({ onError, onSuccess }) {
  const router = useRouter();

  // State Form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("operator");
  const [isStatusActive, setIsStatusActive] = useState(true);

  // State UI & Validasi
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onError("");
    onSuccess("");

    if (!username.trim() || !password || !confirmPassword) {
      onError("Semua field wajib diisi dengan lengkap.");
      return;
    }

    if (password.length < 8) {
      onError("Password awal minimal harus terdiri dari 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      onError("Konfirmasi password tidak cocok dengan password awal.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulasi Proses Pengiriman ke Backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      onSuccess(
        "Akun berhasil dibuat! Mengarahkan kembali ke daftar pengguna...",
      );

      setTimeout(() => {
        router.push("/sysadmin/manajemen-users");
      }, 1500);
    } catch (err) {
      onError("Terjadi kesalahan saat menyimpan akun ke database.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#DCE5F1] shadow-sm overflow-hidden">
      {/* Header Form Utama */}
      <div className="p-6 border-b border-[#DCE5F1] bg-white flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
          <UserPlus className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#0B1F4D]">Tambah Akun Baru</h1>
          <p className="text-xs text-[#5C7499]">
            Isi form di bawah ini untuk menambah akun pengguna baru.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {/* Field Username */}
        <div>
          <label className="block text-xs font-semibold text-[#0B1F4D] uppercase tracking-wider mb-2">
            Username Login <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
            placeholder="Contoh: operator_palahanaeng"
            required
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB] transition-colors"
          />
          <p className="text-[11px] text-[#5C7499] mt-1.5">
            Gunakan nama yang mudah dikenali, unik, dan tanpa spasi.
          </p>
        </div>

        {/* Grid 2 Kolom untuk Password & Konfirmasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B1F4D] uppercase tracking-wider mb-2">
              Password Awal <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                required
                className="w-full px-4 py-2.5 pr-10 text-sm rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C7499] hover:text-[#0B1F4D] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1F4D] uppercase tracking-wider mb-2">
              Konfirmasi Password <span className="text-rose-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password awal"
              required
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB] transition-colors"
            />
          </div>
        </div>

        {/* Pilihan Role / Hak Akses */}
        <div>
          <label className="block text-xs font-semibold text-[#0B1F4D] uppercase tracking-wider mb-2">
            Hak Akses Role <span className="text-rose-500">*</span>
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB] transition-colors"
          >
            <option value="operator">Kaur Umum (Akses Layanan Terbatas)</option>
            <option value="operator">
              Operator Web (Akses Layanan Terbatas)
            </option>
            <option value="admin">Kapitalaung (Monitoring)</option>
            <option value="admin">Sekretaris Kampung (Monitoring)</option>
            <option value="superadmin">
              Super Admin (Akses Kendali Penuh Sistem)
            </option>
          </select>
        </div>

        {/* Section Status Akun: Tombol Toggle On/Off */}
        <div className="pt-2 border-t border-[#DCE5F1]">
          <label className="block text-xs font-semibold text-[#0B1F4D] uppercase tracking-wider mb-2">
            Status Akun <span className="text-rose-500">*</span>
          </label>

          <div className="flex items-center justify-between p-4 rounded-xl border border-[#DCE5F1] bg-[#F3F7FC]/30">
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-[#0B1F4D]">
                {isStatusActive ? "Status: Aktif" : "Status: Nonaktif"}
              </div>
              <p className="text-xs text-[#5C7499]">
                {isStatusActive
                  ? "Akun diizinkan untuk melakukan sesi login ke dalam sistem."
                  : "Akses login diblokir. Akun tidak dapat masuk ke dalam sistem."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsStatusActive(!isStatusActive)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isStatusActive ? "bg-[#2563EB]" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  isStatusActive ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Catatan Keamanan */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D97706]">
            <ShieldAlert className="w-4 h-4" /> Catatan Keamanan
          </div>
          <p className="text-xs text-[#5C7499] leading-relaxed">
            Setelah akun di buat, pengguna dapat login menggunakan username dan
            password awal. <br />
            Di sarankan untuk segera melakukan pergantian password setelah login
            pertama
          </p>
        </div>

        {/* Tombol Aksi Form */}
        <div className="pt-4 border-t border-[#DCE5F1] flex items-center justify-end gap-3">
          <Link
            href="/sysadmin/manajemen-users"
            className="px-5 py-2.5 rounded-xl border border-[#DCE5F1] bg-white text-[#5C7499] text-sm font-medium hover:bg-[#F3F7FC] transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#25A4FF] text-white text-sm font-medium shadow-sm hover:opacity-95 disabled:opacity-50 transition-opacity"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Simpan Akun
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
