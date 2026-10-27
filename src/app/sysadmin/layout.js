export default function SysAdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Kamu bisa tambahkan Sidebar atau Navbar khusus SysAdmin di sini nantinya */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
