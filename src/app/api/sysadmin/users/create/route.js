import { NextResponse } from "next/server";
import {
  createNewUsersAccount,
  updateUserStatus,
  resetUserPassword,
  deleteUsersAccount,
} from "@/service/sysadminService";

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
    } = body;

    // Jika parameter 'action' dikirim, tangani aksi manajemen user
    if (action) {
      let result;

      switch (action) {
        case "update-status":
          result = await updateUserStatus(userIds || [userId], newStatus);
          break;

        case "reset-password":
          if (!userId || !newPassword) {
            return NextResponse.json(
              { error: "User ID dan Password baru wajib diisi." },
              { status: 400 },
            );
          }
          result = await resetUserPassword(userId, newPassword);
          break;

        case "delete":
          result = await deleteUsersAccount(userIds || [userId]);
          break;

        default:
          return NextResponse.json(
            { error: "Aksi tidak dikenali oleh sistem." },
            { status: 400 },
          );
      }

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

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
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

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
