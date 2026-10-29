"use client";

import { useState } from "react";
import { LayoutDashboard, Users, Activity, FileText } from "lucide-react";
import AppSidebar from "@/components/layout/app-sidebar";
import AppTopbar from "@/components/layout/app-topbar";
import { handleLogout } from "@/app/(auth)/actions"; // Sesuaikan jalur impor actions kamu jika berbeda

const sysadminNav = [
  { name: "Dashboard", href: "/sysadmin", icon: LayoutDashboard },
  {
    name: "Manajemen Pengguna",
    href: "/sysadmin/manajemen-users",
    icon: Users,
  },
  { name: "Monitoring System", href: "/sysadmin/monitoring", icon: Activity },
  { name: "Log Aktivitas", href: "/sysadmin/logs", icon: FileText },
];

export default function SysadminShell({ initialAdmin, children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      <AppSidebar
        isCollapsed={isCollapsed}
        onToggle={toggleSidebar}
        navItems={sysadminNav}
        brandTitle="Panel Admin"
        brandSubtitle="SID Palahanaeng"
        userName={initialAdmin.username}
        userRole={initialAdmin.roleName}
        onLogout={handleLogout} // Opsional: jika sidebar juga ingin mendukung tombol logout
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <AppTopbar
          title="Panel Admin"
          description="Pusat kendali akun pengguna dan pemantauan infrastruktur sistem"
          onToggleSidebar={toggleSidebar}
          userName={initialAdmin.username}
          userRole={initialAdmin.roleName}
          moduleLink="/"
          moduleLabel="Ke Halaman Modul"
          onLogout={handleLogout} // Meneruskan fungsi handleLogout ke AppTopbar
        />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
