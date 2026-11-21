'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  X,
  ImagePlus,
  Trash2,
  Wand2,
  Check,
  AlertCircle,
  Loader2,
  Globe2,
  Sparkles,
  Layers,
  Tag,
  DollarSign,
  Package,
} from 'lucide-react'
import { MediaPickerModal } from './MediaPickerModal'
import { UkFlagIcon, FranceFlagIcon, MoroccoFlagIcon } from '@/components/ui/CountryFlags'
import { CatalogProduct, CATALOG_CATEGORIES } from '@/lib/products-catalog'
import { cn } from '@/lib/utils'

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

type LangTab = 'en' | 'fr' | 'ar'
type ImageSlotKey = 'mainImage' | 'detailImage1' | 'detailImage2' | 'detailImage3'

export interface ProductFormData {
  id?: string
  categoryId: string
  category: string
  sku: string
  stock: number
  basePrice: number
  salePrice?: number
  moq: string
  leadTime: string
  material: string
  origin: string
  dimensions: string
  isFeatured: boolean
  isAvailable: boolean
  sampleAvailable: boolean
  badge: string

  // Images
  mainImage: string
  detailImage1: string
  detailImage2: string
  detailImage3: string

  // English
  nameEn: string
  slugEn: string
  h1En: string
  shortDescEn: string
  descEn: string
  metaTitleEn: string
  metaDescEn: string
  keywordsEn: string

  // French
  nameFr: string
  slugFr: string
  h1Fr: string
  shortDescFr: string
  descFr: string
  metaTitleFr: string
  metaDescFr: string
  keywordsFr: string

  // Arabic
  nameAr: string
  slugAr: string
  h1Ar: string
  shortDescAr: string
  descAr: string
  metaTitleAr: string
  metaDescAr: string
  keywordsAr: string
}

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  product: CatalogProduct | null
  onSave: (savedProduct: ProductFormData) => void
}

export function ProductFormModal({
  isOpen,
  onClose,
  product,
  onSave,
}: ProductFormModalProps) {
  const [activeLang, setActiveLang] = useState<LangTab>('en')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [activeSlot, setActiveSlot] = useState<ImageSlotKey>('mainImage')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<ProductFormData>({
    categoryId: 'rugs',
    category: 'Rugs and Carpets',
    sku: 'MCW-PRD-01',
    stock: 25,
    basePrice: 180,
    salePrice: 0,
    moq: '10 pcs',
    leadTime: '2-3 weeks',
    material: '100% Virgin Atlas Mountain Wool',
    origin: 'Middle Atlas Mountains, Morocco',
    dimensions: '300 × 200 cm (Custom available)',
    isFeatured: true,
    isAvailable: true,
    sampleAvailable: true,
    badge: 'Artisan Masterpiece',

    mainImage: '/images/catalog/beni_ourain_rug.jpg',
    detailImage1: '',
    detailImage2: '',
    detailImage3: '',

    nameEn: '',
    slugEn: '',
    h1En: '',
    shortDescEn: '',
    descEn: '',
    metaTitleEn: '',
    metaDescEn: '',
    keywordsEn: '',

    nameFr: '',
    slugFr: '',
    h1Fr: '',
    shortDescFr: '',
    descFr: '',
    metaTitleFr: '',
    metaDescFr: '',
    keywordsFr: '',

    nameAr: '',
    slugAr: '',
    h1Ar: '',
    shortDescAr: '',
    descAr: '',
    metaTitleAr: '',
    metaDescAr: '',
    keywordsAr: '',
  })

  // Initialize form when product opens
  useEffect(() => {
    if (isOpen) {
      if (product) {
        setForm({
          id: product.id,
          categoryId: product.categoryId || 'rugs',
          category: product.category || 'Rugs and Carpets',
          sku: `MCW-${(product.id || 'ITEM').toUpperCase()}`,
          stock: 30,
          basePrice: 150,
          salePrice: 0,
          moq: product.moq || '10 pcs',
          leadTime: product.leadTime || '2-3 weeks',
          material: product.material || '',
          origin: product.origin || 'Morocco',
          dimensions: product.dimensions || '',
          isFeatured: true,
          isAvailable: true,
          sampleAvailable: product.sampleAvailable ?? true,
          badge: product.badge || '',

          mainImage: product.image || '/images/catalog/beni_ourain_rug.jpg',
          detailImage1: '',
          detailImage2: '',
          detailImage3: '',

          nameEn: product.title || '',
          slugEn: product.slug || slugify(product.title || ''),
          h1En: product.title || '',
          shortDescEn: product.description || '',
          descEn: product.description || '',
          metaTitleEn: `${product.title} | Moroccan Craft Works`,
          metaDescEn: product.description || '',
          keywordsEn: product.tags?.join(', ') || 'moroccan crafts, wholesale, handmade',

          nameFr: product.title || '',
          slugFr: `${product.slug || slugify(product.title || '')}-fr`,
          h1Fr: product.title || '',
          shortDescFr: product.description || '',
          descFr: product.description || '',
          metaTitleFr: `${product.title} | Artisanat Marocain Authentique`,
          metaDescFr: product.description || '',
          keywordsFr: 'artisanat marocain, grossiste, fait main',

          nameAr: '',
          slugAr: product.slug || '',
          h1Ar: '',
          shortDescAr: '',
          descAr: '',
          metaTitleAr: 'صناعة تقليدية مغربية فاخرة للتصدير بالجملة',
          metaDescAr: '',
          keywordsAr: 'صناعة تقليدية, زرابي مغربية, زليج, نحاس, جلد طبيعي',
        })
      } else {
        setForm({
          categoryId: 'rugs',
          category: 'Rugs and Carpets',
          sku: `MCW-${Date.now().toString().slice(-6)}`,
          stock: 20,
          basePrice: 120,
          salePrice: 0,
          moq: '5 pcs',
          leadTime: '2-3 weeks',
          material: 'Handcrafted authentic Moroccan material',
          origin: 'Fes, Morocco',
          dimensions: 'Standard / Custom sizing',
          isFeatured: false,
          isAvailable: true,
          sampleAvailable: true,
          badge: '',

          mainImage: '/images/catalog/beni_ourain_rug.jpg',
          detailImage1: '',
          detailImage2: '',
          detailImage3: '',

          nameEn: '',
          slugEn: '',
          h1En: '',
          shortDescEn: '',
          descEn: '',
          metaTitleEn: '',
          metaDescEn: '',
          keywordsEn: '',

          nameFr: '',
          slugFr: '',
          h1Fr: '',
          shortDescFr: '',
          descFr: '',
          metaTitleFr: '',
          metaDescFr: '',
          keywordsFr: '',

          nameAr: '',
          slugAr: '',
          h1Ar: '',
          shortDescAr: '',
          descAr: '',
          metaTitleAr: '',
          metaDescAr: '',
          keywordsAr: '',
        })
      }
      setError(null)
      setActiveLang('en')
    }
  }, [isOpen, product])

  const openPickerFor = (slot: ImageSlotKey) => {
    setActiveSlot(slot)
    setPickerOpen(true)
  }

  const handleImagePicked = (url: string) => {
    setForm((prev) => ({ ...prev, [activeSlot]: url }))
  }

  const clearSlot = (slot: ImageSlotKey) => {
    setForm((prev) => ({ ...prev, [slot]: '' }))
  }

  const handleAutoGenerateSlug = (lang: LangTab) => {
    if (lang === 'en') {
      const generated = slugify(form.nameEn)
      setForm((prev) => ({
        ...prev,
        slugEn: generated,
        h1En: prev.h1En || prev.nameEn,
        metaTitleEn: prev.metaTitleEn || `${prev.nameEn} | Moroccan Craft Works`,
      }))
    } else if (lang === 'fr') {
      const generated = slugify(form.nameFr || form.nameEn) + '-fr'
      setForm((prev) => ({
        ...prev,
        slugFr: generated,
        h1Fr: prev.h1Fr || prev.nameFr,
        metaTitleFr: prev.metaTitleFr || `${prev.nameFr} | Artisanat Marocain`,
      }))
    } else if (lang === 'ar') {
      const generated = slugify(form.nameEn || form.slugEn) + '-ar'
      setForm((prev) => ({
        ...prev,
        slugAr: generated,
        h1Ar: prev.h1Ar || prev.nameAr,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nameEn.trim()) {
      setError('Please provide at least the English product name.')
      setActiveLang('en')
      return
    }

    if (!form.mainImage) {
      setError('Please select or upload a Main Image for the product.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onSave(form)
      onClose()
    }, 400)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        {/* Modal Window (Exact Antique Brass / Atelier Atlas Styling) */}
        <div className="relative flex h-[94vh] w-[96vw] max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl ring-1 ring-slate-900/10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-[#B85D36] ring-1 ring-amber-200/60">
                <Package className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 tracking-tight">
                  {product ? 'Edit Craft Product' : 'Add New Craft Product'}
                </h2>
                <p className="text-xs text-slate-500">
                  Configure pricing, artisan materials, multi-language content (EN / FR / AR), and gallery.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Scrollable Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 1. SETTINGS & PRICING FIELDSET */}
            <fieldset className="rounded-xl border-2 border-amber-800/25 bg-white p-6 shadow-xs">
              <legend className="ml-2 rounded-full border border-amber-800/40 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                Settings & Sourcing Pricing
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                {/* Category Select */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Craft Category
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => {
                      const found = CATALOG_CATEGORIES.find((c) => c.id === e.target.value)
                      setForm((p) => ({
                        ...p,
                        categoryId: e.target.value,
                        category: found ? found.label : p.category,
                      }))
                    }}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                  >
                    {CATALOG_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SKU */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    SKU Identifier
                  </label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                    placeholder="e.g. MCW-RUG-001"
                  />
                </div>

                {/* Base Wholesale Price */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Base Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.basePrice}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, basePrice: parseFloat(e.target.value) || 0 }))
                      }
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-7 pr-3 text-xs font-bold text-slate-800 focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Stock Inventory */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, stock: parseInt(e.target.value, 10) || 0 }))
                    }
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                  />
                </div>

                {/* MOQ */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Trade Minimum (MOQ)
                  </label>
                  <input
                    type="text"
                    value={form.moq}
                    onChange={(e) => setForm((p) => ({ ...p, moq: e.target.value }))}
                    placeholder="e.g. 10 pcs or 20 m²"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                  />
                </div>

                {/* Lead Time */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Artisan Lead Time
                  </label>
                  <input
                    type="text"
                    value={form.leadTime}
                    onChange={(e) => setForm((p) => ({ ...p, leadTime: e.target.value }))}
                    placeholder="e.g. 2-3 weeks"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                  />
                </div>

                {/* Origin Guild Region */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Artisan Guild Region
                  </label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) => setForm((p) => ({ ...p, origin: e.target.value }))}
                    placeholder="e.g. Middle Atlas Mountains"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                  />
                </div>

                {/* Badge (Optional) */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Catalog Ribbon Badge
                  </label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
                    placeholder="e.g. Artisan Masterpiece"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-6 items-center">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) => setForm((p) => ({ ...p, isAvailable: e.target.checked }))}
                    className="h-4 w-4 rounded-sm border-slate-300 text-[#B85D36] focus:ring-[#B85D36]"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    Active & Available for B2B Order
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
                    className="h-4 w-4 rounded-sm border-slate-300 text-[#B85D36] focus:ring-[#B85D36]"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    Featured on Homepage Selection
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.sampleAvailable}
                    onChange={(e) => setForm((p) => ({ ...p, sampleAvailable: e.target.checked }))}
                    className="h-4 w-4 rounded-sm border-slate-300 text-[#B85D36] focus:ring-[#B85D36]"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    Physical Trade Samples Available
                  </span>
                </label>
              </div>
            </fieldset>

            {/* 2. PRODUCT IMAGES (UPLOAD & MEDIA LIBRARY) */}
            <fieldset className="rounded-xl border-2 border-amber-800/25 bg-white p-6 shadow-xs">
              <legend className="ml-2 rounded-full border border-amber-800/40 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                Product Photography & Gallery Slots
              </legend>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                {/* Slot 1: Main Image */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Main Photo *</span>
                    <span className="text-[10px] text-[#B85D36] font-semibold">Primary</span>
                  </div>
                  {form.mainImage ? (
                    <div className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <Image
                        src={form.mainImage}
                        alt="Main"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => openPickerFor('mainImage')}
                          className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-800 hover:bg-amber-50 cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => clearSlot('mainImage')}
                          className="rounded-full bg-white p-1.5 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openPickerFor('mainImage')}
                      className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-[#B85D36] hover:text-[#B85D36] bg-slate-50 transition-colors cursor-pointer"
                    >
                      <ImagePlus className="h-6 w-6 mb-1 text-slate-400" />
                      <span className="text-xs font-semibold">Upload Photo</span>
                    </button>
                  )}
                </div>

                {/* Slot 2: Detail Image 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Angle 2</span>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>
                  {form.detailImage1 ? (
                    <div className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <Image
                        src={form.detailImage1}
                        alt="Detail 1"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => openPickerFor('detailImage1')}
                          className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-800 hover:bg-amber-50 cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => clearSlot('detailImage1')}
                          className="rounded-full bg-white p-1.5 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openPickerFor('detailImage1')}
                      className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-[#B85D36] hover:text-[#B85D36] bg-slate-50 transition-colors cursor-pointer"
                    >
                      <ImagePlus className="h-6 w-6 mb-1 text-slate-300" />
                      <span className="text-xs font-medium">Add Angle</span>
                    </button>
                  )}
                </div>

                {/* Slot 3: Detail Image 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Artisan Close-up</span>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>
                  {form.detailImage2 ? (
                    <div className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <Image
                        src={form.detailImage2}
                        alt="Detail 2"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => openPickerFor('detailImage2')}
                          className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-800 hover:bg-amber-50 cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => clearSlot('detailImage2')}
                          className="rounded-full bg-white p-1.5 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openPickerFor('detailImage2')}
                      className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-[#B85D36] hover:text-[#B85D36] bg-slate-50 transition-colors cursor-pointer"
                    >
                      <ImagePlus className="h-6 w-6 mb-1 text-slate-300" />
                      <span className="text-xs font-medium">Add Close-up</span>
                    </button>
                  )}
                </div>

                {/* Slot 4: Detail Image 3 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">In-Situ Decor</span>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>
                  {form.detailImage3 ? (
                    <div className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <Image
                        src={form.detailImage3}
                        alt="Detail 3"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => openPickerFor('detailImage3')}
                          className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-800 hover:bg-amber-50 cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => clearSlot('detailImage3')}
                          className="rounded-full bg-white p-1.5 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openPickerFor('detailImage3')}
                      className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-[#B85D36] hover:text-[#B85D36] bg-slate-50 transition-colors cursor-pointer"
                    >
                      <ImagePlus className="h-6 w-6 mb-1 text-slate-300" />
                      <span className="text-xs font-medium">Add Setting</span>
                    </button>
                  )}
                </div>
              </div>
            </fieldset>

            {/* 3. MULTI-LANGUAGE CONTENT TABS (EN / FR / AR) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-[#B85D36]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Product Descriptions & SEO by Language
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Switch tabs to translate titles, specs and metadata
                </span>
              </div>

              {/* Language Navigation Tabs with Real Visual Flag Icons */}
              <div className="grid grid-cols-3 rounded-xl border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setActiveLang('en')}
                  className={cn(
                    'flex items-center justify-center gap-2.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    activeLang === 'en'
                      ? 'bg-[#1a130e] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  <UkFlagIcon className="w-5 h-3.5 rounded-xs shadow-xs shrink-0" />
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('fr')}
                  className={cn(
                    'flex items-center justify-center gap-2.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    activeLang === 'fr'
                      ? 'bg-[#1a130e] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  <FranceFlagIcon className="w-5 h-3.5 rounded-xs shadow-xs shrink-0" />
                  <span>Français</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('ar')}
                  className={cn(
                    'flex items-center justify-center gap-2.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    activeLang === 'ar'
                      ? 'bg-[#1a130e] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  <MoroccoFlagIcon className="w-5 h-3.5 rounded-xs shadow-xs shrink-0" />
                  <span>العربية</span>
                </button>
              </div>

              {/* TAB 1: ENGLISH CONTENT */}
              {activeLang === 'en' && (
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      English Product Title *
                    </label>
                    <input
                      type="text"
                      value={form.nameEn}
                      onChange={(e) => setForm((p) => ({ ...p, nameEn: e.target.value }))}
                      placeholder="e.g. Beni Ourain Hand-Knotted Diamond Wool Rug"
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      English URL Slug
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={form.slugEn}
                        onChange={(e) => setForm((p) => ({ ...p, slugEn: slugify(e.target.value) }))}
                        placeholder="e.g. beni-ourain-diamond-rug"
                        className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => handleAutoGenerateSlug('en')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-800/40 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        <Wand2 className="h-3.5 w-3.5" />
                        Generate
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      H1 Heading (SEO)
                    </label>
                    <input
                      type="text"
                      value={form.h1En}
                      onChange={(e) => setForm((p) => ({ ...p, h1En: e.target.value }))}
                      placeholder="Primary headline on product page"
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Short Overview Description
                    </label>
                    <textarea
                      rows={2}
                      value={form.shortDescEn}
                      onChange={(e) => setForm((p) => ({ ...p, shortDescEn: e.target.value }))}
                      placeholder="Concise summary for cards and search snippets..."
                      className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Full Craft Description & Specifications
                    </label>
                    <textarea
                      rows={4}
                      value={form.descEn}
                      onChange={(e) => setForm((p) => ({ ...p, descEn: e.target.value }))}
                      placeholder="Detailed artisan history, weaving process, washing, and export packaging specifications..."
                      className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  {/* SEO Sub-section */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85D36]">
                      Search Engine Metadata (English)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={form.metaTitleEn}
                        onChange={(e) => setForm((p) => ({ ...p, metaTitleEn: e.target.value }))}
                        placeholder="Meta Title tag"
                        className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                      <input
                        type="text"
                        value={form.keywordsEn}
                        onChange={(e) => setForm((p) => ({ ...p, keywordsEn: e.target.value }))}
                        placeholder="Keywords (e.g. moroccan rug, beni ourain, wholesale)"
                        className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FRENCH CONTENT */}
              {activeLang === 'fr' && (
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Titre du Produit en Français
                    </label>
                    <input
                      type="text"
                      value={form.nameFr}
                      onChange={(e) => setForm((p) => ({ ...p, nameFr: e.target.value }))}
                      placeholder="ex. Tapis Beni Ouarain Fait Main en Laine Vierge"
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Slug URL Français
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={form.slugFr}
                        onChange={(e) => setForm((p) => ({ ...p, slugFr: slugify(e.target.value) }))}
                        placeholder="ex. tapis-beni-ouarain-losange-fr"
                        className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => handleAutoGenerateSlug('fr')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-800/40 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        <Wand2 className="h-3.5 w-3.5" />
                        Générer
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Titre H1 (Français)
                    </label>
                    <input
                      type="text"
                      value={form.h1Fr}
                      onChange={(e) => setForm((p) => ({ ...p, h1Fr: e.target.value }))}
                      placeholder="Titre H1 pour le référencement français"
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Description Courte (Français)
                    </label>
                    <textarea
                      rows={2}
                      value={form.shortDescFr}
                      onChange={(e) => setForm((p) => ({ ...p, shortDescFr: e.target.value }))}
                      placeholder="Bref résumé du produit pour le catalogue..."
                      className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Description Détaillée & Spécifications Artisanales (Français)
                    </label>
                    <textarea
                      rows={4}
                      value={form.descFr}
                      onChange={(e) => setForm((p) => ({ ...p, descFr: e.target.value }))}
                      placeholder="Histoire de la coopérative, techniques de tissage traditionnelles, finitions..."
                      className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85D36]">
                      Métadonnées SEO (Français)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={form.metaTitleFr}
                        onChange={(e) => setForm((p) => ({ ...p, metaTitleFr: e.target.value }))}
                        placeholder="Balise Meta Title FR"
                        className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                      <input
                        type="text"
                        value={form.keywordsFr}
                        onChange={(e) => setForm((p) => ({ ...p, keywordsFr: e.target.value }))}
                        placeholder="Mots-clés (séparés par des virgules)"
                        className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ARABIC CONTENT (WITH RTL SUPPORT) */}
              {activeLang === 'ar' && (
                <div dir="rtl" className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs text-right">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      اسم المنتج بالعربية *
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={form.nameAr}
                      onChange={(e) => setForm((p) => ({ ...p, nameAr: e.target.value }))}
                      placeholder="مثال: زربية بني ورين أصلية منسوجة يدوياً من الصوف الطبيعي"
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      الرابط المخصص (Slug)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        dir="ltr"
                        value={form.slugAr}
                        onChange={(e) => setForm((p) => ({ ...p, slugAr: slugify(e.target.value) }))}
                        placeholder="beni-ourain-rug-ar"
                        className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden text-left"
                      />
                      <button
                        type="button"
                        onClick={() => handleAutoGenerateSlug('ar')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-800/40 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        <Wand2 className="h-3.5 w-3.5" />
                        توليد الرابط
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      عنوان رئيسي H1 بالعربية
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={form.h1Ar}
                      onChange={(e) => setForm((p) => ({ ...p, h1Ar: e.target.value }))}
                      placeholder="عنوان H1 لمحركات البحث بالعربية"
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      وصف مختصر للمنتج (بالعربية)
                    </label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={form.shortDescAr}
                      onChange={(e) => setForm((p) => ({ ...p, shortDescAr: e.target.value }))}
                      placeholder="نبذة موجزة عن المنتج الحرفي المغربي..."
                      className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      الوصف الكامل ومواصفات الصناعة التقليدية (بالعربية)
                    </label>
                    <textarea
                      rows={4}
                      dir="rtl"
                      value={form.descAr}
                      onChange={(e) => setForm((p) => ({ ...p, descAr: e.target.value }))}
                      placeholder="تفاصيل الحرفيين اليدوية، مواد الصوف أو النحاس أو الزليج، ومعايير التغليف والتصدير..."
                      className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden text-right"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85D36]">
                      بيانات محركات البحث SEO (بالعربية)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        dir="rtl"
                        value={form.metaTitleAr}
                        onChange={(e) => setForm((p) => ({ ...p, metaTitleAr: e.target.value }))}
                        placeholder="عنوان صفحة البحث (Meta Title AR)"
                        className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#B85D36] focus:outline-hidden text-right"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={form.keywordsAr}
                        onChange={(e) => setForm((p) => ({ ...p, keywordsAr: e.target.value }))}
                        placeholder="الكلمات المفتاحية (مفصولة بفاصلة)"
                        className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#B85D36] focus:outline-hidden text-right"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. CRAFT SPECIFICATIONS & MATERIALS */}
            <fieldset className="rounded-xl border-2 border-amber-800/25 bg-white p-6 shadow-xs">
              <legend className="ml-2 rounded-full border border-amber-800/40 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                Craft Guild Materials & Sizing
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Authentic Material / Technique
                  </label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => setForm((p) => ({ ...p, material: e.target.value }))}
                    placeholder="e.g. 100% Virgin Atlas Sheep Wool, Hand-Knotted"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Standard & Bespoke Dimensions
                  </label>
                  <input
                    type="text"
                    value={form.dimensions}
                    onChange={(e) => setForm((p) => ({ ...p, dimensions: e.target.value }))}
                    placeholder="e.g. 300 × 200 cm (Custom sizing on request)"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            </fieldset>
          </form>

          {/* Modal Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
            <span className="text-xs text-slate-400">
              * English name and main photo are required
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-lg bg-[#B85D36] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#9c4b27] shadow-sm transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving Product...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 stroke-[2.5]" />
                    <span>{product ? 'Save Changes' : 'Create Product'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Picker Sub-Modal */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleImagePicked}
        title={`Select Photo for ${activeSlot === 'mainImage' ? 'Main Cover' : 'Gallery Angle'}`}
      />
    </>
  )
}
