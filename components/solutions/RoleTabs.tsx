"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Role } from "@/lib/content/solutions";
import { getServiceBySlug } from "@/lib/content/services";

export function RoleTabs({ roles }: { roles: Role[] }) {
  const [active, setActive] = useState(roles[0].slug);

  useEffect(() => {
    // Reads window.location.hash, which isn't available during server
    // rendering — the initial tab must render before this can run, so
    // syncing in an effect (rather than during render) is required here
    // to keep the first client render consistent with the SSR'd HTML.
    const hash = window.location.hash.replace("#", "");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (roles.some((r) => r.slug === hash)) setActive(hash);
  }, [roles]);

  function selectRole(slug: string, focus = false) {
    setActive(slug);
    window.history.replaceState(null, "", `#${slug}`);
    if (focus) document.getElementById(`tab-${slug}`)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Solutions by role"
        className="flex gap-2 overflow-x-auto border-b border-graphite-700"
      >
        {roles.map((role) => (
          <button
            key={role.slug}
            id={`tab-${role.slug}`}
            role="tab"
            type="button"
            aria-selected={active === role.slug}
            aria-controls={`panel-${role.slug}`}
            tabIndex={active === role.slug ? 0 : -1}
            onClick={() => selectRole(role.slug)}
            onKeyDown={(e) => {
              const idx = roles.findIndex((r) => r.slug === active);
              if (e.key === "ArrowRight") {
                selectRole(roles[(idx + 1) % roles.length].slug, true);
              } else if (e.key === "ArrowLeft") {
                selectRole(roles[(idx - 1 + roles.length) % roles.length].slug, true);
              }
            }}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors duration-150",
              active === role.slug
                ? "border-electric-500 text-offwhite-50"
                : "border-transparent text-slate-400 hover:text-offwhite-50"
            )}
          >
            {role.label}
          </button>
        ))}
      </div>

      {roles.map((role) => (
        <div
          key={role.slug}
          id={`panel-${role.slug}`}
          role="tabpanel"
          aria-labelledby={`tab-${role.slug}`}
          hidden={active !== role.slug}
          className="py-10"
        >
          <h3 className="text-2xl font-semibold tracking-[-0.02em]">
            Top risks for {role.label}
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {role.risks.map((risk) => (
              <li key={risk} className="flex gap-3 text-base leading-7 text-slate-400">
                <span aria-hidden className="mt-1 text-electric-600">
                  →
                </span>
                {risk}
              </li>
            ))}
          </ul>

          <h4 className="mt-8 text-sm font-medium uppercase tracking-[0.06em] text-cyan-700">
            Relevant services
          </h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {role.relatedServiceSlugs.map((slug) => {
              const service = getServiceBySlug(slug);
              if (!service) return null;
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className="rounded-md border border-graphite-700 px-4 py-2 text-sm transition-colors duration-150 hover:border-electric-500/40 hover:text-electric-600"
                >
                  {service.shortTitle}
                </Link>
              );
            })}
          </div>

          {role.project && (
            <div className="group relative mt-10 overflow-hidden rounded-3xl border border-white/10">
              {/* Full-bleed background image */}
              <Image
                src="/images/cricpredict-hero.png"
                alt="Cricket match prediction data science visualization"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Dark overlay so text stays readable */}
              <div aria-hidden className="absolute inset-0 bg-black/35" />
              {/* Left-side extra darkening for text legibility */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

              {/* Content */}
              <div className="relative flex flex-col justify-center p-8 md:p-10">
                {/* Title */}
                <h4 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {role.project.title}
                </h4>

                {/* Description */}
                <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                  {role.project.description}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Prediction Engine", "Live Data", "Claaps-Built"].map((tag) => (
                    <span key={tag} className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-slate-300 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={role.project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-graphite-900 transition-all duration-200 hover:bg-white/90 hover:scale-[1.02]"
                >
                  Visit {role.project.title}
                  <ExternalLink size={13} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/contact"
              className="text-sm font-medium text-electric-600 hover:underline"
            >
              {role.ctaLabel} →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
