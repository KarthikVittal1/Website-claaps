import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8",
        size === "wide" ? "max-w-[1440px]" : "max-w-[1280px]",
        className
      )}
    >
      {children}
    </div>
  );
}
