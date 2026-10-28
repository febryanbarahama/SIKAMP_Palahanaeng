import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

import WelcomeBanner from "@/components/sysadmin/welcome-banner";
import StatCard from "@/components/sysadmin/stat-card";
import InfrastructureStatus from "@/components/sysadmin/infrastructure-status";
import QuickActions from "@/components/sysadmin/quick-actions";
import ActivityFeed from "@/components/sysadmin/activity-feed";
import RecentLoginTable from "@/components/sysadmin/recent-login-table";

export default async function SysadminDashboardPage() {
  let currentUsername = "Administrator";
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sid_session")?.value;
    if (sessionCookie) {
      const parsed = JSON.parse(sessionCookie);
      if (parsed?.username) {
        currentUsername = parsed.username;
      }
    }
  } catch (e) {
    console.error("Gagal membaca sesi user:", e);
  }

  let totalUsers = 0;
  let activeUsers = 0;
  let inactiveUsers = 0;
  let roleDistribution = {};
  let recentLogins = [];
  let activityLogs = [];

  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, username, status, last_login, roles(nama_role)");

    if (!error && users) {
      totalUsers = users.length;
      activeUsers = users.filter((u) => u.status === "aktif").length;
      inactiveUsers = users.filter((u) => u.status !== "aktif").length;

      users.forEach((u) => {
        const roleName = u.roles?.nama_role || "Tanpa Role";
        roleDistribution[roleName] = (roleDistribution[roleName] || 0) + 1;
      });

      recentLogins = users
        .filter((u) => u.last_login)
        .sort((a, b) => new Date(b.last_login) - new Date(a.last_login))
        .slice(0, 5);

      activityLogs = users.slice(0, 5).map((u) => ({
        id: u.id,
        title: `Aktivitas akun: ${u.username}`,
        desc: `Status saat ini ${u.status === "aktif" ? "Aktif" : "Nonaktif"}`,
        time: u.last_login
          ? new Date(u.last_login).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Baru saja",
      }));
    }
  } catch (err) {
    console.error("Gagal mengambil data dashboard:", err);
  }

  return (
    <div className="space-y-6">
      {/* 1. Banner Sambutan */}
      <WelcomeBanner username={currentUsername} />

      {/* 2. Kartu Statistik */}
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

      {/* 3. Grid Utama: Infrastruktur, Quick Actions, & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <InfrastructureStatus />
          <QuickActions />
        </div>
        <div>
          <ActivityFeed logs={activityLogs} />
        </div>
      </div>

      {/* 4. Tabel Riwayat Login Terbaru */}
      <RecentLoginTable logins={recentLogins} />
    </div>
  );
}
