"use client";

import { useState } from "react";
import AppSidebar from "@/components/layout/app-sidebar";
import AppTopbar from "@/components/layout/app-topbar";
import { handleLogout } from "@/app/(auth)/actions";

export default function AppShell({
  initialUser,
  navItems = [],
  brandTitle = "SID",
  brandSubtitle = "Palahanaeng",
  topbarTitle = "Sistem Informasi Desa",
  topbarDescription = "Pusat Kendali Layanan Kampung",
  children,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const username = initialUser?.username || "Perangkat Desa";
  const roleName = initialUser?.roleName || initialUser?.namaRole || "Pengguna";

  return (
    <div className="min-h-screen bg-[#EAF3FF] flex overflow-hidden">
      <AppSidebar
        isCollapsed={isCollapsed}
        onToggle={toggleSidebar}
        navItems={navItems}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
        userName={username}
        userRole={roleName}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <AppTopbar
          title={topbarTitle}
          description={topbarDescription}
          onToggleSidebar={toggleSidebar}
          userName={username}
          userRole={roleName}
          moduleLink="/"
          moduleLabel="Ke Halaman Modul"
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
