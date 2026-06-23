import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.08em] text-cyan-700">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          as === "h1"
            ? "text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.05]"
            : "text-4xl font-semibold tracking-[-0.02em] leading-[1.1] md:text-5xl"
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p className="mt-4 text-lg leading-7 text-slate-400">{lead}</p>
      ) : null}
    </div>
  );
}
