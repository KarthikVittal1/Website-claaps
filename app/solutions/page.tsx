import type { Metadata } from "next";
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
    "What Claaps does for CIOs, CISOs, audit leaders, compliance teams, and risk leaders — by role, not by internal service taxonomy.",
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
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(242,74,29,0.07),_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(78,86,184,0.10),_transparent_50%)]" />
      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
          <SectionHeading
            as="h1"
            eyebrow="Solutions by role"
            title="Find the path that matches your responsibility"
            lead="Enterprise risk and compliance problems map to roles, not to a vendor's internal service catalog. Select your role to see the risks, services, and next step that apply."
            className="mt-6"
          />
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
        lead="Tell us your role and the problem you're solving — we'll point you to the right service."
      />
    </div>
  );
}
