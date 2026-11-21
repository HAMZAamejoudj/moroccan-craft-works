'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutWhoWeAre from '@/components/about/AboutWhoWeAre';
import AboutOurStory from '@/components/about/AboutOurStory';
import AboutMilestonesAndValues from '@/components/about/AboutMilestonesAndValues';
import AboutNumbers from '@/components/about/AboutNumbers';
import AboutFaq from '@/components/about/AboutFaq';
import { QuoteModal } from '@/components/ui/QuoteModal';

export default function AboutUsPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col selection:bg-[#C5A880]/30">
      <Navbar onRequestQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-1">
        <AboutHero />
        <AboutWhoWeAre />
        <AboutOurStory />
        <AboutMilestonesAndValues />
        <AboutNumbers />
        <AboutFaq />
      </main>

      <Footer />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
