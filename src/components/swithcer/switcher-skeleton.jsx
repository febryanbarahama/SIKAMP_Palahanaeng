export function SwitcherSkeleton() {
  return (
    <div className="min-h-screen bg-[#F3F7FC] flex flex-col animate-pulse">
      {/* Header Skeleton */}
      <div className="h-20 bg-[#0B1F4D] px-8 flex items-center justify-between">
        <div className="h-6 w-48 bg-white/20 rounded-lg"></div>
        <div className="h-10 w-28 bg-white/20 rounded-xl"></div>
      </div>

      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="h-64 bg-slate-200 rounded-2xl w-full"></div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
