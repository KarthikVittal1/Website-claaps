"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/swiper.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const slides = [
  {
    src: "/images/carousel-slides/slide-1.png",
    alt: "Oracle GRC & Risk Management",
  },
  {
    src: "/images/carousel-slides/slide-2.png",
    alt: "Cloud Security & Compliance",
  },
  {
    src: "/images/carousel-slides/slide-3.png",
    alt: "AI & Intelligent Automation",
  },
  {
    src: "/images/carousel-slides/slide-4.png",
    alt: "Digital Transformation",
  },
  {
    src: "/images/carousel-slides/slide-5.png",
    alt: "Enterprise Technology Solutions",
  },
];

export function HeroCoverflowCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative w-full select-none" aria-label="Feature highlights carousel">
      {/* Ambient glow behind the carousel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,79,191,0.35) 0%, rgba(194,61,23,0.18) 55%, transparent 100%)",
        }}
      />

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        }}
        className="hero-coverflow"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.src} className="hero-coverflow__slide">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1536}
                height={1024}
                className="block w-full object-cover"
                priority
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-coverflow {
          padding-bottom: 40px !important;
          overflow: visible !important;
        }
        .hero-coverflow__slide {
          width: 420px;
          max-width: 80vw;
        }
        .hero-coverflow .swiper-pagination {
          bottom: 0;
        }
        .hero-coverflow .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4);
          opacity: 1;
          transition: background 0.2s;
        }
        .hero-coverflow .swiper-pagination-bullet-active {
          background: #a78bfa;
        }
      `}</style>
    </div>
  );
}
