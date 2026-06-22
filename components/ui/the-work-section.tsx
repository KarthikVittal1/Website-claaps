"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  BarChart3,
  LifeBuoy,
  FileCheck2,
  BrainCircuit,
  Workflow,
  Bot,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/cn";

type WorkItem = {
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

// Ordered as a narrative: the four governed-controls services first, then the
// three AI/automation offerings — mirroring the section's "from governed
// controls to AI-driven insight" headline.
const workItems: WorkItem[] = [
  {
    category: "Implementation",
    title: "Oracle GRC",
    description:
      "End-to-end design and configuration of Oracle Governance, Risk & Compliance — control frameworks, workflows, and reporting built around how your organization actually governs itself, not a generic template.",
    icon: ShieldCheck,
  },
  {
    category: "Implementation",
    title: "Oracle Risk Management Cloud",
    description:
      "We design and configure Oracle RMC for continuous controls monitoring, access certification, and segregation-of-duties enforcement — tuned to your risk model so the platform stays trusted and used.",
    icon: BarChart3,
  },
  {
    category: "Managed Support",
    title: "Oracle GRC Support, 24/7",
    description:
      "Ongoing administration, rule tuning, and incident response from the same specialists who designed your controls — so the platform keeps pace with your business after go-live.",
    icon: LifeBuoy,
  },
  {
    category: "Advisory",
    title: "Regulatory Compliance",
    description:
      "We interpret evolving regulatory requirements and translate them into testable, audit-ready controls — complete with the citations your auditors and board expect.",
    icon: FileCheck2,
  },
  {
    category: "AI & Analytics",
    title: "AI-Driven Risk Intelligence",
    description:
      "Machine-learning models layered over your Oracle risk data surface emerging control failures and anomalous access patterns before they become audit findings — turning historical compliance data into forward-looking risk signals.",
    icon: BrainCircuit,
  },
  {
    category: "Automation",
    title: "Intelligent Controls Automation",
    description:
      "We automate the repetitive mechanics of GRC — evidence collection, control testing, and exception triage — with AI-assisted workflows, freeing specialists to focus on judgment-intensive risk decisions.",
    icon: Workflow,
  },
  {
    category: "AI Advisory",
    title: "Generative AI Risk Copilots",
    description:
      "Purpose-built copilots help control owners interpret regulatory language, draft control narratives, and query their risk posture in plain English — grounded in your own governance data, with full auditability.",
    icon: Bot,
  },
];

export function TheWorkSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  // Mirror Embla's internal selection/snap state into React so the dots and the
  // "active" card highlight can react to it. reInit fires on breakpoint changes
  // (slides-per-view shifts), which can change the number of snap points.
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setSnaps(api.scrollSnapList());
      onSelect();
    };
    onReInit();
    api.on("select", onSelect);
    api.on("reInit", onReInit);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  return (
    <section className="border-b border-graphite-700 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="The work"
          title="From governed controls to AI-driven insight"
          lead="Specialist Oracle GRC delivery, extended with automation and AI that turn compliance data into foresight."
        />

        <Carousel
          className="mt-12"
          setApi={setApi}
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent>
            {workItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === selected;
              return (
                <CarouselItem key={item.title} className="md:basis-1/2 lg:basis-1/3">
                  <article
                    className={cn(
                      "flex h-full flex-col rounded-2xl border p-8 transition-all duration-300",
                      isActive
                        ? "border-electric-500/40 bg-gradient-to-b from-electric-500/[0.07] to-transparent shadow-elevation-2"
                        : "border-graphite-700 bg-navy-800 shadow-elevation-1"
                    )}
                  >
                    <span
                      className={cn(
                        "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300",
                        isActive
                          ? "bg-electric-500/15 text-electric-600"
                          : "bg-electric-500/10 text-electric-500"
                      )}
                    >
                      <Icon className="h-6 w-6" aria-hidden strokeWidth={1.75} />
                    </span>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-electric-600">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-xl font-medium text-offwhite-50">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Controls: previous arrow · pagination dots · next arrow */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite-700 text-offwhite-50 transition-colors duration-150 hover:border-electric-500/40 hover:text-electric-600"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex items-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === selected
                    ? "w-6 bg-electric-500"
                    : "w-2 bg-graphite-500 hover:bg-electric-400"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite-700 text-offwhite-50 transition-colors duration-150 hover:border-electric-500/40 hover:text-electric-600"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </Container>
    </section>
  );
}
