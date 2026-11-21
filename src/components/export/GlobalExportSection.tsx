'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const GlobalExportSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#FAF7F2] overflow-hidden relative">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Text and CTA */}
          <div className="lg:col-span-5 space-y-5 z-10">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-moroccan-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-moroccan-gold font-bold">
                Global Export
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-moroccan-dark leading-tight">
              From Morocco to the World
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg">
              Reliable export logistics to Europe, North America, the Middle East, and Asia.
              Complete customs clearance, bulk export palletization, and insured door-to-door freight.
            </p>

            <div className="pt-2">
              <Link
                href="#services"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all group"
              >
                <span>Export and Logistics</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large, Crisp Container Cargo Ship (No fog, no badge, enlarged) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=90"
                alt="Global Shipping Container Logistics"
                fill
                className="object-cover object-center hover:scale-103 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
