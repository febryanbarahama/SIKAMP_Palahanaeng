import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcrypt";

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

export async function createNewUsersAccount({
  username,
  password,
  role, // Menerima angka ID dari form (misal: "1", "2", "3", "4", "5")
  status,
}) {
  try {
    // Konversi nilai 'role' menjadi integer
    const roleId = parseInt(role, 10);

    if (isNaN(roleId)) {
      throw new Error(`Role ID tidak valid atau tidak dikenali: "${role}"`);
    }

    // Enkripsi password dengan bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Simpan ke tabel users dengan role_id integer yang pasti
    const { data, error } = await supabaseAdmin
      .from("users")
      .insert([
        {
          username: username.trim().toLowerCase(),
          password: hashedPassword,
          role_id: roleId, // Menggunakan ID angka yang dipilih pengguna
          status: status,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Gagal membuat akun : ", error.message);
    return { success: false, error: error.message };
  }
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
