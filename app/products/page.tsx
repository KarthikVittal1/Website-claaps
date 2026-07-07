import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/global/Container";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { CTASection } from "@/components/global/CTASection";
import { getServiceBySlug } from "@/lib/content/services";
import { getRoleBySlug } from "@/lib/content/solutions";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Products designed, built, and deployed by Claaps - including CricPredict, our live cricket match-prediction web app.",
};

export default function ProductsPage() {
  const products = getRoleBySlug("products");
  const project = products?.project;

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
            items={[{ label: "Home", href: "/" }, { label: "Products" }]}
          />
        </Container>

        <Container
          size="default"
          className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 text-center md:py-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-400">
            Products
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
            Products we&rsquo;ve built
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-7 text-white/80">
            Purpose-built applications designed, built, and deployed end-to-end by Claaps.
          </p>
        </Container>
      </section>

      {/* ── Product showcase ── */}
      <section className="border-b border-graphite-700 py-16 md:py-20">
        <Container size="default" className="max-w-3xl">
          {project && (
            <div className="group relative overflow-hidden rounded-3xl border border-white/10">
              {/* Full-bleed background image */}
              <Image
                src="/images/cricpredict-hero.jpg"
                alt="Cricket match prediction data science visualization"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Dark overlay so text stays readable */}
              <div aria-hidden className="absolute inset-0 bg-black/35" />
              {/* Left-side extra darkening for text legibility */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

              {/* Content */}
              <div className="relative flex flex-col justify-center p-8 md:p-10">
                <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Prediction Engine", "Live Data", "Claaps-Built"].map((tag) => (
                    <span key={tag} className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-slate-300 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-graphite-900 transition-all duration-200 hover:bg-white/90 hover:scale-[1.02]"
                >
                  Visit {project.title}
                  <ExternalLink size={13} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          )}

          {products && products.relatedServiceSlugs.length > 0 && (
            <>
              <h3 className="mt-12 text-sm font-medium uppercase tracking-[0.06em] text-cyan-700">
                Built with
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {products.relatedServiceSlugs.map((slug) => {
                  const service = getServiceBySlug(slug);
                  if (!service) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/services/${slug}`}
                      className="rounded-md border border-graphite-700 px-4 py-2 text-sm transition-colors duration-150 hover:border-electric-500/40 hover:text-electric-600"
                    >
                      {service.shortTitle}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </Container>
      </section>

      <CTASection
        title="Have a product in mind?"
        lead="Tell us what you're trying to build and we'll help you scope it."
      />
    </div>
  );
}
