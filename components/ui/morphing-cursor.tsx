"use client"

import type React from "react"
import { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/cn"

interface MagneticTextProps {
  text: string
  hoverText?: string
  className?: string
}

export function MagneticText({ text = "CLAAPS", hoverText = "TOGETHER, WE BUILD THE FUTURE", className }: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const isHoveredRef = useRef(false)
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerSize({ width, height })
        mousePos.current = { x: width / 2, y: height / 2 }
        currentPos.current = { x: width / 2, y: height / 2 }
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15)
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15)

      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        const baseRadius = Math.min(Math.max(width * 0.09, 36), 58)
        const edgeGap = 3
        const edgeLimitedRadius = Math.max(
          0,
          Math.min(
            baseRadius,
            currentPos.current.x - edgeGap,
            width - currentPos.current.x - edgeGap,
            currentPos.current.y - edgeGap,
            height - currentPos.current.y - edgeGap
          )
        )

        containerRef.current.style.setProperty("--cursor-x", `${currentPos.current.x}px`)
        containerRef.current.style.setProperty("--cursor-y", `${currentPos.current.y}px`)
        containerRef.current.style.setProperty("--clip-radius", `${isHoveredRef.current ? edgeLimitedRadius : 0}px`)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mousePos.current = { x, y }
    currentPos.current = { x, y }
    isHoveredRef.current = true
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    setIsHovered(false)
  }, [])

  const hoverLines = hoverText.split(",").map((line) => line.trim()).filter(Boolean)
  const coloredText = text.split("")

  return (
    <div
      className={cn(
        "flex select-none items-center justify-center",
        className
      )}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-flex cursor-none items-center justify-center overflow-hidden px-10 py-8 sm:px-12 lg:px-14"
        style={{
          "--cursor-x": `${containerSize.width / 2}px`,
          "--cursor-y": `${containerSize.height / 2}px`,
          "--clip-radius": isHovered ? "36px" : "0px",
        } as React.CSSProperties}
      >
        {/* Base label */}
        <span className="text-center text-6xl font-black uppercase leading-none tracking-normal text-white drop-shadow-[0_16px_40px_rgba(0,0,0,0.28)] sm:text-7xl lg:text-8xl">
          {coloredText.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={cn(
                "drop-shadow-[0_3px_0_rgba(17,19,23,0.22)]",
                letter === "A" ? "text-[#ff3b30]" : "text-[#1d22d8]"
              )}
            >
              {letter}
            </span>
          ))}
        </span>

        {/* Cursor-sized reveal layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white transition-[clip-path] duration-300 ease-out"
          style={{
            clipPath: "circle(var(--clip-radius) at var(--cursor-x) var(--cursor-y))",
            willChange: "clip-path",
          }}
        >
          <div className="flex flex-col items-center justify-center px-6 text-center">
            {hoverLines.length > 1 ? (
              hoverLines.map((line) => (
                <span key={line} className="whitespace-nowrap text-xl font-black uppercase leading-tight tracking-[0.18em] text-[#111317] sm:text-2xl lg:text-3xl">
                  {line}
                </span>
              ))
            ) : (
              <span className="whitespace-nowrap text-xl font-black uppercase leading-tight tracking-[0.18em] text-[#111317] sm:text-2xl lg:text-3xl">
                {hoverText}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
