'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { QuoteModal } from '@/components/ui/QuoteModal'

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

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart()
      }
    }
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCartOpen, closeCart])

  // Build WhatsApp pre-filled message with cart summary
  const cartSummaryForWhatsApp = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.title} ($${(item.price * item.quantity).toFixed(2)})`
    )
    .join('\n')

  const whatsappMessage = encodeURIComponent(
    `Hello Moroccan Craft Works,\n\nI would like to inquire about the following order:\n\n${cartSummaryForWhatsApp}\n\nEstimated Subtotal: $${subtotal.toFixed(
      2
    )}\n\nPlease provide quotation including shipping and estimated lead time.`
  )
  const whatsappUrl = `https://wa.me/212650069971?text=${whatsappMessage}`

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity duration-300 z-[99] ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide Drawer (From Right) */}
      <aside
        role="dialog"
        aria-label="Shopping Cart"
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-stone-200 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4.5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B85D36]" />
            <h2 className="font-serif text-lg font-semibold text-stone-900 tracking-tight">
              Shopping Cart
            </h2>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1.5 rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xs mb-6 leading-relaxed">
              Explore our handcrafted collections of authentic Moroccan rugs, zellige, pottery, brass and leather.
            </p>
            <Link
              href="/products"
              onClick={closeCart}
              className="px-6 py-2.5 rounded-md bg-[#B85D36] hover:bg-[#9e4a25] text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Items List */
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-200/80">
            {items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                {/* Product Thumbnail */}
                <Link
                  href={`/products/${item.slug}`}
                  onClick={closeCart}
                  className="relative w-20 h-20 rounded-md overflow-hidden bg-stone-100 shrink-0 border border-stone-200"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="font-medium text-xs sm:text-sm text-stone-900 hover:text-[#B85D36] line-clamp-1 transition-colors"
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">
                      {item.category}
                    </p>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-stone-300 rounded bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1 px-2 text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-stone-900 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-1 px-2 text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-semibold text-stone-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[10px] text-stone-400">
                          ${item.price.toFixed(2)} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drawer Footer (Summary & CTAs) */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-stone-200 space-y-3.5">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                Subtotal
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <p className="text-[11px] text-stone-500 leading-snug">
              Direct artisan pricing. Shipping freight & customs crating calculated with quote.
            </p>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              {/* WhatsApp Checkout */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0 text-white" />
                <span>Inquire & Order on WhatsApp</span>
              </a>

              {/* Request Wholesale Quote */}
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="w-full py-3 px-4 rounded-md bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Formal Quote ({totalItems})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={clearCart}
                className="text-[11px] text-stone-400 hover:text-stone-600 underline cursor-pointer"
              >
                Clear Cart
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="text-[11px] font-semibold text-[#B85D36] hover:underline cursor-pointer"
              >
                Continue Shopping &rarr;
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Quote Modal with cart contents */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct={
          items.length > 0
            ? items.map((i) => `${i.quantity}x ${i.title}`).join(', ')
            : undefined
        }
      />
    </>
  )
}
