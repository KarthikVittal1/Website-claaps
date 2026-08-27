"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/global/Button"
import { Container } from "@/components/global/Container"

const slides = [
  {
    label: "Oracle Excellence",
    title: "Optimize Enterprise Performance",
    description: "Streamline operations, unify business processes, and maximize ROI with Oracle EBS and Fusion Applications.",
    keywords: ["Optimize.", "Integrate.", "Scale."],
    gradient: "from-amber-600 via-orange-600 to-red-600",
    glow: "bg-orange-500/10",
  },
  {
    label: "Enterprise Security",
    title: "Secure Every Digital Asset",
    description: "Protect critical systems with proactive governance, risk management, compliance monitoring, and cloud security.",
    keywords: ["Secure.", "Comply.", "Strengthen."],
    gradient: "from-indigo-600 via-purple-600 to-electric-600",
    glow: "bg-purple-500/10",
  },
  {
    label: "Intelligent Automation",
    title: "Automate What Slows You Down",
    description: "Eliminate repetitive tasks, improve accuracy, and accelerate productivity through intelligent workflow automation with UiPath.",
    keywords: ["Automate.", "Orchestrate.", "Elevate."],
    gradient: "from-emerald-600 via-teal-600 to-green-700",
    glow: "bg-emerald-500/10",
  },
  {
    label: "AI-Powered Innovation",
    title: "Turn Data Into Smart Decisions",
    description: "Transform complex data into actionable insights with predictive analytics, machine learning, and intelligent automation.",
    keywords: ["Predict.", "Analyze.", "Accelerate."],
    gradient: "from-blue-600 via-indigo-600 to-cyan-700",
    glow: "bg-blue-500/10",
  },
] as const

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    if (reduceMotion) return
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [reduceMotion])

  return (
    <section className="sticky top-0 isolate z-0 flex min-h-screen items-start pt-20">
      <div className="absolute inset-x-0 -top-24 bottom-0 bg-white overflow-hidden pointer-events-none">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,_rgba(242,74,29,0.12),_transparent_55%),radial-gradient(circle_at_75%_55%,_rgba(78,86,184,0.15),_transparent_55%)]"
        />
      </div>

      <Container className="relative flex min-h-[calc(100vh-10rem)] w-full flex-col justify-center pt-14 pb-28 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-x-8 gap-y-10 xl:gap-x-10">
          {/* Content */}
          <div className="flex w-full flex-col text-center">
            <div className="relative min-h-[26rem] w-full sm:min-h-[24rem] lg:min-h-[22rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  variants={reduceMotion ? undefined : contentVariants}
                  initial={reduceMotion ? false : "hidden"}
                  animate="visible"
                  exit={reduceMotion ? undefined : "exit"}
                  className="absolute inset-x-0 top-0 text-center"
                >
                  <motion.div variants={reduceMotion ? undefined : itemVariants}>
                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-100/80 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-800 shadow-xs sm:text-xs">
                      {activeSlide.label}
                    </span>
                  </motion.div>

                  <div className="relative mt-3">
                    <div aria-hidden className={`absolute -inset-6 -z-10 rounded-full ${activeSlide.glow} blur-3xl transition-colors duration-700`} />
                    <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-5xl md:text-5xl lg:text-6xl">
                      {activeSlide.title.split(" ").map((word, index) => (
                        <motion.span
                          key={`${word}-${index}`}
                          variants={reduceMotion ? undefined : itemVariants}
                          className={`mr-[0.24em] inline-block bg-gradient-to-r ${activeSlide.gradient} bg-clip-text text-transparent will-change-transform`}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h1>
                  </div>

                  <motion.p variants={reduceMotion ? undefined : itemVariants} className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                    {activeSlide.description}
                  </motion.p>

                  <motion.div variants={reduceMotion ? undefined : itemVariants} className="mt-4 flex flex-wrap justify-center gap-x-4 text-lg font-semibold sm:text-xl">
                    {activeSlide.keywords.map((keyword, index) => (
                      <motion.span
                        key={keyword}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: reduceMotion ? 0 : 0.38 + index * 0.1, duration: 0.42 }}
                        className={`bg-gradient-to-r ${activeSlide.gradient} bg-clip-text text-transparent`}
                      >
                        {keyword}
                      </motion.span>
                    ))}
                  </motion.div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Buttons centered below both hero columns */}
        <div className="mt-12 flex justify-center gap-3 sm:mt-16 lg:mt-20">
          <Button href="/services" size="lg">Explore Services</Button>
          <Button href="/contact" size="lg">Talk to Experts</Button>
        </div>

        {/* Scroll indicator pinned to viewport bottom */}
        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Scroll</span>
          <motion.button
            aria-label="Scroll to About section"
            onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })}
            animate={reduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200 cursor-pointer"
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.button>
        </div>
      </Container>
    </section>
  )
}
