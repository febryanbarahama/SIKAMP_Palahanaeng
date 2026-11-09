import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/app-shell";

// Mengizinkan rute blocking untuk pembacaan cookies di server layout
export const instant = false;

const pemerintahanNav = [
  {
    name: "Dashboard",
    href: "/pemerintahan",
    iconName: "LayoutDashboard",
  },
  {
    name: "Profil Kampung",
    href: "/pemerintahan/profil", // Bisa jadi parent link atau path utama
    iconName: "Landmark",
    children: [
      {
        name: "Info Kampung",
        href: "/pemerintahan/profil_kampung/info_kampung",
      },
      {
        name: "Pemerintahan Kampung",
        href: "/pemerintahan/pemerintahan-kampung",
      },
      { name: "Wilayah Administrasi", href: "/pemerintahan/wilayah" },
    ],
  },
  {
    name: "Kependudukan",
    href: "/pemerintahan/kependudukan",
    iconName: "Users",
  },
  {
    name: "Hukum & Regulasi",
    href: "/pemerintahan/hukum",
    iconName: "FileText",
  },
  {
    name: "Keuangan",
    href: "/pemerintahan/keuangan",
    iconName: "Wallet",
  },
  {
    name: "Pembangunan",
    href: "/pemerintahan/pembangunan",
    iconName: "HardHat",
  },
  {
    name: "Kelembagaan",
    href: "/pemerintahan/kelembagaan",
    iconName: "Users",
  },
];

export default async function PemerintahanLayout({ children }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sid_session");

  if (!sessionCookie || !sessionCookie.value) {
    redirect("/login");
  }

  let userSession = {};
  try {
    userSession = JSON.parse(sessionCookie.value);
  } catch (e) {
    redirect("/login");
  }

  const role = userSession?.namaRole || userSession?.role;
  const isSuperAdmin = userSession?.roleId === 1 || role === "Super Admin";
  const allowedRoles = [
    "Super Admin",
    "Kapitalaung",
    "Sekretaris Kampung",
    "Sekretaris",
  ];

  if (!isSuperAdmin && !allowedRoles.includes(role)) {
    redirect("/");
  }

  return (
    <AppShell
      initialUser={{
        username: userSession.username,
        roleName: role,
      }}
      navItems={pemerintahanNav}
      brandTitle="Pemerintahan"
      brandSubtitle="Kampung Palahanaeng"
      topbarTitle="Modul Administrasi & Pemerintahan"
      topbarDescription="Pengelolaan profil aparat desa, kependudukan, dan struktur wilayah"
    >
      {children}
    </AppShell>
  );
}
