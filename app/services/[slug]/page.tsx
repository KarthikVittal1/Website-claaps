import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/global/Container";
import { Breadcrumb } from "@/components/global/Breadcrumb";
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
    <div>
      {/* ── Hero ── full-bleed image, centered text */}
      <section className="relative isolate flex min-h-[78vh] flex-col overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay so white text is always legible */}
        <div aria-hidden className="absolute inset-0 bg-black/55" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/65" />

        {/* Breadcrumb — top left */}
        <Container size="default" className="relative pt-20 md:pt-24">
          <Breadcrumb
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.shortTitle },
            ]}
          />
        </Container>

        {/* Centered hero copy */}
        <Container
          size="default"
          className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 text-center md:py-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-400">
            {service.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-7 text-white/80">
            {service.summary}
          </p>
        </Container>
      </section>

      {/* ── Body ── clean white section below the image */}
      <section className="border-b border-graphite-700 bg-white">
        <Container size="default" className="max-w-3xl py-16 md:py-24">
          <div className="flex flex-col gap-5">
            {service.description.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-offwhite-100">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.02em] text-offwhite-50">
            What&rsquo;s included
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {service.included.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-offwhite-100">
                <Check aria-hidden size={16} strokeWidth={2} className="mt-1 shrink-0 text-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title={`Discuss ${service.shortTitle}`}
        lead="Tell us about your current setup and what's not working we'll respond with concrete next steps."
        secondaryLabel="Back to all services"
        secondaryHref="/services"
      />
    </div>
  );
}
