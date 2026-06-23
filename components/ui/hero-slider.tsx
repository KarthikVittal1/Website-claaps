"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion"

import { Button } from "@/components/global/Button"
import { Container } from "@/components/global/Container"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { CardCarousel } from "@/components/ui/card-carousel"

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

const images = [
  { src: "/images/carousel-slides/slide-1.jpg", alt: "Oracle EBS & Fusion Applications" },
  { src: "/images/carousel-slides/slide-2.jpg", alt: "Oracle Risk Management & Cloud Security" },
  { src: "/images/carousel-slides/slide-3.jpg", alt: "UiPath Intelligent Automation" },
  { src: "/images/carousel-slides/slide-4.jpg", alt: "AI Solutions" },
]

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
  const handleSlideChange = useCallback((index: number) => setActiveIndex(index), [])

  return (
    <section className="sticky top-0 isolate z-0 flex min-h-screen items-center">
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

      <Container className="relative grid w-full items-center gap-10 py-24 lg:grid-cols-2 lg:gap-12">
        <div className="relative min-h-[34rem] sm:min-h-[31rem] lg:min-h-[35rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              variants={reduceMotion ? undefined : contentVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              exit={reduceMotion ? undefined : "exit"}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            >
              <motion.div variants={reduceMotion ? undefined : itemVariants}>
                <span className="inline-flex rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:text-xs">
                  {activeSlide.label}
                </span>
              </motion.div>

              <div className="relative mt-5">
                <div aria-hidden className={`absolute -inset-6 -z-10 rounded-full ${activeSlide.glow} blur-3xl transition-colors duration-700`} />
                <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
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

              <motion.p variants={reduceMotion ? undefined : itemVariants} className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                {activeSlide.description}
              </motion.p>

              <motion.div variants={reduceMotion ? undefined : itemVariants} className="mt-5 flex flex-wrap gap-x-3 text-lg font-semibold sm:text-xl">
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

              <motion.div variants={reduceMotion ? undefined : itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/services" size="lg">Explore Solutions</Button>
                <Button href="/contact" variant="secondary" size="lg" className="!border-white/30 !text-white hover:!border-white/50">
                  Talk to Experts
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:block">
          <CardCarousel
            images={images}
            autoplayDelay={5000}
            showPagination
            showNavigation
            onActiveIndexChange={handleSlideChange}
          />
        </div>
      </Container>
    </section>
  )
}
