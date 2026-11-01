"use client";

import { useState, useEffect } from "react";
import { History, ChevronLeft, ChevronRight } from "lucide-react";

import LogStatCards from "@/components/sysadmin/logs/LogStatCards";
import LogFilterToolbar from "@/components/sysadmin/logs/LogFilterToolbar";
import LogsTable from "@/components/sysadmin/logs/LogsTable";

export default function AuditLogsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  // State Filter & Tabs
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [page, setPage] = useState(1);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        category: activeTab,
        search: searchQuery,
        role: selectedRole,
        status: selectedStatus,
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(`/api/sysadmin/logs?${queryParams.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setLogs(data.logs || []);
        setStats(data.stats || null);
        setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 });
      }
    } catch (err) {
      console.error("Gagal mengambil audit log:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [activeTab, searchQuery, selectedRole, selectedStatus, page]);

  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSelectedRole("all");
    setSelectedStatus("all");
    setPage(1);
  };

  const handleExportCSV = () => {
    if (!logs.length) return alert("Tidak ada data log untuk diekspor.");
    const headers = [
      "Waktu",
      "Username",
      "Role",
      "Aktivitas",
      "Detail",
      "IP Address",
      "Status",
    ];
    const rows = logs.map((l) => [
      l.created_at,
      l.username,
      l.role,
      l.action_type,
      `"${l.details?.replace(/"/g, '""') || ""}"`,
      l.ip_address,
      l.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `audit_logs_palahanaeng_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="bg-white p-6 rounded-2xl border border-[#DCE5F1] shadow-sm">
        <h1 className="text-xl font-bold text-[#0B1F4D] flex items-center gap-2.5">
          <History className="w-6 h-6 text-[#2563EB]" /> Log Aktivitas & Audit
          Trail
        </h1>
        <p className="text-xs text-[#5C7499] mt-1">
          Rekaman jejak audit sistem untuk keamanan, aktivitas login, dan
          riwayat perubahan data akun di Kampung Palahanaeng.
        </p>
      </div>

      {/* 1. Kartu Ringkasan Statistik */}
      <LogStatCards stats={stats} />

      {/* 2. Toolbar & Filter Audit */}
      <LogFilterToolbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setPage(1);
        }}
        selectedRole={selectedRole}
        setSelectedRole={(r) => {
          setSelectedRole(r);
          setPage(1);
        }}
        selectedStatus={selectedStatus}
        setSelectedStatus={(s) => {
          setSelectedStatus(s);
          setPage(1);
        }}
        onReset={handleResetFilters}
        onExport={handleExportCSV}
      />

      {/* 3. Tabel Log Audit */}
      <LogsTable logs={logs} loading={loading} />

      {/* 4. Controls Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-[#DCE5F1] shadow-sm text-xs">
          <span className="text-[#5C7499]">
            Menampilkan data ke-<strong>{(page - 1) * 10 + 1}</strong> hingga{" "}
            <strong>{Math.min(page * 10, pagination.total)}</strong> dari total{" "}
            <strong>{pagination.total}</strong> log
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || loading}
              className="p-1.5 rounded-xl border border-[#DCE5F1] text-[#5C7499] hover:bg-[#F3F7FC] disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-[#0B1F4D]">
              Halaman {page} dari {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, pagination.totalPages))
              }
              disabled={page === pagination.totalPages || loading}
              className="p-1.5 rounded-xl border border-[#DCE5F1] text-[#5C7499] hover:bg-[#F3F7FC] disabled:opacity-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
