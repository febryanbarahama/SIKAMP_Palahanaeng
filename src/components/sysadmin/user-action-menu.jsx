"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Key,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";

export default function UserActionMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Menutup dropdown saat diklik di luar area menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleStatus = () => {
    setIsOpen(false);
    alert(`Ubah status untuk user: ${user.username}`);
    // Nanti dihubungkan ke Server Action / API endpoint
  };

  const handleResetPassword = () => {
    setIsOpen(false);
    alert(`Reset password untuk user: ${user.username}`);
    // Nanti dihubungkan ke dialog konfirmasi & Server Action
  };

  const handleDeleteUser = () => {
    setIsOpen(false);
    alert(`Hapus user: ${user.username}`);
    // Nanti dihubungkan ke dialog konfirmasi destruktif
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg hover:bg-[#F3F7FC] text-[#5C7499] transition-colors focus:outline-none"
        title="Opsi Aksi"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-[#DCE5F1] shadow-lg z-20 py-1.5 text-left">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#5C7499] uppercase tracking-wider border-b border-[#DCE5F1]/60">
            Aksi Akun
          </div>

          <button
            onClick={handleToggleStatus}
            className="w-full px-4 py-2 text-xs font-medium text-[#0B1F4D] hover:bg-[#F3F7FC] flex items-center gap-2.5 transition-colors"
          >
            {user.status === "aktif" ? (
              <>
                <ToggleLeft className="w-4 h-4 text-[#DC2626]" />
                <span>Nonaktifkan Akun</span>
              </>
            ) : (
              <>
                <ToggleRight className="w-4 h-4 text-[#059669]" />
                <span>Aktifkan Akun</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetPassword}
            className="w-full px-4 py-2 text-xs font-medium text-[#0B1F4D] hover:bg-[#F3F7FC] flex items-center gap-2.5 transition-colors"
          >
            <Key className="w-4 h-4 text-[#2563EB]" />
            <span>Reset Password</span>
          </button>

          <div className="my-1 border-t border-[#DCE5F1]/60" />

          <button
            onClick={handleDeleteUser}
            className="w-full px-4 py-2 text-xs font-medium text-[#DC2626] hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus Akun</span>
          </button>
        </div>
      )}
    </div>
  );
}
