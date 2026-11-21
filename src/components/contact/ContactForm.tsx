'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Wholesale Supply',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate swift submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'Wholesale Supply',
        message: '',
      });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-200/80 h-full flex flex-col justify-between">
      {isSubmitted ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-16">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3">
            Inquiry Received Successfully
          </h3>
          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Thank you for contacting Moroccan Craft Works. A senior trade specialist will review your project requirements and respond within 24 business hours.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-8 px-8 py-3 bg-[#8C6D46] text-white rounded-xl text-sm font-semibold hover:bg-[#725735] transition-colors cursor-pointer"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D46] mb-2 block">
            Direct Commercial Channel
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
            Send an Inquiry
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed mb-8">
            Tell us about your project, target specifications, or desired quantities.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-stone-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF8F3] focus:bg-white focus:border-[#8C6D46] focus:ring-2 focus:ring-[#8C6D46]/20 outline-hidden transition-all text-sm text-stone-900"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-stone-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF8F3] focus:bg-white focus:border-[#8C6D46] focus:ring-2 focus:ring-[#8C6D46]/20 outline-hidden transition-all text-sm text-stone-900"
                  placeholder="name@company.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-semibold text-stone-700">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF8F3] focus:bg-white focus:border-[#8C6D46] focus:ring-2 focus:ring-[#8C6D46]/20 outline-hidden transition-all text-sm text-stone-900"
                  placeholder="+1 (555) 000-0000"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="company" className="text-xs font-semibold text-stone-700">
                  Company / Studio Name (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF8F3] focus:bg-white focus:border-[#8C6D46] focus:ring-2 focus:ring-[#8C6D46]/20 outline-hidden transition-all text-sm text-stone-900"
                  placeholder="Design Firm, Hotel, or Store Name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="projectType" className="text-xs font-semibold text-stone-700">
                Primary Inquiry Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF8F3] focus:bg-white focus:border-[#8C6D46] focus:ring-2 focus:ring-[#8C6D46]/20 outline-hidden transition-all text-sm text-stone-900"
              >
                <option value="Wholesale Supply">Wholesale Supply (Bulk Orders)</option>
                <option value="Private Label & OEM">Private Label & Custom Branding</option>
                <option value="Hospitality Project">Hotel, Restaurant or Riad Project</option>
                <option value="Custom Bespoke Dimensions">Custom Bespoke Architectural Dimensions</option>
                <option value="Other Inquiry">General Trade Question</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-stone-700">
                Project Details or Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF8F3] focus:bg-white focus:border-[#8C6D46] focus:ring-2 focus:ring-[#8C6D46]/20 outline-hidden transition-all text-sm text-stone-900 resize-none"
                placeholder="Describe the items of interest, dimensions, quantities, destination country, or delivery timeline..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                  <span>Transmitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#C5A880]" />
                  <span>Submit Trade Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
