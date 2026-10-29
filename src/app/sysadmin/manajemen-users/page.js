import { Suspense } from "react";
import {
  UserPlus,
  Search,
  Users,
  UserCheck,
  UserX,
  Shield,
} from "lucide-react";
import Link from "next/link";

import { getUsersManagementData } from "@/service/sysadminService";
import StatCard from "@/components/sysadmin/stat-card";
import UsersTable from "@/components/sysadmin/users-table";

function UsersLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-slate-200 rounded-lg"></div>
        <div className="h-10 w-36 bg-slate-200 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>
        ))}
      </div>
      <div className="h-96 bg-slate-200 rounded-xl"></div>
    </div>
  );
}

async function UsersContent() {
  // Menggunakan fungsi service yang reusable
  const {
    usersList,
    totalUsers,
    activeUsers,
    inactiveUsers,
    roleDistribution,
  } = await getUsersManagementData();

  return (
    <div className="space-y-6">
      {/* Header Halaman & Tombol Tambah */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F4D]">
            Manajemen Pengguna
          </h1>
          <p className="text-sm text-[#5C7499]">
            Kelola akun, hak akses role, dan status kredensial sistem secara
            terpusat.
          </p>
        </div>
        <Link
          href="/sysadmin/manajemen-users/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#25A4FF] text-white text-sm font-medium shadow-sm hover:opacity-95 transition-opacity"
        >
          <UserPlus className="w-4 h-4" /> Tambah Akun Baru
        </Link>
      </div>

      {/* Kartu Ringkasan Statistik Menggunakan StatCard yang Reusable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Akun"
          value={totalUsers}
          icon={Users}
          iconBgColor="bg-[#F3F7FC]"
          iconColor="text-[#2563EB]"
          href="/sysadmin/users"
        />
        <StatCard
          title="Akun Aktif"
          value={activeUsers}
          icon={UserCheck}
          iconBgColor="bg-emerald-50"
          iconColor="text-[#059669]"
          badgeText="Aktif"
          badgeColor="bg-emerald-50 text-[#059669]"
        />
        <StatCard
          title="Akun Nonaktif"
          value={inactiveUsers}
          icon={UserX}
          iconBgColor="bg-rose-50"
          iconColor="text-[#DC2626]"
          badgeText="Nonaktif"
          badgeColor="bg-rose-50 text-[#DC2626]"
        />
        <StatCard
          title="Kategori Role"
          value={Object.keys(roleDistribution).length}
          icon={Shield}
          iconBgColor="bg-amber-50"
          iconColor="text-[#D97706]"
          badgeText="Jenis Role"
          badgeColor="text-[#5C7499]"
        />
      </div>

      {/* Tabel Pengguna */}
      <UsersTable usersList={usersList} />
    </div>
  );
}

export default function ManajemenUsersPage() {
  return (
    <Suspense fallback={<UsersLoadingSkeleton />}>
      <UsersContent />
    </Suspense>
  );
}
