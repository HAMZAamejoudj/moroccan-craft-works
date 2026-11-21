'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="w-full py-16 lg:py-24 bg-[#FAF7F2]">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Real Master Artisan Photo */}
          <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-[460px] rounded-2xl overflow-hidden shadow-sm border border-stone-200/80">
            <Image
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80"
              alt="Moroccan Master Artisan Crafting Pottery"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Right Column: Heritage Card in Crisp White */}
          <div className="lg:col-span-6 relative flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1.5px] bg-moroccan-gold" />
                <span className="text-xs uppercase tracking-[0.25em] text-moroccan-gold font-bold">
                  Our Heritage
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-moroccan-dark leading-tight">
                Crafted by Moroccan Artisans
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg">
                We work directly with master artisans and cooperative workshops across Morocco to preserve ancestral
                techniques, empower local families, and deliver authentic, museum-grade handcrafted products.
              </p>

              <div className="pt-3">
                <Link
                  href="#heritage"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all group"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
