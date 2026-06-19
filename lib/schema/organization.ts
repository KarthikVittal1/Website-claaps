export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Claaps Technology Services",
    description:
      "Oracle Governance, Risk & Compliance specialists providing Oracle GRC, Oracle Risk Management Cloud, regulatory compliance consulting, risk advisory, and managed support.",
    url: "https://claaps.com",
    areaServed: "Global",
    serviceType: [
      "Oracle GRC",
      "Oracle Risk Management Cloud",
      "Regulatory Compliance Consulting",
      "Risk Advisory",
      "Managed Support",
    ],
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Claaps Technology Services",
    url: "https://claaps.com/contact",
  };
}
