export type Project = {
  title: string;
  url: string;
  description: string;
  highlights?: string[];
};

export type Role = {
  slug: string;
  label: string;
  risks: string[];
  relatedServiceSlugs: string[];
  ctaLabel: string;
  project?: Project;
};

export const roles: Role[] = [
  {
    slug: "products",
    label: "Products",
    risks: [
      "Teams need purpose-built tools, not generic platforms adapted for GRC and compliance",
      "Off-the-shelf products don't reflect how your organization actually governs risk",
      "Implementation complexity delays time-to-value on software investments",
    ],
    relatedServiceSlugs: ["ai-agents", "ai-chatbots"],
    ctaLabel: "Explore our products",
    project: {
      title: "CricPredict",
      url: "https://cricpredict.claaps.com/",
      description:
        "A live cricket match-prediction web app, designed, built, and deployed end-to-end by Claaps. It turns cricket data into fast, on-demand match predictions through a clean, responsive web interface.",
      highlights: [
        "Designed, built, and deployed end-to-end by the Claaps team",
        "Turns cricket data into on-demand match predictions",
        "Live and publicly accessible, running on Claaps infrastructure",
      ],
    },
  },
];

export function getRoleBySlug(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
