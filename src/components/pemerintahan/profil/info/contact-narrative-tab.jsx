"use client";

export default function ContactNarrativeTab({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5 pt-2">
        <label className="text-xs font-bold text-slate-700">Visi Kampung</label>
        <textarea
          name="visi"
          rows={2}
          value={formData.visi}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Misi Kampung</label>
        <textarea
          name="misi"
          rows={4}
          value={formData.misi}
          onChange={handleChange}
          placeholder="Tuliskan misi kampung (gunakan baris baru untuk setiap poin)"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">
          Sejarah Kampung
        </label>
        <textarea
          name="sejarah_desa"
          rows={5}
          value={formData.sejarah_desa}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
        />
      </div>
    </div>
  );
}
