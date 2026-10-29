"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

import CreateUserForm from "@/components/sysadmin/create-user-form";
import CreateUserGuide from "@/components/sysadmin/create-user-guide";

export default function CreateUserPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* 1. Breadcrumb & Tombol Kembali */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#5C7499]">
          <Link
            href="/sysadmin"
            className="hover:text-[#2563EB] transition-colors"
          >
            Beranda
          </Link>
          <span>/</span>
          <Link
            href="/sysadmin/manajemen-users"
            className="hover:text-[#2563EB] transition-colors"
          >
            Manajemen Pengguna
          </Link>
          <span>/</span>
          <span className="text-[#0B1F4D] font-medium">Tambah Akun</span>
        </div>

        <Link
          href="/sysadmin/manajemen-users"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] text-xs font-medium hover:bg-[#F3F7FC] transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Pengguna
        </Link>
      </div>

      {/* Pesan Notifikasi Sukses / Error Global */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-[#DC2626] text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#059669] text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 2. Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel Form Utama */}
        <div className="lg:col-span-2">
          <CreateUserForm
            onError={setErrorMessage}
            onSuccess={setSuccessMessage}
          />
        </div>

        {/* Panel Panduan Singkat di Kanan */}
        <div>
          <CreateUserGuide />
        </div>
      </div>
    </div>
  );
}
