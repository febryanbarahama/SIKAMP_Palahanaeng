"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Compass,
  Share2,
  Save,
  ChevronRight,
  Loader2,
} from "lucide-react";

import MediaPanel from "@/components/pemerintahan/profil/info/media-panel";
import IdentityTab from "@/components/pemerintahan/profil/info/identity-tab";
import GeographyTab from "@/components/pemerintahan/profil/info/geography-tab";
import ContactNarrativeTab from "@/components/pemerintahan/profil/info/contact-narrative-tab";

export default function EditInfoKampungPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("identitas");
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    nama_desa: "",
    kode_desa: "",
    sebutan_wilayah_bawahan: "Lindongan",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    kode_pos: "",
    alamat_kantor: "",
    luas_wilayah_ha: "",
    latitude: "",
    longitude: "",
    batas_utara: "",
    batas_selatan: "",
    batas_barat: "",
    batas_timur: "",
    email_desa: "",
    telepon_desa: "",
    fb_desa: "",
    ig_desa: "",
    yt_desa: "",
    visi: "",
    misi: "",
    sejarah_desa: "",
    logo_desa: "",
    foto_kantor: "",
  });

  useEffect(() => {
    async function fetchProfil() {
      try {
        const res = await fetch("/api/pemerintahan/profil/info");
        const json = await res.json();
        if (json.success && json.data) {
          setFormData((prev) => ({ ...prev, ...json.data }));
        }
      } catch (err) {
        console.error("Exception saat mengambil data profil:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/pemerintahan/profil/info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setMessage({
        type: "success",
        text: "Perubahan Info Kampung berhasil disimpan!",
      });

      // Optimasi: Matikan loading, kosongkan pesan, refresh router, lalu pindah halaman
      setTimeout(() => {
        setSaving(false);
        setMessage({ type: "", text: "" }); // Reset pesan sukses agar bersih saat kembali
        router.refresh();
        router.push("/pemerintahan/profil_kampung/info_kampung");
      }, 1000);
    } catch (err) {
      setMessage({ type: "error", text: `Gagal menyimpan: ${err.message}` });
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm font-semibold text-slate-500 animate-pulse">
          Memuat Form Edit Info Kampung...
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-9 py-6">
      <form onSubmit={handleSubmit} className="space-y-6 pb-16">
        {/* Header Form */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 border-b border-slate-200 pb-4">
          <div>
            {/* Breadcrumb Navigation Path */}
            <nav className="flex items-center gap-1.5 text-xs text-[#5C7499] mb-2 overflow-x-auto whitespace-nowrap">
              <Link
                href="/pemerintahan/profil_kampung/info_kampung"
                className="hover:text-[#155EEF] transition-colors"
              >
                Profil Kampung
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <Link
                href="/pemerintahan/profil_kampung/info_kampung"
                className="hover:text-[#155EEF] transition-colors"
              >
                Info Kampung
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-[#155EEF] font-bold">
                Edit Info Kampung
              </span>
            </nav>
            <h1 className="text-2xl mt-5 font-black text-[#0B1F4D] tracking-tight">
              Edit Info Kampung
            </h1>
            <p className="text-xs text-slate-500">
              Perbarui data identitas resmi, wilayah, geografis, serta narasi
              profil kampung.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/pemerintahan/profil_kampung/info_kampung"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
            >
              Kembali
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#155EEF] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{saving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-2xl text-xs font-semibold ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}
          >
            {message.text}
          </div>
        )}

        {/* Grid Layout Dua Kolom (4 Kolom Media, 8 Kolom Form Utama) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Kolom Kiri: Panel Media */}
          <div className="lg:col-span-4">
            <MediaPanel formData={formData} setFormData={setFormData} />
          </div>

          {/* Kolom Kanan: Form Tab */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              {/* Header Tab Navigation */}
              <div className="flex items-center gap-2 px-6 pt-6 pb-4 border-b border-slate-100 overflow-x-auto bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setActiveTab("identitas")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    activeTab === "identitas"
                      ? "bg-[#155EEF] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>1. Identitas & Wilayah</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("geografis")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    activeTab === "geografis"
                      ? "bg-[#155EEF] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>2. Geografis & Batas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("narasi")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    activeTab === "narasi"
                      ? "bg-[#155EEF] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>3. Narasi</span>
                </button>
              </div>

              {/* Content Body Berdasarkan Tab Active */}
              <div className="p-6 sm:p-8">
                {activeTab === "identitas" && (
                  <IdentityTab
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === "geografis" && (
                  <GeographyTab
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === "narasi" && (
                  <ContactNarrativeTab
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
