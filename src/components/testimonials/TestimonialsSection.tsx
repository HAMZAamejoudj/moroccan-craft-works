'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Building,
  Sofa,
  ShoppingBag,
  Package,
  Compass,
  ChevronLeft,
  ChevronRight,
  Quote,
} from 'lucide-react'
import { CLIENT_BADGES, TESTIMONIALS } from '@/lib/data'

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentTestimonial = TESTIMONIALS[currentIndex]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const iconMap: Record<string, React.ElementType> = {
    Building,
    Sofa,
    ShoppingBag,
    Box: Package,
    Compass,
  }

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FAF7F2]">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-stone-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-moroccan-gold font-semibold">
              Our Clients
            </span>
            <span className="w-8 h-[1px] bg-stone-300" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-moroccan-dark">
            Trusted by Professionals Worldwide
          </h2>
        </div>

        {/* Client Segments Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CLIENT_BADGES.map((client) => {
            const Icon = iconMap[client.icon] || Building
            return (
              <div
                key={client.id}
                className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 hover:border-moroccan-terracotta/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group cursor-default min-h-[140px]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-moroccan-gold group-hover:bg-moroccan-terracotta group-hover:text-white transition-all duration-300 mb-3">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="text-sm font-bold text-moroccan-dark leading-tight group-hover:text-moroccan-terracotta transition-colors">
                  {client.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Featured Testimonial Quote */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Avatar Photo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-moroccan-gold/40 shadow-sm flex-shrink-0">
              <Image
                src={currentTestimonial.avatar}
                alt={currentTestimonial.author}
                fill
                className="object-cover"
              />
            </div>

            {/* Quote Body */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Quote className="w-6 h-6 text-moroccan-terracotta rotate-180 inline flex-shrink-0" />
                <p className="font-serif text-base sm:text-lg text-moroccan-dark italic leading-relaxed">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </p>
              </div>

              <div className="text-xs sm:text-sm text-stone-500 font-medium">
                {currentTestimonial.role} &ndash;{' '}
                <span className="text-moroccan-dark font-semibold">
                  {currentTestimonial.location}
                </span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex sm:flex-col items-center justify-center gap-4 flex-shrink-0">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex
                        ? 'w-5 bg-moroccan-terracotta'
                        : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-8 h-8 rounded-full border border-stone-300 hover:border-moroccan-gold flex items-center justify-center text-stone-600 hover:text-moroccan-dark transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-8 h-8 rounded-full border border-stone-300 hover:border-moroccan-gold flex items-center justify-center text-stone-600 hover:text-moroccan-dark transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
