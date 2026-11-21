'use client'

import React, { useState } from 'react'
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Check,
} from 'lucide-react'
import { QuoteModal } from '@/components/ui/QuoteModal'
import { CatalogProduct } from '@/lib/products-catalog'
import { useCart } from '@/context/CartContext'

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

interface ProductDetailClientProps {
  product: CatalogProduct
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  const price = product.price || 85.0

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        slug: product.slug || product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        material: product.material,
        dimensions: product.dimensions,
      },
      quantity
    )
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2200)
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Moroccan Craft Works, I am interested in "${product.title}" (${product.category}, $${price.toFixed(2)}). Please provide quotation and export lead time.`
  )
  const whatsappUrl = `https://wa.me/212650069971?text=${whatsappMessage}`

  return (
    <div className="space-y-5 pt-3">
      {/* Price */}
      <div>
        <div className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
          ${price.toFixed(2)}
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Wholesale & export price. Custom dimensions & container shipping available.
        </p>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex items-stretch gap-3">
        {/* Quantity */}
        <div className="flex items-center border border-slate-300 rounded-md bg-white">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-3.5 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3 py-2.5 text-sm font-semibold text-slate-900 min-w-[36px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-3.5 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-3 px-6 rounded-md text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
            addedToCart
              ? 'bg-emerald-800 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          {addedToCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`px-3.5 py-3 rounded-md border transition-colors cursor-pointer flex items-center justify-center ${
            isWishlisted
              ? 'border-rose-300 bg-rose-50 text-rose-600'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-rose-600'
          }`}
          aria-label="Save to Wishlist"
          title="Save to Wishlist"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Secondary CTAs: Quote & Official WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => setIsQuoteOpen(true)}
          className="py-3 px-4 rounded-md bg-[#B85D36] hover:bg-[#9e4a25] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Request Wholesale Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0 text-white" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct={product.title}
      />
    </div>
  )
}
