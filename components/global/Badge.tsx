import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.06em]",
        tone === "accent"
          ? "border-electric-500/40 text-electric-600 bg-electric-500/10"
          : "border-graphite-700 text-slate-400",
        className
      )}
    >
      {children}
    </span>
  );
}
