import { cn } from "@/lib/cn";

/**
 * Renders an explicitly-labeled empty slot for any metric, logo, testimonial,
 * or case study that has not been verified/approved for publication yet.
 * Never silently omitted and never filled with invented content — visually
 * distinct (dashed border) so it can't be mistaken for real proof.
 */
export function PlaceholderBlock({
  label,
  className,
  compact = false,
}: {
  label: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      role="note"
      aria-label={`Placeholder: ${label}`}
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-graphite-700 bg-navy-900/40 text-center text-sm text-slate-400",
        compact ? "px-4 py-3" : "px-6 py-12",
        className
      )}
    >
      {label}
    </div>
  );
}
