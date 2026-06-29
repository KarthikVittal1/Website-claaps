import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(242,74,29,0.07),_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(78,86,184,0.10),_transparent_50%)]" />
      <section className="relative isolate overflow-hidden border-b border-graphite-700">
        {/* Full-bleed service photo behind the whole section, brightened so dark text stays legible */}
        <Image
          src={service.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-white/55" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/45 to-white/80"
        />

        {/* Hero */}
        <Container size="default" className="relative max-w-3xl pt-20 md:pt-28">
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
          <h1 className="mt-3 text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-offwhite-50 md:text-6xl">
            {service.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.whoFor.map((role) => (
              <Badge key={role}>{role}</Badge>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-7 text-offwhite-100">{service.summary}</p>
        </Container>

        {/* Body */}
        <Container size="default" className="relative max-w-3xl pb-20 pt-12 md:pb-28 md:pt-16">
          <div className="flex flex-col gap-4">
            {service.description.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-offwhite-100">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold tracking-[-0.02em] text-offwhite-50">
            What&rsquo;s included
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {service.included.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-offwhite-100">
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
    </div>
  );
}
