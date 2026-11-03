export const MODULES_CONFIG = [
  {
    id: "sysadmin",
    title: "Pusat Kendali Sysadmin",
    description:
      "Pengelolaan akun pengguna, monitoring infrastruktur Vercel & Supabase, serta audit trail keamanan sistem.",
    href: "/sysadmin",
    iconName: "ShieldCheck", // Menggunakan string
    accentColor: "from-[#0B1F4D] to-[#2563EB]",
    badgeText: "Super Admin Only",
    requiredRoles: ["Super Admin"],
  },
  {
    id: "pemerintahan",
    title: "Administrasi & Pemerintahan",
    description:
      "Pengelolaan profil kepegawaian perangkat kampung, data kependudukan, dan struktur wilayah kampung.",
    href: "/pemerintahan",
    iconName: "Landmark", // Menggunakan string
    accentColor: "from-[#047C73] to-[#2DD4BF]",
    badgeText: "Akses Tersedia",
    requiredRoles: ["Super Admin", "Kapitalaung", "Sekretaris"],
  },
  {
    id: "layanan",
    title: "Layanan Surat & Administrasi",
    description:
      "Pembuatan, pengajuan, dan penerbitan surat-menyurat resmi untuk kebutuhan warga kampung.",
    href: "/layanan",
    iconName: "FileText", // Menggunakan string
    accentColor: "from-[#1D4ED8] to-[#60A5FA]",
    badgeText: "Akses Tersedia",
    requiredRoles: ["Super Admin", "Kapitalaung", "Sekretaris", "Kaur Umum"],
  },
  {
    id: "admin-web",
    title: "Admin Web Publik",
    description:
      "Pengelolaan berita, pengumuman, galeri kegiatan, dan transparansi informasi publik.",
    href: "/admin-web",
    iconName: "Globe", // Menggunakan string
    accentColor: "from-[#D97706] to-[#FBBF24]",
    badgeText: "Akses Tersedia",
    requiredRoles: ["Super Admin", "Operator Web"],
  },
];
