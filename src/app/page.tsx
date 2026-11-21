'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar/Navbar'
import { Hero } from '@/components/hero/Hero'
import { ValuePropsRibbon } from '@/components/features/ValuePropsRibbon'
import { ProductCategories } from '@/components/products/ProductCategories'
import { ServicesSection } from '@/components/services/ServicesSection'
import { HeritageSection } from '@/components/heritage/HeritageSection'
import { GlobalExportSection } from '@/components/export/GlobalExportSection'
import { StatsSection } from '@/components/stats/StatsSection'
import { FeaturedProductsSection } from '@/components/products/FeaturedProductsSection'
import { InteriorInspirationSection } from '@/components/inspiration/InteriorInspirationSection'
import { ReviewsSection } from '@/components/reviews/ReviewsSection'
import { CtaBanner } from '@/components/cta/CtaBanner'
import { Footer } from '@/components/footer/Footer'
import { QuoteModal } from '@/components/ui/QuoteModal'

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const handleOpenQuote = () => {
    setIsQuoteModalOpen(true)
  }

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false)
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. Header Navigation */}
      <Navbar onRequestQuote={handleOpenQuote} />

      {/* 2. Hero Section */}
      <Hero onRequestQuote={handleOpenQuote} />

      {/* 3. Value Proposition Bar */}
      <ValuePropsRibbon />

      {/* 4. Product Categories Grid */}
      <ProductCategories />

      {/* 5. Services Section */}
      <ServicesSection />

      {/* 6. Heritage and Artisan Spotlight */}
      <HeritageSection />

      {/* 7. Global Export and Logistics */}
      <GlobalExportSection />

      {/* 8. Stats / Metrics */}
      <StatsSection />

      {/* 9. Featured Products (Selected Moroccan Handmade Products) */}
      <FeaturedProductsSection onRequestQuote={() => handleOpenQuote()} />

      {/* 10. Interactive Interior Inspiration (Shop the Look with Room Hotspots) */}
      <InteriorInspirationSection onRequestQuote={() => handleOpenQuote()} />

      {/* 11. Verified Trade Reviews & Testimonials */}
      <ReviewsSection onRequestQuote={() => handleOpenQuote()} />

      {/* 12. Let's Work Together CTA Banner */}
      <CtaBanner onRequestQuote={handleOpenQuote} />

      {/* 11. Footer */}
      <Footer />

      {/* Interactive Quotation Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuote} />
    </main>
  )
}
