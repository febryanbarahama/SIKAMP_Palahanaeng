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

// Helper untuk menerjemahkan string iconName menjadi komponen ikon
const iconMap = {
  ShieldCheck,
  Landmark,
  FileText,
  Globe,
};

export default function ModuleCard({ module, isAllowed }) {
  const IconComponent = iconMap[module.iconName] || FileText;

  if (!isAllowed) {
    return (
      <div
        title="Akun Anda tidak memiliki hak akses ke modul ini"
        className="relative bg-white/60 border border-[#D7E4F5] rounded-2xl p-6 shadow-sm opacity-60 cursor-not-allowed flex flex-col justify-between h-full group"
      >
        <div className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 text-slate-400">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-4">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${module.accentColor} text-white flex items-center justify-center shadow-md`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {module.badgeText}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0B1F4D]">{module.title}</h3>
            <p className="text-xs text-[#5C7192] mt-1.5 leading-relaxed">
              {module.description}
            </p>
          </div>
        </div>
        <div className="pt-4 flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>Akses Ditolak</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={module.href}
      className="group relative bg-white border border-[#D7E4F5] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#2563EB] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full"
    >
      <div className="space-y-4">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${module.accentColor} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                module.id === "sysadmin"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-emerald-50 text-emerald-700"
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

      <div className="pt-6 flex items-center justify-between text-xs font-semibold text-[#2563EB]">
        <span>Buka Modul</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
