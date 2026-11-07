"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LogOut,
  AlertTriangle,
  LayoutDashboard,
  Users,
  Building2,
  Activity,
  FileText,
  Globe,
  Landmark,
  Wallet,
  HardHat,
} from "lucide-react";
import { handleLogout } from "@/app/(auth)/actions";

// Mapping string ikon dari server/layout ke komponen Lucide React yang sah
const iconMap = {
  LayoutDashboard,
  Users,
  Building2,
  Activity,
  FileText,
  Globe,
  Landmark,
  Wallet,
  HardHat,
};

export default function AppSidebar({
  isCollapsed,
  onToggle,
  navItems = [],
  userRole,
  userName,
}) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavClick = (e, href) => {
    // Jika sidebar sedang tertutup (icon-only), klik pertama hanya membuka sidebar
    if (isCollapsed) {
      e.preventDefault();
      if (onToggle) onToggle();
    }
  };

  return (
    <>
      <aside
        className={`sidebar-gradient text-white flex flex-col h-screen sticky top-0 border-r border-[#123B8A]/80 transition-all duration-300 ease-in-out z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand / Logo Section */}
        <div className="p-5 border-b border-[#123B8A]/60 flex items-center gap-3 overflow-hidden shrink-0">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-surface/10 flex items-center justify-center border border-white/10 shadow-md overflow-hidden">
            <img
              src="/logo.png"
              alt="Logo SID"
              className="w-7 h-7 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<span class="text-xs font-bold text-white">SP</span>';
              }}
            />
          </div>
          <div
            className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
              isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            }`}
          >
            <h1 className="text-[10px] font-semibold uppercase tracking-wider text-blue-300">
              SIKAMP Palahanaeng
            </h1>
            <p className="text-[10px] font-bold text-white">
              Sistem Informasi Kampung
            </p>
          </div>
        </div>

        {/* Navigation Menu dengan Custom Sleek Scrollbar */}
        <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent hover:scrollbar-thumb-blue-400/50">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-semibold tracking-wider text-blue-400 uppercase mb-2">
              Menu Utama
            </p>
          )}
          {navItems.map((item) => {
            // Ambil komponen ikon berdasarkan string iconName, fallback ke FileText jika tidak ditemukan
            const IconComponent = iconMap[item.iconName] || FileText;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? "bg-gradient text-white shadow-lg shadow-blue-950/40"
                    : "text-blue-100/70 hover:bg-[#123B8A]/60 hover:text-white"
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-blue-300 group-hover:text-white"}`}
                />
                <span
                  className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                    isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footer / User Identity & Logout Card */}
        <div className="p-3 border-t border-[#123B8A]/60 bg-[#07132e]/50 shrink-0">
          <div className="bg-[#123B8A]/40 border border-[#123B8A] rounded-xl p-3 flex items-center justify-between gap-3 overflow-hidden shadow-inner">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 shrink-0 rounded-full bg-primary-blue/30 text-blue-200 flex items-center justify-center font-bold text-xs border border-blue-400/30 shadow-inner">
                {userName ? userName.substring(0, 2).toUpperCase() : "US"}
              </div>
              <div
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                  isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                }`}
              >
                <p className="text-xs font-semibold text-white truncate">
                  {userName || "Pengguna"}
                </p>
                <p className="text-[10px] text-blue-300 truncate">
                  {userRole || "Role"}
                </p>
              </div>
            </div>

            {/* Tombol Pemicu Modal Logout */}
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              title="Keluar / Logout"
              className="p-2 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500 hover:text-white transition-all duration-200 border border-rose-500/20 shrink-0 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal Validasi / Konfirmasi Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#DCE5F1] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-[#0B1F4D]">
                Konfirmasi Keluar Sistem
              </h3>
              <p className="text-xs text-[#5C7499] leading-relaxed">
                Apakah Anda yakin ingin keluar dari sesi ini? Anda perlu masuk
                kembali untuk mengakses panel sistem.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#DCE5F1] text-xs font-semibold text-[#5C7499] hover:bg-slate-50 transition-all cursor-pointer"
              >
                Batal
              </button>

              <form action={handleLogout} className="flex-1">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Ya, Keluar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
