'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Quote,
} from 'lucide-react'

interface ReviewItem {
  id: string
  name: string
  role: string
  location: string
  date: string
  rating: number
  avatar?: string
  initial?: string
  initialBg?: string
  category: string
  text: string
  verified: boolean
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'sandy sandy-white',
    role: 'Interior Design Studio',
    location: 'London, UK',
    date: 'Sept 2026',
    rating: 5,
    initial: 'S',
    initialBg: 'bg-[#EA580C]',
    category: 'Bespoke Wool Rugs & Custom Brass',
    text: "I've been working with this supplier for a while now for my business, and I couldn't be happier. Top-level professionalism and reliability: they always respond quickly, are kind and helpful in every interaction, and follow up with us on everything — from production to shipping — every step of the way. The products are top quality — always exceeding expectations. Complete reliability: they deliver on what they promise. Highly recommended to anyone looking for a serious partner.",
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Maseeha Buccus',
    role: 'Luxury Resort Procurement',
    location: 'Dubai, UAE',
    date: 'Sept 2026',
    rating: 5,
    initial: 'M',
    initialBg: 'bg-[#BE185D]',
    category: 'Zellige Mosaic Tiles & Lighting',
    text: "They have the highest grade of Moroccan products! The products are exceptional and the service is also very good. Highly recommended. It's always a pleasure ordering from Moroccan Craft Works for our boutique villas and commercial hospitality suites.",
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Dr. Saif Y Khan',
    role: 'Architectural Director',
    location: 'Paris & Doha',
    date: 'Nov 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    category: 'Solid Brass Fixtures & Cedar Wood',
    text: 'Amazing quality products directly from Morocco! Extremely professional, honest and reliable team. Always ships fresh and authentic Moroccan craftsmanship. Highly recommend for anyone looking for genuine architectural pieces, hand-chiseled zellige, and artisan lanterns. Excellent service!',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Fahim Rahman',
    role: 'Home Living Boutique Retailer',
    location: 'New York, USA',
    date: 'Oct 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    category: 'Handmade Ceramics & Leather Poufs',
    text: 'I ordered custom ceramic collections, pottery, and handmade leather poufs. Communication was smooth and professional throughout. The export wooden crating packaging was excellent — every fragile piece arrived safely and in perfect condition. Highly recommended for wholesale and bulk orders!',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Charlotte De Vries',
    role: 'Hospitality Lead Designer',
    location: 'Amsterdam, Netherlands',
    date: 'Dec 2025',
    rating: 5,
    initial: 'C',
    initialBg: 'bg-[#0284C7]',
    category: 'Beni Ourain & Azilal Rugs',
    text: 'Our boutique hotel project required 45 custom-dimensioned Beni Ourain and Azilal wool carpets. Moroccan Craft Works delivered ahead of schedule with immaculate attention to pile density and natural wool washing. Their EUR.1 customs documentation saved us significant import clearance time.',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Matteo Rossi',
    role: 'Contract Furnishings',
    location: 'Milan, Italy',
    date: 'Jan 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    category: 'Unlacquered Brass Sconces & Pendants',
    text: 'The electrical wiring conformed 100% to European CE and international standards while preserving the authentic Moroccan pierced brass aesthetic. Every client that enters our showroom asks about the provenance of these fixtures. Exceptional direct-from-artisan partner.',
    verified: true,
  },
]

interface ReviewsSectionProps {
  onRequestQuote?: () => void
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onRequestQuote }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = 360
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-stone-200/80 overflow-hidden relative">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#B85D36]" />
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#B85D36]">
                Verified Trade Reviews & Testimonials
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
              Real reviews from wholesale buyers and brands worldwide
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Authentic feedback from luxury hotels, architects, interior designers, and boutique retailers who source direct handcrafted goods from our Moroccan guild artisans.
            </p>
          </div>

          {/* Rating Summary & Carousel Arrows */}
          <div className="flex items-center gap-4 sm:gap-6 self-start md:self-end shrink-0">
            {/* Rating badge */}
            <div className="px-4 py-2.5 rounded-xl bg-white border border-stone-200/90 shadow-2xs flex items-center gap-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="border-l border-stone-200 pl-3 text-xs">
                <strong className="text-stone-900 font-bold block text-sm leading-none">
                  4.9 / 5.0
                </strong>
                <span className="text-[11px] text-stone-500">180+ Global Projects</span>
              </div>
            </div>

            {/* Prev / Next Carousel Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous reviews"
                className={`w-10 h-10 rounded-full bg-white border border-stone-200/90 shadow-xs flex items-center justify-center transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'text-stone-800 hover:text-white hover:bg-stone-900 hover:border-stone-900 shadow-sm'
                    : 'text-stone-300 opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5 stroke-[2]" />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next reviews"
                className={`w-10 h-10 rounded-full bg-white border border-stone-200/90 shadow-xs flex items-center justify-center transition-all cursor-pointer ${
                  canScrollRight
                    ? 'text-stone-800 hover:text-white hover:bg-stone-900 hover:border-stone-900 shadow-sm'
                    : 'text-stone-300 opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 xl:-mx-12 xl:px-12"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="w-[320px] sm:w-[380px] lg:w-[410px] shrink-0 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Decorative quotation mark */}
              <div className="absolute top-5 right-6 text-stone-200/80 group-hover:text-amber-700/20 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 stroke-[1.2] opacity-60" />
              </div>

              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3.5 mb-4">
                  {/* Avatar or Initial Circle */}
                  <div className="relative">
                    {rev.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-200 shadow-2xs">
                        <Image
                          src={rev.avatar}
                          alt={rev.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full ${rev.initialBg || 'bg-[#EA580C]'} text-white font-bold text-base flex items-center justify-center shadow-2xs uppercase`}
                      >
                        {rev.initial || rev.name.charAt(0)}
                      </div>
                    )}
                    {/* Verified badge star icon overlay */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-xs">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                  </div>

                  <div className="min-w-0 pr-8">
                    <h3 className="font-serif font-bold text-base text-stone-900 truncate">
                      {rev.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium truncate">
                      {rev.role} · <span className="text-stone-700">{rev.location}</span>
                    </p>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      {rev.date}
                    </span>
                  </div>
                </div>

                {/* Stars Rating */}
                <div className="flex items-center gap-1 mb-3.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400 stroke-[1.5]"
                    />
                  ))}
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-6">
                  {rev.text}
                </p>
              </div>

              {/* Card Footer: Category Tag & Verified Badge */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-[#FAF7F2] text-stone-700 font-medium truncate max-w-[190px]">
                  {rev.category}
                </span>

                <div className="flex items-center gap-1 text-emerald-700 font-semibold shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Partner</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
