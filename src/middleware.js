import { NextResponse } from "next/server";

export function middleware(request) {
  const sessionCookie = request.cookies.get("sid_session");
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login"];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // 1. Tangani jalur publik (misal: /login)
  if (isPublicPath) {
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie.value);
        let targetUrl = "/";

        if (session.roleId === 1 || session.namaRole === "Super Admin") {
          targetUrl = "/";
        } else if (
          session.namaRole === "Kapitalaung" ||
          session.namaRole === "Sekretaris Kampung"
        ) {
          targetUrl = "/";
        } else if (session.namaRole === "Kaur Umum") {
          targetUrl = "/";
        } else if (
          session.namaRole === "Operator Web" ||
          session.namaRole === "Kader Digital"
        ) {
          targetUrl = "/";
        }

        return NextResponse.redirect(new URL(targetUrl, request.url));
      } catch (err) {}
    }
    return NextResponse.next();
  }

  // 2. Jika belum login dan mengakses rute terlindung, lempar ke /login
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Validasi Role & Pembatasan Akses Rute (Strict Role Guard)
  try {
    const session = JSON.parse(sessionCookie.value);
    const role = session.namaRole;
    const isSuperAdmin = session.roleId === 1 || role === "Super Admin";

    // Aturan 1: Modul /sysadmin HANYA untuk Super Admin
    if (pathname.startsWith("/sysadmin") && !isSuperAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Aturan 2: Modul /pemerintahan HANYA untuk Super Admin, Kapitalaung, & Sekretaris Kampung
    if (pathname.startsWith("/pemerintahan")) {
      const allowedPemerintahan = [
        "Super Admin",
        "Kapitalaung",
        "Sekretaris Kampung",
      ];
      if (!isSuperAdmin && !allowedPemerintahan.includes(role)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Aturan 3: Modul /layanan (Kaur Umum & Role berwenang)[cite: 1]
    if (pathname.startsWith("/layanan")) {
      const allowedLayanan = [
        "Super Admin",
        "Kapitalaung",
        "Sekretaris Kampung",
        "Kaur Umum",
      ];
      if (!isSuperAdmin && !allowedLayanan.includes(role)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Aturan 4: Modul /admin-web (Operator Web, Kader Digital, & Super Admin)[cite: 1]
    if (pathname.startsWith("/admin-web")) {
      const allowedWeb = [
        "Super Admin",
        "Operator Web",
        "Kader Digital",
        "Kaur Umum",
      ];
      if (!isSuperAdmin && !allowedWeb.includes(role)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (err) {
    console.error("Gagal memvalidasi sesi middleware:", err);
    // Jika cookie rusak/korup, paksa logout ke /login
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua jalur rute kecuali:
     * - file statis / _next / favicon
     * - file gambar (.png, .jpg, dll)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
