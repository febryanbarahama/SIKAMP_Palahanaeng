import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function WelcomeBanner({
  username = "Pengguna",
  badgeText = "Sistem Informasi Desa",
  description = "Kelola data, layanan, dan informasi kampung secara terpusat melalui panel modul ini.",
  imageSrc = "/ilustrasi_sysadmin.png", // Bisa diganti sesuai modul
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B1F4D] via-[#123B8A] to-[#2563EB] p-6 sm:p-8 md:p-10 text-white shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* Bagian Teks Sambutan */}
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-[#60A5FA] mb-3">
          <Sparkles className="w-3.5 h-3.5" /> {badgeText}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Selamat Datang,{" "}
          <span className="text-[#60A5FA] capitalize">{username}</span>! 👋
        </h1>
        <p className="text-sm sm:text-base text-[#DCE5F1] mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bagian Ilustrasi Karakter */}
      <div className="relative z-10 w-full lg:w-auto flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
        <div className="relative w-64 sm:w-72 lg:w-80 h-44 sm:h-48 flex items-center justify-center">
          {/* Efek Lingkaran Glow */}
          <div className="absolute w-40 h-40 bg-[#60A5FA]/20 rounded-full blur-2xl pointer-events-none"></div>

          <Image
            src={imageSrc}
            alt="Ilustrasi Modul SID"
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      </div>

      {/* Elemen Cahaya Dekoratif Latar Belakang */}
      <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute right-32 -top-10 w-40 h-40 bg-[#60A5FA]/10 rounded-full blur-xl pointer-events-none"></div>
    </div>
  );
}
