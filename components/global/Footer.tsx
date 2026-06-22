import Link from "next/link";
import { Container } from "@/components/global/Container";
import { services } from "@/lib/content/services";
import { roles } from "@/lib/content/solutions";
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0c0f]">
      <FooterBackgroundGradient />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-white">Services</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-cyan-400">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Solutions</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              {roles.map((r) => (
                <li key={r.slug}>
                  <Link href={`/solutions#${r.slug}`} className="hover:text-cyan-400">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <li>
                <Link href="/#about-section" className="hover:text-cyan-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Legal</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <li>
                <Link href="/legal/privacy" className="hover:text-cyan-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-cyan-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Claaps Technology Services. All rights reserved.</p>
          <p>Oracle Governance, Risk &amp; Compliance Specialists</p>
        </div>
      </Container>
    </footer>
  );
}
