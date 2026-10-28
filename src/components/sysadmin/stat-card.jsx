import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
  badgeText,
  badgeColor,
  href,
}) {
  const content = (
    <div className="bg-white p-5 rounded-xl border border-[#DCE5F1] shadow-sm hover:border-[#2563EB] transition-all group h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#5C7499]">{title}</span>
        <div
          className={`p-2 rounded-lg ${iconBgColor} ${iconColor} transition-colors`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-bold text-[#0B1F4D]">{value}</span>
        {href ? (
          <span className="text-xs text-[#2563EB] flex items-center gap-1 font-medium group-hover:underline">
            Kelola <ArrowUpRight className="w-3 h-3" />
          </span>
        ) : (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
