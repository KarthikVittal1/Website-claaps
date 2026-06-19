import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // Orange → blue-violet mirrors the actual Claaps wordmark's left-to-right
        // color transition. cyan-700 (not the brighter cyan-400) is used for the
        // orange stop specifically because cyan-400 is too light to keep white
        // button text at 4.5:1 contrast against it.
        primary:
          "bg-gradient-to-r from-cyan-700 to-purple-500 text-white hover:shadow-elevation-glow hover:scale-[1.02]",
        secondary:
          "bg-transparent text-offwhite-50 border border-graphite-700 hover:border-electric-400",
        // !-prefixed to win deterministically over whichever `size` classes
        // cva resolves (size is forced to "md" by defaultVariants whenever
        // it's passed as undefined below) — without this, ghost links could
        // inherit a 44px-tall hit box despite looking like inline text.
        ghost:
          "bg-transparent text-offwhite-50 !h-auto !w-auto !p-0 hover:text-electric-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> & {
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonProps &
  (
    | ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  )) {
  const styles = cn(buttonStyles({ variant, size: variant === "ghost" ? undefined : size }), className);

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        {...(rest as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
