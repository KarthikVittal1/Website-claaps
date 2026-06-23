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
  {
    slug: "rpa-uipath",
    shortTitle: "RPA — UiPath",
    title: "Robotic Process Automation with UiPath",
    eyebrow: "Automation",
    summary:
      "Design and deployment of UiPath automation bots to eliminate manual, repetitive tasks across finance, compliance, and operations.",
    description: [
      "Repetitive processes — reconciliations, access reviews, report generation — consume hours of skilled staff time that could be directed at higher-value work. UiPath automates these at scale.",
      "Claaps designs, builds, and deploys UiPath bots aligned to your process map, with built-in exception handling and audit trails that satisfy compliance requirements.",
    ],
    included: [
      "Process discovery and automation candidate assessment",
      "UiPath bot design, development, and testing",
      "Exception handling and escalation workflow configuration",
      "Integration with ERP, GRC, and downstream systems",
      "Hypercare support and handover to internal bot owners",
    ],
    whoFor: ["CIO", "Compliance Teams", "Risk Leaders"],
  },
  {
    slug: "ai-agents",
    shortTitle: "AI Agents",
    title: "AI Agents",
    eyebrow: "Artificial Intelligence",
    summary:
      "Autonomous AI agents that complete multi-step tasks, make contextual decisions, and integrate with your existing business systems.",
    description: [
      "AI agents go beyond chatbots — they reason across tools, retrieve live data, and execute tasks end-to-end without human hand-holding at each step.",
      "Claaps designs and deploys agents scoped to specific business workflows: controls monitoring, evidence collection, regulatory change detection, and operational reporting.",
    ],
    included: [
      "Agent scoping and use-case prioritisation workshop",
      "Tool and data integration architecture",
      "Agent prompt and workflow engineering",
      "Testing, guardrails, and human-in-the-loop checkpoints",
      "Monitoring, logging, and ongoing tuning",
    ],
    whoFor: ["CIO", "Risk Leaders", "Compliance Teams"],
  },
  {
    slug: "ai-chatbots",
    shortTitle: "AI Chatbots",
    title: "AI Chatbots",
    eyebrow: "Artificial Intelligence",
    summary:
      "Custom AI chatbots for internal helpdesk, compliance Q&A, and customer-facing support — trained on your policies and integrated with your systems.",
    description: [
      "Generic AI assistants aren't trained on your policies, your controls, or your risk taxonomy. Claaps builds chatbots grounded in your actual documentation.",
      "Deployable across web, Teams, or Slack, with retrieval-augmented generation (RAG) ensuring answers are traceable to source documents rather than hallucinated.",
    ],
    included: [
      "Use-case definition and channel selection",
      "Knowledge base preparation and document ingestion",
      "RAG pipeline design and LLM selection",
      "Integration with Teams, Slack, or web embed",
      "Testing, accuracy benchmarking, and feedback loop setup",
    ],
    whoFor: ["CIO", "Compliance Teams", "Audit Leaders"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
