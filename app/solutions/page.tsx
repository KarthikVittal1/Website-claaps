import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { CTASection } from "@/components/global/CTASection";
import { RoleTabs } from "@/components/solutions/RoleTabs";
import { roles } from "@/lib/content/solutions";
import { getServiceBySlug } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Solutions by Role",
  description:
    "What Claaps does for CIOs, CISOs, audit leaders, compliance teams, and risk leaders by role, not by internal service taxonomy.",
};

const engagementTypes: Record<string, string> = {
  "oracle-grc": "Implementation",
  "oracle-risk-management-cloud": "Implementation",
  "regulatory-compliance-consulting": "Advisory",
  "risk-advisory": "Advisory",
  "managed-support": "Managed Support",
};

export default function SolutionsPage() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Hero ── full-bleed image, centered text */}
      <section className="relative isolate flex min-h-[78vh] flex-col overflow-hidden">
        <Image
          src="/images/solutions-hero.jpg"
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
            items={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
          />
        </Container>

        <Container
          size="default"
          className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 text-center md:py-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-400">
            Solutions by role
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
            Find the path that matches your responsibility
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-7 text-white/80">
            Enterprise risk and compliance problems map to roles, not to a vendor&rsquo;s internal service catalog. Select your role to see the risks, services, and next step that apply.
          </p>
        </Container>
      </section>

      <section className="border-b border-graphite-700 py-16 md:py-20">
        <Container size="default" className="max-w-3xl">
          <RoleTabs roles={roles} />
        </Container>
      </section>

      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Solution map" title="Role, service, and engagement type" />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-graphite-700 text-slate-400">
                  <th scope="col" className="py-3 pr-6 font-medium">
                    Role
                  </th>
                  <th scope="col" className="py-3 pr-6 font-medium">
                    Relevant Service
                  </th>
                  <th scope="col" className="py-3 pr-6 font-medium">
                    Typical Engagement
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.flatMap((role) =>
                  role.relatedServiceSlugs.map((slug) => {
                    const service = getServiceBySlug(slug);
                    if (!service) return null;
                    return (
                      <tr key={`${role.slug}-${slug}`} className="border-b border-graphite-700/60">
                        <td className="py-3 pr-6 text-offwhite-50">{role.label}</td>
                        <td className="py-3 pr-6 text-slate-400">{service.shortTitle}</td>
                        <td className="py-3 pr-6 text-slate-400">{engagementTypes[slug]}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <CTASection
        title="Talk to us about your role-specific risk program"
        lead="Tell us your role and the problem you're solving we'll point you to the right service."
      />
    </div>
  );
}
