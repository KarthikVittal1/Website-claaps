import Link from "next/link";
import { cn } from "@/lib/cn";

export function Breadcrumb({
  items,
  onDark = false,
}: {
  items: { label: string; href?: string }[];
  onDark?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-sm", onDark ? "text-white/55" : "text-slate-400")}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className={onDark ? "hover:text-white" : "hover:text-offwhite-50"}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={onDark ? "text-white/90" : "text-offwhite-50"}
              >
                {item.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
