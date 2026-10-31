"use client";

export default function UserTablePagination({
  currentPage,
  setCurrentPage,
  totalPages,
  rowsPerPage,
  filteredUsersLength,
  selectedUsersLength,
}) {
  const startItem =
    filteredUsersLength > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * rowsPerPage, filteredUsersLength);

  return (
    <div className="p-4 border-t border-[#DCE5F1] bg-[#F3F7FC]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-xs text-[#5C7499]">
        Menampilkan{" "}
        <span className="font-semibold text-[#0B1F4D]">{startItem}</span> sampai{" "}
        <span className="font-semibold text-[#0B1F4D]">{endItem}</span> dari{" "}
        <span className="font-semibold text-[#0B1F4D]">
          {filteredUsersLength}
        </span>{" "}
        data pengguna
        {selectedUsersLength > 0 && (
          <span className="ml-2 text-[#2563EB] font-medium">
            ({selectedUsersLength} baris dipilih)
          </span>
        )}
      </div>

      {/* Kontrol Pagination */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 rounded-lg border border-[#DCE5F1] bg-white text-xs font-medium text-[#5C7499] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
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
          className="px-3 py-1.5 rounded-lg border border-[#DCE5F1] bg-white text-xs font-medium text-[#5C7499] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
