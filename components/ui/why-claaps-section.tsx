import Image from "next/image";
import {
  MapPin,
  ClipboardList,
  Award,
  Building2,
  Percent,
  Handshake,
  Network,
  Target,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { TiltCard } from "@/components/ui/tilt-card";

const reasons: { icon: LucideIcon; headline: string; sub: string; image: string }[] = [
  {
    icon: MapPin,
    headline: "Best-in-Class Expertise",
    sub: "Deep technology expertise across the Oracle GRC stack.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: ClipboardList,
    headline: "Full Lifecycle Delivery",
    sub: "Implementation, migration, support and audit — one accountable team.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Award,
    headline: "Senior-Level Specialists",
    sub: "World-class experts in Oracle GRC and Risk Management Cloud.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Building2,
    headline: "Deep Domain Knowledge",
    sub: "Core expertise in financial, supply chain and procurement.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Percent,
    headline: "65% Lower Cost",
    sub: "Less spend on implementation and support — same quality, same schedule.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Handshake,
    headline: "SLA-Backed Delivery",
    sub: "Strict adherence to Service Level Agreements.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Network,
    headline: "Built to Scale",
    sub: "Innovative, scalable solutions tailored to your needs.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Target,
    headline: "Global Delivery Model",
    sub: "Integrated delivery that brings down total cost.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
  },
];

export default function WhyClaapsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-electric-600 to-electric-500 py-24 md:py-32">
      <div className="pointer-events-none absolute -top-1/4 -right-1/4 size-[60%] rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-1/4 -left-1/4 size-[55%] rounded-full bg-cyan-700/15 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.08em] text-white/70">
          Why Claaps
        </p>
        <h2 className="mt-3 text-center text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
          Why work with Claaps?
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <RevealOnScroll key={reason.headline} delay={i * 0.05}>
                <TiltCard className="h-full" floatDelay={i * 0.25}>
                  <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 text-center shadow-elevation-2 backdrop-blur-xl">
                    <div className="relative h-28 w-full overflow-hidden">
                      <Image
                        src={reason.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-electric-600 via-electric-600/30 to-transparent" />
                    </div>
                    <div className="relative -mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white text-electric-600 shadow-elevation-1">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <p className="relative mt-3 px-5 text-base font-semibold leading-snug text-white">
                      {reason.headline}
                    </p>
                    <p className="relative mt-1.5 px-5 pb-6 text-xs leading-snug text-white/70">
                      {reason.sub}
                    </p>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
