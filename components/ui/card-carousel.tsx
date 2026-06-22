"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  // prefers-reduced-motion stops the CSS keyframes globally, but not Swiper's JS
  // autoplay — honor it here so motion-sensitive users get a static carousel.
  const [reduceMotion, setReduceMotion] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const css = `
  .hero-card-swiper {
    width: 100%;
    padding-bottom: 50px;
  }

  .hero-card-swiper .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 480px;
  }

  .hero-card-swiper .swiper-slide img {
    display: block;
    width: 100%;
  }

  .hero-card-swiper .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }

  .hero-card-swiper .swiper-3d .swiper-slide-shadow-right {
    background: none;
  }

  .hero-card-swiper .swiper-pagination-bullet {
    background: rgba(255,255,255,0.4);
    opacity: 1;
  }

  .hero-card-swiper .swiper-pagination-bullet-active {
    background: #a78bfa;
  }

  .hero-card-swiper .swiper-button-prev,
  .hero-card-swiper .swiper-button-next {
    color: rgba(255,255,255,0.7);
    top: 42%;
  }

  .hero-card-swiper .swiper-button-prev:after,
  .hero-card-swiper .swiper-button-next:after {
    font-size: 18px;
    font-weight: 700;
  }
  `

  return (
    <div className="w-full">
      <style>{css}</style>
      <Swiper
        className="hero-card-swiper"
        spaceBetween={50}
        autoplay={
          reduceMotion
            ? false
            : {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        loopAdditionalSlides={2}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="size-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image
                src={image.src}
                width={960}
                height={640}
                sizes="480px"
                className="size-full rounded-2xl object-cover"
                alt={image.alt}
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
