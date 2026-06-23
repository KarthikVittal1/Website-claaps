"use client";
 
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/global/Container";
import { Button } from "@/components/global/Button";
import { roles } from "@/lib/content/solutions";
import { cn } from "@/lib/cn";

type SubItem = { label: string; href: string };
type MenuSection = { heading: string; items: SubItem[] };

const navItems: Array<{
  label: string;
  href: string;
  sections?: MenuSection[];
}> = [
  {
    label: "Services",
    href: "/services",
    sections: [
      {
        heading: "Oracle Cloud",
        items: [
          { label: "Risk Management Cloud", href: "/services/oracle-risk-management-cloud" },
          { label: "GRC", href: "/services/oracle-grc" },
        ],
      },
      {
        heading: "RPA",
        items: [
          { label: "UiPath", href: "/services/rpa-uipath" },
        ],
      },
      {
        heading: "AI",
        items: [
          { label: "AI Agents", href: "/services/ai-agents" },
          { label: "AI Chatbots", href: "/services/ai-chatbots" },
        ],
      },
      {
        heading: "Advisory",
        items: [
          { label: "Regulatory Compliance", href: "/services/regulatory-compliance-consulting" },
          { label: "Risk Advisory", href: "/services/risk-advisory" },
          { label: "Managed Support", href: "/services/managed-support" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    sections: [
      {
        heading: "By Role",
        items: roles
          .filter((r) => r.slug !== "products")
          .map((r) => ({ label: r.label, href: `/solutions#${r.slug}` })),
      },
      {
        heading: "Products",
        items: [{ label: "Products", href: "/solutions#products" }],
      },
    ],
  },
  { label: "About", href: "/#about-section" },
];
 
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
 
  // Reset menu state when the route changes. Adjusting state during render
  // (rather than in an effect) avoids an extra render and matches React's
  // recommended pattern for resetting state in response to a prop change.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
 
  // The homepage hero is a dark animated gradient that now shows through the
  // transparent header (see app/page.tsx) — nav text/logo tuned for a white
  // backdrop need to flip to light colors until the header picks up its own
  // (opaque) background on scroll.
  const isLightHero = pathname === "/" && !scrolled;
 
  const isItemActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
 
  // Shared layoutId lets framer-motion slide this "lamp" glow between nav
  // items on navigation instead of just popping in on the new active one —
  // adapted from the tubelight-navbar pattern onto the existing nav items
  // rather than swapping in its standalone floating-pill layout.
  const renderLamp = () => (
    <motion.div
      layoutId="nav-lamp"
      className={cn(
        "absolute inset-0 -z-10 rounded-full",
        isLightHero ? "bg-white/10" : "bg-electric-500/5"
      )}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={cn(
          "absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full",
          isLightHero ? "bg-cyan-400" : "bg-electric-500"
        )}
      >
        <div
          className={cn(
            "absolute -top-2 -left-2 h-6 w-12 rounded-full blur-md",
            isLightHero ? "bg-cyan-400/30" : "bg-electric-500/20"
          )}
        />
      </div>
    </motion.div>
  );
 
  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        scrolled
          ? "bg-navy-950/85 backdrop-blur-[12px] border-b border-graphite-700"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between" ref={navRef}>
          <Link
            href="/"
            className="group relative flex items-center"
            onClick={(e) => {
              // When already on the homepage, Next.js skips its scroll reset
              // because the route is unchanged — so clicking the badge would
              // appear to do nothing. Scroll back up to the intro/hero instead.
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: typeof window !== "undefined" &&
                    window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                });
              }
            }}
          >
            {/* The logo lockup uses dark brand colors (blue CLAAPS, orange
                ORACLE, dark-grey "Partner"), so it needs a light backing to
                stay legible over the dark homepage hero and the dark scrolled
                header. A clean white chip reads well on every header state — it
                blends into light inner-page headers and makes the mark pop on
                dark ones. The hover shadow lifts it slightly. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-3 -inset-y-1.5 -z-10 rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-md"
            />
            <Image
              src="/claaps-oracle-partner-badge.png"
              alt="Claaps - Oracle Partner"
              width={1440}
              height={226}
              priority
              className="h-9 w-auto sm:h-10 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />
          </Link>
 
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return item.sections ? (
                <div key={item.label} className="relative">
                  {/* Form-autofill / password-manager browser extensions inject
                      an `fdprocessedid` attribute onto buttons before React
                      hydrates, which trips a dev-only hydration mismatch warning.
                      suppressHydrationWarning is the sanctioned escape hatch for
                      unavoidable third-party DOM mutation — no runtime effect, and
                      it never ships as a problem in production. */}
                  <button
                    type="button"
                    suppressHydrationWarning
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu((curr) => (curr === item.label ? null : item.label))
                    }
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors duration-150",
                      isLightHero
                        ? "text-white/90 hover:text-white"
                        : "text-offwhite-50 hover:text-electric-600",
                      active && (isLightHero ? "text-white" : "font-medium text-electric-600")
                    )}
                  >
                    {item.label}
                    <ChevronDown aria-hidden size={14} strokeWidth={1.5} />
                    {active ? renderLamp() : null}
                  </button>
                  {openMenu === item.label ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-graphite-700 bg-navy-900 py-2 shadow-elevation-2"
                    >
                      {item.sections.map((section, si) => (
                        <div key={section.heading} className={si > 0 ? "mt-1 border-t border-graphite-700/60 pt-1" : ""}>
                          <p className="px-3 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                            {section.heading}
                          </p>
                          {section.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              role="menuitem"
                              className="block rounded-md px-3 py-1.5 text-sm text-offwhite-50 hover:bg-navy-800 hover:text-electric-600 transition-colors duration-150"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                      <div className="mt-1 border-t border-graphite-700/60 px-2 pt-1">
                        <Link
                          href={item.href}
                          role="menuitem"
                          className="block rounded-md px-2 py-1.5 text-sm text-cyan-700 hover:bg-navy-800 transition-colors duration-150"
                        >
                          View all {item.label.toLowerCase()} →
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-150",
                    isLightHero
                      ? "text-white/90 hover:text-white"
                      : "text-offwhite-50 hover:text-electric-600",
                    active && (isLightHero ? "text-white" : "font-medium text-electric-600")
                  )}
                >
                  {item.label}
                  {active ? renderLamp() : null}
                </Link>
              );
            })}
          </nav>
 
          <div className="hidden lg:block">
            <Button href="/contact" size="sm">
              Request a Consultation
            </Button>
          </div>
 
          <button
            type="button"
            suppressHydrationWarning
            className={cn(
              "lg:hidden rounded-md p-2",
              isLightHero ? "text-white/90" : "text-offwhite-50"
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X aria-hidden size={22} strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </Container>
 
      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-graphite-700 bg-navy-950 px-6 py-6"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-graphite-700/60 py-2">
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium text-offwhite-50"
                >
                  {item.label}
                </Link>
                {item.sections ? (
                  <div className="flex flex-col pl-3">
                    {item.sections.map((section) => (
                      <div key={section.heading} className="mt-1">
                        <p className="pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                          {section.heading}
                        </p>
                        {section.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block py-1.5 text-sm text-slate-400 hover:text-electric-600"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <Button href="/contact" className="mt-6 w-full">
            Request a Consultation
          </Button>
        </div>
      ) : null}
    </header>
  );
}
 