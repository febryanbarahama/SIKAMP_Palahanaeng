"use client";

import { useState } from "react";
import { Trash2, X, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function UserBulkActionsBar({
  selectedCount,
  onBulkAction,
  onClearSelection,
  isLoading,
}) {
  // State untuk mengontrol modal konfirmasi massal
  const [modalConfig, setModalConfig] = useState(null); // { actionType, newStatus }

  if (selectedCount === 0) return null;

  const handleConfirm = () => {
    if (!modalConfig) return;
    onBulkAction(modalConfig.actionType, modalConfig.newStatus);
    setModalConfig(null);
  };

  return (
    <>
      {/* Floating Bottom Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
        <div className="bg-[#0B1F4D] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4 backdrop-blur-md">
          {/* Informasi Jumlah Dipilih */}
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white shadow-sm">
              {selectedCount}
            </span>
            <span className="text-xs font-medium text-slate-200">
              Pengguna dipilih
            </span>
          </div>

          {/* Tombol Aksi Massal */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setModalConfig({
                  actionType: "update-status",
                  newStatus: "aktif",
                })
              }
              disabled={isLoading}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              Aktifkan
            </button>
            <button
              onClick={() =>
                setModalConfig({
                  actionType: "update-status",
                  newStatus: "nonaktif",
                })
              }
              disabled={isLoading}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              Nonaktifkan
            </button>
            <button
              onClick={() =>
                setModalConfig({ actionType: "delete", newStatus: null })
              }
              disabled={isLoading}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hapus
            </button>

            {/* Tombol Close / Batalkan Pilihan */}
            <button
              onClick={onClearSelection}
              title="Batalkan pilihan"
              className="ml-2 p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL KONFIRMASI MASSAL (Sangat Konsisten dengan Action Menu) --- */}
      {modalConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#DCE5F1] shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  modalConfig.actionType === "delete"
                    ? "bg-rose-50 text-rose-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B1F4D]">
                  {modalConfig.actionType === "delete"
                    ? "Konfirmasi Hapus Massal"
                    : "Konfirmasi Perubahan Status Massal"}
                </h3>
                <p className="text-xs text-[#5C7499]">
                  Total target:{" "}
                  <span className="font-semibold text-[#0B1F4D]">
                    {selectedCount} akun terpilih
                  </span>
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5C7499] leading-relaxed">
              {modalConfig.actionType === "delete"
                ? "Tindakan ini bersifat permanen dan akan menghapus seluruh kredensial akun yang dipilih secara total dari database sistem."
                : `Apakah Anda yakin ingin mengubah status seluruh ${selectedCount} akun terpilih menjadi "${modalConfig.newStatus}"?`}
            </p>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#DCE5F1]">
              <button
                type="button"
                onClick={() => setModalConfig(null)}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl border border-[#DCE5F1] text-xs font-medium text-[#5C7499] hover:bg-[#F3F7FC] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isLoading}
                className={`px-4 py-2 rounded-xl text-xs font-medium text-white shadow-sm cursor-pointer disabled:opacity-50 ${
                  modalConfig.actionType === "delete"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-[#2563EB] hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Memproses..." : "Ya, Lanjutkan Eksekusi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
