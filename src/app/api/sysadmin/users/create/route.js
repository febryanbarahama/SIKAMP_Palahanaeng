import { NextResponse } from "next/server";
import { createNewUsersAccount } from "@/service/sysadminService";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password, role, status } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan Password wajib di isi. " },
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
      success: "true",
      message: "Akun berhasil di buat. ",
      data: result.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan di server. " },
      { status: 500 },
    );
  }
}
