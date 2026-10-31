"use client";

export default function UserFormStatusToggle({
  isStatusActive,
  setIsStatusActive,
}) {
  return (
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
  );
}
