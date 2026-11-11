import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const fieldName = formData.get("fieldName"); // "logo_desa" atau "foto_kantor"

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File tidak ditemukan" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop();
    const fileName = `${fieldName}-${Date.now()}.${fileExt}`;

    // Mengunggah file menggunakan supabaseAdmin (bypass RLS di server)
    const { error: uploadError } = await supabaseAdmin.storage
      .from("public-assets")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Mendapatkan Public URL
    const { data: publicURLData } = supabaseAdmin.storage
      .from("public-assets")
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: publicURLData.publicUrl,
    });
  } catch (err) {
    console.error("Upload API Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
