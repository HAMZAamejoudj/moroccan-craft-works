'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { FEATURED_PRODUCTS, FeaturedProduct } from '@/lib/data'

interface FeaturedProductsSectionProps {
  onRequestQuote?: (productTitle?: string) => void
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  onRequestQuote,
}) => {
  return (
    <section id="featured-products" className="w-full py-16 lg:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="w-8 h-[1px] bg-moroccan-gold/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-moroccan-gold font-bold">
              Featured Products
            </span>
            <span className="w-8 h-[1px] bg-moroccan-gold/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-moroccan-dark leading-tight">
            Selected Moroccan Handmade Products
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            A few pieces our buyers ask about most. Each is available for wholesale orders and can be adapted in size, color or finish.
          </p>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 xl:gap-8">
          {FEATURED_PRODUCTS.map((product: FeaturedProduct) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full border-0"
            >
              {/* Product Thumbnail (Clean, unobstructed image) */}
              <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-1 justify-between bg-white group-hover:bg-[#FFFDF9] transition-colors">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-moroccan-gold mb-1.5 block">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-moroccan-dark group-hover:text-moroccan-terracotta transition-colors leading-snug mb-2.5">
                    {product.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Action: Clean Request Pricing Link */}
                <div className="pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (onRequestQuote) {
                        onRequestQuote(product.title)
                      }
                    }}
                    className="w-full flex items-center justify-between text-sm font-bold text-moroccan-terracotta group-hover:text-moroccan-terracotta-dark transition-colors cursor-pointer"
                  >
                    <span>{product.linkText || 'Request pricing'}</span>
                    <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-moroccan-terracotta text-stone-500 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-xs flex-shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
