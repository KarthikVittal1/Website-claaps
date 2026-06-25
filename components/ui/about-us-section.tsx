"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { LifeBuoy, Award, ClipboardCheck, Zap } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  type Variants,
} from "framer-motion";
import { BackgroundGradientGlow } from "@/components/ui/background-gradient-glow";
import { ServicesGrid } from "@/components/ui/services-grid";

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const stats = [
    { icon: <Award />, value: 15, label: "Oracle GRC / RMC Implementations", suffix: "+" },
    { icon: <ClipboardCheck />, value: 20, label: "GRC Support Projects", suffix: "+" },
    { icon: <LifeBuoy />, value: 24, label: "Support Infrastructure", suffix: "/7" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative z-10 w-full scroll-mt-20 overflow-hidden rounded-t-[2.5rem] px-4 py-24 text-offwhite-50 shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.55)] md:rounded-t-[3.5rem] md:py-32"
    >
      <BackgroundGradientGlow />

      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-cyan-700/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-electric-400/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="text-cyan-700 font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.08em]">
            <Zap className="w-4 h-4" />
            Who we are
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] mb-4 text-center">
            About Claaps Technology Services
          </h2>
          <div className="w-24 h-1 bg-cyan-700" />
        </div>

        <div className="mb-16 space-y-4 text-base leading-7 text-slate-600">
          <p>Welcome to Claaps Technology Services, where industry-leading subject matter experts are dedicated to helping organizations manage risks and compliance challenges effectively. As a leading provider of risk management solutions, we specialize in Oracle GRC/Risk Management Cloud implementation and support, as well as regulatory compliance consulting services.</p>
          <p>Our team of experts has extensive experience and knowledge in designing and implementing customized solutions that meet the specific needs of our clients. We work closely with our clients to understand their unique challenges and deliver tailored solutions that align with their strategic objectives.</p>
          <p>At Claaps Technology Services, we are committed to delivering the best value to our clients by providing high-quality services that meet their expectations. Contact us today to learn more about how we can help your organization manage risks and compliance challenges effectively.</p>
        </div>

        <ServicesGrid />

        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
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
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300 border border-graphite-700">
      <div className="w-14 h-14 rounded-full bg-offwhite-50/5 flex items-center justify-center mb-4 text-cyan-700 group-hover:bg-cyan-700/10 transition-colors duration-300">
        {icon}
      </div>
      <div ref={countRef} className="text-3xl font-bold text-offwhite-50 flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
      <div className="w-10 h-0.5 bg-cyan-700 mt-3 group-hover:w-16 transition-all duration-300" />
    </div>
  );
}
