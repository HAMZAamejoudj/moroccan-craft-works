'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

// Contact configuration - configured with placeholder values as requested by user
export const CONTACT_CONFIG = {
  // Email placeholder (e.g. email@gmail.com or business email)
  email: 'contact.moroccancraftworks@gmail.com', // Replaceable with user's final email
  
  // Phone placeholder: kept ready for user to provide final phone number
  phone: null as string | null, // e.g. '+212 600 000 000'
  phoneDisplay: '+212 6XX-XXXXXX', // Friendly placeholder display
  
  // WhatsApp number
  whatsappNumber: '212600000000',
  
  addressHQ: 'Medina Export Quarter & Artisan Logistics Hub',
  cityHQ: 'Marrakech, Morocco',
  
  workshops: 'Marrakech Medina Brass Guild, Safi Pottery Cluster & High Atlas Looms',
  hours: 'Monday – Saturday: 09:00 – 18:00 (GMT+1)',
};

// Official Authentic WhatsApp Logo SVG
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
  </svg>
);

export default function ContactInfoCard() {
  const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Moroccan Craft Works, I would like to inquire about your handcrafted collections and export catalog.'
  )}`;

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-200/80 h-full flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D46] mb-2 block">
          Artisan Headquarters
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
          Contact Details
        </h2>
        <p className="text-stone-600 text-sm leading-relaxed mb-8">
          Operating directly from Moroccan artisan clusters with global freight connections.
        </p>

        <div className="space-y-6">
          {/* Phone */}
          <div className="flex items-start gap-4 group">
            <div className="w-11 h-11 bg-[#FAF7F2] border border-[#C5A880]/30 rounded-2xl flex items-center justify-center text-[#8C6D46] group-hover:bg-[#8C6D46] group-hover:text-white transition-all shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-0.5">
                Phone & Direct Concierge
              </p>
              {CONTACT_CONFIG.phone ? (
                <a
                  href={`tel:${CONTACT_CONFIG.phone}`}
                  className="text-base font-bold text-stone-900 hover:text-[#8C6D46] transition-colors"
                  dir="ltr"
                >
                  {CONTACT_CONFIG.phone}
                </a>
              ) : (
                <span className="text-sm font-medium text-stone-500 italic">
                  {CONTACT_CONFIG.phoneDisplay} (To be updated)
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 group">
            <div className="w-11 h-11 bg-[#FAF7F2] border border-[#C5A880]/30 rounded-2xl flex items-center justify-center text-[#8C6D46] group-hover:bg-[#8C6D46] group-hover:text-white transition-all shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-0.5">
                Inquiries & Trade Orders
              </p>
              <a
                href={`mailto:${CONTACT_CONFIG.email}`}
                className="text-sm sm:text-base font-bold text-stone-900 hover:text-[#8C6D46] transition-colors break-all"
                dir="ltr"
              >
                {CONTACT_CONFIG.email}
              </a>
            </div>
          </div>

          {/* Headquarters Location */}
          <div className="flex items-start gap-4 group">
            <div className="w-11 h-11 bg-[#FAF7F2] border border-[#C5A880]/30 rounded-2xl flex items-center justify-center text-[#8C6D46] group-hover:bg-[#8C6D46] group-hover:text-white transition-all shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-0.5">
                Export Logistics Hub
              </p>
              <p className="text-sm font-medium text-stone-800 leading-snug">
                {CONTACT_CONFIG.addressHQ}
                <br />
                <span className="text-stone-500">{CONTACT_CONFIG.cityHQ}</span>
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start gap-4 group">
            <div className="w-11 h-11 bg-[#FAF7F2] border border-[#C5A880]/30 rounded-2xl flex items-center justify-center text-[#8C6D46] group-hover:bg-[#8C6D46] group-hover:text-white transition-all shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-0.5">
                Operating Schedule
              </p>
              <p className="text-xs sm:text-sm text-stone-600">
                {CONTACT_CONFIG.hours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA Button */}
      <div className="mt-10 pt-6 border-t border-stone-100">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span>Chat With Trade Concierge on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
