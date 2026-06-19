"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
