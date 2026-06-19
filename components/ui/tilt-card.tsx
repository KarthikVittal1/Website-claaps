"use client";

import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export function TiltCard({
  children,
  className,
  floatDelay = 0,
}: {
  children: ReactNode;
  className?: string;
  floatDelay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});
  const reduceMotion = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * -12;
    const rotateY = (x / rect.width) * 12;

    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
    });
  }

  function handleMouseLeave() {
    setTiltStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
  }

  return (
    <motion.div
      className={className}
      whileInView={reduceMotion ? undefined : { y: [0, -8, 0] }}
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
    >
      {/* Tilt is applied on a nested element so its transform doesn't fight
          the parent's continuous float transform — they animate independently
          and compose visually instead of one clobbering the other. */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className={cn("h-full transition-transform duration-300 ease-out will-change-transform")}
      >
        {children}
      </div>
    </motion.div>
  );
}
