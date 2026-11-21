'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface HotspotProduct {
  id: string
  title: string
  price: string
  image: string
  x: number // percentage from left
  y: number // percentage from top
}

const PRODUCTS: HotspotProduct[] = [
  {
    id: 'teal-pendant',
    title: 'Handcrafted Teal Resin Pendant Light | Bohemian Modern Lamp',
    price: '$415.00',
    image: 'https://moroccanartisanat.com/cdn/shop/files/il_fullxfull.7258247314_avom.jpg?v=1773199598&width=720',
    x: 12,
    y: 18,
  },
  {
    id: 'wall-hook',
    title: 'Moroccan Brass Wall Hook · Gold Vintage Coat Rack with Mother of Pearl',
    price: '$130.00',
    image: 'https://moroccanartisanat.com/cdn/shop/files/il_fullxfull.7743730296_3rsz.jpg?v=1773199897&width=720',
    x: 8,
    y: 44,
  },
  {
    id: 'round-mirrors',
    title: 'Set of 2 Round Brass Mirror Candle Holders · Minimal Wall Sconces',
    price: '$220.00',
    image: 'https://moroccanartisanat.com/cdn/shop/files/il_fullxfull.7705650102_8m3e.jpg?v=1773199422&width=720',
    x: 38,
    y: 40,
  },
  {
    id: 'brass-sconces',
    title: 'Set of 2 Moroccan Hand-Pierced Brass Wall Sconces',
    price: '$280.00',
    image: 'https://moroccanartisanat.com/cdn/shop/files/il_fullxfull.5746691094_edp1.jpg?v=1730473555&width=720',
    x: 88,
    y: 25,
  },
  {
    id: 'brass-faucet',
    title: 'Vintage Unlacquered Brass Kitchen Faucet with Sprayer',
    price: '$340.00',
    image: 'https://moroccanartisanat.com/cdn/shop/files/il_fullxfull.7388056385_t1k4.jpg?v=1773199184&width=720',
    x: 78,
    y: 60,
  },
  {
    id: 'brass-sink',
    title: 'Solid Square Undermount Brass Sink · Hand-Hammered Gold Basin',
    price: '$460.00',
    image: 'https://moroccanartisanat.com/cdn/shop/files/il_fullxfull.7703853551_7qmb.jpg?v=1773199036&width=720',
    x: 62,
    y: 73,
  },
]

interface InteriorInspirationSectionProps {
  onRequestQuote?: (productTitle?: string) => void
}

export const InteriorInspirationSection: React.FC<InteriorInspirationSectionProps> = ({
  onRequestQuote,
}) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0)

  const currentProduct = PRODUCTS[activeProductIndex] || PRODUCTS[0]

  const handleNextProduct = () => {
    setActiveProductIndex((prev) => (prev + 1) % PRODUCTS.length)
  }

  const handlePrevProduct = () => {
    setActiveProductIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length)
  }

  return (
    <section id="inspiration" className="w-full py-12 lg:py-20 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Minimal, Centered and Elegant */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-moroccan-gold font-bold mb-2 block">
            Inspiration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-moroccan-dark leading-tight uppercase tracking-tight">
            Designed for Beautiful Interiors
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light max-w-2xl mx-auto">
            Handmade Moroccan brass pieces bring warmth, beauty, and character to modern homes. Each
            piece is made by hand using skills passed down through generations. The designs mix old
            traditions with a modern, luxury feel.
          </p>
        </div>

        {/* Interactive Parallel Showcase: Wide, Balanced and Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT: Clean Minimal Product Card (5 cols to leave generous space for the room scene) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl overflow-hidden shadow-xs border border-stone-200/80 transition-all duration-300 h-full">
            {/* Clean Product Image flush with top edges - No top border/padding */}
            <div className="relative w-full aspect-square bg-stone-50 group">
              <Image
                src={currentProduct.image}
                alt={currentProduct.title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Prev / Next Slide Arrows on Photo */}
              <button
                type="button"
                onClick={handlePrevProduct}
                aria-label="Previous product"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={handleNextProduct}
                aria-label="Next product"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Product Meta and Actions: Clean and Balanced */}
            <div className="flex flex-col flex-1 justify-between text-center p-5 sm:p-6">
              <div className="space-y-1.5 mb-5">
                <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-semibold block">
                  Moroccan Craft Works
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-moroccan-dark leading-snug uppercase px-2 line-clamp-2">
                  {currentProduct.title}
                </h3>
                <span className="text-base sm:text-lg font-semibold text-moroccan-terracotta block pt-1">
                  {currentProduct.price}
                </span>
              </div>

              {/* Action Button and Carousel Dots */}
              <div className="space-y-3.5 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    if (onRequestQuote) {
                      onRequestQuote(currentProduct.title)
                    }
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Quotation</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </button>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2">
                  {PRODUCTS.map((prod, pIdx) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setActiveProductIndex(pIdx)}
                      aria-label={`Select product ${pIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeProductIndex === pIdx
                          ? 'w-6 bg-moroccan-terracotta'
                          : 'w-2 bg-stone-300 hover:bg-stone-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Large Room Image with Clean Interactive Hotspot Pins (7 cols: Wide and fully visible) */}
          <div className="lg:col-span-7 relative w-full h-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] rounded-3xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-100">
            <Image
              src="https://moroccanartisanat.com/cdn/shop/files/Moroccan_Home_Decor.png?v=1783158982&width=1536"
              alt="Moroccan Interior Architecture with Handcrafted Brass Pieces"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />

            {/* Interactive Hotspot Pins: Clean Translucent Glowing Circles */}
            {PRODUCTS.map((prod, index) => {
              const isActive = activeProductIndex === index

              return (
                <div
                  key={prod.id}
                  style={{
                    left: `${prod.x}%`,
                    top: `${prod.y}%`,
                  }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    type="button"
                    onClick={() => setActiveProductIndex(index)}
                    aria-label={`View ${prod.title}`}
                    className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isActive ? 'scale-120 z-30' : 'hover:scale-110 z-20'
                    }`}
                  >
                    {/* Glowing pulse ring */}
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full transition-opacity duration-300 ${
                        isActive
                          ? 'bg-moroccan-terracotta/60 animate-ping'
                          : 'bg-white/40 animate-pulse'
                      }`}
                    />

                    {/* Translucent Glass Pin Circle */}
                    <span
                      className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md shadow-md transition-all duration-300 ${
                        isActive
                          ? 'bg-moroccan-terracotta text-white ring-3 ring-white shadow-moroccan-terracotta/40'
                          : 'bg-black/35 hover:bg-black/55 text-white ring-2 ring-white/80'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white block shadow-xs" />
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
