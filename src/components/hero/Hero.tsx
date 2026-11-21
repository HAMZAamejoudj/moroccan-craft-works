'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { DEFAULT_HERO_SLIDES, HeroSlideItem } from '@/data/heroSlides'

interface HeroProps {
  onRequestQuote: () => void
}

const AUTOPLAY_INTERVAL = 5500 // 5.5 seconds

export const Hero: React.FC<HeroProps> = ({ onRequestQuote }) => {
  const [slides, setSlides] = useState<HeroSlideItem[]>(DEFAULT_HERO_SLIDES)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load custom slides from localStorage if saved by Admin
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mcw_hero_slides')
      if (stored) {
        const parsed = JSON.parse(stored) as HeroSlideItem[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          const activeOnly = parsed.filter((s) => s.active !== false)
          if (activeOnly.length > 0) {
            setSlides(activeOnly)
          }
        }
      }
    } catch {
      // ignore JSON parse error
    }

    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem('mcw_hero_slides')
        if (stored) {
          const parsed = JSON.parse(stored) as HeroSlideItem[]
          if (Array.isArray(parsed) && parsed.length > 0) {
            const activeOnly = parsed.filter((s) => s.active !== false)
            if (activeOnly.length > 0) {
              setSlides(activeOnly)
            }
          }
        }
      } catch {
        // ignore
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('mcw_hero_slides_updated', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('mcw_hero_slides_updated', handleStorageChange)
    }
  }, [])

  const totalSlides = slides.length || 1

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide((index + totalSlides) % totalSlides)
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return

    autoplayTimerRef.current = setInterval(() => {
      nextSlide()
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [isPaused, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
    setTouchStartX(null)
  }

  return (
    <section
      className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-moroccan-dark select-none rounded-b-2xl sm:rounded-b-3xl shadow-xl z-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Moroccan Craft Works Hero Showcase"
    >
      {/* Background Slides with Cross-fade and Ken Burns effect */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                sizes="100vw"
              />
            </div>

            {/* Cinematic Gradient Overlays for optimal text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-moroccan-dark/95 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent h-44" />
          </div>
        )
      })}

      {/* Main Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 w-full">
        <div className="max-w-3xl text-left space-y-5 sm:space-y-6">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide
            if (!isActive) return null

            return (
              <div
                key={slide.id}
                className="space-y-4 sm:space-y-6 animate-fade-in transition-all duration-700"
              >
                {/* Main Heading */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] tracking-tight drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-base lg:text-lg text-moroccan-cream/90 font-normal leading-relaxed max-w-2xl drop-shadow">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={onRequestQuote}
                    className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white text-xs sm:text-sm font-bold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-200 group active:scale-95"
                  >
                    <span>{slide.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    href={slide.secondaryCtaHref}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/30 backdrop-blur-md transition-all duration-200 active:scale-95 hover:border-white/50"
                  >
                    <span>{slide.secondaryCtaText}</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Arrow Buttons: Previous and Next */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/35 hover:bg-moroccan-terracotta text-white border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl group"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5] text-white/90 group-hover:text-white transition-colors" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/35 hover:bg-moroccan-terracotta text-white border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl group"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5] text-white/90 group-hover:text-white transition-colors" />
      </button>

      {/* Bottom Controls: Centered Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex justify-center items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-2.5 bg-black/35 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5 shadow-xl">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-10 sm:w-12 bg-moroccan-terracotta shadow-md'
                    : 'w-2.5 sm:w-3 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
