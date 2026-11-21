'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Globe,
  Check,
  RotateCcw,
  ExternalLink,
  Laptop,
  Smartphone,
  Sparkles,
  ImagePlus,
  Heading,
  FileText,
  Tag,
  Share2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { MediaPickerModal } from '@/components/admin/MediaPickerModal'
import { UkFlagIcon, FranceFlagIcon, MoroccoFlagIcon } from '@/components/ui/CountryFlags'
import { DEFAULT_SEO_SETTINGS, PageSeoItem } from '@/data/seoSettings'
import { cn } from '@/lib/utils'

type LangTab = 'en' | 'fr' | 'ar'
type PreviewMode = 'desktop' | 'mobile'

export default function CraftAdminSeoPage() {
  const [pagesSeo, setPagesSeo] = useState<PageSeoItem[]>(DEFAULT_SEO_SETTINGS)
  const [selectedPageId, setSelectedPageId] = useState<string>('home')
  const [activeLang, setActiveLang] = useState<LangTab>('en')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop')
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Load stored settings on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mcw_seo_settings')
      if (stored) {
        const parsed = JSON.parse(stored) as PageSeoItem[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPagesSeo(parsed)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  const selectedPage = pagesSeo.find((p) => p.id === selectedPageId) || pagesSeo[0]

  // Update field of selected page
  const updateSelectedField = (field: keyof PageSeoItem, value: any) => {
    const updated = pagesSeo.map((p) =>
      p.id === selectedPage.id
        ? { ...p, [field]: value, lastUpdated: new Date().toISOString().split('T')[0] }
        : p
    )
    setPagesSeo(updated)
  }

  // Save changes to localStorage
  const handleSave = () => {
    try {
      localStorage.setItem('mcw_seo_settings', JSON.stringify(pagesSeo))
      window.dispatchEvent(new Event('mcw_seo_settings_updated'))
    } catch {
      // ignore
    }
    setToastMessage(`SEO settings saved for ${selectedPage.pageName}`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Reset to recommended defaults
  const handleResetDefaults = () => {
    if (confirm(`Reset SEO metadata for all pages to recommended defaults?`)) {
      setPagesSeo(DEFAULT_SEO_SETTINGS)
      try {
        localStorage.setItem('mcw_seo_settings', JSON.stringify(DEFAULT_SEO_SETTINGS))
        window.dispatchEvent(new Event('mcw_seo_settings_updated'))
      } catch {
        // ignore
      }
      setToastMessage('SEO defaults restored')
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  // Get active language values
  const currentH1 =
    activeLang === 'ar'
      ? selectedPage.h1Ar
      : activeLang === 'fr'
      ? selectedPage.h1Fr
      : selectedPage.h1
  const currentTitle =
    activeLang === 'ar'
      ? selectedPage.titleAr
      : activeLang === 'fr'
      ? selectedPage.titleFr
      : selectedPage.title
  const currentDesc =
    activeLang === 'ar'
      ? selectedPage.descriptionAr
      : activeLang === 'fr'
      ? selectedPage.descriptionFr
      : selectedPage.description
  const currentKeywords =
    activeLang === 'ar'
      ? selectedPage.keywordsAr
      : activeLang === 'fr'
      ? selectedPage.keywordsFr
      : selectedPage.keywords

  const titleLength = currentTitle?.length || 0
  const descLength = currentDesc?.length || 0

  return (
    <div className="space-y-6 pb-16">
      {/* Admin Header */}
      <AdminHeader
        title="SEO & Meta Tags Management"
        description="Control page titles (<title>), primary H1 headlines, meta descriptions, and search rankings"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-fade-in">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Grid: Left Page Selector, Right SEO Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pages List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Page ({pagesSeo.length})
            </span>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Reset all pages to recommended SEO defaults"
            >
              <RotateCcw size={12} />
              <span>Defaults</span>
            </button>
          </div>

          <div className="space-y-2">
            {pagesSeo.map((p) => {
              const isSelected = p.id === selectedPage.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPageId(p.id)}
                  className={cn(
                    'w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer flex flex-col gap-1',
                    isSelected
                      ? 'border-[#B85D36] bg-amber-50/20 shadow-xs ring-1 ring-[#B85D36]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs font-bold text-slate-900">
                      {p.pageName}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      {p.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {p.path}
                  </span>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-1.5">
                    <span>H1: <strong className="text-slate-600 truncate inline-block max-w-[170px] align-bottom">{p.h1}</strong></span>
                    <span className="text-emerald-600 font-semibold">Indexed</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: SEO Editor & Live SERP Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card for Selected Page */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg font-bold text-slate-900">
                    {selectedPage.pageName}
                  </h2>
                  <span className="rounded-md bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-[#B85D36]">
                    {selectedPage.path}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customize the primary H1 headline, Meta Title, and Meta Description for search engines.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={selectedPage.path}
                  target="_blank"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>View Page</span>
                </Link>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#B85D36] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#9C4E2D] shadow-sm transition-colors cursor-pointer"
                >
                  <Check size={14} />
                  <span>Save SEO</span>
                </button>
              </div>
            </div>

            {/* Language Selector Tabs */}
            <div className="flex items-center gap-2 pt-4">
              <span className="text-xs font-semibold text-slate-500 mr-2">Language:</span>
              <button
                type="button"
                onClick={() => setActiveLang('en')}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer',
                  activeLang === 'en'
                    ? 'bg-[#B85D36] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                <UkFlagIcon className="w-4 h-3 rounded-xs" />
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('fr')}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer',
                  activeLang === 'fr'
                    ? 'bg-[#B85D36] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                <FranceFlagIcon className="w-4 h-3 rounded-xs" />
                <span>Français</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('ar')}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer',
                  activeLang === 'ar'
                    ? 'bg-[#B85D36] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                <MoroccoFlagIcon className="w-4 h-3 rounded-xs" />
                <span>العربية</span>
              </button>
            </div>
          </div>

          {/* Form Fields for H1, Title & Meta Description */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-5">
            {/* 1. Primary H1 Headline */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Heading size={14} className="text-[#B85D36]" />
                  <span>Primary H1 Headline ({activeLang.toUpperCase()})</span>
                  <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                  Top SEO Heading
                </span>
              </div>
              <input
                type="text"
                dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                value={
                  activeLang === 'ar'
                    ? selectedPage.h1Ar
                    : activeLang === 'fr'
                    ? selectedPage.h1Fr
                    : selectedPage.h1
                }
                onChange={(e) => {
                  const field =
                    activeLang === 'ar' ? 'h1Ar' : activeLang === 'fr' ? 'h1Fr' : 'h1'
                  updateSelectedField(field, e.target.value)
                }}
                placeholder="e.g. Authentic Moroccan Handicrafts for Global Markets"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-[#B85D36] focus:outline-hidden focus:ring-1 focus:ring-[#B85D36]"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                The primary `&lt;h1&gt;` tag is the most critical on-page heading for search engine topic relevance and accessibility.
              </p>
            </div>

            {/* 2. Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText size={14} className="text-[#B85D36]" />
                  <span>Page Meta Title (&lt;title&gt;)</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded',
                      titleLength >= 45 && titleLength <= 65
                        ? 'bg-emerald-100 text-emerald-700'
                        : titleLength > 65
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    )}
                  >
                    {titleLength} / 60 chars optimal
                  </span>
                </div>
              </div>
              <input
                type="text"
                dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                value={
                  activeLang === 'ar'
                    ? selectedPage.titleAr
                    : activeLang === 'fr'
                    ? selectedPage.titleFr
                    : selectedPage.title
                }
                onChange={(e) => {
                  const field =
                    activeLang === 'ar' ? 'titleAr' : activeLang === 'fr' ? 'titleFr' : 'title'
                  updateSelectedField(field, e.target.value)
                }}
                placeholder="e.g. Moroccan Craft Works | Authentic Moroccan Handicrafts for Global Markets"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-[#B85D36] focus:outline-hidden focus:ring-1 focus:ring-[#B85D36]"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                <span>Displays in browser tabs and as the main blue link in Google search results.</span>
                {titleLength > 65 && (
                  <span className="text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle size={11} /> Might be truncated on Google
                  </span>
                )}
              </div>
            </div>

            {/* 3. Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Tag size={14} className="text-[#B85D36]" />
                  <span>Meta Description (&lt;meta name=&quot;description&quot;&gt;)</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded',
                      descLength >= 135 && descLength <= 165
                        ? 'bg-emerald-100 text-emerald-700'
                        : descLength > 165
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    )}
                  >
                    {descLength} / 160 chars optimal
                  </span>
                </div>
              </div>
              <textarea
                rows={3}
                dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                value={
                  activeLang === 'ar'
                    ? selectedPage.descriptionAr
                    : activeLang === 'fr'
                    ? selectedPage.descriptionFr
                    : selectedPage.description
                }
                onChange={(e) => {
                  const field =
                    activeLang === 'ar'
                      ? 'descriptionAr'
                      : activeLang === 'fr'
                      ? 'descriptionFr'
                      : 'description'
                  updateSelectedField(field, e.target.value)
                }}
                placeholder="Write an enticing summary for potential wholesale buyers..."
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs leading-relaxed text-slate-900 focus:border-[#B85D36] focus:outline-hidden focus:ring-1 focus:ring-[#B85D36]"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                <span>Appears directly under your title in Google search results.</span>
                {descLength > 165 && (
                  <span className="text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle size={11} /> Google may trim text exceeding ~160 chars
                  </span>
                )}
              </div>
            </div>

            {/* 4. Focus Keywords */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Target Keywords (Comma-separated)
              </label>
              <input
                type="text"
                dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                value={
                  activeLang === 'ar'
                    ? selectedPage.keywordsAr
                    : activeLang === 'fr'
                    ? selectedPage.keywordsFr
                    : selectedPage.keywords
                }
                onChange={(e) => {
                  const field =
                    activeLang === 'ar'
                      ? 'keywordsAr'
                      : activeLang === 'fr'
                      ? 'keywordsFr'
                      : 'keywords'
                  updateSelectedField(field, e.target.value)
                }}
                placeholder="e.g. Moroccan handicrafts, wholesale rugs, zellige tiles"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:border-[#B85D36] focus:outline-hidden"
              />
            </div>

            {/* 5. Social Share & Open Graph (OG Image) */}
            <div className="border-t border-slate-100 pt-4">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <Share2 size={14} className="text-[#B85D36]" />
                <span>Social Share Cover Image (Open Graph Image)</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <Image
                    src={selectedPage.ogImage}
                    alt={selectedPage.pageName}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedPage.ogImage}
                      onChange={(e) => updateSelectedField('ogImage', e.target.value)}
                      placeholder="https://... og-image.jpg"
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-mono focus:border-[#B85D36] focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer"
                    >
                      <ImagePlus size={13} />
                      <span>Select Media</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Recommended resolution: 1200 x 630px for WhatsApp, LinkedIn, Facebook, and Twitter cards.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Canonical URL & Indexing Status */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Canonical Tag URL
                </label>
                <input
                  type="text"
                  value={selectedPage.canonicalUrl}
                  onChange={(e) => updateSelectedField('canonicalUrl', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-mono text-slate-700 focus:border-[#B85D36] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPage.indexRobots}
                    onChange={(e) => updateSelectedField('indexRobots', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
                <span className="text-xs font-bold text-slate-700">
                  {selectedPage.indexRobots ? 'Indexable (Google index, follow)' : 'Noindex'}
                </span>
              </div>
            </div>
          </div>

          {/* Live Google SERP Preview Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Search size={15} className="text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Live Google SERP Preview
                </h3>
              </div>

              {/* Desktop vs Mobile Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewMode('desktop')}
                  className={cn(
                    'p-1.5 rounded-md transition-all cursor-pointer',
                    previewMode === 'desktop'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                  title="Desktop Search Snippet"
                >
                  <Laptop size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('mobile')}
                  className={cn(
                    'p-1.5 rounded-md transition-all cursor-pointer',
                    previewMode === 'mobile'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                  title="Mobile Search Snippet"
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>

            {/* Google Result Box */}
            <div
              className={cn(
                'rounded-xl border border-slate-200 bg-white p-4 font-sans select-none',
                previewMode === 'mobile' ? 'max-w-sm mx-auto shadow-md' : 'w-full'
              )}
            >
              {/* Favicon & Breadcrumb */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-[#1a130e] flex items-center justify-center text-[10px] font-bold text-[#E8CFA0]">
                  MCW
                </div>
                <div className="flex flex-col text-[12px] leading-tight text-slate-700">
                  <span className="font-medium text-slate-900">Moroccan Craft Works</span>
                  <span className="text-[11px] text-slate-500 truncate font-mono">
                    https://moroccancraftworks.com{selectedPage.path === '/' ? '' : selectedPage.path}
                  </span>
                </div>
              </div>

              {/* Title Link */}
              <h4
                dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1"
              >
                {currentTitle || 'Moroccan Craft Works'}
              </h4>

              {/* Description Snippet */}
              <p
                dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                className="mt-1 text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2"
              >
                {currentDesc || 'Add a meta description to see how it looks on Google search.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => {
          updateSelectedField('ogImage', url)
          setIsMediaPickerOpen(false)
        }}
      />
    </div>
  )
}
