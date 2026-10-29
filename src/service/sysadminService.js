import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export async function getActiveUsername() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sid_session")?.value;
    if (sessionCookie) {
      const parsed = JSON.parse(sessionCookie);
      return parsed?.username || "Administrator";
    }
  } catch (e) {
    console.error("Gagal membaca sesi user:", e);
  }
  return "Administrator";
}

// Fungsi reusable untuk mengambil seluruh data pengguna dan statistik terkait
export async function getUsersManagementData() {
  let result = {
    usersList: [],
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    roleDistribution: {},
    recentLogins: [],
    activityLogs: [],
  };

  try {
    const { data: users, error } = await supabaseAdmin
      .from("users")
      .select("id, username, status, created_at, last_login, roles(nama_role)")
      .order("created_at", { ascending: false });

    if (!error && users) {
      result.usersList = users;
      result.totalUsers = users.length;
      result.activeUsers = users.filter((u) => u.status === "aktif").length;
      result.inactiveUsers = users.filter((u) => u.status !== "aktif").length;

      users.forEach((u) => {
        const roleName = u.roles?.nama_role || "Tanpa Role";
        result.roleDistribution[roleName] =
          (result.roleDistribution[roleName] || 0) + 1;
      });

      result.recentLogins = users
        .filter((u) => u.last_login)
        .sort((a, b) => new Date(b.last_login) - new Date(a.last_login))
        .slice(0, 5);

      result.activityLogs = users.slice(0, 5).map((u) => ({
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
    } else if (error) {
      console.error("Error Supabase Query:", error.message);
    }
  } catch (err) {
    console.error("Gagal mengambil data dari Supabase:", err);
  }

  return result;
}

// Pertahankan fungsi getDashboardData jika ingin tetap aman untuk dashboard
export async function getDashboardData() {
  const data = await getUsersManagementData();
  return {
    totalUsers: data.totalUsers,
    activeUsers: data.activeUsers,
    inactiveUsers: data.inactiveUsers,
    roleDistribution: data.roleDistribution,
    recentLogins: data.recentLogins,
    activityLogs: data.activityLogs,
  };
}
