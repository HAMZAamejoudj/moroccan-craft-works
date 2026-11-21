'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactHero() {
  return (
    <section className="bg-[#1C1917] text-white pt-32 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
      {/* Ambient gold glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-start">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
          <Link href="/" className="hover:text-[#C5A880] transition-colors">
            Home
          </Link>
          <span className="text-[#C5A880]/60">/</span>
          <span className="text-[#C5A880]">Contact</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white max-w-4xl leading-tight">
          Get in <span className="text-[#C5A880]">Touch</span>
        </h1>
        <p className="mt-4 text-stone-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
          Connect directly with our master artisan trade concierge for wholesale supply, private label developments, bespoke architectural commissions, and global export crating.
        </p>
      </div>
    </section>
  );
}
