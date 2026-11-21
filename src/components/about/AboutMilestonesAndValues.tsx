'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Users, Globe } from 'lucide-react';

const MILESTONES = [
  {
    year: '2016',
    title: 'Founded in Marrakech',
    desc: 'Established with an initial cooperative of 12 master Maâlems in brass and zellige to bring authentic Moroccan craft to international design studios.',
  },
  {
    year: '2019',
    title: 'Guild Cooperative Expansion',
    desc: 'Expanded direct artisan partnerships to over 150 weavers, ceramists, and woodworkers across the Middle Atlas and Safi pottery clusters.',
  },
  {
    year: '2021',
    title: 'Hospitality Architectural Export',
    desc: 'Standardized CAD architectural adaptations and international CE/UL electrical wiring compliances for international luxury hotels and private riads.',
  },
  {
    year: '2024',
    title: 'Zero-Damage Museum Crating',
    desc: 'Transitioned 100% of shipments to custom ISPM-15 heat-treated export crates and established direct air freight express lanes with DHL & FedEx.',
  },
  {
    year: '2026',
    title: 'Global Turnkey B2B Network',
    desc: 'Now serving architects, interior designers, and retail brands across 40+ countries with low MOQs, custom private label, and dedicated trade support.',
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Master Quality',
    desc: 'Every piece is hand-inspected for structural integrity, precise architectural dimensions, and finish uniformity prior to international export.',
  },
  {
    icon: Layers,
    title: 'Natural Materials',
    desc: '100% virgin Atlas sheep wool, solid unrefined brass, non-toxic mineral terracotta glazes, and sustainably harvested Moroccan woods.',
  },
  {
    icon: Users,
    title: 'Fair Trade Community',
    desc: 'Direct ethical compensation and advance deposit financing ensuring the economic independence and continuity of hereditary artisan families.',
  },
  {
    icon: Globe,
    title: 'Global Doorstep Delivery',
    desc: 'Express door-to-door delivery across 40+ countries with full international customs clearance, museum-grade wooden crating, and insured transit.',
  },
];

export default function AboutMilestonesAndValues() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (6 cols): Milestones Timeline */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#8C6D46] mb-3 block"
            >
              Our Journey Through Time
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-stone-900 mb-10 leading-tight"
            >
              Milestones
            </motion.h2>

            <div className="relative pl-8 sm:pl-10 border-l-2 border-stone-200/90 space-y-10 sm:space-y-12 w-full">
              {MILESTONES.map((m, idx) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.12,
                    ease: [0.21, 0.45, 0.27, 0.9],
                  }}
                  className="relative group"
                >
                  {/* Circle Dot Marker with subtle scale animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.12 + 0.15,
                      type: 'spring',
                      stiffness: 300,
                      damping: 18,
                    }}
                    className="absolute -left-[41px] sm:-left-[49px] top-1.5 w-5 h-5 rounded-full bg-[#8C6D46] border-4 border-white shadow-md ring-2 ring-[#8C6D46]/25 group-hover:scale-125 transition-transform duration-300"
                  />

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2">
                    <span className="px-3.5 py-1 rounded-full bg-stone-900 text-[#C5A880] text-xs sm:text-sm font-bold tracking-wider shadow-xs">
                      {m.year}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900 group-hover:text-[#8C6D46] transition-colors duration-200">
                      {m.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light mt-2 max-w-xl">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column (6 cols): What We Stand For (2x2 Cards) */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#8C6D46] mb-3 block"
            >
              Our Values
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-stone-900 mb-10 leading-tight"
            >
              What We Stand For
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full">
              {VALUES.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: 'easeOut',
                    }}
                    whileHover={{ y: -5 }}
                    className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-[#8C6D46]/40 transition-all flex flex-col items-center text-center group cursor-default"
                  >
                    <div className="w-14 h-14 rounded-full bg-stone-900 text-[#C5A880] flex items-center justify-center shrink-0 mb-5 shadow-xs group-hover:scale-110 group-hover:bg-[#8C6D46] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900 mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      {val.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
