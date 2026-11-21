'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutOurStory() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#8C6D46] mb-3 block">
              Authentic and Timeless
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-stone-900 mb-6 leading-tight">
              Our Story
            </h2>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-5 font-normal">
              We are more than just an exporter — we are custodians of Morocco&apos;s living artistic tradition. From hand-pierced brass lanterns in the medieval alleys of Marrakech to high-pile Beni Ourain wool rugs loomed in remote Berber villages, our pieces are shaped with ancestral discipline, geometric precision, and deep reverence for raw natural materials.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
              Every commission tells a story: of master lineages passing trade secrets across generations, of uncompromised material authenticity, and of building transparent, long-term partnerships with premier interior designers, boutique resorts, and commercial developers across the globe.
            </p>
          </div>

          {/* Right Image (5 cols) - Image 2 of 2 */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop"
                alt="Moroccan architectural courtyard and traditional artisan craftsmanship"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
