"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Compass,
  BookOpen,
} from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";

export default function InfoKampungPage() {
  const [profil, setProfil] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("identitas");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabaseAdmin
          .from("profil_desa")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Gagal memuat profil desa:", error.message);
        } else if (data) {
          setProfil(data);
        }
      } catch (err) {
        console.error("Exception saat mengambil profil desa:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm font-semibold text-slate-500 animate-pulse">
          Memuat Info Kampung...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 1. Executive Hero Banner (Full-Width) */}
      <div className="relative overflow-hidden flex flex-col justify-center bg-[#0B1F4D] text-white shadow-xl border-b border-[#123B8A]/80 w-full h-[300px] mb-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D] via-[#0B1F4D]/90 to-transparent z-10" />
          <img
            src={profil.foto_kantor || "/ilustrasi_sysadmin.png"}
            alt="Kantor Kampung"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-20 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 p-2 shadow-lg flex items-center justify-center shrink-0">
              <img
                src={profil.logo_desa || "/logo.png"}
                alt="Logo Desa"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-semibold backdrop-blur-md">
                  Kode: {profil.kode_desa || "-"}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-semibold backdrop-blur-md">
                  Wilayah Bawahan:{" "}
                  {profil.sebutan_wilayah_bawahan || "Lindongan"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {profil.nama_desa || "Nama Kampung Belum Diatur"}
              </h2>

              <p className="text-xs sm:text-sm text-blue-200 font-medium">
                Kecamatan {profil.kecamatan || "-"}, Kabupaten{" "}
                {profil.kabupaten || "-"}, Provinsi {profil.provinsi || "-"}
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-2.5 min-w-[260px] text-xs">
            <div className="flex items-center gap-2.5 text-blue-100">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="truncate">
                {profil.email_desa || "Email belum diatur"}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-blue-100">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{profil.telepon_desa || "Telepon belum diatur"}</span>
            </div>
            <div className="flex items-start gap-2.5 text-blue-100">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {profil.alamat_kantor || "Alamat kantor belum diatur"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="px-4 sm:px-9 space-y-6 pb-12">
        {/* 2. Header Halaman Clean (Tanpa Background/Border) & Aksi Edit */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2">
          <div>
            <h1 className="text-2xl font-black text-[#0B1F4D] tracking-tight">
              Info Kampung
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola dan pantau informasi komprehensif profil wilayah kampung.
            </p>
          </div>

          <Link
            href="/pemerintahan/profil_kampung/edit"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#155EEF] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Info Kampung</span>
          </Link>
        </div>

        {/* 3. Unified Card Container (Tab Menyatu dengan Konten Data) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Tab Navigation Header di Dalam Card */}
          <div className="flex items-center gap-2 px-6 pt-6 pb-4 border-b border-slate-100 overflow-x-auto bg-slate-50/50">
            <button
              onClick={() => setActiveTab("identitas")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "identitas"
                  ? "bg-[#155EEF] text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Identitas & Wilayah</span>
            </button>

            <button
              onClick={() => setActiveTab("geografis")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "geografis"
                  ? "bg-[#155EEF] text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Geografis & Peta</span>
            </button>

            <button
              onClick={() => setActiveTab("visi-sejarah")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "visi-sejarah"
                  ? "bg-[#155EEF] text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Visi & Sejarah</span>
            </button>
          </div>

          {/* Body Konten Sesuai Tab Aktif */}
          <div className="p-6 sm:p-8 transition-all duration-300">
            {activeTab === "identitas" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B1F4D]">
                      Identitas Resmi & Wilayah
                    </h3>
                    <p className="text-xs text-slate-500">
                      Rincian administratif wilayah Kampung.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Nama Resmi Kampung
                    </p>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.nama_desa || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Kode Kemendagri
                    </p>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.kode_desa || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Sebutan Wilayah Bawahan
                    </p>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.sebutan_wilayah_bawahan || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Kecamatan
                    </p>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.kecamatan || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Kabupaten
                    </p>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.kabupaten || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Provinsi
                    </p>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.provinsi || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Kode Pos
                    </p>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.kode_pos || "-"}
                    </p>
                  </div>
                  <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Alamat Kantor Desa
                    </p>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.alamat_kantor || "-"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "geografis" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B1F4D]">
                      Geografis & Batas Teritorial
                    </h3>
                    <p className="text-xs text-slate-500">
                      Luas wilayah, titik koordinat, dan batas administratif.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-teal-50/40 border border-teal-100/60 space-y-1">
                    <p className="text-xs font-medium text-teal-700">
                      Luas Wilayah
                    </p>
                    <p className="text-2xl font-extrabold text-[#0B1F4D]">
                      {profil.luas_wilayah_ha ?? 0}{" "}
                      <span className="text-sm font-normal text-slate-500">
                        Ha
                      </span>
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="text-xs font-medium text-slate-500">
                      Latitude (Lintang)
                    </p>
                    <p className="text-lg font-bold text-[#0B1F4D]">
                      {profil.latitude || "-"}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="text-xs font-medium text-slate-500">
                      Longitude (Bujur)
                    </p>
                    <p className="text-lg font-bold text-[#0B1F4D]">
                      {profil.longitude || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      Batas Utara
                    </span>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.batas_utara || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      Batas Selatan
                    </span>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.batas_selatan || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      Batas Barat
                    </span>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.batas_barat || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      Batas Timur
                    </span>
                    <p className="text-sm font-bold text-[#0B1F4D]">
                      {profil.batas_timur || "-"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "visi-sejarah" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B1F4D]">
                      Visi, Misi & Sejarah Kampung
                    </h3>
                    <p className="text-xs text-slate-500">
                      Arah pembangunan dan latar belakang historis kampung.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Visi Kampung
                  </span>
                  <blockquote className="text-base sm:text-lg font-bold text-[#0B1F4D] italic leading-relaxed">
                    &ldquo;{profil.visi || "Belum ditetapkan"}&rdquo;
                  </blockquote>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Misi Kampung
                  </h4>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-[#0B1F4D] whitespace-pre-line leading-relaxed">
                    {profil.misi || "Belum ditetapkan"}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sejarah Kampung
                  </h4>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {profil.sejarah_desa ||
                      "Belum ada catatan sejarah yang diunggah."}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 mr-2">
                    Kanal Resmi:
                  </span>
                  {profil.fb_desa ? (
                    <a
                      href={profil.fb_desa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-all"
                    >
                      Facebook
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Facebook belum diatur
                    </span>
                  )}

                  {profil.ig_desa ? (
                    <a
                      href={profil.ig_desa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 text-xs font-semibold hover:bg-pink-600 hover:text-white transition-all"
                    >
                      Instagram
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Instagram belum diatur
                    </span>
                  )}

                  {profil.yt_desa ? (
                    <a
                      href={profil.yt_desa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 text-xs font-semibold hover:bg-rose-600 hover:text-white transition-all"
                    >
                      YouTube
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      YouTube belum diatur
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
