import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("profil_desa")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

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

    return NextResponse.json({
      success: true,
      data: data || {},
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

// Tambahkan handler PUT untuk menyimpan/memperbarui data dari halaman Edit
export async function PUT(request) {
  try {
    const body = await request.json();

    // 1. Cek apakah record dengan id = 1 sudah ada
    const { data: existingData } = await supabaseAdmin
      .from("profil_desa")
      .select("id")
      .eq("id", 1)
      .maybeSingle();

    let error;

    if (!existingData) {
      // Jika belum ada, lakukan INSERT dengan id = 1
      const insertRes = await supabaseAdmin.from("profil_desa").insert({
        id: 1,
        nama_desa: body.nama_desa,
        kode_desa: body.kode_desa,
        sebutan_wilayah_bawahan: body.sebutan_wilayah_bawahan,
        kecamatan: body.kecamatan,
        kabupaten: body.kabupaten,
        provinsi: body.provinsi,
        kode_pos: body.kode_pos,
        alamat_kantor: body.alamat_kantor,
        luas_wilayah_ha: body.luas_wilayah_ha
          ? parseFloat(body.luas_wilayah_ha)
          : null,
        latitude: body.latitude,
        longitude: body.longitude,
        batas_utara: body.batas_utara,
        batas_selatan: body.batas_selatan,
        batas_barat: body.batas_barat,
        batas_timur: body.batas_timur,
        email_desa: body.email_desa,
        telepon_desa: body.telepon_desa,
        fb_desa: body.fb_desa,
        ig_desa: body.ig_desa,
        yt_desa: body.yt_desa,
        visi: body.visi,
        misi: body.misi,
        sejarah_desa: body.sejarah_desa,
        logo_desa: body.logo_desa,
        foto_kantor: body.foto_kantor,
        updated_at: new Date().toISOString(),
      });
      error = insertRes.error;
    } else {
      // Jika sudah ada, lakukan UPDATE pada id = 1
      const updateRes = await supabaseAdmin
        .from("profil_desa")
        .update({
          nama_desa: body.nama_desa,
          kode_desa: body.kode_desa,
          sebutan_wilayah_bawahan: body.sebutan_wilayah_bawahan,
          kecamatan: body.kecamatan,
          kabupaten: body.kabupaten,
          provinsi: body.provinsi,
          kode_pos: body.kode_pos,
          alamat_kantor: body.alamat_kantor,
          luas_wilayah_ha: body.luas_wilayah_ha
            ? parseFloat(body.luas_wilayah_ha)
            : null,
          latitude: body.latitude,
          longitude: body.longitude,
          batas_utara: body.batas_utara,
          batas_selatan: body.batas_selatan,
          batas_barat: body.batas_barat,
          batas_timur: body.batas_timur,
          email_desa: body.email_desa,
          telepon_desa: body.telepon_desa,
          fb_desa: body.fb_desa,
          ig_desa: body.ig_desa,
          yt_desa: body.yt_desa,
          visi: body.visi,
          misi: body.misi,
          sejarah_desa: body.sejarah_desa,
          logo_desa: body.logo_desa,
          foto_kantor: body.foto_kantor,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);
      error = updateRes.error;
    }

    if (error) {
      console.error("Supabase Save Error:", error.message);
      return NextResponse.json(
        {
          success: false,
          message: "Gagal menyimpan data profil desa",
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data profil desa berhasil disimpan",
    });
  } catch (err) {
    console.error("Server Save Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server saat menyimpan data",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
