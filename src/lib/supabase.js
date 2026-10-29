import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Supabase URL wajib diisi di file environment!");
}

// 1. Client standar untuk Klien (Browser / Public Data)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Client khusus Server (Admin / Bypass RLS untuk Sysadmin)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      persistSession: false, // Tidak perlu simpan session di server storage
    },
  },
);
