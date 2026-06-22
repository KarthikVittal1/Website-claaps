"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  BarChart3,
  FileCheck2,
  Compass,
  LifeBuoy,
  Award,
  ClipboardCheck,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
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
      icon: <ShieldCheck className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-electric-400" />,
      title: "Oracle GRC",
      description:
        "End-to-end design and configuration of Oracle Governance, Risk & Compliance Cloud — built around how your organization actually governs itself, not a generic template.",
      position: "left" as const,
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-electric-400" />,
      title: "Risk Management Cloud",
      description:
        "Continuous controls monitoring, access certification, and segregation-of-duties enforcement across Oracle ERP and adjacent systems.",
      position: "left" as const,
    },
    {
      icon: <FileCheck2 className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-electric-400" />,
      title: "Regulatory Compliance",
      description:
        "Independent advisory to interpret regulatory requirements and translate them into testable controls with the citations they need to satisfy.",
      position: "left" as const,
    },
    {
      icon: <Compass className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-electric-400" />,
      title: "Risk Advisory",
      description:
        "Risk taxonomy design, risk appetite framing, and board-level reporting for risk leaders rationalizing a fast-growing register.",
      position: "right" as const,
    },
    {
      icon: <LifeBuoy className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-electric-400" />,
      title: "Managed Support",
      description:
        "Ongoing administration and rule tuning after go-live, from the same team that designed the controls in the first place.",
      position: "right" as const,
    },
    {
      icon: <Award className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-electric-400" />,
      title: "Specialist Focus",
      description:
        "Claaps works exclusively in Oracle GRC and Risk Management Cloud — platform depth, not a side practice inside a broader IT consultancy.",
      position: "right" as const,
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
      className="relative z-10 w-full overflow-hidden rounded-t-[2.5rem] px-4 py-24 text-offwhite-50 shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.55)] md:rounded-t-[3.5rem] md:py-32"
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
            className="text-cyan-700 font-medium mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.08em]"
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

        <motion.p className="text-center max-w-2xl mx-auto mb-16 text-lg leading-7 text-slate-400" variants={itemVariants}>
          Claaps Technology Services exists to help organizations manage risk
          and compliance challenges effectively. As a specialist provider of
          risk management solutions, we focus exclusively on Oracle GRC and
          Oracle Risk Management Cloud — implementation, advisory, and
          ongoing support, in one accountable team.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

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

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-electric-600 text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2">Ready to strengthen your governance program?</h3>
            <p className="text-white/80">Tell us about your Oracle GRC or risk management challenge.</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="bg-cyan-700 hover:bg-cyan-700/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              Request a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: Variants;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-cyan-700 bg-cyan-700/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-cyan-700/20 relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-offwhite-50 group-hover:text-cyan-700 transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-slate-400 leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
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
