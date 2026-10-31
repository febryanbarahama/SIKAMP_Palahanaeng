"use client";

import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function UserFormFields({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  role,
  setRole,
  fieldErrors,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
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
          className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white text-[#0B1F4D] focus:outline-none transition-colors ${
            fieldErrors.username
              ? "border-rose-500 focus:border-rose-500"
              : "border-[#DCE5F1] focus:border-[#2563EB]"
          }`}
        />
        {fieldErrors.username ? (
          <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />{" "}
            {fieldErrors.username}
          </p>
        ) : (
          <p className="text-[11px] text-[#5C7499] mt-1.5">
            Gunakan nama yang mudah dikenali, unik, dan tanpa spasi.
          </p>
        )}
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
              className={`w-full px-4 py-2.5 pr-10 text-sm rounded-xl border bg-white text-[#0B1F4D] focus:outline-none transition-colors ${
                fieldErrors.password
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-[#DCE5F1] focus:border-[#2563EB]"
              }`}
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
          {fieldErrors.password && (
            <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />{" "}
              {fieldErrors.password}
            </p>
          )}
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
            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white text-[#0B1F4D] focus:outline-none transition-colors ${
              fieldErrors.confirmPassword
                ? "border-rose-500 focus:border-rose-500"
                : "border-[#DCE5F1] focus:border-[#2563EB]"
            }`}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />{" "}
              {fieldErrors.confirmPassword}
            </p>
          )}
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
          <option value="1">Super Admin (Akses Kendali Penuh Sistem)</option>
          <option value="2">Kapitalaung (Monitoring)</option>
          <option value="3">
            Sekretaris Kampung (Monitoring & Verifikasi)
          </option>
          <option value="4">Kaur Umum (Akses Layanan Terbatas)</option>
          <option value="5">Operator Web (Pengelolaan Konten Web)</option>
        </select>
      </div>
    </div>
  );
}
