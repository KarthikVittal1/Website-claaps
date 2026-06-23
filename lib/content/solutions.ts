export type Role = {
  slug: string;
  label: string;
  risks: string[];
  relatedServiceSlugs: string[];
  ctaLabel: string;
};

export const roles: Role[] = [
  {
    slug: "cio",
    label: "CIO",
    risks: [
      "Fragmented governance tooling across business units increases audit overhead",
      "Oracle ERP investment underdelivers without a connected risk/compliance layer",
      "IT-led compliance initiatives stall without a credible Oracle GRC implementation partner",
    ],
    relatedServiceSlugs: ["oracle-grc", "oracle-risk-management-cloud", "managed-support"],
    ctaLabel: "Talk to us about IT-led governance programs",
  },
  {
    slug: "ciso",
    label: "CISO",
    risks: [
      "Access risk and segregation-of-duties violations go undetected between audit cycles",
      "Security and compliance controls are tracked in disconnected systems",
      "Continuous monitoring is configured but generates too much noise to act on",
    ],
    relatedServiceSlugs: ["oracle-risk-management-cloud", "oracle-grc", "managed-support"],
    ctaLabel: "Talk to us about continuous controls monitoring",
  },
  {
    slug: "audit-leaders",
    label: "Audit Leaders",
    risks: [
      "Control testing evidence is scattered across spreadsheets and email",
      "Audit findings recur because remediation isn't tracked in the system of record",
      "Reporting to the audit committee takes days to assemble manually",
    ],
    relatedServiceSlugs: ["oracle-grc", "regulatory-compliance-consulting", "risk-advisory"],
    ctaLabel: "Talk to us about audit-ready control evidence",
  },
  {
    slug: "compliance-teams",
    label: "Compliance Teams",
    risks: [
      "New regulatory requirements lack a clear mapping to existing controls",
      "Policy attestation and evidence collection remain manual processes",
      "Compliance reporting can't keep pace with the rate of regulatory change",
    ],
    relatedServiceSlugs: ["regulatory-compliance-consulting", "oracle-grc", "managed-support"],
    ctaLabel: "Talk to us about regulatory mapping and controls",
  },
  {
    slug: "risk-leaders",
    label: "Risk Leaders",
    risks: [
      "The risk register has grown faster than the organization's ability to act on it",
      "Risk appetite isn't consistently applied across business units",
      "Board-level risk reporting doesn't reflect operational risk data in real time",
    ],
    relatedServiceSlugs: ["risk-advisory", "oracle-risk-management-cloud", "regulatory-compliance-consulting"],
    ctaLabel: "Talk to us about enterprise risk programs",
  },
  {
    slug: "products",
    label: "Products",
    risks: [
      "Teams need purpose-built tools, not generic platforms adapted for GRC and compliance",
      "Off-the-shelf products don't reflect how your organization actually governs risk",
      "Implementation complexity delays time-to-value on software investments",
    ],
    relatedServiceSlugs: ["rpa-uipath", "ai-agents", "ai-chatbots"],
    ctaLabel: "Explore our products",
  },
];

export function getRoleBySlug(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
