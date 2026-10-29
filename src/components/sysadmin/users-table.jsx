"use client";

import { useState, useMemo } from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  MoreVertical,
  Search,
} from "lucide-react";
import UserActionMenu from "./user-action-menu";

export default function UsersTable({ usersList }) {
  // State untuk kontrol pencarian dan filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Logika Filter dan Pencarian Data
  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      const matchesSearch = user.username
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter ? user.status === statusFilter : true;

      const userRole = user.roles?.nama_role?.toLowerCase() || "";
      const matchesRole = roleFilter
        ? userRole.includes(roleFilter.toLowerCase())
        : true;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [usersList, searchQuery, statusFilter, roleFilter]);

  // Logika Pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  // Handler Checkbox Pilih Semua
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handler Checkbox Per Baris
  const handleSelectRow = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-white rounded-xl border border-[#DCE5F1] shadow-sm overflow-hidden">
      {/* 1. Bagian Header Tabel: Judul & Deskripsi */}
      <div className="p-5 border-b border-[#DCE5F1]">
        <h2 className="text-base font-bold text-[#0B1F4D]">
          Daftar Akun Pengguna
        </h2>
        <p className="text-xs text-[#5C7499]">
          Kelola data kredensial, hak akses, dan status keaktifan seluruh
          pengguna sistem.
        </p>
      </div>

      {/* 2. Toolbar Pencarian, Filter, & Tampilkan Data */}
      <div className="p-4 bg-[#F3F7FC]/40 border-b border-[#DCE5F1] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Kolom Pencarian */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C7499]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset ke halaman 1 saat mencari
            }}
            placeholder="Cari username..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB] transition-colors"
          />
        </div>

        {/* Filter Status, Role, & Tampilkan Data */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB] transition-colors"
          >
            <option value="">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>

          {/* Filter Role */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB] transition-colors"
          >
            <option value="">Semua Role</option>
            <option value="super admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
          </select>

          {/* Tampilkan Data (Jumlah Baris) */}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB] transition-colors"
          >
            <option value="10">10 / hal</option>
            <option value="25">25 / hal</option>
            <option value="50">50 / hal</option>
            <option value="100">100 / hal</option>
          </select>
        </div>
      </div>

      {/* 3. Tabel Utama dengan Checkbox */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F3F7FC] text-[#5C7499] uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-4 py-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    paginatedUsers.length > 0 &&
                    selectedUsers.length === paginatedUsers.length
                  }
                  className="rounded border-[#DCE5F1] text-[#2563EB] focus:ring-[#2563EB]"
                />
              </th>
              <th className="px-4 py-3.5 w-12">No</th>
              <th className="px-6 py-3.5">Username</th>
              <th className="px-6 py-3.5">Role</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Login Terakhir</th>
              <th className="px-6 py-3.5">Dibuat Pada</th>
              <th className="px-6 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE5F1]">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => {
                const globalIndex = (currentPage - 1) * rowsPerPage + index + 1;
                const isSelected = selectedUsers.includes(user.id);

                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-[#F3F7FC]/50 transition-colors ${
                      isSelected ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(user.id)}
                        className="rounded border-[#DCE5F1] text-[#2563EB] focus:ring-[#2563EB]"
                      />
                    </td>
                    <td className="px-4 py-4 text-[#5C7499] font-medium">
                      {globalIndex}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#0B1F4D] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                        {user.username
                          ? user.username.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                      <span>{user.username}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-[#F3F7FC] text-[#0B1F4D] border border-[#DCE5F1]">
                        <Shield className="w-3 h-3 text-[#2563EB]" />
                        {user.roles?.nama_role || "Tanpa Role"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.status === "aktif"
                            ? "bg-emerald-50 text-[#059669]"
                            : "bg-rose-50 text-[#DC2626]"
                        }`}
                      >
                        {user.status === "aktif" ? (
                          <CheckCircle className="w-3 h-3 text-[#059669]" />
                        ) : (
                          <XCircle className="w-3 h-3 text-[#DC2626]" />
                        )}
                        {user.status === "aktif" ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#5C7499]">
                      {user.last_login
                        ? new Date(user.last_login).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Belum pernah"}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#5C7499]">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              dateStyle: "medium",
                            },
                          )
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <UserActionMenu user={user} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-12 text-center text-[#5C7499]"
                >
                  Tidak ada data pengguna yang cocok dengan pencarian atau
                  filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Footer Tabel: Informasi Teks & Pagination Aktif */}
      <div className="p-4 border-t border-[#DCE5F1] bg-[#F3F7FC]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#5C7499]">
          Menampilkan{" "}
          <span className="font-semibold text-[#0B1F4D]">
            {filteredUsers.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}
          </span>{" "}
          sampai{" "}
          <span className="font-semibold text-[#0B1F4D]">
            {Math.min(currentPage * rowsPerPage, filteredUsers.length)}
          </span>{" "}
          dari{" "}
          <span className="font-semibold text-[#0B1F4D]">
            {filteredUsers.length}
          </span>{" "}
          data pengguna
          {selectedUsers.length > 0 && (
            <span className="ml-2 text-[#2563EB] font-medium">
              ({selectedUsers.length} baris dipilih)
            </span>
          )}
        </div>

        {/* Kontrol Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-[#DCE5F1] bg-white text-xs font-medium text-[#5C7499] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            Sebelumnya
          </button>
          <span className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-medium">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 rounded-lg border border-[#DCE5F1] bg-white text-xs font-medium text-[#5C7499] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
}
