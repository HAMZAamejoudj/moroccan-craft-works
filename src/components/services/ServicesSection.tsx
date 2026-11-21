'use client'

import React from 'react'
import Link from 'next/link'
import { Package, SlidersHorizontal, Award, Sofa } from 'lucide-react'

export const ServicesSection: React.FC = () => {
  const serviceCards = [
    {
      icon: Package,
      title: 'Wholesale',
      subtitle: 'B2B & Bulk Orders',
      href: '/services/wholesale',
    },
    {
      icon: SlidersHorizontal,
      title: 'Custom',
      subtitle: 'Manufacturing',
      href: '/how-to-order',
    },
    {
      icon: Award,
      title: 'Private',
      subtitle: 'Label & OEM',
      href: '/services/private-label',
    },
    {
      icon: Sofa,
      title: 'Custom Projects',
      subtitle: 'Hotels & Interiors',
      href: '/products',
    },
  ]

  return (
    <section id="services" className="w-full py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-moroccan-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-moroccan-gold font-bold">
                Our Services
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-moroccan-dark leading-tight">
              More Than a Supplier
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg">
              End-to-end solutions for businesses, designers, luxury hotels and hospitality projects seeking
              authentic Moroccan craftsmanship.
            </p>
          </div>

          {/* Right Column: 4 Service Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {serviceCards.map((srv, index) => {
              const Icon = srv.icon
              return (
                <Link
                  key={index}
                  href={srv.href}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center min-h-[160px] cursor-pointer"
                >
                  <Icon className="w-10 h-10 sm:w-11 sm:h-11 stroke-[1.8] text-moroccan-gold group-hover:text-moroccan-terracotta group-hover:scale-110 transition-all duration-300 mb-3" />
                  <span className="text-sm sm:text-base font-bold text-moroccan-dark leading-tight group-hover:text-moroccan-terracotta transition-colors">
                    {srv.title}
                  </span>
                  <span className="text-xs text-stone-500 font-normal mt-1 leading-tight">
                    {srv.subtitle}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
