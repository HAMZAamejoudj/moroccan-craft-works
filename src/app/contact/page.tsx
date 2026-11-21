'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import ContactForm from '@/components/contact/ContactForm';
import ContactRegionalHubs from '@/components/contact/ContactRegionalHubs';
import { QuoteModal } from '@/components/ui/QuoteModal';

export default function ContactPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-stone-900 flex flex-col selection:bg-[#C5A880]/30">
      <Navbar onRequestQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-1">
        <ContactHero />

        {/* 2 Columns: Contact Info (5 cols) + Inquiry Form (7 cols) */}
        <section className="py-16 md:py-24 relative -mt-8 sm:-mt-12 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-5">
                <ContactInfoCard />
              </div>
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <ContactRegionalHubs />
      </main>

      <Footer />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
