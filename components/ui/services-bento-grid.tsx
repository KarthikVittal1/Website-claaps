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
        "bento-item group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-graphite-700 bg-navy-800 p-6 shadow-elevation-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-electric-500/30 hover:shadow-elevation-2",
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
            {featured && (
              <div aria-hidden className="absolute inset-0 -z-10">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 66vw, 100vw"
                  className="object-cover opacity-15 transition-opacity duration-300 group-hover:opacity-25"
                />
              </div>
            )}

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-cyan-700">
                {service.eyebrow}
              </p>
              <h3
                className={cn(
                  "mt-2 font-semibold tracking-[-0.02em] text-offwhite-50",
                  featured ? "text-2xl" : "text-lg"
                )}
              >
                {service.shortTitle}
              </h3>
              <p
                className={cn(
                  "mt-2 text-slate-400",
                  featured ? "line-clamp-3 text-sm leading-6" : "line-clamp-2 text-sm leading-6"
                )}
              >
                {service.summary}
              </p>
            </div>

            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600">
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
