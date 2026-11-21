'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
  </svg>
);

interface PrivateLabelHeroProps {
  onRequestQuote: () => void;
}

export default function PrivateLabelHero({ onRequestQuote }: PrivateLabelHeroProps) {
  const whatsappMessage = encodeURIComponent(
    'Hello Moroccan Craft Works, I am interested in Private Label & Custom OEM Manufacturing for my brand. Please share your OEM capabilities and sample information.'
  );
  const whatsappUrl = `https://wa.me/212650069971?text=${whatsappMessage}`;

  return (
    <section className="bg-[#1C1917] text-white pt-32 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
      {/* Ambient gold glow matching About page */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-start">
        {/* Breadcrumb matching About page */}
        <nav className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
          <Link href="/" className="hover:text-[#C5A880] transition-colors">
            Home
          </Link>
          <span className="text-[#C5A880]/60">/</span>
          <span className="text-stone-400">Services</span>
          <span className="text-[#C5A880]/60">/</span>
          <span className="text-[#C5A880]">Private Label & OEM</span>
        </nav>

        {/* Title matching About & Contact style */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white max-w-4xl leading-tight">
          Private Label & <span className="text-[#C5A880]">Custom OEM</span>
        </h1>

        <p className="mt-4 text-stone-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
          Launch or scale bespoke home decor, lighting, rug, ceramic, and leather collections crafted exclusively under your brand name by Morocco&apos;s master artisan guilds with strict NDA protection and turnkey packaging.
        </p>

        {/* Elegant Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <button
            type="button"
            onClick={onRequestQuote}
            className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#C5A880] hover:bg-[#b09066] text-stone-950 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request OEM Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3.5 px-7 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-sm"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Inquire via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}