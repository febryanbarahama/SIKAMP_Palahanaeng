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

export async function getDashboardData() {
  let stats = {
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
      .select("id, username, status, last_login, roles(nama_role)");

    if (!error && users) {
      stats.totalUsers = users.length;
      stats.activeUsers = users.filter((u) => u.status === "aktif").length;
      stats.inactiveUsers = users.filter((u) => u.status !== "aktif").length;

      users.forEach((u) => {
        const roleName = u.roles?.nama_role || "Tanpa Role";
        stats.roleDistribution[roleName] =
          (stats.roleDistribution[roleName] || 0) + 1;
      });

      stats.recentLogins = users
        .filter((u) => u.last_login)
        .sort((a, b) => new Date(b.last_login) - new Date(a.last_login))
        .slice(0, 5);

      stats.activityLogs = users.slice(0, 5).map((u) => ({
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
    console.error("Gagal mengambil data dashboard dari Supabase:", err);
  }

  return stats;
}
