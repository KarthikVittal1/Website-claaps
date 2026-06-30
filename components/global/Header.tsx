"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/global/Container";
import { Button } from "@/components/global/Button";
import { roles } from "@/lib/content/solutions";
import { cn } from "@/lib/cn";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuPage,
  DropdownMenuPageTrigger,
} from "@/components/ui/material-ui-dropdown-menu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

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
      <div className={cn(
        "pointer-events-auto w-full max-w-7xl rounded-2xl transition-all duration-300",
        "bg-white/95 backdrop-blur-md shadow-lg ring-1 ring-black/8"
      )}>
        <div className="flex h-14 items-center justify-between px-3 sm:px-4">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center shrink-0"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
              }
            }}
          >
            <Image
              src="/claaps-logo-v2.png"
              alt="Claaps"
              width={400}
              height={120}
              priority
              className="h-9 w-auto sm:h-10 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">

            {/* Services dropdown */}
            <DropdownMenu open={openMenu === "services"} onOpenChange={(o) => setOpenMenu(o ? "services" : null)}>
              <DropdownMenuTrigger asChild>
                <button
                  suppressHydrationWarning
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
                    isItemActive("/services") ? "text-electric-600" : "text-slate-700 hover:text-electric-600"
                  )}
                >
                  Services
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="opacity-50"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[13rem]" align="start">
                {/* Main page — categories */}
                <DropdownMenuPage id="main">
                  <DropdownMenuPageTrigger targetId="oracle-cloud">Oracle Cloud</DropdownMenuPageTrigger>
                  <DropdownMenuPageTrigger targetId="rpa">RPA</DropdownMenuPageTrigger>
                  <DropdownMenuPageTrigger targetId="ai">AI</DropdownMenuPageTrigger>
                  <DropdownMenuPageTrigger targetId="advisory">Advisory</DropdownMenuPageTrigger>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/services" className="text-electric-600 font-semibold">View all services →</Link>
                  </DropdownMenuItem>
                </DropdownMenuPage>

                {/* Oracle Cloud sub-page */}
                <DropdownMenuPage id="oracle-cloud">
                  <DropdownMenuItem asChild>
                    <Link href="/services/oracle-risk-management-cloud">Risk Management Cloud</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/oracle-grc">GRC</Link>
                  </DropdownMenuItem>
                </DropdownMenuPage>

                {/* RPA sub-page */}
                <DropdownMenuPage id="rpa">
                  <DropdownMenuItem asChild>
                    <Link href="/services/rpa-uipath">UiPath</Link>
                  </DropdownMenuItem>
                </DropdownMenuPage>

                {/* AI sub-page */}
                <DropdownMenuPage id="ai">
                  <DropdownMenuItem asChild>
                    <Link href="/services/ai-agents">AI Agents</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/ai-chatbots">AI Chatbots</Link>
                  </DropdownMenuItem>
                </DropdownMenuPage>

                {/* Advisory sub-page */}
                <DropdownMenuPage id="advisory">
                  <DropdownMenuItem asChild>
                    <Link href="/services/regulatory-compliance-consulting">Regulatory Compliance</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/risk-advisory">Risk Advisory</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/managed-support">Managed Support</Link>
                  </DropdownMenuItem>
                </DropdownMenuPage>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Solutions dropdown */}
            <DropdownMenu open={openMenu === "solutions"} onOpenChange={(o) => setOpenMenu(o ? "solutions" : null)}>
              <DropdownMenuTrigger asChild>
                <button
                  suppressHydrationWarning
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
                    isItemActive("/solutions") ? "text-electric-600" : "text-slate-700 hover:text-electric-600"
                  )}
                >
                  Solutions
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="opacity-50"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[13rem]" align="start">
                {/* Main page — categories */}
                <DropdownMenuPage id="main">
                  <DropdownMenuPageTrigger targetId="by-role">By Role</DropdownMenuPageTrigger>
                  <DropdownMenuPageTrigger targetId="products">Products</DropdownMenuPageTrigger>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/solutions" className="text-electric-600 font-semibold">View all solutions →</Link>
                  </DropdownMenuItem>
                </DropdownMenuPage>

                {/* By Role sub-page */}
                <DropdownMenuPage id="by-role">
                  {roles.filter((r) => r.slug !== "products").map((role) => (
                    <DropdownMenuItem key={role.slug} asChild>
                      <Link href={`/solutions#${role.slug}`}>{role.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuPage>

                {/* Products sub-page */}
                <DropdownMenuPage id="products">
                  <DropdownMenuItem asChild>
                    <Link href="/solutions#products">Products</Link>
                  </DropdownMenuItem>
                </DropdownMenuPage>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About link */}
            <Link
              href="/#about-section"
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
                pathname === "/" ? "text-slate-700 hover:text-electric-600" : "text-slate-700 hover:text-electric-600"
              )}
            >
              About
            </Link>
          </nav>

          {/* CTA + mobile hamburger */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Button href="/contact" size="sm">Request a Consultation</Button>
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
              {mobileOpen ? <X aria-hidden size={22} strokeWidth={1.5} /> : <Menu aria-hidden size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen ? (
          <div id="mobile-menu" className="border-t border-slate-100 px-4 pb-4 pt-3">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              <div className="border-b border-slate-100 py-2">
                <Link href="/services" className="block py-2 text-base font-medium text-slate-800">Services</Link>
                <div className="flex flex-col pl-3">
                  {[
                    { heading: "Oracle Cloud", items: [{ label: "Risk Management Cloud", href: "/services/oracle-risk-management-cloud" }, { label: "GRC", href: "/services/oracle-grc" }] },
                    { heading: "RPA", items: [{ label: "UiPath", href: "/services/rpa-uipath" }] },
                    { heading: "AI", items: [{ label: "AI Agents", href: "/services/ai-agents" }, { label: "AI Chatbots", href: "/services/ai-chatbots" }] },
                    { heading: "Advisory", items: [{ label: "Regulatory Compliance", href: "/services/regulatory-compliance-consulting" }, { label: "Risk Advisory", href: "/services/risk-advisory" }, { label: "Managed Support", href: "/services/managed-support" }] },
                  ].map((section) => (
                    <div key={section.heading} className="mt-1">
                      <p className="pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">{section.heading}</p>
                      {section.items.map((sub) => (
                        <Link key={sub.href} href={sub.href} className="block py-1.5 text-sm text-slate-600 hover:text-electric-600">{sub.label}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-slate-100 py-2">
                <Link href="/solutions" className="block py-2 text-base font-medium text-slate-800">Solutions</Link>
                <div className="flex flex-col pl-3">
                  <div className="mt-1">
                    <p className="pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">By Role</p>
                    {roles.filter((r) => r.slug !== "products").map((role) => (
                      <Link key={role.slug} href={`/solutions#${role.slug}`} className="block py-1.5 text-sm text-slate-600 hover:text-electric-600">{role.label}</Link>
                    ))}
                  </div>
                  <div className="mt-1">
                    <p className="pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Products</p>
                    <Link href="/solutions#products" className="block py-1.5 text-sm text-slate-600 hover:text-electric-600">Products</Link>
                  </div>
                </div>
              </div>
              <div className="border-b border-slate-100 py-2">
                <Link href="/#about-section" className="block py-2 text-base font-medium text-slate-800">About</Link>
              </div>
            </nav>
            <Button href="/contact" className="mt-4 w-full">Request a Consultation</Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
