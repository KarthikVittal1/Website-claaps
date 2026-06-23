"use client";

import type React from "react";

import { useEffect, useRef } from "react";
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
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  type Variants,
} from "framer-motion";
import { BackgroundGradientGlow } from "@/components/ui/background-gradient-glow";

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
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

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Oracle GRC",
      description:
        "End-to-end design and configuration of Oracle Governance, Risk & Compliance Cloud built around how your organization actually governs itself, not a generic template.",
      href: "/services/oracle-grc",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Risk Management Cloud",
      description:
        "Continuous controls monitoring, access certification, and segregation-of-duties enforcement across Oracle ERP and adjacent systems.",
      href: "/services/oracle-risk-management-cloud",
    },
    {
      icon: <FileCheck2 className="w-5 h-5" />,
      title: "Regulatory Compliance",
      description:
        "Independent advisory to interpret regulatory requirements and translate them into testable controls with the citations they need to satisfy.",
      href: "/services/regulatory-compliance-consulting",
    },
    {
      icon: <BrainCircuit className="w-5 h-5" />,
      title: "AI Solutions",
      description:
        "Leverage AI to automate processes, analyze data, and drive smarter decisions. We design and implement scalable AI solutions tailored to your business goals.",
      href: "/services",
    },
    {
      icon: <LifeBuoy className="w-5 h-5" />,
      title: "Managed Support",
      description:
        "Ongoing administration and rule tuning after go-live, from the same team that designed the controls in the first place.",
      href: "/services/managed-support",
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Risk Advisory",
      description:
        "Risk taxonomy design, risk appetite framing, and board-level reporting for risk leaders rationalizing a fast-growing register.",
      href: "/services/risk-advisory",
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
      ref={sectionRef}
      className="relative z-10 w-full scroll-mt-20 overflow-hidden rounded-t-[2.5rem] px-4 py-24 text-offwhite-50 shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.55)] md:rounded-t-[3.5rem] md:py-32"
    >
      <BackgroundGradientGlow />

      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-cyan-700/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-electric-400/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-cyan-700/30"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-electric-400/30"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-cyan-700 font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.08em]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            Who we are
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] mb-4 text-center">
            About Claaps Technology Services
          </h2>
          <motion.div
            className="w-24 h-1 bg-cyan-700"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p className="text-center max-w-2xl mx-auto mb-16 text-lg leading-7 text-slate-600" variants={itemVariants}>
          Claaps Technology Services exists to help organizations manage risk
          and compliance challenges effectively. As a specialist provider of
          risk management solutions, we focus exclusively on Oracle GRC and
          Oracle Risk Management Cloud implementation, advisory, and
          ongoing support, in one accountable team.
        </motion.p>

        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.a
                key={service.title}
                href={service.href}
                className="group flex flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-600 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-cyan-700 transition-all duration-300 group-hover:border-cyan-600/40 group-hover:bg-cyan-50 group-hover:text-cyan-600">
                    {service.icon}
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-cyan-700">
                    {service.title}
                  </h3>
                </div>
                <p className="flex-1 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors duration-300 group-hover:text-cyan-600">
                  Explore service
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
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
        </motion.div>
      </motion.div>
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
  const isInView = useInView(countRef, { once: false });
  // Just gates the spring trigger below — doesn't drive any render, so a
  // ref avoids the cascading-setState-in-effect lint rule a useState would.
  const hasAnimatedRef = useRef(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      springValue.set(value);
      hasAnimatedRef.current = true;
    } else if (!isInView && hasAnimatedRef.current) {
      springValue.set(0);
      hasAnimatedRef.current = false;
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300 border border-graphite-700"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-offwhite-50/5 flex items-center justify-center mb-4 text-cyan-700 group-hover:bg-cyan-700/10 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-offwhite-50 flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-cyan-700 mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}
