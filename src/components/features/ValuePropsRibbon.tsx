'use client'

import React from 'react'
import {
  Boxes,
  PencilRuler,
  Tags,
  Plane,
  BadgeCheck,
} from 'lucide-react'

export const ValuePropsRibbon: React.FC = () => {
  const items = [
    {
      icon: Boxes,
      title: 'Wholesale Supply',
      subtitle: 'Bulk and B2B Volume Orders',
    },
    {
      icon: PencilRuler,
      title: 'Custom Manufacturing',
      subtitle: 'Bespoke Artisan Designs',
    },
    {
      icon: Tags,
      title: 'Private Label and OEM',
      subtitle: 'Your Brand, Our Craft',
    },
    {
      icon: Plane,
      title: 'International Export',
      subtitle: 'Worldwide Freight and Cargo',
    },
    {
      icon: BadgeCheck,
      title: 'Quality Assurance',
      subtitle: '100% Authentic and Certified',
    },
  ]

  return (
    <section className="w-full bg-[#FAF7F2] py-8 sm:py-10 lg:py-12">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-3.5 xl:gap-4 items-stretch">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-3.5 xl:gap-4 p-3.5 sm:p-4 xl:p-4.5 rounded-2xl bg-white hover:bg-white border border-stone-200/80 hover:border-red-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default min-h-[84px]"
              >
                {/* Icon Direct Without Background - Perfectly Aligned */}
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 xl:w-8.5 xl:h-8.5 stroke-[1.8] text-red-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />

                {/* Text Content - Clear, Full, Never Truncated with Dots */}
                <div className="flex flex-col min-w-0 justify-center">
                  <span className="text-xs sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] 2xl:text-[15px] font-bold text-moroccan-dark leading-snug group-hover:text-red-600 transition-colors whitespace-nowrap">
                    {item.title}
                  </span>
                  <span className="text-[10.5px] sm:text-[11.5px] lg:text-[10.5px] xl:text-[11.5px] 2xl:text-[12.5px] text-stone-500 font-medium leading-snug mt-0.5 whitespace-nowrap">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
