'use client';

import React from 'react';
import FaqSection, { FaqItem } from '@/components/common/FaqSection';

const ABOUT_FAQS: FaqItem[] = [
  {
    q: 'Are all your products genuinely 100% handmade in Morocco?',
    a: 'Yes, absolutely. Every piece is handcrafted by hereditary Maâlems (master artisans) in historic Moroccan ateliers located in Morocco, Marrakech, Safi, and the High Atlas Mountains. We use traditional ancestral tools, natural unrefined minerals, pure sheep wool, and solid brass without machine-stamped substitutes.',
  },
  {
    q: 'Do you work directly with architects, interior designers, and hotels?',
    a: 'Yes. A major focus of our work is partnering with hospitality groups, interior architecture studios, luxury resorts, and boutique riads. We accommodate customized CAD drawings, bespoke dimensions, specific metal patinas, and tailored wool densities for commercial installations.',
  },
  {
    q: 'What are your minimum order quantities (MOQs)?',
    a: 'We offer flexible ordering structures: for wholesale and hospitality contracts, tier discounts start at 5 to 10 units. We also support individual bespoke orders (MOQ = 1) for statement residential pieces or prototype evaluations prior to bulk project commitments.',
  },
  {
    q: 'How does international export crating and delivery work?',
    a: 'We manage full end-to-end logistics. Fragile ceramics, zellige, and brass lighting are packaged inside ISPM-15 certified heat-treated wooden export crates lined with high-density shock-absorbing foam. We ship globally via DHL Express and reliable air and sea freight with direct doorstep tracking.',
  },
  {
    q: 'Can we order material samples or a prototype before a major order?',
    a: 'Yes. We offer sample swatches for zellige tiles, brass finishes, and wool weave textures, as well as single evaluation prototypes. When you subsequently place your full project order (10+ units), 100% of your evaluation sample cost is credited to your wholesale invoice.',
  },
  {
    q: 'Are your lighting and electrical fixtures wired to international standards?',
    a: 'Yes. All our handcrafted brass chandeliers, pendant lights, and wall sconces are fitted with certified electrical hardware conforming to US (UL-listed standards) and European (CE / 220V) electrical specifications upon request.',
  },
  {
    q: 'Do you offer private label and custom packaging for retailers?',
    a: 'Yes. We provide turnkey private label solutions for home decor brands, boutique retailers, and e-commerce stores, including custom brass stamping, branded tags, tailored packaging, and custom barcode labeling.',
  },
  {
    q: 'What is your lead time for bespoke handcrafted commissions?',
    a: 'In-stock pieces dispatch within 2 to 4 business days. Custom architectural commissions (such as bespoke rugs, custom zellige tables, or hand-chiseled chandeliers) typically require 2 to 5 weeks of artisan fabrication, followed by 3 to 5 business days for express air courier delivery.',
  },
];

export default function AboutFaq() {
  return (
    <FaqSection
      badge="Got Questions?"
      title="Popular FAQs for Your Business"
      faqs={ABOUT_FAQS}
      bgColor="bg-white"
    />
  );
}
