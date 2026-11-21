'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: string[]
  title: string
  badge?: string
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  title,
  badge,
}) => {
  const [activeIdx, setActiveIdx] = useState(0)

  const galleryImages = images && images.length > 0 ? images : ['/images/catalog/beni_ourain_rug.jpg']
  const currentImage = galleryImages[activeIdx] || galleryImages[0]

  return (
    <div className="space-y-4">
      {/* 1. Main Stage Image */}
      <div className="relative aspect-square md:aspect-[4/5] w-full max-h-[580px] overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/90 shadow-sm flex items-center justify-center group">
        <Image
          src={currentImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

      </div>

      {/* 2. Thumbnails Strip */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {galleryImages.map((img, idx) => {
            const isActive = activeIdx === idx
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all duration-200 focus:outline-none cursor-pointer bg-stone-100 ${
                  isActive
                    ? 'border-[#996733] opacity-100 shadow-md ring-2 ring-[#996733]/20 scale-[1.02]'
                    : 'border-transparent opacity-70 hover:opacity-100 hover:border-stone-300'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover object-center"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
