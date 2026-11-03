"use client";

import { useState } from "react";
import { LogOut, AlertTriangle } from "lucide-react";
import { handleLogout } from "@/app/(auth)/actions";

export default function LogoutButton() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hapus parameter "e" karena ini dipanggil dari form action
  const onSubmitLogout = async () => {
    setIsLoading(true);
    try {
      await handleLogout();
    } catch (error) {
      console.error("Gagal logout:", error);
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* Tombol Logout */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        title="Keluar Sistem"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/15 backdrop-blur-md border border-rose-500/30 text-rose-200 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden md:inline">Logout</span>
      </button>

      {/* Modal Dialog Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 text-center">
            {/* Icon Peringatan */}
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-rose-100">
              <AlertTriangle className="w-7 h-7" />
            </div>

            {/* Teks Dialog */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#0B1F4D]">
                Konfirmasi Keluar Sistem
              </h3>
              <p className="text-xs text-[#5C7192] leading-relaxed">
                Apakah Anda yakin ingin keluar dari sesi SIKAMP Palahanaeng?
                Anda perlu masuk kembali untuk mengakses modul.
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
              >
                Batal
              </button>

              <form action={onSubmitLogout} className="flex-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? "Memproses..." : "Ya, Keluar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
