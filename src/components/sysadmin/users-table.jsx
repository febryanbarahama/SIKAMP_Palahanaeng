"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Shield, CheckCircle, XCircle } from "lucide-react";
import UserActionMenu from "./user-action-menu";
import UserTableToolbar from "./UserTableToolbar";
import UserBulkActionsBar from "./UserBulkActionsBar";
import UserTablePagination from "./UserTablePagination";

export default function UsersTable({ usersList }) {
  const router = useRouter();

  // State Kontrol
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  // Filter & Pencarian Data
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

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  // Checkbox Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBulkAction = async (actionType, newStatus = null) => {
    if (selectedUsers.length === 0) return;

    setIsBulkLoading(true);
    try {
      const payload = {
        action: actionType === "delete" ? "delete" : "update-status",
        userIds: selectedUsers,
      };

      if (newStatus) payload.newStatus = newStatus;

      const response = await fetch("/api/sysadmin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Gagal memproses aksi massal.");

      setSelectedUsers([]);
      router.refresh();
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setIsBulkLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar Aksi Massal */}
      <UserBulkActionsBar
        selectedCount={selectedUsers.length}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedUsers([])}
        isLoading={isBulkLoading}
      />

      <div className="bg-white rounded-xl border border-[#DCE5F1] shadow-sm overflow-hidden">
        {/* Header Tabel */}
        <div className="p-5 border-b border-[#DCE5F1]">
          <h2 className="text-base font-bold text-[#0B1F4D]">
            Daftar Akun Pengguna
          </h2>
          <p className="text-xs text-[#5C7499]">
            Kelola data kredensial, hak akses, dan status keaktifan seluruh
            pengguna sistem.
          </p>
        </div>

        {/* Toolbar Pencarian & Filter */}
        <UserTableToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Tabel Utama */}
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
                    className="rounded border-[#DCE5F1] text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
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
                  const globalIndex =
                    (currentPage - 1) * rowsPerPage + index + 1;
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
                          className="rounded border-[#DCE5F1] text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
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

        {/* Footer & Paginasi */}
        <UserTablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          filteredUsersLength={filteredUsers.length}
          selectedUsersLength={selectedUsers.length}
        />
      </div>
    </div>
  );
}
