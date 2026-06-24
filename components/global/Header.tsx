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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }
 
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
 
  const isItemActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const renderLamp = () => (
    <motion.div
      layoutId="nav-lamp"
      className="absolute inset-0 -z-10 rounded-full bg-electric-500/5"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-electric-500">
        <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full blur-md bg-electric-500/20" />
      </div>
    </motion.div>
  );
 
  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none">
      {/* Floating pill */}
      <div
        ref={navRef}
        className={cn(
          "pointer-events-auto w-full max-w-7xl rounded-2xl transition-all duration-300",
          "bg-white/95 backdrop-blur-md shadow-lg ring-1 ring-black/8"
        )}
      >
        <div className="flex h-14 items-center justify-between px-3 sm:px-4">
          {/* Logo — merged inside the pill */}
          <Link
            href="/"
            className="group flex items-center shrink-0"
            onClick={(e) => {
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
            <Image
              src="/claaps-oracle-partner-badge.png"
              alt="Claaps - Oracle Partner"
              width={1440}
              height={226}
              priority
              className="h-8 w-auto sm:h-9 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return item.sections ? (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    suppressHydrationWarning
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu((curr) => (curr === item.label ? null : item.label))
                    }
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
                      active ? "text-electric-600" : "text-slate-700 hover:text-electric-600"
                    )}
                  >
                    {item.label}
                    <ChevronDown aria-hidden size={14} strokeWidth={1.5} />
                    {active ? renderLamp() : null}
                  </button>
                  {openMenu === item.label ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white py-2 shadow-xl"
                    >
                      {item.sections.map((section, si) => (
                        <div key={section.heading} className={si > 0 ? "mt-1 border-t border-slate-100 pt-1" : ""}>
                          <p className="px-3 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                            {section.heading}
                          </p>
                          {section.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              role="menuitem"
                              className="block rounded-md px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-electric-600 transition-colors duration-150"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                      <div className="mt-1 border-t border-slate-100 px-2 pt-1">
                        <Link
                          href={item.href}
                          role="menuitem"
                          className="block rounded-md px-2 py-1.5 text-sm text-electric-600 hover:bg-slate-50 transition-colors duration-150"
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
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
                    active ? "text-electric-600" : "text-slate-700 hover:text-electric-600"
                  )}
                >
                  {item.label}
                  {active ? renderLamp() : null}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile hamburger */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Button href="/contact" size="sm">
                Request a Consultation
              </Button>
            </div>
            <button
              type="button"
              suppressHydrationWarning
              className="lg:hidden rounded-full p-2 text-slate-700 hover:bg-slate-100 transition-colors"
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
        </div>

        {/* Mobile menu — expands inside the pill */}
        {mobileOpen ? (
          <div id="mobile-menu" className="border-t border-slate-100 px-4 pb-4 pt-3">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-slate-100 py-2">
                  <Link
                    href={item.href}
                    className="block py-2 text-base font-medium text-slate-800"
                  >
                    {item.label}
                  </Link>
                  {item.sections ? (
                    <div className="flex flex-col pl-3">
                      {item.sections.map((section) => (
                        <div key={section.heading} className="mt-1">
                          <p className="pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                            {section.heading}
                          </p>
                          {section.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block py-1.5 text-sm text-slate-600 hover:text-electric-600"
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
            <Button href="/contact" className="mt-4 w-full">
              Request a Consultation
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
 