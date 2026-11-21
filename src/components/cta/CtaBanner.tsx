'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface CtaBannerProps {
  onRequestQuote: () => void
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onRequestQuote }) => {
  return (
    <section className="w-full bg-[#FAF7F2] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 bg-gradient-to-r from-[#943D1A] via-[#B85D36] to-[#7A3114] py-14 sm:py-16 px-6 sm:px-12 lg:px-16">
          {/* Subtle Background Pattern and Glow */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <Image
              src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85"
              alt="Moroccan Architecture"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Banner Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-moroccan-cream/80 font-bold mb-2 block">
                B2B Sourcing and Export
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight">
                Let&apos;s Work Together
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-100/90 leading-relaxed max-w-xl">
                Get a custom quotation for your project or wholesale needs. Direct artisan supply,
                transparent lead times and reliable worldwide shipping.
              </p>
            </div>

            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-stone-50 text-moroccan-dark hover:text-moroccan-terracotta text-sm sm:text-base font-bold shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 group flex-shrink-0 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] text-moroccan-terracotta group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
