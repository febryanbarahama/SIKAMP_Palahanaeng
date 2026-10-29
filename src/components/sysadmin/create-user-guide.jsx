import { BookOpen, User, KeyRound, ShieldCheck, UserX } from "lucide-react";

export default function CreateUserGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#DCE5F1] shadow-sm overflow-hidden">
        {/* Header Panel dengan Background Gradien & Ikon Buku */}
        <div className="p-5 bg-gradient-to-r from-[#1D4ED8] to-[#25A4FF] text-white flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/15 backdrop-blur-sm">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Panduan Singkat</h3>
            <p className="text-[11px] text-blue-100">
              Ketentuan pembuatan kredensial sistem
            </p>
          </div>
        </div>

        {/* Daftar Item Panduan dengan Ikon Visual */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0 mt-0.5">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B1F4D]">Username</h4>
              <p className="text-xs text-[#5C7499] mt-0.5 leading-relaxed">
                Gunakan nama yang mudah dikenali dan belum digunakan akun lain.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-[#059669] shrink-0 mt-0.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B1F4D]">Password</h4>
              <p className="text-xs text-[#5C7499] mt-0.5 leading-relaxed">
                Gunakan password awal yang kuat; simpan hanya sebagai hash
                bcrypt di server dan jangan mencatat password ke log.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-amber-50 text-[#D97706] shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B1F4D]">Role</h4>
              <p className="text-xs text-[#5C7499] mt-0.5 leading-relaxed">
                Role menentukan akses dan tanggung jawab pengguna di dalam
                sistem.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-rose-50 text-[#DC2626] shrink-0 mt-0.5">
              <UserX className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B1F4D]">Status</h4>
              <p className="text-xs text-[#5C7499] mt-0.5 leading-relaxed">
                Akun nonaktif tidak boleh memperoleh akses login ke dalam
                sistem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
