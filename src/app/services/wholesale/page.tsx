'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  ArrowRight,
  Check,
  ShieldCheck,
  Package,
  Layers,
  Truck,
  FileCheck,
  Building2,
  Percent,
  Compass,
  ChevronDown,
  Box,
  Heart,
  Store,
  Globe2,
  Plane,
  Award,
  Clock,
  Ship,
  Wrench,
  UserCheck,
  Tag,
  Boxes,
  PackageCheck,
  Stamp,
  CreditCard,
  ClipboardList,
  Receipt,
  Hammer,
} from 'lucide-react'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'
import { QuoteModal } from '@/components/ui/QuoteModal'
import FaqSection from '@/components/common/FaqSection'
import WholesaleHero from '@/components/wholesale/WholesaleHero'
import { CATALOG_CATEGORIES } from '@/lib/products-catalog'
import { WHOLESALE_CATEGORIES } from '@/lib/wholesale-catalog'

// Official Authentic WhatsApp Logo SVG
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
  </svg>
)


const WHOLESALE_STEPS = [
  {
    num: '01',
    title: 'Catalog Selection & Quantities',
    desc: 'Choose from our 160+ curated catalog items or submit bespoke dimensions and volume targets.',
  },
  {
    num: '02',
    title: 'Formal Proforma & Freight Quote',
    desc: 'We issue an itemized commercial proforma invoice with volume discounts and door-to-door freight rates within 24 hours.',
  },
  {
    num: '03',
    title: 'Production & Video Milestones',
    desc: 'Master artisans begin crafting. Your account director sends photo and video progress reports at key manufacturing milestones.',
  },
  {
    num: '04',
    title: 'Reinforced Crating & Export Clearance',
    desc: 'Pieces are packed in heat-treated ISPM-15 wooden export crates. Moroccan customs and EUR.1 certificates are fully cleared.',
  },
  {
    num: '05',
    title: 'Tracked Air / Sea Delivery',
    desc: 'Consolidated shipments arrive via DHL Express (3-5 days) or ocean container (14-25 days) directly to your warehouse.',
  },
]

const WHOLESALE_STEP_ICONS = [ClipboardList, Receipt, Hammer, PackageCheck, Plane]

const WHOLESALE_FAQS = [
  {
    q: 'Can we mix different craft categories in a single wholesale order?',
    a: 'Yes. One of our key advantages as a multi-guild manufacturer is order consolidation. You can combine rugs, zellige tiles, brass lanterns, ceramics, and leather poufs into a single consolidated shipment, saving significantly on export freight and customs handling fees.',
  },
  {
    q: 'What payment terms are offered for wholesale orders?',
    a: 'Standard wholesale terms are 50% deposit upon order confirmation to initiate raw material allocation and guild production, with the remaining 50% balance payable upon final video/photo inspection sign-off prior to crating and export dispatch. We accept international bank wire transfers (SWIFT/SEPA), Wise Business, and major cards.',
  },
  {
    q: 'What happens if a fragile piece is damaged during ocean or air transit?',
    a: 'Every wholesale shipment is 100% insured for its full replacement value. Our industrial packaging uses shock-absorbing multi-density foam and ISPM-15 certified reinforced wooden crates. In the rare event of transit damage, we immediately expedite a replacement piece at zero cost to you.',
  },
  {
    q: 'Do you provide European Union EUR.1 certificates for duty-free importation?',
    a: 'Yes. Under the EU-Morocco trade agreement, our EUR.1 movement certificates allow European Union and UK registered businesses to import Moroccan handcrafted goods duty-free (0% customs tariff). We also supply Certificates of Origin and fumigation certificates for US, Canadian, and Australian customs.',
  },
  {
    q: 'What is the lead time for full container load (FCL) wholesale orders?',
    a: 'Full container orders (20ft or 40ft HQ) typically take 4 to 8 weeks depending on the artisan mix (carpets and zellige require longer manual loom time than brassware). Ocean transit to European ports takes 3-7 days, and to North American East Coast ports 12-18 days.',
  },
  {
    q: 'Can wholesale buyers request custom sizes and specific metal patinas?',
    a: 'Yes, absolutely. Because all pieces are produced directly in our affiliated guild ateliers, we readily accommodate bespoke sizes, customized rug dimensions, and custom metal patinas (antique unlacquered, brushed brass, verdigris, or blackened brass) on wholesale quantities.',
  },
]

export default function WholesalePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const whatsappMessage = encodeURIComponent(
    'Hello Moroccan Craft Works, I am looking to establish a Wholesale / B2B account for my business. Please provide wholesale catalog pricing and export shipping terms.'
  )
  const whatsappUrl = `https://wa.me/212650069971?text=${whatsappMessage}`

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. MASTER NAVBAR */}
      <Navbar onRequestQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-1">
        {/* 2. HERO SECTION (MATCHING ABOUT & PRIVATE LABEL) */}
        <WholesaleHero onRequestQuote={() => setIsQuoteOpen(true)} />


        {/* 5. CORE CATEGORIES PREVIEW */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85D36]">
                  Full Guild Portfolio
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
                  Wholesale Categories & Minimums
                </h2>
                <p className="text-sm text-stone-600">
                  Select any category to view individual pieces or request consolidated multi-guild packing.
                </p>
              </div>

              <Link
                href="/products"
                className="text-xs font-bold text-[#B85D36] hover:underline flex items-center gap-1.5 shrink-0"
              >
                <span>Browse Full 160-Item Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {WHOLESALE_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="group relative flex flex-col rounded-3xl bg-white ring-1 ring-stone-200 shadow-[0_2px_20px_-8px_rgba(60,40,20,0.15)] hover:shadow-[0_24px_50px_-18px_rgba(60,40,20,0.35)] hover:-translate-y-1.5 transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-[#FAF8F5]">
                    <Link href={`/services/wholesale/${cat.slug}`} className="block w-full h-full">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a130e]/70 via-transparent to-transparent" />
                    </Link>


                    <button
                      type="button"
                      aria-label="Save to Wishlist"
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center text-stone-500 hover:text-rose-500 transition-all duration-300 z-10 cursor-pointer opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0"
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-1.5 shadow-lg">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mr-1.5">From</span>
                      <span className="font-serif text-base font-semibold text-[#B85D36]">${cat.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="relative flex flex-col flex-1 p-7">
                    <span className="absolute -top-px left-7 h-[3px] w-14 bg-gradient-to-r from-[#C9A24B] to-[#B85D36] rounded-full group-hover:w-24 transition-all duration-500" />
                    <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug group-hover:text-[#B85D36] transition-colors">
                      <Link href={`/services/wholesale/${cat.slug}`}>{cat.title}</Link>
                    </h3>
                    <p className="text-sm text-stone-600 mt-3 leading-relaxed flex-1">{cat.desc}</p>

                    <Link
                      href={`/services/wholesale/${cat.slug}`}
                      className="mt-6 flex items-center justify-between rounded-full bg-[#FAF7F2] pl-5 pr-1.5 py-1.5 group-hover:bg-[#1a130e] transition-colors duration-300"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-[#996733] group-hover:text-[#E8CFA0] transition-colors">
                        View Details
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B85D36] text-white group-hover:bg-[#C9A24B] transition-colors">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. LOGISTICS, PACKAGING & CUSTOMS */}
        <section className="py-16 sm:py-24 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85D36]">
                Global Export Infrastructure
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
                Wholesale Packaging, Crating & Customs
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                15+ years of worldwide export experience. Every single piece is secured for long-distance transit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[
                {
                  icon: Box,
                  n: '01',
                  title: 'ISPM-15 Certified Crating',
                  desc: 'Heavy-duty heat-treated export wooden timber crates with shock-absorbing foam suspension. Formulated specifically to withstand maritime container humidity and airline baggage handling.',
                },
                {
                  icon: Truck,
                  n: '02',
                  title: 'FCL Ocean & Express Air',
                  desc: 'Choose express air door-to-door courier (DHL Express, 3-5 business days) for time-sensitive projects, or ocean container freight (20ft & 40ft FCL / LCL, 14-25 days) for heavy volume.',
                },
                {
                  icon: FileCheck,
                  n: '03',
                  title: 'Duty-Free Customs Paperwork',
                  desc: 'We handle Certificate of Origin, EUR.1 movement certificates for 0% customs duties in the EU/UK, phytosanitary fumigation certificates, and itemized commercial proformas.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.n}
                    className="group relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-stone-200 shadow-[0_2px_20px_-8px_rgba(60,40,20,0.15)] hover:shadow-[0_24px_50px_-18px_rgba(60,40,20,0.3)] hover:-translate-y-1.5 transition-all duration-500"
                  >
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a130e] ring-1 ring-[#C9A24B]/50 group-hover:bg-[#B85D36] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#E8CFA0] stroke-[1.6]" />
                    </div>
                    <h3 className="relative mt-6 font-serif text-xl font-semibold text-stone-900">{item.title}</h3>
                    <span className="block mt-3 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#B85D36] group-hover:w-20 transition-all duration-500" />
                    <p className="relative mt-4 text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 7. 5-STEP WHOLESALE WORKFLOW */}
        <section className="relative py-20 sm:py-28 bg-[#1a130e] overflow-hidden">
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-[#C9A24B]/10 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="inline-block rounded-full border border-[#C9A24B]/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8CFA0]">
                Simple B2B Ordering
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
                The Wholesale Order Process
              </h2>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#C9A24B]/60 to-transparent" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-12">
                {WHOLESALE_STEPS.map((s, idx) => {
                  const Icon = WHOLESALE_STEP_ICONS[idx]
                  return (
                    <div key={idx} className="relative flex flex-col items-center text-center group">
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a130e] ring-2 ring-[#C9A24B] shadow-[0_0_0_8px_#1a130e,0_0_30px_rgba(201,162,75,0.35)] group-hover:bg-[#C9A24B] transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#E8CFA0] group-hover:text-[#1a130e] transition-colors" />
                        <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#B85D36] text-[11px] font-bold text-white">
                          {s.num}
                        </span>
                      </div>
                      <div className="mt-7 w-full flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm group-hover:border-[#C9A24B]/50 group-hover:bg-white/[0.07] group-hover:-translate-y-1 transition-all duration-300">
                        <h3 className="font-serif text-base font-semibold text-white leading-snug">{s.title}</h3>
                        <p className="mt-3 text-[13px] text-stone-400 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 8. WHOLESALE FAQ (UNIFIED LUXURY DESIGN) */}
        <FaqSection
          badge="Trade & Commercial Inquiries"
          title="Frequently Asked Wholesale Questions"
          subtitle="Everything you need to know about bulk orders, container logistics, custom finishes, and customs clearance."
          faqs={WHOLESALE_FAQS}
          bgColor="bg-[#FAF7F2]"
        />

        {/* 9. BOTTOM CTA */}
        <section className="py-16 sm:py-20 bg-[#1C1510] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C59B27] block">
              Direct Trade Accounts
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Open Your Moroccan Wholesale Account
            </h2>
            <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
              Connect with our export desk for tiered wholesale volume pricing, sample kits, and consolidated container freight schedules.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-md bg-[#B85D36] hover:bg-[#9e4a25] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer"
              >
                Request Wholesale Price Sheet
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat with Wholesale Desk</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 10. MASTER FOOTER */}
      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct="Wholesale B2B Account Inquiry"
      />
    </div>
  )
}
