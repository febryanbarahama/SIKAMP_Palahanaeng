import { cookies } from "next/headers";
import { connection } from "next/server";
import AppShell from "@/components/layout/app-shell";

export const instant = false;

export const metadata = {
  title: "Dashboard | SIKAMP Palahanaeng",
  description:
    "Sistem Informasi Kampung Palahanaeng | Manajemen Pengguna & Monitoring Sistem",
};

// Daftar Navigasi Khusus Sysadmin menggunakan string iconName
const sysadminNav = [
  { name: "Dashboard", href: "/sysadmin", iconName: "LayoutDashboard" },
  {
    name: "Manajemen Pengguna",
    href: "/sysadmin/manajemen-users",
    iconName: "Users",
  },
  {
    name: "Monitoring System",
    href: "/sysadmin/monitoring-sistem",
    iconName: "Activity",
  },
  { name: "Log Aktivitas", href: "/sysadmin/logs", iconName: "FileText" },
];

export default async function SysadminLayout({ children }) {
  await connection();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sid_session")?.value;

  let adminData = {
    username: "Super Admin",
    roleName: "Super Admin",
  };

  if (sessionCookie) {
    try {
      // Parsing data JSON yang disimpan dari action.js
      const parsedSession = JSON.parse(sessionCookie);
      if (parsedSession) {
        adminData = {
          username: parsedSession.username || "Super Admin",
          roleName:
            parsedSession.namaRole || parsedSession.role || "Super Admin",
        };
      }
    } catch (e) {
      console.error("Gagal parsing session cookie:", e);
    }
  }

  return (
    <AppShell
      initialUser={adminData}
      navItems={sysadminNav}
      brandTitle="Panel Admin"
      brandSubtitle="SID Palahanaeng"
      topbarTitle="Modul Sistem Admin"
      topbarDescription="Pusat kendali akun pengguna dan pemantauan infrastruktur sistem"
    >
      {children}
    </AppShell>
  );
}
