"use client";

import Link from "next/link";
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Landmark,
  FileText,
  Globe,
} from "lucide-react";

const iconMap = {
  ShieldCheck,
  Landmark,
  FileText,
  Globe,
};

export default function ModuleCard({ module, isAllowed }) {
  const IconComponent = iconMap[module.iconName] || FileText;

  // Visual State saat Akses Ditolak (Locked/Disabled Card UI)[cite: 1]
  if (!isAllowed) {
    return (
      <div
        title="Akun Anda tidak memiliki hak akses ke modul ini"
        className="relative bg-slate-100/70 border border-slate-200/80 rounded-2xl p-6 shadow-none flex flex-col justify-between h-full select-none opacity-75 transition-all"
      >
        {/* Badge Gembok Terkunci */}
        <div className="absolute top-6 right-6 p-2 rounded-xl bg-slate-200/80 text-slate-400 border border-slate-300/50">
          <Lock className="w-4 h-4" />
        </div>

        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-300 text-slate-500 flex items-center justify-center shadow-inner">
            <IconComponent className="w-6 h-6 grayscale" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-500">
                Akses Dibatasi
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-600">{module.title}</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {module.description}
            </p>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-between text-xs font-semibold text-slate-400 border-t border-slate-200/60 mt-4">
          <span className="text-[11px] italic">
            Peran akun Anda tidak memiliki izin ke modul ini
          </span>
          <Lock className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }

  // Visual State saat Akses Diizinkan (Active Card UI)[cite: 1]
  return (
    <Link
      href={module.href}
      className="group relative bg-white border border-[#D7E4F5] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#2563EB] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div className="space-y-4">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${module.accentColor} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                module.id === "sysadmin"
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
              }`}
            >
              {module.badgeText}
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#0B1F4D] group-hover:text-[#2563EB] transition-colors">
            {module.title}
          </h3>
          <p className="text-xs text-[#5C7192] mt-1.5 leading-relaxed">
            {module.description}
          </p>
        </div>
      </div>

      <div className="pt-6 flex items-center justify-between text-xs font-semibold text-[#2563EB] border-t border-slate-100 mt-4">
        <span>Buka Modul</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
}
