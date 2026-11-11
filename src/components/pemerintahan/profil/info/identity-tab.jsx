"use client";

export default function IdentityTab({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Nama Resmi Kampung
          </label>
          <input
            type="text"
            name="nama_desa"
            value={formData.nama_desa}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Kode Kemendagri / Desa
          </label>
          <input
            type="text"
            name="kode_desa"
            value={formData.kode_desa}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Sebutan Wilayah Bawahan
          </label>
          <select
            name="sebutan_wilayah_bawahan"
            value={formData.sebutan_wilayah_bawahan}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF] bg-white"
          >
            <option value="Lindongan">Lindongan[cite: 1]</option>
            <option value="Dusun">Dusun</option>
            <option value="Kampung">Kampung</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Kecamatan</label>
          <input
            type="text"
            name="kecamatan"
            value={formData.kecamatan}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Kabupaten</label>
          <input
            type="text"
            name="kabupaten"
            value={formData.kabupaten}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Provinsi</label>
          <input
            type="text"
            name="provinsi"
            value={formData.provinsi}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Kode Pos</label>
          <input
            type="text"
            name="kode_pos"
            value={formData.kode_pos}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Telepon / WhatsApp
          </label>
          <input
            type="text"
            name="telepon_desa"
            value={formData.telepon_desa}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            URL Facebook
          </label>
          <input
            type="url"
            name="fb_desa"
            value={formData.fb_desa}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            URL Instagram
          </label>
          <input
            type="url"
            name="ig_desa"
            value={formData.ig_desa}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Email Resmi Desa
          </label>
          <input
            type="email"
            name="email_desa"
            value={formData.email_desa}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />

          <label className="text-xs font-bold text-slate-700">
            URL YouTube
          </label>
          <input
            type="url"
            name="yt_desa"
            value={formData.yt_desa}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#155EEF]"
          />
        </div>
      </div>
    </div>
  );
}
