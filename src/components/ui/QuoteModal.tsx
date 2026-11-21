'use client'

import React, { useState } from 'react'
import { X, Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { submitQuoteRequest, type QuoteFormData } from '@/app/actions/quote'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  initialProduct?: string
}

const CATEGORIES = [
  'Rugs and Carpets',
  'Zellige and Architecture',
  'Pottery and Ceramics',
  'Brass and Copper',
  'Leather Goods',
  'Basketry and Raffia',
  'Wood Crafts and Furniture',
  'Lighting and Wrought Iron',
  'Textiles and Home Accessories',
  'Traditional Clothing',
]

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialProduct }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    company: '',
    country: '',
    projectType: 'B2B Wholesale Order',
    categories: [],
    quantityOrBudget: '',
    message: initialProduct ? `Inquiring about: ${initialProduct}` : '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const toggleCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const res = await submitQuoteRequest(formData)
      if (res.success) {
        setSubmitted(true)
      } else {
        setErrorMsg('Something went wrong. Please try again.')
      }
    } catch (err) {
      setErrorMsg('Failed to send quotation request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-stone-200 rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#FAF8F5]/95 backdrop-blur border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-moroccan-gold font-semibold">
              B2B and Wholesale Inquiries
            </span>
            <h3 className="font-serif text-2xl font-bold text-moroccan-dark">
              Request a Custom Quotation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-moroccan-dark hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-moroccan-green/10 text-moroccan-green rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-moroccan-dark">
                Quote Request Received!
              </h4>
              <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for your interest in MoroccanCraftWorks. Our export logistics and artisan production team will prepare a tailored quotation and reach out within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  onClose()
                }}
                className="mt-6 px-6 py-2.5 bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jean Dupont"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moroccan-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jean@interiordesign.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moroccan-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Studio / Boutique / Hotel Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moroccan-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Destination Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. France, USA, UAE, Germany"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moroccan-gold"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Project / Order Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moroccan-gold"
                >
                  <option value="B2B Wholesale Order">B2B Wholesale Order</option>
                  <option value="Custom Manufacturing / Bespoke Design">Custom Manufacturing / Bespoke Design</option>
                  <option value="Hotel, Riad or Hospitality Fitout">Hotel, Riad or Hospitality Fitout</option>
                  <option value="Private Label Production">Private Label Production</option>
                  <option value="Interior Architecture Project">Interior Architecture Project</option>
                </select>
              </div>

              {/* Interested Categories */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">
                  Select Product Categories of Interest
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = formData.categories.includes(cat)
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          isSelected
                            ? 'bg-moroccan-terracotta text-white border-moroccan-terracotta'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-moroccan-gold'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Quantities and Message */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Estimated Quantity or Budget (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 50 units, 200 sqm zellige, or budget range"
                  value={formData.quantityOrBudget}
                  onChange={(e) => setFormData({ ...formData, quantityOrBudget: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moroccan-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Project Details and Specifications *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about dimensions, finishes, shipping deadlines, or specific customization requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moroccan-gold resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
