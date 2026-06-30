"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/global/Button"
import { Container } from "@/components/global/Container"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"

const slides = [
  {
    label: "Oracle Excellence",
    title: "Optimize Enterprise Performance",
    description: "Streamline operations, unify business processes, and maximize ROI with Oracle EBS and Fusion Applications.",
    keywords: ["Optimize.", "Integrate.", "Scale."],
    gradient: "from-amber-300 via-orange-400 to-red-400",
    glow: "bg-orange-500/25",
  },
  {
    label: "Enterprise Security",
    title: "Secure Every Digital Asset",
    description: "Protect critical systems with proactive governance, risk management, compliance monitoring, and cloud security.",
    keywords: ["Secure.", "Comply.", "Strengthen."],
    gradient: "from-violet-300 via-purple-400 to-fuchsia-300",
    glow: "bg-violet-500/25",
  },
  {
    label: "Intelligent Automation",
    title: "Automate What Slows You Down",
    description: "Eliminate repetitive tasks, improve accuracy, and accelerate productivity through intelligent workflow automation with UiPath.",
    keywords: ["Automate.", "Orchestrate.", "Elevate."],
    gradient: "from-emerald-300 via-green-400 to-lime-300",
    glow: "bg-emerald-500/25",
  },
  {
    label: "AI-Powered Innovation",
    title: "Turn Data Into Smart Decisions",
    description: "Transform complex data into actionable insights with predictive analytics, machine learning, and intelligent automation.",
    keywords: ["Predict.", "Analyze.", "Accelerate."],
    gradient: "from-sky-300 via-blue-400 to-cyan-300",
    glow: "bg-blue-500/25",
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
      <div className="absolute inset-x-0 -top-24 bottom-0">
        <BackgroundGradientAnimation
          containerClassName="absolute inset-0"
          gradientBackgroundStart="rgb(17, 19, 23)"
          gradientBackgroundEnd="rgb(8, 9, 13)"
          firstColor="78, 86, 184"
          secondColor="107, 79, 191"
          thirdColor="194, 61, 23"
          fourthColor="107, 114, 199"
          fifthColor="242, 74, 29"
          pointerColor="107, 79, 191"
        />
      </div>

      <Container className="relative flex min-h-[calc(100vh-10rem)] w-full flex-col pt-0 pb-4">
        {/* Two-column content grid */}
        <div className="grid items-start gap-x-12 gap-y-3 lg:grid-cols-2">
          <div className="relative min-h-[18rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                variants={reduceMotion ? undefined : contentVariants}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit={reduceMotion ? undefined : "exit"}
                className="absolute inset-x-0 top-0"
              >
                <motion.div variants={reduceMotion ? undefined : itemVariants}>
                  <span className="inline-flex rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:text-xs">
                    {activeSlide.label}
                  </span>
                </motion.div>

                <div className="relative mt-3">
                  <div aria-hidden className={`absolute -inset-6 -z-10 rounded-full ${activeSlide.glow} blur-3xl transition-colors duration-700`} />
                  <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl md:text-5xl lg:text-6xl">
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

                <motion.p variants={reduceMotion ? undefined : itemVariants} className="mt-3 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                  {activeSlide.description}
                </motion.p>

                <motion.div variants={reduceMotion ? undefined : itemVariants} className="mt-3 flex flex-wrap gap-x-3 text-base font-semibold sm:text-lg">
                  {activeSlide.keywords.map((keyword, index) => (
                    <motion.span
                      key={keyword}
                      initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: reduceMotion ? 0 : 0.38 + index * 0.1, duration: 0.42 }}
                      className={`bg-gradient-to-r ${activeSlide.gradient} bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]`}
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="relative hidden lg:block lg:self-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={reduceMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hero-showcase"
            >
              <Image
                src="/images/hero-office-2.png"
                alt="Claaps Technology Services team at work"
                fill
                sizes="(min-width: 1024px) 640px, 1px"
                className="object-cover"
                priority
              />
              <div className="hero-showcase-reflection" />
            </motion.div>
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/services" size="lg">Explore Services</Button>
          <Button href="/contact" size="lg">Talk to Experts</Button>
        </div>

        {/* Scroll indicator pinned to viewport bottom */}
        <div className="mt-auto flex flex-col items-center gap-1 pt-4">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/30">Scroll</span>
          <motion.button
            aria-label="Scroll to About section"
            onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })}
            animate={reduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer"
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.button>
        </div>
      </Container>
    </section>
  )
}
