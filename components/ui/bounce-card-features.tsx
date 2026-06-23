"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, BrainCircuit, LifeBuoy } from "lucide-react";

const features = [
  {
    title: "Oracle GRC",
    description:
      "End-to-end design and configuration of Oracle Governance, Risk & Compliance Cloud built around how your organization actually governs itself.",
    gradient: "from-cyan-500 to-teal-500",
    textColor: "text-cyan-50",
    icon: ShieldCheck,
  },
  {
    title: "AI Solutions",
    description:
      "Leverage AI to automate processes, analyze data, and drive smarter decisions. Scalable AI solutions tailored to your business goals.",
    gradient: "from-violet-500 to-indigo-500",
    textColor: "text-indigo-50",
    icon: BrainCircuit,
  },
  {
    title: "Risk Management Cloud",
    description:
      "Continuous controls monitoring, access certification, and segregation-of-duties enforcement across Oracle ERP and adjacent systems.",
    gradient: "from-amber-400 to-orange-500",
    textColor: "text-orange-50",
    icon: BarChart3,
  },
  {
    title: "Managed Support",
    description:
      "Ongoing administration and rule tuning after go-live, from the same team that designed the controls in the first place.",
    gradient: "from-emerald-400 to-green-500",
    textColor: "text-emerald-50",
    icon: LifeBuoy,
  },
];

export const BouncyCardsFeatures = () => {
  return (
    <div className="w-full">
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4" feature={features[0]} />
        <BounceCard className="col-span-12 md:col-span-8" feature={features[1]} />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8" feature={features[2]} />
        <BounceCard className="col-span-12 md:col-span-4" feature={features[3]} />
      </div>
    </div>
  );
};

interface Feature {
  title: string;
  description: string;
  gradient: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BounceCard = ({
  className,
  feature,
}: {
  className?: string;
  feature: Feature;
}) => {
  const Icon = feature.icon;
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-cyan-700/20 flex items-center justify-center text-cyan-400">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
      <div
        className={`absolute bottom-0 left-4 right-4 top-36 translate-y-8 rounded-t-2xl bg-gradient-to-br ${feature.gradient} p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]`}
      >
        <span className={`block text-center font-semibold ${feature.textColor} mt-2`}>
          {feature.title}
        </span>
        <p className={`text-center text-xs mt-1 opacity-80 ${feature.textColor}`}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};
