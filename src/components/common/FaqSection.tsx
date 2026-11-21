'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  faqs: FaqItem[];
  bgColor?: string;
  className?: string;
}

export default function FaqSection({
  badge = 'Got Questions?',
  title = 'Frequently Asked Questions',
  subtitle,
  faqs,
  bgColor = 'bg-[#FAF8F3]',
  className = '',
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`py-20 md:py-28 ${bgColor} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {badge && (
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#8C6D46] mb-3 block">
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-stone-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* 2 Independent Columns: eliminates ghost row space when cards expand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* Left Column (Even indices: 0, 2, 4, 6...) */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {faqs
              .map((faq, idx) => ({ faq, idx }))
              .filter(({ idx }) => idx % 2 === 0)
              .map(({ faq, idx }) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                      isOpen
                        ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
                        : 'bg-white text-stone-900 border-stone-200/90 hover:border-[#8C6D46]/40 shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base focus:outline-hidden cursor-pointer"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? 'bg-white/20 text-white rotate-180'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed font-light border-t border-white/10 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Right Column (Odd indices: 1, 3, 5, 7...) */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {faqs
              .map((faq, idx) => ({ faq, idx }))
              .filter(({ idx }) => idx % 2 !== 0)
              .map(({ faq, idx }) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                      isOpen
                        ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
                        : 'bg-white text-stone-900 border-stone-200/90 hover:border-[#8C6D46]/40 shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base focus:outline-hidden cursor-pointer"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? 'bg-white/20 text-white rotate-180'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed font-light border-t border-white/10 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
