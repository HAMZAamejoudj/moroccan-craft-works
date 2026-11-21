'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutWhoWeAre() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#8C6D46] mb-3 block">
              Heritage and Master Craftsmanship
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-stone-900 mb-6 leading-tight">
              Who We Are
            </h2>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-5 font-normal">
              Moroccan Craft Works is a leading export house and artisan collective specializing in authentic, handmade Moroccan architectural decor, bespoke lighting, zellige tiling, tribal rugs, and sculptural woodwork. Operating directly from the historic craft centers of Marrakech, Safi, and the High Atlas Mountains, we bridge hereditary master artisans (Maâlems) directly with architects, interior designers, luxury hotels, and private collectors worldwide.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
              Our team combines centuries of ancestral Moroccan trade wisdom with stringent international commercial export standards, precise architectural dimensional verifications, and certified museum-grade wooden crating designed for flawless global transit.
            </p>
          </div>

          {/* Right Image (5 cols) - Image 1 of 2 */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop"
                alt="Moroccan Master Artisan crafting authentic architectural decor"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
