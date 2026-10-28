import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function WelcomeBanner({ username }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B1F4D] via-[#123B8A] to-[#2563EB] p-6 sm:p-8 md:p-10 text-white shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* Bagian Teks Sambutan */}
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-[#60A5FA] mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Pusat Kendali Administrator
          Sistem
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Selamat Datang,{" "}
          <span className="text-[#60A5FA] capitalize">{username}</span>! 👋
        </h1>
        <p className="text-sm sm:text-base text-[#DCE5F1] mt-2 leading-relaxed">
          Kelola kredensial pengguna, pantau kesehatan infrastruktur database,
          dan tinjau audit keamanan Sistem Informasi Kampung Palahanaeng secara
          terpusat.
        </p>
      </div>

      {/* Bagian Ilustrasi 3D Karakter */}
      <div className="relative z-10 w-full lg:w-auto flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
        <div className="relative w-64 sm:w-72 lg:w-80 h-44 sm:h-48 flex items-center justify-center">
          {/* Efek Lingkaran Glow di Belakang Karakter agar menyatu dengan gradien */}
          <div className="absolute w-40 h-40 bg-[#60A5FA]/20 rounded-full blur-2xl pointer-events-none"></div>

          <Image
            src="/ilustrasi3D.png"
            alt="Ilustrasi Administrator"
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
