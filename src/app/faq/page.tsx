'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react'

import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'
import { QuoteModal } from '@/components/ui/QuoteModal'

interface FaqItem {
  question: string
  answer: string
  category: 'ordering' | 'craftsmanship' | 'shipping' | 'payments'
}

const FAQS: FaqItem[] = [
  // Ordering and Customization
  {
    category: 'ordering',
    question: 'What is your Minimum Order Quantity (MOQ)?',
    answer:
      'We welcome both private clients and commercial trade partners. For individual orders (residential interiors, private collectors, bespoke accents), there is no minimum order quantity—you can order exactly 1 piece. For Wholesale and Custom Hospitality projects, tiered volume pricing begins at 5 to 10 pieces depending on the craft category.',
  },
  {
    category: 'ordering',
    question: 'Can I customize dimensions, colors, and metal patinas?',
    answer:
      'Yes, over 70% of our commissions are fully bespoke. We can adjust rug dimensions and pile heights, brass finishes (unlacquered raw brass, antique bronze, satin gold, matte black), ceramic glaze hues, and zellige geometric layouts to match your architectural drawings.',
  },
  {
    category: 'ordering',
    question: 'Can I order a physical sample before placing a full order?',
    answer:
      'Yes. For custom architectural orders and wholesale container orders, we prepare and dispatch physical finish swatches or complete pre-production prototypes via express air courier for your physical review and client presentation.',
  },

  // Sourcing and Handcrafting
  {
    category: 'craftsmanship',
    question: 'Where are your products made and who crafts them?',
    answer:
      'Every piece is handmade in Morocco across historic artisan guilds in Morocco, Marrakech, Safi, and High Atlas cooperative villages. Our maâlems (master craftspeople) practice generational techniques—from chiseling zellige terracotta with a deqsh hammer to hand-spinning virgin Atlas wool on wooden looms.',
  },
  {
    category: 'craftsmanship',
    question: 'How long does production take for custom commissions?',
    answer:
      'In-stock collection items ship within 2 to 4 business days. Custom residential pieces generally require 2 to 4 weeks. Large-scale hospitality orders (50+ custom lights or 200m² zellige) are scheduled with phased production milestones and regular video updates.',
  },
  {
    category: 'craftsmanship',
    question: 'Do you provide photo and video documentation during production?',
    answer:
      'Yes. Transparency is central to our craft philosophy. Your assigned project director provides photo and video progress reports at key stages: raw material shaping, detailing, surface finishing, and pre-pack inspection.',
  },

  // Shipping and Crating
  {
    category: 'shipping',
    question: 'How are fragile items (zellige, ceramics, brass lanterns) packaged?',
    answer:
      'We have exported Moroccan crafts worldwide for over 15 years. Every fragile piece is surrounded by multi-density foam suspension, sealed against humidity, and placed inside custom-built ISPM-15 certified heat-treated timber crates engineered to absorb ocean and air vibrations.',
  },
  {
    category: 'shipping',
    question: 'What shipping methods and delivery speeds are available?',
    answer:
      'We offer two primary logistics routes: Express Air Freight (DHL Express, FedEx) delivering in 3 to 5 business days worldwide, and Ocean Container Freight (CMA CGM, Maersk) for heavy or high-volume orders taking 14 to 25 business days. Both options include door-to-door tracking.',
  },
  {
    category: 'shipping',
    question: 'Are shipments insured against transit loss or damage?',
    answer:
      'Every single shipment is 100% insured for its full declared replacement value from the moment it leaves our Moroccan atelier until it arrives at your final destination.',
  },
  {
    category: 'shipping',
    question: 'How do customs duties, import taxes, and paperwork work?',
    answer:
      'We manage all Moroccan export declarations, commercial invoices, and EUR.1 / Certificates of Origin. We can quote on DDP (Delivered Duty Paid) terms where all local import duties and taxes are included upfront, or DAP/CIF terms depending on your preference.',
  },

  // Payments and Terms
  {
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer:
      'We accept international Bank Wire Transfers (SWIFT / SEPA), Wise Business, Major Credit and Debit Cards (Visa, MasterCard, American Express), MoneyGram, and Attijariwafa Bank. All transactions are securely processed in USD, EUR, GBP, or MAD.',
  },
  {
    category: 'payments',
    question: 'What are your payment terms for custom and wholesale orders?',
    answer:
      'Standard terms for bespoke commissions and wholesale production are 50% deposit upon order confirmation to initiate material procurement and artisan guild allocation, and 50% balance upon final photographic and video inspection approval prior to dispatch.',
  },
]

// Apple-style motion: critically damped spring (no overshoot) — nothing here carries a flick.
const SPRING = { type: 'spring', bounce: 0, duration: 0.4 } as const

const H1 =
  'text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-[-0.03em]'
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.2em]'
const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moroccan-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]'

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'ordering', label: 'Ordering and Custom' },
  { id: 'craftsmanship', label: 'Craftsmanship' },
  { id: 'shipping', label: 'Shipping and Crating' },
  { id: 'payments', label: 'Payments and Terms' },
]

export default function FaqPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  // Keyed by question text (not list index) so filtering never re-opens a different item.
  const [openQuestion, setOpenQuestion] = useState<string | null>(FAQS[0].question)

  const filteredFaqs = FAQS.filter((faq) => {
    return activeCategory === 'all' || faq.category === activeCategory
  })

  return (
    // reducedMotion="user": slides/height springs are dropped, opacity changes stay.
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
        {/* 1. Header Navigation */}
        <Navbar onRequestQuote={() => setIsQuoteModalOpen(true)} />

        {/* 2. Editorial Header */}
        <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-24 bg-[#140F0C] text-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-25 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('/images/footer/world-map.svg')" }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <p className={`${EYEBROW} text-moroccan-gold-light`}>
              Knowledge Base and Trade Policies
            </p>

            <h1 className={H1}>Frequently Asked Questions</h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
              Clear, transparent answers regarding bespoke commissions, minimums, artisan
              timelines, export crating, and global freight delivery.
            </p>
          </div>
        </section>

        {/* 3. Category Tabs — translucent bar, content scrolls beneath */}
        <section className="bg-white/70 backdrop-blur-xl backdrop-saturate-150 border-b border-stone-200/60 sticky top-[72px] z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              role="tablist"
              aria-label="FAQ categories"
              className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setOpenQuestion(null)
                    }}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-[color,transform] duration-150 active:scale-[0.97] ${FOCUS} ${
                      isActive ? 'text-white' : 'text-stone-600 hover:text-moroccan-dark'
                    }`}
                  >
                    {/* Shared-layout pill slides between tabs and re-targets mid-flight */}
                    {isActive && (
                      <motion.span
                        layoutId="faq-active-tab"
                        transition={SPRING}
                        className="absolute inset-0 rounded-xl bg-moroccan-dark"
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 4. FAQ Accordion */}
        <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
          {filteredFaqs.length === 0 ? (
            <div className="text-center bg-white rounded-2xl border border-stone-200/80 p-8 sm:p-12 space-y-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-moroccan-gold flex items-center justify-center mx-auto">
                <HelpCircle className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div className="text-xl font-semibold text-moroccan-dark tracking-[-0.015em]">
                No matching answers found
              </div>
              <p className="text-[0.9375rem] text-stone-600 leading-relaxed">
                Have a specific question not listed here? Our artisan team is available directly.
              </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className={`mt-2 px-6 py-3 bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white rounded-xl text-sm font-semibold transition-[transform,background-color] duration-150 active:scale-[0.97] cursor-pointer ${FOCUS}`}
              >
                Contact Our Workshop
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
              {/* Left Column (Even: 0, 2, 4...) */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {filteredFaqs
                  .filter((_, idx) => idx % 2 === 0)
                  .map((faq) => {
                    const isOpen = openQuestion === faq.question
                    return (
                      <div
                        key={faq.question}
                        className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                          isOpen
                            ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
                            : 'bg-white text-stone-900 border-stone-200/90 hover:border-[#8C6D46]/40 shadow-xs'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                          className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base focus:outline-hidden cursor-pointer"
                        >
                          <span className="leading-snug">{faq.question}</span>
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                              isOpen
                                ? 'bg-white/20 text-white rotate-180'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed font-light border-t border-white/10 animate-fade-in">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>

              {/* Right Column (Odd: 1, 3, 5...) */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {filteredFaqs
                  .filter((_, idx) => idx % 2 !== 0)
                  .map((faq) => {
                    const isOpen = openQuestion === faq.question
                    return (
                      <div
                        key={faq.question}
                        className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                          isOpen
                            ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
                            : 'bg-white text-stone-900 border-stone-200/90 hover:border-[#8C6D46]/40 shadow-xs'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                          className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base focus:outline-hidden cursor-pointer"
                        >
                          <span className="leading-snug">{faq.question}</span>
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                              isOpen
                                ? 'bg-white/20 text-white rotate-180'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed font-light border-t border-white/10 animate-fade-in">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Cross-link to How to Order */}
          <div className="mt-16 p-6 sm:p-8 bg-white/60 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-moroccan-dark leading-snug tracking-[-0.015em]">
                Want to see the complete ordering process?
              </h3>
              <p className="text-[0.9375rem] text-stone-600 leading-relaxed">
                Explore our step-by-step guide from artisan workshop to international delivery.
              </p>
            </div>
            <Link
              href="/how-to-order"
              className={`px-6 py-3 bg-moroccan-dark hover:bg-black text-white rounded-xl text-sm font-semibold transition-[transform,background-color] duration-150 active:scale-[0.97] flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${FOCUS}`}
            >
              <span>Read How to Order</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </section>

        {/* 5. Footer */}
        <Footer />

        {/* 6. Quotation Modal */}
        <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      </main>
    </MotionConfig>
  )
}
