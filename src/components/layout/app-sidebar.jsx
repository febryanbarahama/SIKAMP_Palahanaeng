"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar({
  isCollapsed,
  onToggle,
  navItems = [],
  userRole = "Operator",
  userName = "Administrator",
}) {
  const pathname = usePathname();

  const handleNavClick = (e, href) => {
    // Jika sidebar sedang tertutup (icon-only), klik pertama hanya membuka sidebar
    if (isCollapsed) {
      e.preventDefault();
      if (onToggle) onToggle();
    }
  };

  return (
    <aside
      className={`sidebar-gradient text-white flex flex-col h-screen sticky top-0 border-r border-[#123B8A]/80 transition-all duration-300 ease-in-out z-30 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand / Logo Section */}
      <div className="p-5 border-b border-[#123B8A]/60 flex items-center gap-3 overflow-hidden">
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

      {/* Navigation Menu */}
      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <p className="px-3 text-[10px] font-semibold tracking-wider text-blue-400 uppercase mb-2">
            Menu Utama
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
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
              <Icon
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

      {/* Footer / User Identity */}
      <div className="p-4 border-t border-[#123B8A]/60 bg-[#07132e]/50 flex items-center gap-3 overflow-hidden">
        <div className="w-9 h-9 shrink-0 rounded-full bg-primary-blue/30 text-blue-200 flex items-center justify-center font-bold text-xs border border-blue-400/30 shadow-inner">
          {userName.substring(0, 2).toUpperCase()}
        </div>
        <div
          className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
            isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
          }`}
        >
          <p className="text-xs font-semibold text-white truncate">
            {userName}
          </p>
          <p className="text-[10px] text-blue-300 truncate">{userRole}</p>
        </div>
      </div>
    </aside>
  );
}
