"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { StaticNetworkFallback } from "@/components/three/StaticNetworkFallback";

const RiskIntelligenceNetwork = dynamic(
  () =>
    import("@/components/three/RiskIntelligenceNetwork").then(
      (mod) => mod.RiskIntelligenceNetwork
    ),
  { ssr: false }
);

/**
 * Mounts the WebGL hero scene only when: the viewport is desktop-sized,
 * prefers-reduced-motion is not set, and the hero has scrolled into view.
 * The static SVG fallback is always present underneath so there is never
 * a layout shift and the 3D scene never contributes to LCP/TBT.
 */
export function SceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (prefersReducedMotion || !isDesktop) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          shouldRender ? "opacity-0" : "opacity-100"
        }`}
      >
        <StaticNetworkFallback />
      </div>
      {shouldRender ? (
        <div className="absolute inset-0">
          <RiskIntelligenceNetwork />
        </div>
      ) : null}
    </div>
  );
}
