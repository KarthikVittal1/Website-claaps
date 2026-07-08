import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { CTASection } from "@/components/global/CTASection";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ServicesBentoGrid } from "@/components/ui/services-bento-grid";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Oracle GRC, Oracle Risk Management Cloud, regulatory compliance consulting, risk advisory, and managed support Claaps' five enterprise services.",
};

const DEFAULT_HERO = "/images/services-hero.jpg";

const FOCUS_GROUPS: Record<string, { slugs: string[]; label: string; lead: string; hero: string }> = {
  oracle: {
    slugs: ["oracle-grc", "oracle-risk-management-cloud"],
    label: "Oracle Solutions",
    lead: "Oracle GRC and Oracle Risk Management Cloud - governance, risk, and compliance, built and run on Oracle.",
    hero: DEFAULT_HERO,
  },
  ai: {
    slugs: ["ai-agents"],
    label: "AI Solutions",
    lead: "AI Agents - intelligent automation grounded in your business data.",
    hero: "/images/services-hero-ai.jpg",
  },
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>;
}) {
  const { focus } = await searchParams;
  const group = focus ? FOCUS_GROUPS[focus] : undefined;
  const list = group
    ? services.filter((s) => group.slugs.includes(s.slug))
    : services;

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(242,74,29,0.07),_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(78,86,184,0.10),_transparent_50%)]" />
      <section className="relative isolate flex min-h-[72vh] flex-col overflow-hidden border-b border-graphite-700">
        {/* Full-bleed photo with a dark overlay so the centered white text stays legible */}
        <Image
          src={group?.hero ?? DEFAULT_HERO}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-black/55" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/65" />

        <Container size="default" className="relative pt-20 md:pt-24">
          <Breadcrumb
            onDark
            items={
              group
                ? [
                    { label: "Home", href: "/" },
                    { label: "Services", href: "/services" },
                    { label: group.label },
                  ]
                : [{ label: "Home", href: "/" }, { label: "Services" }]
            }
          />
        </Container>

        <Container
          size="default"
          className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 text-center md:py-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-400">
            {group ? group.label : "What we do"}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
            {group ? group.label : "Services"}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-7 text-white/80">
            {group
              ? group.lead
              : "Five services spanning the full governance, risk, and compliance lifecycle from regulatory interpretation to ongoing platform administration."}
          </p>
        </Container>
      </section>

      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container size="default">
          <RevealOnScroll>
            <ServicesBentoGrid services={list} />
          </RevealOnScroll>
        </Container>
      </section>

      {!group && (
        <section className="border-b border-graphite-700 py-20 md:py-28">
          <Container size="default" className="max-w-3xl">
            <SectionHeading
              eyebrow="How they connect"
              title="Services work better together"
              lead="Risk Advisory and Regulatory Compliance Consulting define what needs to be true. Oracle GRC and Oracle Risk Management Cloud implement it. Managed Support keeps it true after go-live."
            />
          </Container>
        </section>
      )}

      <CTASection title="Not sure which service applies?" lead="Describe the problem you're solving and we'll point you to the right starting point." />
    </div>
  );
}
