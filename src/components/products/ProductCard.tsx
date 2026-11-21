'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { CatalogProduct } from '@/lib/products-catalog'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: CatalogProduct
  onRequestQuote?: (productTitle: string) => void
  isWishlisted?: boolean
  onToggleWishlist?: (productId: string) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onRequestQuote,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [liked, setLiked] = useState(isWishlisted)
  const { addToCart } = useCart()

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const next = !liked
    setLiked(next)
    if (onToggleWishlist) {
      onToggleWishlist(product.id)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      slug: product.slug || product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      material: product.material,
      dimensions: product.dimensions,
    })
  }

  const slug = product.slug || product.id
  const displayPrice = product.price ?? 85.0

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* 1. Image Wrap (Aspect 1:1, Clean without badges, Zoom on Hover, Wishlist & Add to Cart Overlay) */}
      <div className="relative aspect-square w-full bg-[#FAF8F5] overflow-hidden">
        <Link href={`/products/${slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Top-Right Wishlist Floating Heart Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center transition-all duration-200 z-10 cursor-pointer ${
            liked
              ? 'text-rose-500 opacity-100 scale-100'
              : 'text-stone-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              liked ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </button>

        {/* Bottom Add to Cart Overlay Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 bg-white hover:bg-stone-900 text-stone-900 hover:text-white rounded-xs text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <ShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* 2. Product Info (Clean Title + Price ONLY, matching Antique Brass Screen 2) */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
        <Link href={`/products/${slug}`} className="block mb-2">
          <h3 className="text-sm font-normal text-stone-800 hover:text-[#996733] transition-colors leading-snug line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-semibold text-stone-900">
            ${displayPrice.toFixed(2)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-stone-400 line-through">
              ${product.salePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
