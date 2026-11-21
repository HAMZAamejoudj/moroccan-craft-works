'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Package,
  Layers,
  FileText,
  ChevronDown,
  Building2,
  Tag,
  Ruler,
  Hammer,
  Send,
  ClipboardCheck,
  PackageCheck,
} from 'lucide-react'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'
import { QuoteModal } from '@/components/ui/QuoteModal'
import FaqSection, { FaqItem } from '@/components/common/FaqSection'
import PrivateLabelHero from '@/components/private-label/PrivateLabelHero'
import { PRIVATE_LABEL_PRODUCTS } from '@/lib/private-label-catalog'

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Design Consultation & CAD Review',
    desc: 'Submit your tech packs, sketches, reference photos, or dimensional drawings. Our artisan directors evaluate feasibility, guild assignment, and material sourcing.',
  },
  {
    step: '02',
    title: 'Custom Tooling & Master Prototyping',
    desc: 'We produce custom brass embossing dies, ceramic molds, or loom warp adjustments. A master artisan crafts the initial physical pre-production prototype.',
  },
  {
    step: '03',
    title: 'Express Sample Approval via DHL',
    desc: 'The physical sample is dispatched to your headquarters in 7-10 business days for tactile evaluation, finish review, and dimensional validation.',
  },
  {
    step: '04',
    title: 'Guild Batch Handcrafting & QA Audit',
    desc: 'Upon sample sign-off, our master maâlems begin batch production. A dedicated project director conducts dual inspections with video progress milestones.',
  },
  {
    step: '05',
    title: 'Custom Branded Packaging & Global Dispatch',
    desc: 'Items are packaged in your custom branded boxes, barcode-labeled, crated inside heat-treated wooden export crates, and shipped via air or ocean container.',
  },
]

const WORKFLOW_ICONS = [Ruler, Hammer, Send, ClipboardCheck, PackageCheck]

const MOQ_TABLE = [
  {
    craft: 'Solid Brass Lighting & Fixtures',
    sampleLead: '7 - 10 days',
    moq: '5 pieces',
    prodLead: '3 - 4 weeks',
    branding: 'Engraved / Inset Brass Plaque',
  },
  {
    craft: 'Beni Ourain & Custom Rugs',
    sampleLead: '10 - 14 days',
    moq: '3 pieces',
    prodLead: '3 - 4 weeks',
    branding: 'Custom Woven Damask Label',
  },
  {
    craft: 'Handmade Ceramics & Tagines',
    sampleLead: '7 - 10 days',
    moq: '15 pieces',
    prodLead: '2 - 3 weeks',
    branding: 'Fired Ceramic Backstamp / Custom Glaze',
  },
  {
    craft: 'Leather Poufs & Goods',
    sampleLead: '5 - 7 days',
    moq: '10 pieces',
    prodLead: '2 - 3 weeks',
    branding: 'Heat Debossed / Metallic Foil Stamp',
  },
  {
    craft: 'Zellige Architectural Tiles',
    sampleLead: '7 - 10 days',
    moq: '10 m²',
    prodLead: '2 - 3 weeks',
    branding: 'Custom Box & Mesh-Mounted Sheet',
  },
  {
    craft: 'Thuya Wood Crafts & Furniture',
    sampleLead: '7 - 10 days',
    moq: '10 pieces',
    prodLead: '2 - 3 weeks',
    branding: 'Laser Pyrography / Brass Inlay',
  },
]

const FAQS = [
  {
    q: 'Can you manufacture products under our own brand name with zero reference to Morocco Craft Works?',
    a: 'Yes. 100% of our Private Label partnerships are strictly white-label. Your custom products, hangtags, inner tissue paper, retail boxes, and master carton markings will carry exclusively your brand identity. Blind shipping direct to your warehouse or 3PL is fully supported.',
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDA) before we share our designs?',
    a: 'Absolutely. We enforce strict intellectual property protection. We sign mutual NDAs before reviewing proprietary CAD blueprints, sketches, or color specifications. Your custom tooling and molds remain your exclusive intellectual property and will never be shared or displayed publicly.',
  },
  {
    q: 'What is the cost and timeframe for physical pre-production samples?',
    a: 'Sample lead times range from 5 to 14 days depending on the craft discipline. Prototype fees cover artisan guild tooling and express worldwide courier (DHL Express / FedEx). Once your production batch is confirmed, the sample tooling fee is credited against your wholesale invoice.',
  },
  {
    q: 'Can you print custom retail barcoding (UPC / EAN) and outer carton labels?',
    a: 'Yes. We apply your scannable UPC/EAN retail barcodes, SKU stickers, inner carton pack labels, and Amazon FBA / warehouse compliance markings directly in Morocco prior to crating.',
  },
  {
    q: 'What export certificates and customs documents do you provide for private label orders?',
    a: 'We provide end-to-end commercial documentation: Certificate of Origin, EUR.1 movement certificates for tariff-free import into the European Union and UK, phytosanitary fumigation certificates for woodwork and raffia, and bill of lading export clearance.',
  },
  {
    q: 'Can we combine multiple private label items into one consolidated shipment?',
    a: 'Yes. We can manufacture and consolidate diverse lines—such as custom brass lighting, leather accessories, and handwoven textiles—into a single container or air cargo shipment to optimize import tariffs and freight costs.',
  },
]

export default function PrivateLabelPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. MASTER NAVBAR */}
      <Navbar onRequestQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-1">
        {/* 2. HERO SECTION (MATCHING ABOUT PAGE) */}
        <PrivateLabelHero onRequestQuote={() => setIsQuoteOpen(true)} />

        {/* 4. BRANDING & CUSTOMIZATION CAPABILITIES (6 Grid) */}
        <section className="py-16 sm:py-24 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85D36]">
                Craft Disciplines
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
                Private Label Customization Techniques
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Every craft category in our catalog can be branded, resized, and formulated according to your brand book and material specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {PRIVATE_LABEL_PRODUCTS.map((cap, idx) => (
                <Link
                  key={cap.slug}
                  href={`/services/private-label/${cap.slug}`}
                  className="group relative flex flex-col rounded-3xl bg-white ring-1 ring-stone-200 shadow-[0_2px_20px_-8px_rgba(60,40,20,0.15)] hover:shadow-[0_24px_50px_-18px_rgba(60,40,20,0.35)] hover:-translate-y-1.5 transition-all duration-500"
                >
                  {/* Image with overlay */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-stone-100">
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a130e]/80 via-[#1a130e]/10 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 flex flex-col p-7">
                    <span className="absolute -top-px left-7 h-[3px] w-14 bg-gradient-to-r from-[#C9A24B] to-[#B85D36] rounded-full group-hover:w-24 transition-all duration-500" />
                    <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug group-hover:text-[#B85D36] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mt-3 flex-1">
                      {cap.desc}
                    </p>
                    <div className="mt-6 flex items-center justify-between rounded-full bg-[#FAF7F2] pl-5 pr-1.5 py-1.5 group-hover:bg-[#1a130e] transition-colors duration-300">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#996733] group-hover:text-[#E8CFA0] transition-colors">
                        View Details & Specs
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B85D36] text-white group-hover:bg-[#C9A24B] transition-colors">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5. 5-STEP PRIVATE LABEL WORKFLOW */}
        <section className="relative py-20 sm:py-28 bg-[#1a130e] overflow-hidden">
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-[#C9A24B]/10 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="inline-block rounded-full border border-[#C9A24B]/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8CFA0]">
                End-To-End Execution
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
                How Our OEM Process Works
              </h2>
              <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
                From initial technical drawings to retail-ready deliveries, we manage each stage with rigorous quality checks.
              </p>
            </div>

            <div className="relative">
              {/* connecting line (desktop) */}
              <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#C9A24B]/60 to-transparent" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-12">
                {WORKFLOW_STEPS.map((wf, idx) => {
                  const Icon = WORKFLOW_ICONS[idx]
                  return (
                    <div key={idx} className="relative flex flex-col items-center text-center group">
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a130e] ring-2 ring-[#C9A24B] shadow-[0_0_0_8px_#1a130e,0_0_30px_rgba(201,162,75,0.35)] group-hover:bg-[#C9A24B] transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#E8CFA0] group-hover:text-[#1a130e] transition-colors" />
                        <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#B85D36] text-[11px] font-bold text-white">
                          {wf.step}
                        </span>
                      </div>

                      <div className="mt-7 w-full flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm group-hover:border-[#C9A24B]/50 group-hover:bg-white/[0.07] group-hover:-translate-y-1 transition-all duration-300">
                        <h3 className="font-serif text-base font-semibold text-white leading-snug">
                          {wf.title}
                        </h3>
                        <p className="mt-3 text-[13px] text-stone-400 leading-relaxed">
                          {wf.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. MOQ & TURNAROUND TIMES TABLE */}
        <section className="py-16 sm:py-24 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B85D36]">
                Transparent Trade Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
                Minimum Quantities & Production Lead Times
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Low sample thresholds allow agile product line testing before scaling to container-volume batches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOQ_TABLE.map((row, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-stone-200 shadow-[0_2px_20px_-8px_rgba(60,40,20,0.15)] hover:shadow-[0_24px_50px_-18px_rgba(60,40,20,0.3)] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#B85D36] to-[#C9A24B] opacity-70 group-hover:opacity-100 transition-opacity" />

                  <h3 className="font-serif text-lg font-semibold text-stone-900 leading-snug min-h-[3.2rem]">
                    {row.craft}
                  </h3>

                  {/* MOQ highlight */}
                  <div className="mt-4 rounded-2xl bg-[#1a130e] px-5 py-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
                      Production MOQ
                    </span>
                    <span className="font-serif text-2xl text-[#E8CFA0] leading-none">{row.moq}</span>
                  </div>

                  {/* Lead times */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#FAF7F2] px-4 py-3">
                      <Clock className="w-4 h-4 text-[#B85D36] mb-1.5" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Sample</p>
                      <p className="text-sm font-semibold text-stone-900 mt-0.5">{row.sampleLead}</p>
                    </div>
                    <div className="rounded-xl bg-[#FAF7F2] px-4 py-3">
                      <Package className="w-4 h-4 text-[#B85D36] mb-1.5" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Batch</p>
                      <p className="text-sm font-semibold text-stone-900 mt-0.5">{row.prodLead}</p>
                    </div>
                  </div>

                  {/* Branding */}
                  <div className="mt-4 flex items-start gap-2.5 border-t border-dashed border-stone-200 pt-4">
                    <Tag className="w-4 h-4 text-[#996733] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Branding Method</p>
                      <p className="text-sm font-medium text-stone-800 mt-0.5">{row.branding}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ SECTION (UNIFIED LUXURY DESIGN) */}
        <FaqSection
          badge="Answers for Brands & Buyers"
          title="Private Label Frequently Asked Questions"
          subtitle="Everything you need to know about custom branding, tooling, NDAs, and international delivery."
          faqs={FAQS}
          bgColor="bg-[#FAF7F2]"
        />
      </main>

      {/* 10. MASTER FOOTER */}
      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct="Private Label & Custom OEM Project"
      />
    </div>
  )
}
