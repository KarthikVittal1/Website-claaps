"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useReducedMotion } from "framer-motion"
import { Warp } from "@paper-design/shaders-react"

export interface ShaderFeature {
  title: string
  description: string
  icon: ReactNode
  href: string
}

interface FeatureShaderCardsProps {
  features: ShaderFeature[]
}

const shaderConfigs = [
  { proportion: 0.3, softness: 0.8, distortion: 0.15, swirl: 0.6, swirlIterations: 8, shape: "checks" as const, shapeScale: 0.08, colors: ["#111827", "#4e56b8", "#6b4fbf", "#f24a1d"] },
  { proportion: 0.4, softness: 1.2, distortion: 0.2, swirl: 0.9, swirlIterations: 12, shape: "stripes" as const, shapeScale: 0.12, colors: ["#081522", "#0b6fa4", "#58c6de", "#4e56b8"] },
  { proportion: 0.35, softness: 0.9, distortion: 0.18, swirl: 0.7, swirlIterations: 10, shape: "checks" as const, shapeScale: 0.1, colors: ["#1d0b16", "#c23d17", "#f24a1d", "#f4a261"] },
  { proportion: 0.45, softness: 1.1, distortion: 0.22, swirl: 0.8, swirlIterations: 15, shape: "stripes" as const, shapeScale: 0.09, colors: ["#071b17", "#16856b", "#6b72c7", "#9be8c7"] },
  { proportion: 0.38, softness: 0.95, distortion: 0.16, swirl: 0.85, swirlIterations: 11, shape: "checks" as const, shapeScale: 0.11, colors: ["#15102b", "#3a4296", "#6b4fbf", "#b49cff"] },
  { proportion: 0.42, softness: 1, distortion: 0.19, swirl: 0.75, swirlIterations: 9, shape: "stripes" as const, shapeScale: 0.13, colors: ["#20100b", "#c23d17", "#6b4fbf", "#f6a27f"] },
]

export default function FeatureShaderCards({ features }: FeatureShaderCardsProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {features.map((feature, index) => {
        const config = shaderConfigs[index % shaderConfigs.length]

        return (
          <Link
            key={feature.title}
            href={feature.href}
            className="group relative min-h-80 overflow-hidden rounded-3xl border border-white/15 bg-charcoal-900 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.7)] outline-none transition-transform duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-electric-400 motion-reduce:transform-none"
          >
            <div aria-hidden className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none">
              <Warp
                style={{ width: "100%", height: "100%" }}
                proportion={config.proportion}
                softness={config.softness}
                distortion={config.distortion}
                swirl={config.swirl}
                swirlIterations={config.swirlIterations}
                shape={config.shape}
                shapeScale={config.shapeScale}
                scale={1}
                rotation={0}
                speed={reduceMotion ? 0 : 0.55}
                colors={config.colors}
              />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(5,8,15,0.93)_12%,rgba(5,8,15,0.76)_58%,rgba(5,8,15,0.5)_100%)] transition-colors duration-500 group-hover:bg-[linear-gradient(145deg,rgba(5,8,15,0.88)_12%,rgba(5,8,15,0.66)_58%,rgba(5,8,15,0.4)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-70" />

            <div className="relative z-10 flex h-full min-h-80 flex-col p-7 sm:p-8">
              <div className="mb-7 flex size-13 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:bg-white/15">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white">{feature.title}</h3>
              <p className="mt-4 flex-1 text-sm font-medium leading-6 text-white/72">{feature.description}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors group-hover:text-white">
                Explore service
                <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
