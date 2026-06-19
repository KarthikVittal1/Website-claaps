import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/global/Container";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { Badge } from "@/components/global/Badge";
import { CTASection } from "@/components/global/CTASection";
import { getServiceBySlug, services } from "@/lib/content/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container size="default" className="max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.shortTitle },
            ]}
          />
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.08em] text-cyan-700">
            {service.eyebrow}
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-6xl">
            {service.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.whoFor.map((role) => (
              <Badge key={role}>{role}</Badge>
            ))}
          </div>
          <p className="mt-6 text-lg leading-7 text-slate-400">{service.summary}</p>
        </Container>
      </section>

      <section className="border-b border-graphite-700 py-20 md:py-28">
        <Container size="default" className="max-w-3xl">
          <div className="flex flex-col gap-4">
            {service.description.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-slate-400">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold tracking-[-0.02em]">
            What&rsquo;s included
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {service.included.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-400">
                <Check aria-hidden size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-electric-400" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title={`Discuss ${service.shortTitle}`}
        lead="Tell us about your current setup and what's not working — we'll respond with concrete next steps."
        secondaryLabel="Back to all services"
        secondaryHref="/services"
      />
    </>
  );
}
