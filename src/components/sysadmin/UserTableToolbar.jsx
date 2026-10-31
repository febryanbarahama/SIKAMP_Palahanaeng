"use client";

import { Search } from "lucide-react";

export default function UserTableToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  rowsPerPage,
  setRowsPerPage,
  setCurrentPage,
}) {
  return (
    <div className="p-4 bg-[#F3F7FC]/40 border-b border-[#DCE5F1] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      {/* Kolom Pencarian */}
      <div className="relative w-full lg:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C7499]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
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
          <option value="Super Admin">Super Admin</option>
          <option value="Kaur Umum">Kaur Umum</option>
          <option value="Operator Web">Operator Web</option>
          <option value="Kapitalaung">Kapitalaung</option>
          <option value="Sekretaris Kampung">Sekretaris Kampung</option>
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
  );
}
