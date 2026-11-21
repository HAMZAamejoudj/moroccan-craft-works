'use client'

import React from 'react'
import { Boxes, Handshake, Globe, BadgeCheck } from 'lucide-react'

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Boxes,
      value: '10+',
      label: 'Product Categories',
    },
    {
      icon: Handshake,
      value: '500+',
      label: 'Artisan Partners',
    },
    {
      icon: Globe,
      value: '30+',
      label: 'Countries Served',
    },
    {
      icon: BadgeCheck,
      value: '100%',
      label: 'Handmade and Authentic',
    },
  ]

  return (
    <section className="w-full bg-moroccan-dark text-white py-10 sm:py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center text-center sm:text-left">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 sm:gap-4 justify-center sm:justify-start group"
              >
                <div className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs text-stone-300 font-light mt-1.5">
                    {stat.label}
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
