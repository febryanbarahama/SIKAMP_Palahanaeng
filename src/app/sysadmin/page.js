import { Suspense } from "react";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

import { getActiveUsername, getDashboardData } from "@/service/sysadminService";

import WelcomeBanner from "@/components/sysadmin/welcome-banner";
import StatCard from "@/components/sysadmin/stat-card";
import InfrastructureStatus from "@/components/sysadmin/infrastructure-status";
import QuickActions from "@/components/sysadmin/quick-actions";
import ActivityFeed from "@/components/sysadmin/activity-feed";
import AnalyticsCharts from "@/components/sysadmin/analytics-charts";
import RecentLoginTable from "@/components/sysadmin/recent-login-table";

function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-40 bg-slate-200 rounded-2xl"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>
        ))}
      </div>
      <div className="h-64 bg-slate-200 rounded-xl"></div>
    </div>
  );
}

async function DashboardContent() {
  const username = await getActiveUsername();
  const {
    totalUsers,
    activeUsers,
    inactiveUsers,
    roleDistribution,
    recentLogins,
    activityLogs,
  } = await getDashboardData();

  return (
    <div className="space-y-6">
      <WelcomeBanner username={username} />

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

      <AnalyticsCharts
        roleDistribution={roleDistribution}
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <InfrastructureStatus />
          <QuickActions />
        </div>
        <div>
          <ActivityFeed logs={activityLogs} />
        </div>
      </div>

      <RecentLoginTable logins={recentLogins} />
    </div>
  );
}

export default function SysadminDashboardPage() {
  return (
    <Suspense fallback={<DashboardLoadingSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
