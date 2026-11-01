import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  createNewUsersAccount,
  updateUserStatus,
  resetUserPassword,
  deleteUsersAccount,
} from "@/service/sysadminService";

// Inisialisasi Supabase Admin untuk pencatatan audit log otomatis
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Helper internal untuk mencatat audit log
async function recordAuditLog(
  request,
  { username, role, actionType, details, status },
) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "System";

    await supabaseAdmin.from("audit_logs").insert([
      {
        username: username || "system_admin",
        role: role || "SuperAdmin",
        action_type: actionType,
        details: details,
        ip_address: ip,
        user_agent: userAgent,
        status: status || "success",
      },
    ]);
  } catch (err) {
    console.error("Gagal mencatat audit log:", err.message);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      action,
      username,
      password,
      role,
      status,
      userIds,
      userId,
      newStatus,
      newPassword,
      adminUsername, // Opsional: Username admin yang sedang login melakukan aksi
    } = body;

    const actor = adminUsername || "superadmin";

    // Jika parameter 'action' dikirim, tangani aksi manajemen user
    if (action) {
      let result;
      let actionTypeDesc = "";
      let logDetails = "";

      switch (action) {
        case "update-status":
          actionTypeDesc = "status_changed";
          logDetails = `Mengubah status user ID [${(userIds || [userId]).join(", ")}] menjadi: ${newStatus}`;
          result = await updateUserStatus(userIds || [userId], newStatus);
          break;

        case "reset-password":
          if (!userId || !newPassword) {
            return NextResponse.json(
              { error: "User ID dan Password baru wajib diisi." },
              { status: 400 },
            );
          }
          actionTypeDesc = "reset_password";
          logDetails = `Melakukan reset password untuk user ID: ${userId}`;
          result = await resetUserPassword(userId, newPassword);
          break;

        case "delete":
          actionTypeDesc = "user_deleted";
          logDetails = `Menghapus akun user ID: ${(userIds || [userId]).join(", ")}`;
          result = await deleteUsersAccount(userIds || [userId]);
          break;

        default:
          return NextResponse.json(
            { error: "Aksi tidak dikenali oleh sistem." },
            { status: 400 },
          );
      }

      if (!result.success) {
        // Catat log gagal
        await recordAuditLog(request, {
          username: actor,
          role: "SuperAdmin",
          actionType: `${actionTypeDesc}_failed`,
          details: `Gagal mengeksekusi ${action}: ${result.error}`,
          status: "failed",
        });

        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      // Catat log sukses secara otomatis
      await recordAuditLog(request, {
        username: actor,
        role: "SuperAdmin",
        actionType: actionTypeDesc,
        details: logDetails,
        status: "success",
      });

      return NextResponse.json({
        success: true,
        message: "Aksi manajemen user berhasil dieksekusi.",
        data: result.data,
      });
    }

    // Jika tidak ada 'action', jalankan fungsi default: Membuat Akun Baru
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan Password wajib diisi." },
        { status: 400 },
      );
    }

    const result = await createNewUsersAccount({
      username,
      password,
      role,
      status,
    });

    if (!result.success) {
      await recordAuditLog(request, {
        username: actor,
        role: "SuperAdmin",
        actionType: "user_creation_failed",
        details: `Gagal membuat akun baru untuk username: ${username}`,
        status: "failed",
      });

      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Catat log sukses pembuatan akun baru
    await recordAuditLog(request, {
      username: actor,
      role: "SuperAdmin",
      actionType: "user_created",
      details: `Berhasil membuat akun baru [Username: ${username}, Role: ${role || "Operator"}]`,
      status: "success",
    });

    return NextResponse.json({
      success: true,
      message: "Akun berhasil dibuat.",
      data: result.data,
    });
  } catch (error) {
    console.error("API Route Error [Users Action]:", error.message);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server." },
      { status: 500 },
    );
  }
}
