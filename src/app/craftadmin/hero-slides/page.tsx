'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  SlidersHorizontal,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  Check,
  X,
  ExternalLink,
  ImagePlus,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { MediaPickerModal } from '@/components/admin/MediaPickerModal'
import { UkFlagIcon, FranceFlagIcon, MoroccoFlagIcon } from '@/components/ui/CountryFlags'
import { DEFAULT_HERO_SLIDES, HeroSlideItem } from '@/data/heroSlides'
import { cn } from '@/lib/utils'

type LangTab = 'en' | 'fr' | 'ar'

export default function CraftAdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlideItem[]>(DEFAULT_HERO_SLIDES)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null)
  const [isNewSlide, setIsNewSlide] = useState(false)
  const [activeLang, setActiveLang] = useState<LangTab>('en')
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mcw_hero_slides')
      if (stored) {
        const parsed = JSON.parse(stored) as HeroSlideItem[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Helper to persist slides and notify listeners
  const saveSlides = (newSlides: HeroSlideItem[], message?: string) => {
    setSlides(newSlides)
    try {
      localStorage.setItem('mcw_hero_slides', JSON.stringify(newSlides))
      window.dispatchEvent(new Event('mcw_hero_slides_updated'))
    } catch {
      // ignore
    }
    if (message) {
      setToastMessage(message)
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  // Toggle active status
  const handleToggleActive = (id: number) => {
    const updated = slides.map((s) =>
      s.id === id ? { ...s, active: s.active === false ? true : false } : s
    )
    saveSlides(updated, 'Slide visibility updated')
  }

  // Move slide up/down
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= slides.length) return
    const updated = [...slides]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    saveSlides(updated, 'Slide display order updated')
    setSelectedSlideIndex(targetIndex)
  }

  // Open modal for editing
  const handleOpenEdit = (slide: HeroSlideItem) => {
    setEditingSlide({ ...slide })
    setIsNewSlide(false)
    setActiveLang('en')
    setIsEditModalOpen(true)
  }

  // Open modal for new slide
  const handleOpenAdd = () => {
    const newId = Date.now()
    const emptySlide: HeroSlideItem = {
      id: newId,
      tag: 'New Collection',
      tagFr: 'Nouvelle Collection',
      tagAr: 'تشكيلة جديدة',
      title: 'Handcrafted Moroccan Heritage',
      titleFr: 'Héritage Artisanal Marocain Fait Main',
      titleAr: 'تراث مغربي أصيل مصنوع يدوياً',
      subtitle: 'Artisan Masterpieces • Global Export',
      subtitleFr: 'Chefs-d’œuvre Artisanaux • Export Mondial',
      subtitleAr: 'تحف يدوية فريدة • تصدير دولي',
      description:
        'Custom authentic handicrafts created by generational artisans across Morocco. Available for wholesale, luxury hospitality, and bespoke private label.',
      descriptionFr:
        'Pièces artisanales uniques confectionnées par les maîtres artisans du Maroc pour l’hôtellerie de luxe et les projets sur-mesure.',
      descriptionAr:
        'منتجات حرفية مغربية أصيلة معدة للتصدير بالجملة والمشاريع الفندقية والتجارية الفاخرة.',
      primaryCtaText: 'Request a Quote',
      secondaryCtaText: 'Explore Collections',
      secondaryCtaHref: '#products',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85',
      alt: 'Moroccan Handicrafts Showcase',
      active: true,
    }
    setEditingSlide(emptySlide)
    setIsNewSlide(true)
    setActiveLang('en')
    setIsEditModalOpen(true)
  }

  // Delete slide
  const handleDelete = (id: number) => {
    if (slides.length <= 1) {
      alert('You must have at least one hero slide.')
      return
    }
    if (confirm('Are you sure you want to delete this hero slide?')) {
      const updated = slides.filter((s) => s.id !== id)
      saveSlides(updated, 'Slide removed successfully')
      if (selectedSlideIndex >= updated.length) {
        setSelectedSlideIndex(0)
      }
    }
  }

  // Reset to default slides
  const handleResetDefaults = () => {
    if (confirm('Restore default 6 hero slides? This will override custom changes.')) {
      saveSlides(DEFAULT_HERO_SLIDES, 'Default hero slides restored')
      setSelectedSlideIndex(0)
    }
  }

  // Save modal changes
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSlide) return

    let updated: HeroSlideItem[]
    if (isNewSlide) {
      updated = [editingSlide, ...slides]
    } else {
      updated = slides.map((s) => (s.id === editingSlide.id ? editingSlide : s))
    }
    saveSlides(updated, isNewSlide ? 'New slide added successfully' : 'Slide changes saved')
    setIsEditModalOpen(false)
    setEditingSlide(null)
  }

  const currentPreviewSlide = slides[selectedSlideIndex] || slides[0]

  return (
    <div className="space-y-6 pb-16">
      {/* Admin Header */}
      <AdminHeader
        title="Hero Carousel & Slides"
        description="Manage homepage hero slides, H1 headlines, background photography, and call-to-actions"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-fade-in">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Interactive Hero Preview Card */}
      {currentPreviewSlide && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3 bg-slate-50">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Eye size={15} className="text-[#B85D36]" />
              <span>Live Front-End Slide Preview (Slide #{selectedSlideIndex + 1} of {slides.length})</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400">
                Primary H1 for Slide #{selectedSlideIndex + 1}
              </span>
              <button
                type="button"
                onClick={() => handleOpenEdit(currentPreviewSlide)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#B85D36] px-3 py-1 text-xs font-semibold text-white hover:bg-[#9C4E2D] transition-colors cursor-pointer"
              >
                <Edit2 size={12} />
                <span>Edit This Slide</span>
              </button>
            </div>
          </div>

          {/* Simulated Dark Hero Container */}
          <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900 select-none">
            <Image
              src={currentPreviewSlide.image}
              alt={currentPreviewSlide.alt || currentPreviewSlide.title}
              fill
              unoptimized
              className="object-cover"
            />
            {/* Dark Moroccan gradient overlay matching Hero.tsx */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60" />

            <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-amber-300 backdrop-blur-md border border-white/20 mb-3">
                <Sparkles size={11} />
                {currentPreviewSlide.tag}
              </span>

              {/* Main H1 Headline */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-md">
                {currentPreviewSlide.title}
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-2 max-w-xl">
                {currentPreviewSlide.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="rounded-lg bg-[#B85D36] px-4 py-2 text-xs font-bold text-white shadow-md">
                  {currentPreviewSlide.primaryCtaText} →
                </div>
                <div className="rounded-lg bg-white/10 border border-white/30 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                  {currentPreviewSlide.secondaryCtaText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[#B85D36]" />
            <span>Hero Carousel Slides ({slides.length} total)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            The first active slide acts as the primary H1 headline on the home page for Google & visitors.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Restore original 6 slides"
          >
            <RotateCcw size={14} className="text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#B85D36] px-4 py-2 text-xs font-bold text-white hover:bg-[#9C4E2D] shadow-sm transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Hero Slide</span>
          </button>
        </div>
      </div>

      {/* Slides Cards List */}
      <div className="space-y-4">
        {slides.map((slide, index) => {
          const isActive = slide.active !== false
          const isSelected = index === selectedSlideIndex

          return (
            <div
              key={slide.id}
              onClick={() => setSelectedSlideIndex(index)}
              className={cn(
                'group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border bg-white p-4 transition-all cursor-pointer shadow-xs',
                isSelected
                  ? 'border-[#B85D36] ring-1 ring-[#B85D36]/20 bg-amber-50/10'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              )}
            >
              {/* Left: Thumbnail & Order */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move slide up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={index === slides.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move slide down"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                {/* Cover Thumbnail */}
                <div className="relative h-20 w-32 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src={slide.image}
                    alt={slide.alt || slide.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute top-1 left-1 rounded bg-black/75 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    #{index + 1}
                  </div>
                </div>

                {/* Slide Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      {slide.tag}
                    </span>
                    {index === 0 && (
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-[#B85D36]">
                        Primary H1
                      </span>
                    )}
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-bold',
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      )}
                    >
                      {isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  {/* Main H1 Title */}
                  <h3 className="font-serif text-sm font-bold text-slate-900 mt-1 truncate">
                    {slide.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {slide.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span>CTA 1: <strong className="text-slate-700">{slide.primaryCtaText}</strong></span>
                    <span>•</span>
                    <span>CTA 2: <strong className="text-slate-700">{slide.secondaryCtaText}</strong> ({slide.secondaryCtaHref})</span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div
                className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Active Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleActive(slide.id)}
                  className={cn(
                    'rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer',
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  {isActive ? 'Live' : 'Hidden'}
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(slide)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(slide.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete slide"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit / Add Slide Modal */}
      {isEditModalOpen && editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden my-8 border border-slate-200 animate-scale-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {isNewSlide ? 'Add New Hero Slide' : `Edit Hero Slide (ID: ${editingSlide.id})`}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customize the slide headline (H1), imagery, description, and action buttons.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-2 bg-white">
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

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* English Fields */}
              {activeLang === 'en' && (
                <div className="space-y-4">
                  {/* Slide Title / H1 */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800">
                        Hero H1 Headline (Title) <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                        Main H1 Headline on Slide
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={editingSlide.title}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, title: e.target.value })
                      }
                      placeholder="e.g. Authentic Moroccan Handicrafts for Global Markets"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-medium focus:border-[#B85D36] focus:outline-hidden focus:ring-1 focus:ring-[#B85D36]"
                    />
                  </div>

                  {/* Subtitle & Tag */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-800">Tag / Guild Badge</label>
                      <input
                        type="text"
                        value={editingSlide.tag}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, tag: e.target.value })
                        }
                        placeholder="e.g. Wholesale and Global B2B Export"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800">Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={editingSlide.subtitle}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, subtitle: e.target.value })
                        }
                        placeholder="e.g. Handcrafted Heritage • Worldwide Shipping"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-bold text-slate-800">Slide Description</label>
                    <textarea
                      rows={3}
                      value={editingSlide.description}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, description: e.target.value })
                      }
                      placeholder="Detailed description paragraph..."
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs leading-relaxed focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* French Fields */}
              {activeLang === 'fr' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800">
                      Titre Principal H1 (Français)
                    </label>
                    <input
                      type="text"
                      value={editingSlide.titleFr || ''}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, titleFr: e.target.value })
                      }
                      placeholder="e.g. Artisanat Marocain Authentique pour les Marchés Mondiaux"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-800">Badge / Tag (Français)</label>
                      <input
                        type="text"
                        value={editingSlide.tagFr || ''}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, tagFr: e.target.value })
                        }
                        placeholder="e.g. Vente en Gros & Export B2B"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800">Sous-titre (Français)</label>
                      <input
                        type="text"
                        value={editingSlide.subtitleFr || ''}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, subtitleFr: e.target.value })
                        }
                        placeholder="e.g. Héritage Artisanal • Expédition Mondiale"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800">Description (Français)</label>
                    <textarea
                      rows={3}
                      value={editingSlide.descriptionFr || ''}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, descriptionFr: e.target.value })
                      }
                      placeholder="Description en français..."
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs leading-relaxed focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Arabic Fields */}
              {activeLang === 'ar' && (
                <div dir="rtl" className="space-y-4 text-right">
                  <div>
                    <label className="text-xs font-bold text-slate-800">
                      العنوان الرئيسي H1 (باللغة العربية)
                    </label>
                    <input
                      type="text"
                      value={editingSlide.titleAr || ''}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, titleAr: e.target.value })
                      }
                      placeholder="مثال: الصناعة التقليدية المغربية الأصيلة للأسواق العالمية"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-800">شارة الصنف (بالعربية)</label>
                      <input
                        type="text"
                        value={editingSlide.tagAr || ''}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, tagAr: e.target.value })
                        }
                        placeholder="مثال: البيع بالجملة والتصدير التجاري"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800">العنوان الفرعي (بالعربية)</label>
                      <input
                        type="text"
                        value={editingSlide.subtitleAr || ''}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, subtitleAr: e.target.value })
                        }
                        placeholder="مثال: تراث يدوي أصيل • شحن دولي موثوق"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800">الوصف (بالعربية)</label>
                    <textarea
                      rows={3}
                      value={editingSlide.descriptionAr || ''}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, descriptionAr: e.target.value })
                      }
                      placeholder="الوصف باللغة العربية..."
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs leading-relaxed focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Call to Actions (CTAs) */}
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Buttons & Call to Actions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Primary Button Label</label>
                    <input
                      type="text"
                      value={editingSlide.primaryCtaText}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, primaryCtaText: e.target.value })
                      }
                      placeholder="e.g. Request a Quote"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Secondary Button Label</label>
                    <input
                      type="text"
                      value={editingSlide.secondaryCtaText}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, secondaryCtaText: e.target.value })
                      }
                      placeholder="e.g. Explore Collections"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Secondary Button Link (Href)</label>
                    <input
                      type="text"
                      value={editingSlide.secondaryCtaHref}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, secondaryCtaHref: e.target.value })
                      }
                      placeholder="e.g. #products or /products/rugs"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Image & Media Library */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Background Photography
                </h4>
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <Image
                      src={editingSlide.image}
                      alt={editingSlide.alt || 'Slide image'}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingSlide.image}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, image: e.target.value })
                        }
                        placeholder="Image URL..."
                        className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-mono focus:border-[#B85D36] focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setIsMediaPickerOpen(true)}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer"
                      >
                        <ImagePlus size={13} />
                        <span>Browse Media</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editingSlide.alt}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, alt: e.target.value })
                      }
                      placeholder="SEO Alt text for image..."
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Visibility Status */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800">Slide Status</span>
                  <p className="text-[11px] text-slate-400">
                    Enable or disable this slide in the live hero carousel.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSlide.active !== false}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, active: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B85D36]"></div>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#B85D36] px-5 py-2 text-xs font-bold text-white hover:bg-[#9C4E2D] shadow-sm transition-all cursor-pointer"
                >
                  <Check size={14} />
                  <span>Save Slide Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => {
          if (editingSlide) {
            setEditingSlide({
              ...editingSlide,
              image: url,
            })
          }
          setIsMediaPickerOpen(false)
        }}
      />
    </div>
  )
}
