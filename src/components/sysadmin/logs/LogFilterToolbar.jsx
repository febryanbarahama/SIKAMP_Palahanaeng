"use client";

import { Search, RotateCcw, Download } from "lucide-react";

export default function LogFilterToolbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
  selectedStatus,
  setSelectedStatus,
  onReset,
  onExport,
}) {
  const tabs = [
    { id: "all", label: "Semua Aktivitas" },
    { id: "login", label: "Login & Sesi" },
    { id: "security", label: "Keamanan" },
    { id: "data_changes", label: "Perubahan Data" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#DCE5F1] shadow-sm space-y-4">
      {/* 1. Tab Kategori */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE5F1] pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#0B1F4D] text-white shadow-sm"
                  : "text-[#5C7499] hover:bg-[#F3F7FC] hover:text-[#0B1F4D]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#DCE5F1] bg-white text-xs font-semibold text-[#0B1F4D] hover:bg-[#F3F7FC] transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Ekspor Log</span>
        </button>
      </div>

      {/* 2. Form Pencarian & Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C7499]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari username, IP address, atau aksi..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Filter Role */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB]"
        >
          <option value="all">Semua Role</option>
          <option value="superadmin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="operator">Operator</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* Filter Status */}
        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE5F1] bg-white text-[#0B1F4D] focus:outline-none focus:border-[#2563EB]"
          >
            <option value="all">Semua Status</option>
            <option value="success">Berhasil</option>
            <option value="failed">Gagal</option>
          </select>

          <button
            onClick={onReset}
            title="Reset Filter"
            className="p-2 rounded-xl border border-[#DCE5F1] text-[#5C7499] hover:bg-[#F3F7FC] hover:text-[#0B1F4D] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
