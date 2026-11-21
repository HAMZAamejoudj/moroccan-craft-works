'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Inter, Playfair_Display } from 'next/font/google'
import { motion, MotionConfig } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'
import { QuoteModal } from '@/components/ui/QuoteModal'
const STEPS = [
  {
    number: '01',
    title: 'Browse Our Products',
    description:
      'Explore our curated catalog of authentic handmade Moroccan masterworks. Choose from Rugs and Carpets, Zellige and Architectural Tiles, Pottery and Ceramics, Brass and Copper, Leather Goods, Lighting and Wrought Iron, Basketry, and Wood Crafts.',
    actionLink: {
      label: 'View All Products',
      href: '/#products',
    },
  },
  {
    number: '02',
    title: 'Send an Inquiry',
    description: 'Reach out to our artisan directors through any of these convenient channels:',
    bullets: [
      'Fill out our online Custom Quotation Form',
      'Email our export desk: contact@moroccancraftworks.com',
      'Direct WhatsApp inquiry: +212 650-069971',
    ],
    note: 'Please include: product name(s), required quantities, delivery destination country, business name, and any custom dimensions, blueprints, or reference photos.',
  },
  {
    number: '03',
    title: 'Receive a Quote',
    description:
      'We will reply within 24 to 48 hours with a detailed commercial invoice covering all project details:',
    bullets: [
      'Itemized product pricing (unit price and tiered volume rates)',
      'Door-to-door shipping estimates (Express Air Courier or Ocean Freight)',
      'Estimated artisan handcrafting timeframe',
      'Payment terms and proforma invoice breakdown',
    ],
  },
  {
    number: '04',
    title: 'Confirm and Pay',
    description:
      'Once you approve the quotation, we issue a formal Proforma Invoice. Production or dispatch begins upon initial payment confirmation. We accept:',
    bullets: [
      'International Bank Wire Transfer (SWIFT / SEPA)',
      'Wise Business (Fast, low-fee international transfers)',
      'Major Credit and Debit Cards (Visa, MasterCard, American Express)',
      'Western Union and MoneyGram',
      'Attijariwafa Bank and other localized options on request',
    ],
  },
  {
    number: '05',
    title: 'Production and Packaging',
    description:
      'All items are handcrafted by generational maâlems and rigorously audited by quality inspectors:',
    bullets: [
      'In-stock collection pieces: Dispatched in 2 to 4 business days',
      'Bespoke and Custom orders: 2 to 4 weeks depending on artisan complexity',
      'Packed inside heavy-duty, ISPM-15 certified heat-treated wooden export crates with shock-absorbing foam',
    ],
  },
  {
    number: '06',
    title: 'Shipping and Tracking',
    description:
      'Your order is carefully dispatched with premier international cargo carriers and real-time tracking:',
    bullets: [
      'Express Air Courier (DHL Express / FedEx): 3 to 5 business days door-to-door',
      'Ocean Container Freight (FCL / LCL via CMA CGM / Maersk): 14 to 25 business days to port or site',
      'Full transit insurance, Moroccan export declarations, and customs clearance assistance included',
    ],
  },
]

// Fonts are scoped to this page's content (Navbar/Footer keep the site fonts).
const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})
const text = Inter({
  subsets: ['latin'],
  variable: '--font-text',
  display: 'swap',
})

const FONT_DISPLAY = 'font-[family-name:var(--font-display)]'
const FONT_TEXT = 'font-[family-name:var(--font-text)]'

// Motion: critically damped spring (no overshoot).
const SPRING = { type: 'spring', bounce: 0, duration: 0.4 } as const

export default function HowToOrderPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(STEPS[0].number)

  // Scroll-spy: highlight the step currently crossing the upper third of the viewport.
  useEffect(() => {
    const els = STEPS.map((s) => document.getElementById(`step-${s.number}`)).filter(
      (el): el is HTMLElement => el !== null
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveStep(entry.target.id.replace('step-', ''))
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <main
        className={`${display.variable} ${text.variable} min-h-screen flex flex-col bg-[#FAF7F2]`}
      >
        <Navbar onRequestQuote={() => setIsQuoteModalOpen(true)} />

        {/* Hero — left-aligned editorial headline */}
        <section
          className={`${FONT_TEXT} relative pt-40 pb-20 sm:pt-48 sm:pb-28 bg-[#140F0C] text-white overflow-hidden`}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12] bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('/images/footer/world-map.svg')" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-stone-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-stone-600" strokeWidth={1.75} />
              <span className="text-moroccan-gold-light" aria-current="page">
                How to Order
              </span>
            </nav>

            <h1
              className={`${FONT_DISPLAY} mt-8 text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-[-0.01em]`}
            >
              How to <span className="italic text-moroccan-gold-light">Order</span>
            </h1>

            <p className="mt-6 text-lg leading-[1.7] text-stone-300 max-w-2xl">
              From first inquiry to delivery at your door — a clear, transparent process for
              importers, hotels, retailers and designers.
            </p>
          </div>
        </section>

        {/* Process — sticky index on the left, timeline on the right */}
        <section className={`${FONT_TEXT} py-20 sm:py-28 max-w-6xl mx-auto px-6 lg:px-8 w-full`}>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sticky index */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-moroccan-terracotta">
                  The process
                </span>
                <h2
                  className={`${FONT_DISPLAY} mt-4 text-4xl sm:text-5xl font-medium text-moroccan-dark leading-[1.08] tracking-[-0.01em]`}
                >
                  Six steps to your door
                </h2>
                <p className="mt-5 text-base leading-[1.7] text-stone-600">
                  Authentic Moroccan craftsmanship, handled from workshop to doorstep — paperwork,
                  crating and customs included.
                </p>

                <nav aria-label="Ordering steps" className="mt-10 hidden lg:block">
                  <ol className="space-y-1">
                    {STEPS.map((step) => {
                      const isActive = activeStep === step.number
                      return (
                        <li key={step.number}>
                          <a
                            href={`#step-${step.number}`}
                            className={`group flex items-center gap-4 py-2 text-[0.9375rem] transition-colors duration-200 ${
                              isActive
                                ? 'text-moroccan-dark font-medium'
                                : 'text-stone-500 hover:text-moroccan-dark'
                            }`}
                          >
                            <span
                              className={`h-px transition-[width,background-color] duration-300 ${
                                isActive
                                  ? 'w-10 bg-moroccan-terracotta'
                                  : 'w-5 bg-stone-300 group-hover:w-8'
                              }`}
                              aria-hidden="true"
                            />
                            <span className="tabular-nums text-xs tracking-wider">{step.number}</span>
                            <span>{step.title}</span>
                          </a>
                        </li>
                      )
                    })}
                  </ol>
                </nav>
              </div>
            </aside>

            {/* Timeline */}
            <ol className="lg:col-span-8 relative border-l border-stone-300/80 ml-2 lg:ml-0">
              {STEPS.map((step) => (
                <motion.li
                  key={step.number}
                  id={`step-${step.number}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={SPRING}
                  className="relative pl-8 sm:pl-12 pb-16 last:pb-0 scroll-mt-32"
                >
                  <span
                    className="absolute -left-[7px] top-[1.15rem] w-3.5 h-3.5 rounded-full bg-moroccan-terracotta ring-4 ring-[#FAF7F2]"
                    aria-hidden="true"
                  />

                  <div className="flex items-baseline gap-4">
                    <span
                      className={`${FONT_DISPLAY} italic text-5xl sm:text-6xl font-medium leading-none text-moroccan-gold/70 tabular-nums`}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <h3
                      className={`${FONT_DISPLAY} text-2xl sm:text-3xl font-semibold text-moroccan-dark leading-tight`}
                    >
                      <span className="sr-only">Step {step.number}: </span>
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-5 text-base sm:text-[1.0625rem] leading-[1.75] text-stone-600 max-w-2xl">
                    {step.description}
                  </p>

                  {step.bullets && (
                    <ul className="mt-6 max-w-2xl border-t border-stone-200">
                      {step.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-4 py-3.5 border-b border-stone-200 text-base leading-[1.6] text-stone-800"
                        >
                          <span
                            className="mt-[0.55rem] w-1.5 h-1.5 rotate-45 bg-moroccan-gold flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.note && (
                    <p className="mt-6 max-w-2xl pl-5 border-l-2 border-moroccan-gold/60 text-[0.9375rem] leading-[1.7] text-stone-600">
                      {step.note}
                    </p>
                  )}

                  {step.actionLink && (
                    <Link
                      href={step.actionLink.href}
                      className="group mt-6 inline-flex items-center gap-2 text-base font-medium text-moroccan-terracotta hover:text-moroccan-terracotta-dark transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moroccan-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]"
                    >
                      <span className="border-b border-current pb-0.5">{step.actionLink.label}</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </Link>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <Footer />

        <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      </main>
    </MotionConfig>
  )
}
