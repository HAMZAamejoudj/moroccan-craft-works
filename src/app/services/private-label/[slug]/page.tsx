import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'
import { ProductImageGallery } from '@/components/products/ProductImageGallery'
import { PrivateLabelDetailClient } from './PrivateLabelDetailClient'
import {
  getPrivateLabelBySlug,
  getRelatedPrivateLabel,
  PRIVATE_LABEL_PRODUCTS,
} from '@/lib/private-label-catalog'

interface PrivateLabelPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PRIVATE_LABEL_PRODUCTS.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: PrivateLabelPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getPrivateLabelBySlug(slug)
  if (!product) {
    return {
      title: 'Technique Not Found | Moroccan Craft Works',
    }
  }

  return {
    title: `${product.title} | Private Label | Moroccan Craft Works`,
    description: product.desc,
  }
}

export default async function PrivateLabelDetailPage({ params }: PrivateLabelPageProps) {
  const { slug } = await params
  const product = getPrivateLabelBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedDisciplines = getRelatedPrivateLabel(product.slug, 3)

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. MASTER SITE NAVBAR */}
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* 2. BREADCRUMBS BAR */}
        <div className="border-b border-stone-200/80 bg-white/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-stone-500 font-medium overflow-x-auto no-scrollbar"
            >
              <Link href="/" className="hover:text-[#B85D36] transition-colors shrink-0">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <Link href="/services/private-label" className="hover:text-[#B85D36] transition-colors shrink-0">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <Link href="/services/private-label" className="hover:text-[#B85D36] transition-colors shrink-0">
                Private Label
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-900 font-semibold truncate">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* 3. PRODUCT SHOWCASE (Antique Brass Luxury Layout matching /products/[slug]) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* LEFT: Image Gallery */}
            <div className="lg:col-span-6 lg:sticky lg:top-32">
              <ProductImageGallery
                images={product.images}
                title={product.title}
                badge={product.badge}
              />
            </div>

            {/* RIGHT: Product Details & Purchase/Quote Section */}
            <div className="lg:col-span-6 space-y-6">
              {/* Category */}
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B85D36]">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {product.desc}
              </p>

              {/* Interactive Purchase & Inquire Controls (Price, Counter, Cart, Wishlist, WhatsApp) */}
              <PrivateLabelDetailClient product={product} />

              {/* Product Specifications Table (Clean Minimalist Luxury Dividers) */}
              <div className="mt-8 pt-8 border-t border-stone-200">
                <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900 mb-4">
                  Product Specifications
                </h3>
                <dl className="divide-y divide-stone-200/70 text-xs sm:text-sm">
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Material</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.materials}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Dimensions</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.dimensions}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Origin</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.origin}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Minimum Order (MOQ)</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.productionMoq}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Evaluation Sample</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.sampleMoq} · {product.sampleLead}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Production Lead Time</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.prodLead}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Quality Standard</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.qualityStandard}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Tooling & Die</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.toolingMethod}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Availability</dt>
                    <dd className="font-medium text-emerald-700 text-right">In Stock · Handcrafted to Order</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EDITORIAL CRAFTSMANSHIP & LOGISTICS DETAILS */}
        <section className="border-t border-stone-200 bg-white/70 py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B85D36] block mb-2">
                Authentic Provenance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mb-4">
                Artisan Craftsmanship & Heritage
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
                {product.detailedDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-stone-100">
                <div>
                  <h3 className="font-serif font-medium text-sm text-stone-900 mb-2">
                    Material Authenticity
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    Sourced directly from authentic Moroccan craft guilds: solid brass, vegetable-tanned leather, Atlas wool, and mineral ceramic pigments.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-sm text-stone-900 mb-2">
                    Bespoke Customization
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    Custom-machined tooling, client-owned brass dies, Pantone color-matching, and retail barcoding for luxury private label brands.
                  </p>
                </div>
              </div>
            </div>

            {/* Turnkey 4-Step Production Sequence */}
            <div className="pt-8 border-t border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B85D36] block mb-2">
                Production Process
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 mb-6">
                Turnkey 4-Step Production Sequence
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.workflow.map((wf, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2.5"
                  >
                    <span className="font-serif text-2xl font-bold text-[#996733]">
                      {wf.step}
                    </span>
                    <h5 className="font-serif text-sm font-semibold text-stone-900 leading-snug">
                      {wf.title}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {wf.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Packaging */}
            <div className="pt-8 border-t border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B85D36] block mb-2">
                Export Packaging
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 mb-4">
                Packaging, Crating & Customs Clearance
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                We manage end-to-end export documentation, including Certificate of Origin, EUR.1, and customs clearance documents. Every shipment is packaged with industrial-grade foam wrapping and reinforced wooden crates for safe transit across North America, Europe, the Middle East, and worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* 5. RELATED PRODUCTS ("You May Also Like") */}
        {relatedDisciplines.length > 0 && (
          <section className="py-16 sm:py-24 border-t border-stone-200 bg-[#FAF7F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B85D36] block mb-1">
                    Related Collection
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
                    You May Also Like
                  </h3>
                </div>
                <Link
                  href="/services/private-label"
                  className="text-xs font-semibold text-[#B85D36] hover:underline flex items-center gap-1"
                >
                  <span>View All Private Label</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedDisciplines.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full bg-[#FAF8F5] overflow-hidden">
                      <Link href={`/services/private-label/${item.slug}`} className="block w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                        />
                      </Link>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-white">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B85D36] mb-1">
                          {item.category}
                        </p>
                        <h4 className="font-serif text-base font-medium text-stone-900 group-hover:text-[#B85D36] transition-colors leading-snug line-clamp-1">
                          <Link href={`/services/private-label/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                        <div className="font-serif text-base font-semibold text-stone-900">
                          ${item.price.toFixed(2)}
                        </div>
                        <Link
                          href={`/services/private-label/${item.slug}`}
                          className="text-xs font-semibold text-[#B85D36] hover:text-[#9e4a25] transition-colors flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 6. MASTER FOOTER */}
      <Footer />
    </div>
  )
}
