'use client';

import React from 'react';

const NUMBERS = [
  { value: '100%', label: 'Ancestral Handmade' },
  { value: '40+', label: 'Countries Exported' },
  { value: '350+', label: 'Guild Master Artisans' },
  { value: '24/7', label: 'Dedicated Trade Support' },
];

export default function AboutNumbers() {
  return (
    <section className="py-20 md:py-24 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Soft decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white mb-12">
          By the Numbers
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {NUMBERS.map((num) => (
            <div key={num.label} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#C5A880] mb-2">
                {num.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-stone-300 uppercase tracking-wider">
                {num.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
