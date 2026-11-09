import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Mengambil data tunggal profil desa (id = 1) sesuai pola Single-Row Configuration
    const { data, error } = await supabase
      .from("profil_desa")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Supabase Error:", error.message);
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mengambil data profil desa",
          error: error.message,
        },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data profil desa belum diinisialisasi (id = 1 tidak ditemukan)",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
