"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const stats = [
  { value: "15+", label: "Oracle GRC / RMC Implementations" },
  { value: "20+", label: "GRC Support Projects" },
  { value: "24/7", label: "Support Infrastructure" },
];

const industries =
  "Energy & Utilities · Pharma & Life Sciences · Financial Services · Telecom · Semiconductors · Healthcare · Retail · Media & Entertainment · Education";

const logos = [
  { name: "Crown Castle", src: "/logos/crown-castle.jpg" },
  { name: "Ocado", src: "/logos/ocado.jpg" },
  { name: "Entertainment Partners", src: "/logos/entertainment-partners.png" },
  { name: "ACWA Power", src: "/logos/acwa-power.jpg" },
  { name: "Pearson", src: "/logos/pearson.png" },
  { name: "Biogen", src: "/logos/biogen.jpg" },
  { name: "Smiths Medical", src: "/logos/smiths-medical.jpg" },
  { name: "CNO Financial Group", src: "/logos/cno-financial-group.jpg" },
  { name: "GlobalFoundries", src: "/logos/globalfoundries.png" },
  { name: "Keysight Technologies", src: "/logos/keysight-technologies.png" },
  { name: "Agilent Technologies", src: "/logos/agilent-technologies.png" },
];

export default function LogosSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();

  // The autoScroll plugin drives a requestAnimationFrame loop forever once
  // started — stop it while this section is scrolled out of view so it
  // isn't still running (and competing with scroll/composite work) for the
  // rest of the page.
  useEffect(() => {
    const el = wrapperRef.current;
    const autoScroll = api?.plugins().autoScroll;
    if (!el || !autoScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) autoScroll.play();
        else autoScroll.stop();
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [api]);

  return (
    <section className="border-b border-graphite-700 py-24 md:py-32">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Our experience"
            title="Trusted by teams across regulated industries"
            align="center"
            className="mx-auto"
          />
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-slate-400">
            {industries}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 divide-x divide-graphite-700 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4">
                <p className="text-2xl font-semibold tracking-[-0.01em] text-offwhite-50 md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>

      <RevealOnScroll delay={0.1}>
        <div ref={wrapperRef} className="relative mt-12 md:mt-16">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 0.6 })]}
            setApi={setApi}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.name}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex h-20 shrink-0 items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={220}
                      height={72}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />
        </div>
      </RevealOnScroll>
    </section>
  );
}
