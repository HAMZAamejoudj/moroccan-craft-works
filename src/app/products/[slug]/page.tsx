import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'
import { ProductImageGallery } from '@/components/products/ProductImageGallery'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductDetailClient } from './ProductDetailClient'
import {
  getProductBySlug,
  getRelatedProducts,
  CATALOG_PRODUCTS,
} from '@/lib/products-catalog'

const SHORT_CATEGORY_ALIASES: Record<string, string> = {
  'rugs': 'rugs',
  'zellige': 'zellige',
  'pottery': 'pottery',
  'brass': 'brass',
  'leather': 'leather',
  'basketry': 'basketry',
  'wood': 'wood',
  'lighting': 'lighting',
  'textiles': 'textiles',
  'clothing': 'clothing',
}

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CATALOG_PRODUCTS.map((p) => ({
    slug: p.slug || p.id,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) {
    return {
      title: 'Product Not Found | Moroccan Craft Works',
    }
  }

  return {
    title: `${product.title} | Moroccan Craft Works`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params

  // Bare category aliases route to the filtered products catalog view
  if (SHORT_CATEGORY_ALIASES[slug]) {
    redirect(`/products?category=${SHORT_CATEGORY_ALIASES[slug]}`)
  }

  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product, 4)

  // Product gallery: use product's actual image set if defined, else the main image
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image]

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
              <Link href="/products" className="hover:text-[#B85D36] transition-colors shrink-0">
                Products
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <Link
                href={`/products?category=${product.categoryId}`}
                className="hover:text-[#B85D36] transition-colors shrink-0 capitalize"
              >
                {product.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-900 font-semibold truncate">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* 3. PRODUCT SHOWCASE (Antique Brass Inspired Luxury Layout) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* LEFT: Image Gallery */}
            <div className="lg:col-span-6 lg:sticky lg:top-32">
              <ProductImageGallery
                images={galleryImages}
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
                {product.description}
              </p>

              {/* Interactive Purchase & Inquire Controls (Price, Counter, Cart, Wishlist, WhatsApp) */}
              <ProductDetailClient product={product} />

              {/* Product Specifications Table (Clean Minimalist Luxury Dividers) */}
              <div className="mt-8 pt-8 border-t border-stone-200">
                <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900 mb-4">
                  Product Specifications
                </h3>
                <dl className="divide-y divide-stone-200/70 text-xs sm:text-sm">
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Material</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.material}</dd>
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
                    <dd className="font-medium text-stone-900 text-right">{product.moq}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Lead Time</dt>
                    <dd className="font-medium text-stone-900 text-right">{product.leadTime}</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-stone-500">Quality Standard</dt>
                    <dd className="font-medium text-stone-900 text-right">
                      {product.hospitalityGrade ? 'Hospitality & Commercial Grade' : 'Artisan Handcrafted'}
                    </dd>
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
                Each piece in our {product.category.toLowerCase()} collection is entirely crafted by hand using centuries-old techniques native to {product.origin}. No automated mass production or synthetic imitation is involved. Our master artisans preserve hereditary methods passed down through families for generations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-stone-100">
                <div>
                  <h3 className="font-serif font-medium text-sm text-stone-900 mb-2">
                    Material Authenticity
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    Sourced directly from local Moroccan resources: unlacquered solid brass, vegetable-tanned leathers, Atlas sheep wool, and mineral glazes.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-sm text-stone-900 mb-2">
                    Bespoke Customization
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    Tailored in specific dimensions, patterns, and architectural finishes to meet the exact requirements of architects and interior designers worldwide.
                  </p>
                </div>
              </div>
            </div>

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
        {relatedProducts.length > 0 && (
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
                  href={`/products?category=${product.categoryId}`}
                  className="text-xs font-semibold text-[#B85D36] hover:underline flex items-center gap-1"
                >
                  <span>View All in {product.category}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 6. MASTER SITE FOOTER */}
      <Footer />
    </div>
  )
}
