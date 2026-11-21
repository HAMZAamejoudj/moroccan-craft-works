'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

const HUBS = [
  {
    city: 'Marrakech',
    title: 'Export Hub & Leather Guilds',
    focus: 'Consolidation center, custom packaging, full-grain leather saddlery & ironwork.',
  },
  {
    city: 'Essaouira Medina',
    title: 'Brass & Zellige Ateliers',
    focus: 'Hand-chiseled pierced lighting, solid copper basins, and authentic Moroccan zellige mosaics.',
  },
  {
    city: 'Safi',
    title: 'Pottery & Ceramic District',
    focus: 'Hand-thrown terracotta amphoras, decorative tajines, and oxide mineral glazes.',
  },
  {
    city: 'High Atlas',
    title: 'Tribal Wool Cooperatives',
    focus: 'Pure virgin live sheep wool shearing, hand-spinning, and traditional vertical loom weaving.',
  },
];

export default function ContactRegionalHubs() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D46] mb-2 block">
            Nationwide Footprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Direct Presence Across Moroccan Craft Regions
          </h2>
          <p className="mt-2 text-stone-600 text-sm">
            We work directly at the source with master artisan families and verified regional guilds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HUBS.map((hub) => (
            <div
              key={hub.city}
              className="bg-[#FAF8F3] p-6 rounded-2xl border border-stone-200/80 shadow-2xs hover:border-[#C5A880]/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#8C6D46] mb-4 shadow-xs">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46]">
                {hub.city}
              </span>
              <h3 className="font-serif text-base font-bold text-stone-900 mt-1 mb-2">
                {hub.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {hub.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
