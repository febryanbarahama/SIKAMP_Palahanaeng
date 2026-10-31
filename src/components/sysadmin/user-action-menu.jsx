"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  CheckCircle,
  XCircle,
  Key,
  Trash2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function UserActionMenu({ user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);

  // State untuk Modal Reset Password & Toggle Lihat Password
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle lihat password

  // State untuk Modal Konfirmasi Hapus / Status
  const [actionType, setActionType] = useState(null); // 'delete', 'status-aktif', 'status-nonaktif'

  // Menutup dropdown saat diklik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fungsi Eksekusi API
  const handleApiAction = async (payload) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/sysadmin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Gagal memproses aksi.");
      }

      setIsOpen(false);
      setShowResetModal(false);
      setActionType(null);
      setNewPassword("");
      setShowPassword(false);
      router.refresh();
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Handler Ubah Status
  const confirmUpdateStatus = () => {
    const targetStatus = user.status === "aktif" ? "nonaktif" : "aktif";
    handleApiAction({
      action: "update-status",
      userId: user.id,
      newStatus: targetStatus,
    });
  };

  // 2. Handler Reset Password
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      alert("Password baru minimal harus terdiri dari 8 karakter.");
      return;
    }
    handleApiAction({
      action: "reset-password",
      userId: user.id,
      newPassword: newPassword,
    });
  };

  // 3. Handler Hapus Akun
  const confirmDelete = () => {
    handleApiAction({
      action: "delete",
      userId: user.id,
    });
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Tombol Titik Tiga (Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg border border-[#DCE5F1] bg-white text-[#5C7499] hover:bg-[#F3F7FC] hover:text-[#0B1F4D] transition-colors cursor-pointer"
        title="Opsi Aksi"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-[#DCE5F1] shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95">
          {/* Opsi Ubah Status */}
          <button
            onClick={() => {
              setIsOpen(false);
              setActionType(
                user.status === "aktif" ? "status-nonaktif" : "status-aktif",
              );
            }}
            className="w-full text-left px-4 py-2.5 text-xs font-medium text-[#0B1F4D] hover:bg-[#F3F7FC] flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            {user.status === "aktif" ? (
              <>
                <XCircle className="w-4 h-4 text-amber-600" />
                <span>Nonaktifkan Akun</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Aktifkan Akun</span>
              </>
            )}
          </button>

          {/* Opsi Reset Password */}
          <button
            onClick={() => {
              setIsOpen(false);
              setShowResetModal(true);
            }}
            className="w-full text-left px-4 py-2.5 text-xs font-medium text-[#0B1F4D] hover:bg-[#F3F7FC] flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <Key className="w-4 h-4 text-blue-600" />
            <span>Reset Password</span>
          </button>

          <div className="my-1 border-t border-[#DCE5F1]" />

          {/* Opsi Hapus Akun */}
          <button
            onClick={() => {
              setIsOpen(false);
              setActionType("delete");
            }}
            className="w-full text-left px-4 py-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus Akun</span>
          </button>
        </div>
      )}

      {/* --- MODAL KONFIRMASI STATUS / HAPUS --- */}
      {actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#DCE5F1] shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  actionType === "delete"
                    ? "bg-rose-50 text-rose-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B1F4D]">
                  {actionType === "delete"
                    ? "Konfirmasi Hapus Akun"
                    : "Konfirmasi Perubahan Status"}
                </h3>
                <p className="text-xs text-[#5C7499]">
                  Username:{" "}
                  <span className="font-semibold text-[#0B1F4D]">
                    @{user.username}
                  </span>
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5C7499] leading-relaxed">
              {actionType === "delete"
                ? "Tindakan ini bersifat permanen dan menghapus akses kredensial pengguna secara total dari database sistem."
                : `Apakah Anda yakin ingin mengubah status akun ini menjadi ${user.status === "aktif" ? "Nonaktif" : "Aktif"}?`}
            </p>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#DCE5F1]">
              <button
                type="button"
                onClick={() => setActionType(null)}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl border border-[#DCE5F1] text-xs font-medium text-[#5C7499] hover:bg-[#F3F7FC] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={
                  actionType === "delete" ? confirmDelete : confirmUpdateStatus
                }
                disabled={isLoading}
                className={`px-4 py-2 rounded-xl text-xs font-medium text-white shadow-sm cursor-pointer disabled:opacity-50 ${
                  actionType === "delete"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-[#2563EB] hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Memproses..." : "Ya, Lanjutkan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL RESET PASSWORD DENGAN FITUR LIHAT PASSWORD --- */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#DCE5F1] shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-bold text-[#0B1F4D]">
                Reset Password Pengguna
              </h3>
              <p className="text-xs text-[#5C7499]">
                Buat password baru untuk akun{" "}
                <span className="font-semibold text-[#0B1F4D]">
                  @{user.username}
                </span>
                .
              </p>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1F4D] uppercase tracking-wider mb-2">
                  Password Baru <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    required
                    className="w-full px-4 py-2.5 pr-10 text-sm rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB]"
                  />
                  {/* Tombol Toggle Lihat / Sembunyikan Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C7499] hover:text-[#0B1F4D] transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-[#DCE5F1]">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(false);
                    setNewPassword("");
                    setShowPassword(false);
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl border border-[#DCE5F1] text-xs font-medium text-[#5C7499] hover:bg-[#F3F7FC] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-medium hover:bg-blue-700 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Menyimpan..." : "Simpan Password Baru"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
