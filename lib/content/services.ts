export type Service = {
  slug: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string[];
  included: string[];
  whoFor: string[];
};

export const services: Service[] = [
  {
    slug: "oracle-grc",
    shortTitle: "Oracle GRC",
    title: "Oracle Governance, Risk & Compliance",
    eyebrow: "Implementation & Optimization",
    summary:
      "End-to-end design, implementation, and optimization of Oracle GRC so controls, risks, and policies live in one governed system instead of spreadsheets.",
    description: [
      "Oracle GRC consolidates control testing, policy management, and risk registers into a single platform — but only if it's configured around how your organization actually governs itself, not a generic template.",
      "Claaps designs the control framework, workflow, and reporting structure inside Oracle GRC to match your existing governance model, then implements and validates it before handover.",
    ],
    included: [
      "Control framework design and Oracle GRC configuration",
      "Workflow and approval routing for risk and control owners",
      "Migration of existing controls/risk registers into Oracle GRC",
      "Reporting and dashboard setup for audit and executive review",
      "Post-implementation validation and knowledge transfer",
    ],
    whoFor: ["CISO", "Audit Leaders", "Compliance Teams"],
  },
  {
    slug: "oracle-risk-management-cloud",
    shortTitle: "Oracle Risk Management Cloud",
    title: "Oracle Risk Management Cloud",
    eyebrow: "Implementation & Continuous Monitoring",
    summary:
      "Implementation of Oracle Risk Management Cloud for continuous controls monitoring, access certification, and segregation-of-duties enforcement.",
    description: [
      "Oracle Risk Management Cloud automates controls monitoring and access risk analysis across Oracle ERP and adjacent systems — reducing reliance on periodic manual review.",
      "Claaps configures segregation-of-duties rulesets, continuous control monitors, and certification cycles aligned to your risk taxonomy, then tunes false-positive rates so the system stays trusted and used.",
    ],
    included: [
      "Segregation-of-duties ruleset design and configuration",
      "Continuous controls monitoring setup",
      "Access certification workflow configuration",
      "Rule tuning to reduce false positives post go-live",
      "Integration with upstream Oracle ERP modules",
    ],
    whoFor: ["CISO", "Risk Leaders", "Audit Leaders"],
  },
  {
    slug: "regulatory-compliance-consulting",
    shortTitle: "Regulatory Compliance Consulting",
    title: "Regulatory Compliance Consulting",
    eyebrow: "Advisory",
    summary:
      "Independent advisory to interpret applicable regulatory requirements and translate them into control design and evidence requirements.",
    description: [
      "Regulatory obligations rarely arrive in a form that maps cleanly to a control framework. Claaps works with compliance and legal stakeholders to interpret requirements and translate them into testable controls.",
      "This is advisory work, not a managed compliance guarantee — Claaps does not certify compliance on a client's behalf; the goal is to equip internal teams with a defensible control design and evidence trail.",
    ],
    included: [
      "Regulatory requirement interpretation and gap analysis",
      "Control design mapped to specific regulatory citations",
      "Evidence and documentation standards definition",
      "Stakeholder workshops with compliance, legal, and audit",
      "Remediation roadmap for identified gaps",
    ],
    whoFor: ["Compliance Teams", "Audit Leaders", "CIO"],
  },
  {
    slug: "risk-advisory",
    shortTitle: "Risk Advisory",
    title: "Risk Advisory",
    eyebrow: "Advisory",
    summary:
      "Enterprise risk advisory covering risk taxonomy design, risk appetite framing, and risk reporting structure for executive and board audiences.",
    description: [
      "Many enterprise risk programs accumulate risks faster than they retire them. Claaps helps risk leaders rationalize the risk register, define a consistent taxonomy, and build reporting that executives actually use.",
      "Engagements are scoped to specific decisions — a board reporting redesign, a risk appetite statement, a taxonomy overhaul — rather than open-ended advisory retainers.",
    ],
    included: [
      "Risk taxonomy design and register rationalization",
      "Risk appetite and tolerance framing",
      "Executive and board-level risk reporting design",
      "Risk scoring methodology review",
      "Facilitated workshops with risk owners",
    ],
    whoFor: ["Risk Leaders", "CIO", "Audit Leaders"],
  },
  {
    slug: "managed-support",
    shortTitle: "Managed Support",
    title: "Managed Support",
    eyebrow: "Ongoing Operations",
    summary:
      "Ongoing administration, rule tuning, and release management for Oracle GRC and Risk Management Cloud after go-live.",
    description: [
      "GRC and risk platforms degrade in usefulness without ongoing tuning — new business units, new applications, and new regulations all require configuration changes.",
      "Claaps provides ongoing administration so internal teams aren't left managing platform upkeep alongside their primary compliance and risk responsibilities.",
    ],
    included: [
      "Ongoing platform administration and configuration changes",
      "Quarterly rule and control effectiveness review",
      "Oracle release/patch impact assessment",
      "User access and role administration support",
      "Defined response-time service levels (per signed agreement)",
    ],
    whoFor: ["CIO", "CISO", "Compliance Teams"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
