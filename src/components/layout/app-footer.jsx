"use client";

import { DynamicYear } from "../dynamic-year";
import { LogOut, MapPin } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="w-full pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#061A43] via-[#0B1F4D] to-[#123B8A] border-b border-[#123B8A]/80 shadow-md rounded-full py-3.5 px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-8 h-8 rounded-full bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center shrink-0 border border-[#2563EB]/25">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white">Kampung Palahanaeng</p>
            <p className="text-[11px] text-slate-200">
              Kecamatan Tabukan Tengah, Kabupaten Kepulauan Sangihe
            </p>
          </div>
        </div>

        <div className="hidden md:block h-5 w-[1px] bg-slate-300/80"></div>

        <div className="text-center">
          <p className="font-bold text-white">Sistem Informasi Kampung</p>
          <p className="text-[11px] text-[#38A5F5] font-semibold">
            SIKAMP v1.0.0
          </p>
        </div>

        <div className="hidden md:block h-5 w-[1px] bg-slate-300/80"></div>

        <div className="text-[11px] text-white font-medium text-center md:text-right">
          <DynamicYear />
        </div>
      </div>
    </footer>
  );
}
