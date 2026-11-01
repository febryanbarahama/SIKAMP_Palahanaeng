import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "all";
    const status = searchParams.get("status") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    let query = supabaseAdmin
      .from("audit_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Filter Kategori Tab
    if (category === "login") {
      query = query.in("action_type", [
        "login_success",
        "login_failed",
        "logout",
      ]);
    } else if (category === "security") {
      query = query.in("action_type", [
        "reset_password",
        "change_password",
        "unauthorized_access",
      ]);
    } else if (category === "data_changes") {
      query = query.in("action_type", [
        "user_created",
        "user_updated",
        "user_deleted",
        "status_changed",
      ]);
    }

    // Filter Role & Status
    if (role !== "all") query = query.eq("role", role);
    if (status !== "all") query = query.eq("status", status);

    // Pencarian Username / IP / Detail Action
    if (search) {
      query = query.or(
        `username.ilike.%${search}%,ip_address.ilike.%${search}%,details.ilike.%${search}%`,
      );
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: logs, count, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    // Ambil Statistik Ringkas
    const { count: totalLogin } = await supabaseAdmin
      .from("audit_logs")
      .select("id", { count: "exact", head: true })
      .in("action_type", ["login_success", "login_failed"]);

    const { count: totalSecurity } = await supabaseAdmin
      .from("audit_logs")
      .select("id", { count: "exact", head: true })
      .in("action_type", [
        "reset_password",
        "change_password",
        "unauthorized_access",
      ]);

    const { count: totalDataChanges } = await supabaseAdmin
      .from("audit_logs")
      .select("id", { count: "exact", head: true })
      .in("action_type", [
        "user_created",
        "user_updated",
        "user_deleted",
        "status_changed",
      ]);

    return NextResponse.json({
      logs: logs || [],
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
      stats: {
        totalLogs: count || 0,
        totalLogin: totalLogin || 0,
        totalSecurity: totalSecurity || 0,
        totalDataChanges: totalDataChanges || 0,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
