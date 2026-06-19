import Link from "next/link";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  href,
  as,
}: {
  className?: string;
  children: React.ReactNode;
  href?: string;
  as?: "div" | "article";
}) {
  const styles = cn(
    "group flex h-full flex-col rounded-lg border border-graphite-700 bg-navy-800 p-6 md:p-8 shadow-elevation-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-electric-500/30 hover:shadow-elevation-2",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  const Tag = as ?? "div";
  return <Tag className={styles}>{children}</Tag>;
}
