import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MODULES_CONFIG } from "@/lib/permissions";
import ModuleCard from "@/components/swithcer/module-card";
import { LogOut, MapPin } from "lucide-react";
import { handleLogout } from "@/app/(auth)/actions";
import { DynamicYear } from "@/components/dynamic-year";
import LogoutButton from "@/components/logout-button";

// Mengizinkan rute blocking untuk pembacaan cookies di server
export const instant = false;

export default async function ModuleSwitcherPage() {
  // 1. Panggil cookies() setelah konfigurasi instant = false
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sid_session");

  // Jika cookie sid_session tidak ada, redirect ke login
  if (!sessionCookie || !sessionCookie.value) {
    redirect("/login");
  }

  let userSession = {
    username: "Perangkat Desa",
    role: "Super Admin",
    avatarUrl: null,
  };

  try {
    const parsedData = JSON.parse(sessionCookie.value);
    userSession = { ...userSession, ...parsedData };
  } catch (e) {
    console.error("Gagal parsing cookie sid_session:", e);
  }

  const userRole = userSession?.role || "Super Admin";
  const userName = userSession?.username || "Perangkat Desa";
  const userAvatar = userSession?.avatarUrl;

  const checkAccess = (module) => {
    if (userRole === "Super Admin") return true;
    return module.requiredRoles.includes(userRole);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EAF3FF]">
      {/* 1. Header / Topbar dengan Gradasi Navy & Logo Gambar */}
      <header className="h-20 bg-gradient-to-r from-[#061A43] via-[#0B1F4D] to-[#123B8A] border-b border-[#123B8A]/80 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-md overflow-hidden">
            <img
              src="/logo.png"
              alt="Logo SIKAMP"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <h1 className="text-[10px] font-semibold uppercase tracking-wider text-[#38A5F5]">
              SIKAMP Palahanaeng
            </h1>
            <p className="text-xs font-bold text-white">
              Sistem Informasi Kampung
            </p>
          </div>
        </div>

        {/* Bagian Kanan Header: Profil & Logout Berbalut Efek Glass Transparan */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#38A5F5] text-white flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden border border-white/20">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                userName.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-tight">
                {userName}
              </p>
              <p className="text-[10px] text-[#38A5F5] leading-tight mt-0.5">
                {userRole}
              </p>
            </div>
          </div>

          {/* Menggunakan Komponen Logout dengan Modal Validasi */}
          <LogoutButton />
        </div>
      </header>

      {/* 2. Hero Section Full Width dengan Background Gambar & Bagian Bawah Ber-rounded */}
      <div className="relative w-full rounded-b-[36px] overflow-hidden bg-[#0B1F4D] shadow-xl border-b border-[#D7E4F5]/30 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-14 min-h-[320px]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105"
          style={{ backgroundImage: `url('/bg-login.png')` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#061A43]/60 via-[#0B1F4D]/50 to-[#0B1F4D]/5 z-10"></div>

        <div className="relative z-20 max-w-3xl space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#2563EB]/30 backdrop-blur-sm text-[#38A5F5] text-xs font-semibold tracking-wide border border-[#38A5F5]/40 shadow-sm">
            Pusat Navigasi Utama
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Selamat Datang {"   "}
            <span className="text-[#60A5FA] capitalize">{userName} </span> ! 👋
            <br />
            di Sistem Informasi Kampung Palahanaeng
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#EAF3FF]/90 leading-relaxed font-medium">
            Silakan pilih modul kerja yang ingin Anda akses sesuai dengan
            kewenangan akun Anda.
          </p>
        </div>
      </div>

      {/* Main Container untuk Grid Kartu */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-base font-bold text-[#0B1F4D]">
              Daftar Modul Tersedia
            </h3>
            <span className="text-xs text-[#5C7192] font-medium">
              Hak akses disesuaikan dengan profil akun Anda
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODULES_CONFIG.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isAllowed={checkAccess(module)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 4. Footer dengan Efek Glass Gray, Rounded Full, & Pemisah Vertikal */}
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
            <p className="text-[11px] text-[#2563EB] font-semibold">
              SIKAMP v1.0.0
            </p>
          </div>

          <div className="hidden md:block h-5 w-[1px] bg-slate-300/80"></div>

          <div className="text-[11px] text-white font-medium text-center md:text-right">
            <DynamicYear />
          </div>
        </div>
      </footer>
    </div>
  );
}
