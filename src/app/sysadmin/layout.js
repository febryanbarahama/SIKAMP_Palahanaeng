import { cookies } from "next/headers";
import { connection } from "next/server";
import SysadminShell from "@/components/sysadmin/sysadmin-shell";

export const instant = false;

export default async function SysadminLayout({ children }) {
  await connection();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sid_session")?.value;

  let adminData = {
    username: "Super Admin",
    roleName: "Sysadmin",
  };

  if (sessionCookie) {
    try {
      // Parsing data JSON yang disimpan dari action.js
      const parsedSession = JSON.parse(sessionCookie);
      if (parsedSession) {
        adminData = {
          username: parsedSession.username || "Super Admin",
          roleName: parsedSession.namaRole || "Sysadmin",
        };
      }
    } catch (e) {
      console.error("Gagal parsing session cookie:", e);
    }
  }

  return <SysadminShell initialAdmin={adminData}>{children}</SysadminShell>;
}
