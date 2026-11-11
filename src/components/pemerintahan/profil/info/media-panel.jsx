"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

export default function MediaPanel({ formData, setFormData }) {
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFoto, setUploadingFoto] = useState(false);

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isLogo = fieldName === "logo_desa";
    if (isLogo) setUploadingLogo(true);
    else setUploadingFoto(true);

    try {
      const dataForm = new FormData();
      dataForm.append("file", file);
      dataForm.append("fieldName", fieldName);

      const res = await fetch("/api/pemerintahan/profil/upload", {
        method: "POST",
        body: dataForm,
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      // Perbarui state form dengan URL publik hasil upload dari server
      setFormData((prev) => ({ ...prev, [fieldName]: json.url }));
    } catch (err) {
      console.error(`Gagal mengunggah ${fieldName}:`, err.message);
      alert(`Gagal mengunggah gambar: ${err.message}`);
    } finally {
      if (isLogo) setUploadingLogo(false);
      else setUploadingFoto(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
      <h3 className="text-sm font-bold text-[#0B1F4D] uppercase tracking-wider border-b border-slate-100 pb-3">
        Media & Aset Visual
      </h3>

      {/* Logo Desa */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">
          Logo Resmi Kampung / Daerah
        </label>
        <div className="flex items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all relative group">
          <input
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={(e) => handleFileUpload(e, "logo_desa")}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            disabled={uploadingLogo}
          />
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-sm relative overflow-hidden">
              {uploadingLogo ? (
                <Loader2 className="w-6 h-6 text-[#155EEF] animate-spin" />
              ) : (
                <img
                  src={formData.logo_desa || "/logo.png"}
                  alt="Preview Logo"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#155EEF]">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingLogo ? "Mengunggah..." : "Pilih File Logo"}</span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              PNG/SVG, Maks 2MB
            </span>
          </div>
        </div>
      </div>

      {/* Foto Kantor */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">
          Foto Kantor Kampung
        </label>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 aspect-video relative group">
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => handleFileUpload(e, "foto_kantor")}
            className="absolute inset-0 opacity-0 cursor-pointer z-20"
            disabled={uploadingFoto}
          />
          {uploadingFoto && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
              <Loader2 className="w-6 h-6 text-[#155EEF] animate-spin" />
            </div>
          )}
          <img
            src={formData.foto_kantor || "/ilustrasi_sysadmin.png"}
            alt="Preview Kantor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold z-0">
            <Upload className="w-4 h-4" />
            <span>Ganti Foto Kantor</span>
          </div>
        </div>
        <span className="text-[10px] text-slate-400 block">
          Format JPG/PNG landscape untuk Hero Banner.
        </span>
      </div>
    </div>
  );
}
