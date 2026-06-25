import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content/services";

// Relatable, professional human photography per service (Unsplash, verified to
// load). Swap any of these for Claaps' own team/office photos when available.
const serviceImages: Record<string, string> = {
  "oracle-grc":
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
  "oracle-risk-management-cloud":
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
  "regulatory-compliance-consulting":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
  "risk-advisory":
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
  "managed-support":
    "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=800&auto=format&fit=crop",
  "rpa-uipath":
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  "ai-agents":
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  "ai-chatbots":
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=800&auto=format&fit=crop",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop";

export function ServicesGrid() {
  return (
    <div>
      <div className="mb-10 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan-700">
          What we do
        </span>
        <h3 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-offwhite-50 md:text-4xl">
          Our Services
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-graphite-700 bg-navy-950 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-700/40 hover:shadow-xl"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={serviceImages[service.slug] ?? FALLBACK_IMAGE}
                alt={service.shortTitle}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan-700">
                {service.eyebrow}
              </p>
              <h4 className="mt-1.5 text-lg font-semibold text-offwhite-50">
                {service.shortTitle}
              </h4>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                {service.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {service.whoFor.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-graphite-700 px-2.5 py-0.5 text-xs text-slate-400"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-cyan-700">
                Learn more
                <ArrowRight
                  className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
