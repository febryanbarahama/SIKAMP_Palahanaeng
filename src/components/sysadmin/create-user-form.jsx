"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

import UserFormFields from "./UserFormFields";
import UserFormStatusToggle from "./UserFormStatusToggle";
import UserSecurityNotice from "./UserSecurityNotice";

export default function CreateUserForm() {
  const router = useRouter();

  // State Form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("1");
  const [isStatusActive, setIsStatusActive] = useState(true);

  // State UI & Validasi
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Bersihkan pesan sukses/error saat pertama kali dimuat
  useEffect(() => {
    setSuccessMessage("");
    setFieldErrors({});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setSuccessMessage("");

    // Validasi Sisi Klien per Field
    let errors = {};
    if (!username.trim()) {
      errors.username = "Username wajib diisi.";
    }
    if (!password) {
      errors.password = "Password awal wajib diisi.";
    } else if (password.length < 8) {
      errors.password = "Password awal minimal harus terdiri dari 8 karakter.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword =
        "Konfirmasi password tidak cocok dengan password awal.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/sysadmin/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
          status: isStatusActive ? "aktif" : "nonaktif",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal membuat dan menyimpan akun.");
      }

      // Tampilkan pesan sukses & reset form
      setSuccessMessage(
        "Akun berhasil dibuat dan disimpan secara aman! Mengarahkan kembali...",
      );
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setRole("1");
      setIsStatusActive(true);
      setIsLoading(false);

      setTimeout(() => {
        router.push("/sysadmin/manajemen-users");
        router.refresh();
      }, 1500);
    } catch (err) {
      setFieldErrors({
        general:
          err.message || "Terjadi kesalahan saat menyimpan akun ke database.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Sticky Notification / Floating Alert */}
      <div className="sticky top-6 z-50 space-y-3">
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#059669] text-sm flex items-center gap-3 shadow-xl backdrop-blur-md bg-emerald-50/95 transition-all">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {fieldErrors.general && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-[#DC2626] text-sm flex items-center gap-3 shadow-xl backdrop-blur-md bg-rose-50/95 transition-all">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="font-medium">{fieldErrors.general}</span>
          </div>
        )}
      </div>

      {/* Kontainer Utama Form */}
      <div className="bg-white rounded-xl border border-[#DCE5F1] shadow-sm overflow-hidden">
        {/* Header Form Utama */}
        <div className="p-6 border-b border-[#DCE5F1] bg-white flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#0B1F4D]">
              Tambah Akun Baru
            </h1>
            <p className="text-xs text-[#5C7499]">
              Isi form di bawah ini untuk menambah akun pengguna baru.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 space-y-6"
          noValidate
        >
          {/* Sub-Komponen Field Input */}
          <UserFormFields
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            role={role}
            setRole={setRole}
            fieldErrors={fieldErrors}
          />

          {/* Sub-Komponen Toggle Status */}
          <UserFormStatusToggle
            isStatusActive={isStatusActive}
            setIsStatusActive={setIsStatusActive}
          />

          {/* Sub-Komponen Catatan Keamanan */}
          <UserSecurityNotice />

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
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#25A4FF] text-white text-sm font-medium shadow-sm hover:opacity-95 disabled:opacity-50 transition-opacity cursor-pointer"
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
    </div>
  );
}
