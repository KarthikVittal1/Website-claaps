"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/content/services";

// Cell sizing pattern applied to services in order, then repeated for any overflow.
const SPAN_PATTERN = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

function BentoItem({
  className,
  children,
  href,
}: {
  className?: string;
  children: ReactNode;
  href: string;
}) {
  const itemRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const item = itemRef.current;
    if (!item) return;
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    item.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={itemRef}
      href={href}
      onMouseMove={handleMouseMove}
      className={cn(
        "bento-item group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] p-6 shadow-elevation-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-electric-500/40 hover:shadow-elevation-2",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function ServicesBentoGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:auto-rows-[13rem] sm:grid-cols-3">
      {services.map((service, i) => {
        const featured = SPAN_PATTERN[i % SPAN_PATTERN.length].includes("col-span-2") && i === 0;
        return (
          <BentoItem
            key={service.slug}
            href={`/services/${service.slug}`}
            className={SPAN_PATTERN[i % SPAN_PATTERN.length]}
          >
            {/* Full-colour human photo. Position is set via inline style because the global
                `.bento-item > *` rule forces children to position:relative, which would collapse
                these layers. */}
            <div aria-hidden style={{ position: "absolute", inset: 0 }}>
              <Image
                src={service.image}
                alt=""
                fill
                sizes={featured ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
                className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
              />
            </div>
            {/* Dark scrim (heaviest at the top-left where the text sits) plus a bottom-up fade keep
                the white text crisp over any photo. */}
            <div
              aria-hidden
              style={{ position: "absolute", inset: 0 }}
              className="bg-[linear-gradient(145deg,rgba(5,8,15,0.92)_10%,rgba(5,8,15,0.72)_55%,rgba(5,8,15,0.5)_100%)]"
            />
            <div
              aria-hidden
              style={{ position: "absolute", inset: 0 }}
              className="bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            />
            <div
              aria-hidden
              style={{ position: "absolute", top: 0, left: 0, right: 0 }}
              className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />

            <div className="relative z-10 [&_*]:[text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan-400">
                {service.eyebrow}
              </p>
              <h3
                className={cn(
                  "mt-2 font-semibold tracking-[-0.02em] text-white",
                  featured ? "text-2xl" : "text-lg"
                )}
              >
                {service.shortTitle}
              </h3>
              <p
                className={cn(
                  "mt-2 font-medium text-white/85",
                  featured ? "line-clamp-3 text-sm leading-6" : "line-clamp-2 text-sm leading-6"
                )}
              >
                {service.summary}
              </p>
            </div>

            <span className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
              Explore service
              <ArrowUpRight
                aria-hidden
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </BentoItem>
        );
      })}
    </div>
  );
}
