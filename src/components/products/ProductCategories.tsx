'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PRODUCT_CATEGORIES, ProductCategory } from '@/lib/data'

interface ProductCategoriesProps {
  onSelectCategory?: (category: string) => void
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({ onSelectCategory }) => {
  const [isHovered, setIsHovered] = useState(false)

  // 3 identical tracks so the carousel is always 100% full without any blank gaps
  const tracks = [PRODUCT_CATEGORIES, PRODUCT_CATEGORIES, PRODUCT_CATEGORIES]

  const renderCard = (cat: ProductCategory, key: string) => (
    <div
      key={key}
      className="w-[320px] sm:w-[360px] md:w-[390px] xl:w-[420px] flex-shrink-0"
    >
      <Link
        href={cat.href}
        className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full cursor-pointer"
      >
        {/* Product Image */}
        <div className="relative w-full aspect-[4/3] min-h-[240px] sm:min-h-[270px] bg-stone-100 overflow-hidden flex-shrink-0">
          <Image
            src={cat.image}
            alt={cat.title}
            fill
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 390px, 420px"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Card Content: Title, Rich Description and Action Button */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white group-hover:bg-[#FFFDF9] transition-colors">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-moroccan-dark group-hover:text-moroccan-terracotta transition-colors leading-snug mb-2.5">
              {cat.title}
            </h3>
            
            {/* Rich Description */}
            <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3">
              {cat.description}
            </p>
          </div>

          {/* Bottom Action Link */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs sm:text-sm font-bold text-moroccan-terracotta group-hover:text-moroccan-terracotta-dark transition-colors inline-flex items-center gap-1.5">
              <span>{cat.linkText || `View ${cat.title}`}</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-moroccan-terracotta text-stone-500 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 flex-shrink-0 shadow-xs">
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )

  return (
    <section id="products" className="w-full py-16 lg:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Perfectly Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="w-8 h-[1px] bg-moroccan-gold/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-moroccan-gold font-bold">
              Our Product Categories
            </span>
            <span className="w-8 h-[1px] bg-moroccan-gold/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-moroccan-dark leading-tight">
            Explore Moroccan Handmade Crafts
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Ten authentic categories of Moroccan artisan heritage, handcrafted to order for wholesale, boutique retail and interior architecture.
          </p>
        </div>
      </div>

      {/* Infinite Continuous Carousel: Seamless and Always 100% Full */}
      <div
        className="w-full overflow-hidden py-4 marquee-container select-none cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="animate-marquee-infinite flex"
          style={{
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {tracks.map((trackItems, trackIndex) => (
            <div
              key={`track-${trackIndex}`}
              className="flex shrink-0 gap-6 sm:gap-7 xl:gap-8 pr-6 sm:pr-7 xl:pr-8"
            >
              {trackItems.map((cat, itemIndex) =>
                renderCard(cat, `cat-${trackIndex}-${itemIndex}`)
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
