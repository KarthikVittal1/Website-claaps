import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { PlaceholderBlock } from "@/components/global/PlaceholderBlock";
import { CTASection } from "@/components/global/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Claaps Technology Services specializes in Oracle Governance, Risk & Compliance — why we focus exclusively on this domain, and how we engage.",
};

const processSteps = [
  {
    title: "Advisory",
    description:
      "Risk Advisory and Regulatory Compliance Consulting define the control framework, risk taxonomy, and evidence requirements before any system configuration begins.",
  },
  {
    title: "Implementation",
    description:
      "Oracle GRC and Oracle Risk Management Cloud are configured to that framework — not a generic template — then validated before handover.",
  },
  {
    title: "Managed Support",
    description:
      "Ongoing administration and rule tuning keep the platform aligned as business units, applications, and regulations change.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container size="default" className="max-w-3xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Oracle governance, risk, and compliance — and nothing else
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-400">
            Claaps Technology Services exists because Oracle GRC and Oracle
            Risk Management Cloud deserve a specialist, not a generalist
            systems integrator treating governance as one line item among
            many.
          </p>
        </Container>
      </section>

      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container size="default" className="max-w-3xl">
          <SectionHeading
            eyebrow="Why specialize"
            title="Depth over breadth, by design"
          />
          <p className="mt-6 text-base leading-7 text-slate-400">
            Generalist consultancies treat Oracle GRC as one module among
            dozens of Oracle Cloud products. That breadth comes at a cost:
            shallow configuration, generic control frameworks, and
            implementations that satisfy the letter of a requirement without
            holding up under audit scrutiny.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Claaps works exclusively in governance, risk, and regulatory
            compliance — primarily on the Oracle platform. That focus is the
            entire basis for the firm&rsquo;s positioning.
          </p>
        </Container>
      </section>

      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we engage"
            title="One lifecycle, one accountable team"
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <li key={step.title} className="rounded-lg border border-graphite-700 bg-navy-800 p-6">
                <span className="font-mono-data bg-gradient-to-r from-electric-500 to-purple-500 bg-clip-text text-2xl font-semibold text-transparent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-medium text-offwhite-50">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Leadership" title="Team" />
          <div className="mt-10">
            <PlaceholderBlock label="Team bios pending publication approval" />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Credentials" title="Certifications & partnerships" />
          <div className="mt-10 rounded-lg border border-graphite-700 bg-navy-800 p-8">
            <Image
              src="/oracle-partner-badge.jpg"
              alt="Claaps is an Oracle Partner"
              width={1440}
              height={226}
              className="h-auto w-full max-w-md"
            />
          </div>
        </Container>
      </section>

      <CTASection title="Get in touch" />
    </>
  );
}
