import { NextResponse } from "next/server";

export function middleware(request) {
  const sessionCookie = request.cookies.get("sid_session");
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login"];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie.value);
        let targetUrl = "/";

        if (session.roleId === 1 || session.namaRole === "Super Admin") {
          targetUrl = "/sysadmin";
        } else if (
          session.namaRole === "Kapitalaung" ||
          session.namaRole === "Sekretaris Kampung"
        ) {
          targetUrl = "/";
        } else if (session.namaRole === "Kaur Umum") {
          targetUrl = "/layanan";
        } else if (
          session.namaRole === "Operator Web" ||
          session.namaRole === "Kader Digital"
        ) {
          targetUrl = "/admin-web";
        }

        return NextResponse.redirect(new URL(targetUrl, request.url));
      } catch (err) {}
    }
    return NextResponse.next();
  }

  if (!sessionCookie) {
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
