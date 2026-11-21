'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface AboutCtaProps {
  onOpenQuote?: () => void;
}

export default function AboutCta({ onOpenQuote }: AboutCtaProps) {
  return (
    <section className="py-20 md:py-24 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Soft Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white mb-6 leading-tight">
          Partner With Us
        </h2>

        <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Ready to source authentic Moroccan artisan craft, bespoke lighting, or custom architectural elements for your project? Let&apos;s talk.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#8C6D46] hover:bg-[#725735] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Connect With Us Today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {onOpenQuote && (
            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Request Commercial Quote
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
