"use client";

import { LogOut, ExternalLink, Bell, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppTopbar({
  title,
  description,
  onToggleSidebar,
  userName,
  userRole,
  moduleLink = "/",
  moduleLabel = "Ke Halaman Modul",
  onLogout,
}) {
  const handleLogout = async () => {
    document.cookie = "sid_session=; Max-Age=0; path=/;";
    window.location.href = "/login";
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="h-20 bg-surface border-b border-border px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-4">
        {/* Tombol Collapse / Buka Sidebar */}
        <button
          onClick={onToggleSidebar}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-text hover:bg-background transition-colors cursor-pointer"
          title="Sembunyikan/Tampilkan Sidebar"
        >
          <Menu className="w-5 h-5 text-navy" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-navy">{title}</h2>
          {description && (
            <p className="text-xs text-muted-text mt-0.5">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Switcher Modul */}
        <a
          href={moduleLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium bg-secondary text-deep-blue hover:bg-secondary/80 transition-colors border border-border"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{moduleLabel}</span>
        </a>

        {/* Notifikasi */}
        <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-text hover:bg-background transition-colors relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger"></span>
        </button>

        <div className="h-6 w-[1px] bg-border hidden sm:block"></div>

        {/* Identitas Akun Aktif & Menu Akun (Dropdown) */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none bg-transparent border-none p-0 cursor-pointer">
            <div className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-background transition-colors outline-none select-none">
              <div className="w-9 h-9 rounded-full bg-gradient text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {initials}
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-navy">
                    {userName}
                  </span>
                </div>
                {/* Indikator Bulatan Hijau Status Aktif */}
                <span className="text-[10px] text-muted-text flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
                  Aktif / Online
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 p-2 bg-surface border-border shadow-md"
          >
            <div className="px-2 py-1.5 flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-navy">
                {userName}
              </p>
              <p className="text-xs leading-none text-muted-text">
                Role: {userRole}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => window.open(moduleLink, "_blank")}
              className="w-full cursor-pointer flex items-center gap-2 text-xs text-deep-blue p-2.5 rounded-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{moduleLabel}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Tombol Logout dengan Teks Danger dan Hover Latar Merah Lembut */}
            <DropdownMenuItem
              onClick={onLogout}
              className="text-danger hover:text-danger focus:text-danger hover:bg-red-100 focus:bg-red-100 cursor-pointer flex items-center gap-2 text-xs font-medium transition-colors rounded-md p-2.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Sistem</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
