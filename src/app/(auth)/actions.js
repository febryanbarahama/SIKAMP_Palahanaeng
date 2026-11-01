"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

// Inisialisasi client Supabase khusus server menggunakan Service Role Key (Bypass RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Helper internal untuk mencatat audit log otomatis
async function recordAuditLog({ username, role, actionType, details, status }) {
  try {
    await supabase.from("audit_logs").insert([
      {
        username: username || "anonymous",
        role: role || "Guest",
        action_type: actionType,
        details: details,
        ip_address: "127.0.0.1", // Server Action menangani IP secara aman di level proxy jika diperlukan
        user_agent: "Next.js Server Action",
        status: status || "success",
      },
    ]);
  } catch (err) {
    console.error("Gagal mencatat audit log login:", err.message);
  }
}

export async function handleLogin(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const rememberMe = formData.get("rememberMe") === "on";

  if (!username || !password) {
    return { success: false, message: "Username dan Password wajib diisi." };
  }

  try {
    // 1. Ambil data user beserta relasi roles dalam 1 kueri
    const { data: user, error } = await supabase
      .from("users")
      .select(
        `
        id,
        username,
        password,
        status,
        role_id,
        roles (
          id,
          nama_role,
          deskripsi
        )
      `,
      )
      .eq("username", username)
      .single();

    if (error || !user) {
      // Catat log gagal: Username tidak ditemukan
      await recordAuditLog({
        username: username,
        role: "Unknown",
        actionType: "login_failed",
        details: `Upaya login gagal: Username '${username}' tidak ditemukan.`,
        status: "failed",
      });

      console.error("Login Query Error:", error);
      return { success: false, message: "Username tidak ditemukan." };
    }

    if (user.status !== "aktif") {
      // Catat log gagal: Akun nonaktif
      await recordAuditLog({
        username: user.username,
        role: user.roles?.nama_role || "User",
        actionType: "login_failed",
        details: `Upaya login ditolak: Akun dalam status nonaktif.`,
        status: "failed",
      });

      return {
        success: false,
        message: "Akun anda sedang nonaktif. Silahkan hubungi Administrator.",
      };
    }

    // 2. Verifikasi password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Catat log gagal: Password salah
      await recordAuditLog({
        username: user.username,
        role: user.roles?.nama_role || "User",
        actionType: "login_failed",
        details: `Upaya login gagal: Password salah untuk username '${username}'.`,
        status: "failed",
      });

      return { success: false, message: "Password anda salah." };
    }

    // 3. Perbarui waktu last_login
    await supabase
      .from("users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    // Catat log sukses login
    await recordAuditLog({
      username: user.username,
      role: user.roles?.nama_role || "Operator",
      actionType: "login_success",
      details: `Berhasil masuk ke dalam sistem dengan hak akses [${user.roles?.nama_role || "User"}]`,
      status: "success",
    });

    // 4. Siapkan data sesi untuk disimpan ke cookie
    const sessionData = {
      userId: user.id,
      username: user.username,
      roleId: user.role_id,
      namaRole: user.roles?.nama_role,
    };

    const cookieMaxAge = rememberMe ? 30 * 24 * 60 * 60 : undefined;
    const cookieStore = await cookies();

    cookieStore.set("sid_session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: cookieMaxAge,
      path: "/",
    });

    // 5. Tentukan jalur redirect berdasarkan matriks hak akses
    let redirectPath = "/";
    const roleName = user.roles?.nama_role;
    const roleId = user.role_id;

    if (roleId === 1 || roleName === "Super Admin") {
      redirectPath = "/sysadmin";
    } else if (
      roleName === "Kapitalaung" ||
      roleName === "Sekretaris Kampung"
    ) {
      redirectPath = "/";
    } else if (roleName === "Kaur Umum") {
      redirectPath = "/layanan";
    } else if (roleName === "Operator Web" || roleName === "Kader Digital") {
      redirectPath = "/admin-web";
    }

    return { success: true, redirectUrl: redirectPath };
  } catch (err) {
    console.error("Login Error : ", err);
    return { success: false, message: "Telah terjadi kesalahan di server." };
  }
}

// 2. Fungsi Logout yang diperbarui dengan pencatatan audit log
export async function handleLogout() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sid_session");

    if (sessionCookie) {
      const sessionData = JSON.parse(sessionCookie.value);

      // Catat log logout
      await recordAuditLog({
        username: sessionData.username || "unknown",
        role: sessionData.namaRole || "User",
        actionType: "logout",
        details: `Pengguna keluar dari sesi sistem.`,
        status: "success",
      });
    }

    cookieStore.delete("sid_session");
  } catch (err) {
    console.error("Gagal mencatat audit log logout:", err);
  }

  redirect("/login");
}
