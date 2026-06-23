import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { Badge } from "@/components/global/Badge";
import { Button } from "@/components/global/Button";
import { CTASection } from "@/components/global/CTASection";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Oracle GRC, Oracle Risk Management Cloud, regulatory compliance consulting, risk advisory, and managed support — Claaps' five enterprise services.",
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(242,74,29,0.07),_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(78,86,184,0.10),_transparent_50%)]" />
      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <SectionHeading
            as="h1"
            eyebrow="What we do"
            title="Services"
            lead="Five services spanning the full governance, risk, and compliance lifecycle — from regulatory interpretation to ongoing platform administration."
            className="mt-6"
          />
        </Container>
      </section>

      <nav
        aria-label="Jump to service"
        className="sticky top-18 z-30 border-b border-graphite-700 bg-navy-950/95 backdrop-blur-[12px]"
      >
        <Container>
          <ul className="flex gap-6 overflow-x-auto py-4 text-sm">
            {services.map((service) => (
              <li key={service.slug} className="shrink-0">
                <a
                  href={`#${service.slug}`}
                  className="text-slate-400 hover:text-electric-600"
                >
                  {service.shortTitle}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className="border-b border-graphite-700 py-20 md:py-28"
        >
          <Container size="default" className="max-w-3xl">
            <RevealOnScroll delay={i * 0.03}>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-cyan-700">
                {service.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
                {service.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.whoFor.map((role) => (
                  <Badge key={role}>{role}</Badge>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {service.description.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 text-slate-400">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h3 className="mt-8 text-lg font-medium text-offwhite-50">
                What&rsquo;s included
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {service.included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-400">
                    <Check aria-hidden size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-electric-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href={`/services/${service.slug}`} variant="secondary">
                  Read the full overview →
                </Button>
                <Button href="/contact" className="ml-4">
                  Discuss this service
                </Button>
              </div>
            </RevealOnScroll>
          </Container>
        </section>
      ))}

      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container size="default" className="max-w-3xl">
          <SectionHeading
            eyebrow="How they connect"
            title="Services work better together"
            lead="Risk Advisory and Regulatory Compliance Consulting define what needs to be true. Oracle GRC and Oracle Risk Management Cloud implement it. Managed Support keeps it true after go-live."
          />
        </Container>
      </section>

      <CTASection title="Not sure which service applies?" lead="Describe the problem you're solving and we'll point you to the right starting point." />
    </div>
  );
}
