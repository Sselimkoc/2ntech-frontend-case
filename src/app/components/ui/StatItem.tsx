import { formatCount } from "@/app/utils/formatCount";

export default function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-base sm:text-lg font-medium text-text-main">
        {formatCount(value)}
      </span>
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  );
}
