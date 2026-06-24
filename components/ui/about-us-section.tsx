"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  BarChart3,
  FileCheck2,
  BrainCircuit,
  Compass,
  LifeBuoy,
  Award,
  ClipboardCheck,
  Zap,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";
import { BackgroundGradientGlow } from "@/components/ui/background-gradient-glow";

type ServiceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  image: string;
};

export default function AboutUsSection() {
  const services: ServiceCard[] = [
    {
      icon: ShieldCheck,
      title: "Oracle GRC",
      description:
        "End-to-end design and configuration of Oracle Governance, Risk & Compliance Cloud, built around how your organization actually governs itself.",
      href: "/services/oracle-grc",
      image: "/images/services/oracle-grc.png",
    },
    {
      icon: BarChart3,
      title: "Risk Management Cloud",
      description:
        "Continuous controls monitoring, access certification, and segregation-of-duties enforcement across Oracle ERP and adjacent systems.",
      href: "/services/oracle-risk-management-cloud",
      image: "/images/services/risk-management-cloud.png",
    },
    {
      icon: FileCheck2,
      title: "Regulatory Compliance",
      description:
        "Independent advisory to interpret regulatory requirements and translate them into testable controls with the citations they need.",
      href: "/services/regulatory-compliance-consulting",
      image: "/images/services/regulatory-compliance.png",
    },
    {
      icon: BrainCircuit,
      title: "AI Solutions",
      description:
        "Autonomous agents, RPA, and chatbots that automate processes, analyze data, and drive smarter decisions across your business.",
      href: "/services",
      image: "/images/services/ai-solutions.png",
    },
    {
      icon: LifeBuoy,
      title: "Managed Support",
      description:
        "Ongoing administration and rule tuning after go-live, from the same team that designed the controls in the first place.",
      href: "/services/managed-support",
      image: "/images/services/managed-support.png",
    },
    {
      icon: Compass,
      title: "Risk Advisory",
      description:
        "Risk taxonomy design, risk appetite framing, and board-level reporting for risk leaders rationalizing a fast-growing register.",
      href: "/services/risk-advisory",
      image: "/images/services/risk-advisory.png",
    },
  ];

  const stats = [
    { icon: <Award />, value: 15, label: "Oracle GRC / RMC Implementations", suffix: "+" },
    { icon: <ClipboardCheck />, value: 20, label: "GRC Support Projects", suffix: "+" },
    { icon: <LifeBuoy />, value: 24, label: "Support Infrastructure", suffix: "/7" },
  ];

  return (
    <section
      id="about-section"
      className="relative z-10 w-full scroll-mt-20 overflow-hidden rounded-t-[2.5rem] px-4 py-24 text-offwhite-50 shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.55)] md:rounded-t-[3.5rem] md:py-32"
    >
      <BackgroundGradientGlow />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-center">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-cyan-700">
            <Zap className="h-4 w-4" />
            Who we are
          </span>
          <h2 className="mb-4 text-center text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
            About Claaps Technology Services
          </h2>
          <div className="h-1 w-24 bg-cyan-700" />
        </div>

        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-7 text-slate-600">
          Claaps Technology Services exists to help organizations manage risk and
          compliance challenges effectively. As a specialist provider of risk
          management solutions, we focus exclusively on Oracle GRC and Oracle Risk
          Management Cloud implementation, advisory, and ongoing support — in one
          accountable team.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.title}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-graphite-700 bg-white shadow-elevation-1 transition-all duration-300 hover:-translate-y-1.5 hover:border-electric-500/40 hover:shadow-elevation-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                  <Image
                    src={service.image}
                    alt={`${service.title} dashboard illustration`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-graphite-700 bg-white/95 text-electric-600 shadow-elevation-1 backdrop-blur-sm transition-colors duration-300 group-hover:text-cyan-700">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-offwhite-50 transition-colors duration-300 group-hover:text-electric-600">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors duration-300 group-hover:text-electric-600">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
}

function StatCounter({ icon, value, label, suffix }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <div className="group flex flex-col items-center rounded-2xl border border-graphite-700 bg-white/70 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-offwhite-50/5 text-cyan-700 transition-colors duration-300 group-hover:bg-cyan-700/10">
        {icon}
      </div>
      <div ref={countRef} className="flex items-center text-3xl font-bold text-offwhite-50">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
      <div className="mt-3 h-0.5 w-10 bg-cyan-700 transition-all duration-300 group-hover:w-16" />
    </div>
  );
}
