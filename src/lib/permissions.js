export const MODULES_CONFIG = [
  {
    id: "sysadmin",
    title: "Pusat Kendali Sysadmin",
    description:
      "Pengelolaan akun pengguna, monitoring infrastruktur Vercel & Supabase, serta audit trail keamanan sistem.",
    href: "/sysadmin",
    iconName: "ShieldCheck",
    accentColor: "from-[#0B1F4D] to-[#2563EB]",
    badgeText: "Super Admin Only",
    // Hanya Super Admin yang berhak
    requiredRoles: ["Super Admin"],
  },
  {
    id: "pemerintahan",
    title: "Administrasi & Pemerintahan",
    description:
      "Pengelolaan profil kepegawaian perangkat kampung, data kependudukan, dan struktur wilayah kampung.",
    href: "/pemerintahan",
    iconName: "Landmark",
    accentColor: "from-[#047C73] to-[#2DD4BF]",
    badgeText: "Akses Terbatas",
    // Terbuka untuk Super Admin, Kapitalaung, dan Sekretaris
    requiredRoles: [
      "Super Admin",
      "Kapitalaung",
      "Sekretaris Kampung",
      "Sekretaris",
    ],
  },
  {
    id: "layanan",
    title: "Layanan Surat & Administrasi",
    description:
      "Pembuatan, pengajuan, dan penerbitan surat-menyurat resmi untuk kebutuhan warga kampung.",
    href: "/layanan",
    iconName: "FileText",
    accentColor: "from-[#1D4ED8] to-[#60A5FA]",
    badgeText: "Akses Tersedia",
    // Terbuka untuk Super Admin, Kapitalaung, Sekretaris, dan Kaur Umum
    requiredRoles: [
      "Super Admin",
      "Kapitalaung",
      "Sekretaris Kampung",
      "Sekretaris",
      "Kaur Umum",
    ],
  },
  {
    id: "admin-web",
    title: "Admin Web Publik",
    description:
      "Pengelolaan berita, pengumuman, galeri kegiatan, dan transparansi informasi publik.",
    href: "/admin-web",
    iconName: "Globe",
    accentColor: "from-[#D97706] to-[#FBBF24]",
    badgeText: "Akses Tersedia",
    // Terbuka untuk Super Admin, Operator Web, Kader Digital, dan Kaur Umum
    requiredRoles: [
      "Super Admin",
      "Operator Web",
      "Kader Digital",
      "Kaur Umum",
    ],
  },
];
