'use client'

import React, { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import {
  X,
  Search,
  Upload,
  Check,
  ImagePlus,
  Trash2,
  FolderOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MediaItem {
  id: string
  name: string
  url: string
  category: string
  dimensions?: string
}

export const INITIAL_CRAFT_MEDIA: MediaItem[] = [
  {
    id: 'm-1',
    name: 'Beni Ourain Hand-Knotted Diamond Wool Rug',
    url: '/images/catalog/beni_ourain_rug.jpg',
    category: 'Rugs',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-2',
    name: 'Glazed Terracotta Zellige Architectural Tiles',
    url: '/images/catalog/zellige_tiles.jpg',
    category: 'Zellige',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-3',
    name: 'Moroccan Culinary & Decorative Tagine',
    url: '/images/catalog/moroccan_tagine.jpg',
    category: 'Pottery',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-4',
    name: 'Engraved Arabesque Brass Tea & Coffee Tray',
    url: '/images/catalog/engraved_brass_tray.jpg',
    category: 'Brass',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-5',
    name: 'Hand-Pierced Arabesque Brass Lantern Pendant',
    url: '/images/catalog/moroccan_lantern.jpg',
    category: 'Lighting',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-6',
    name: 'Full-Grain Hand-Stitched Tan Leather Pouf',
    url: '/images/catalog/leather_pouf.jpg',
    category: 'Leather',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-7',
    name: 'Natural Palm Leaf & Raffia Storage Basket',
    url: '/images/catalog/raffia_storage_basket.jpg',
    category: 'Basketry',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-8',
    name: 'Hand-Carved Cedar & Thuya Wood Wall Panel',
    url: '/images/catalog/carved_wood_panel.jpg',
    category: 'Woodwork',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-9',
    name: 'Zellige Star Mosaic Wrought Iron Side Table',
    url: '/images/catalog/mosaic_side_table.jpg',
    category: 'Zellige',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-10',
    name: 'Hand-Spun Atlas Wool Pom-Pom Blanket Throw',
    url: '/images/catalog/moroccan_throw.jpg',
    category: 'Textiles',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-11',
    name: 'Hand-Embroidered Sabra Silk Cushion Cover',
    url: '/images/catalog/cushion_cover.jpg',
    category: 'Textiles',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-12',
    name: 'Traditional Moroccan Artisanal Hooded Djellaba',
    url: '/images/catalog/moroccan_djellaba.jpg',
    category: 'Fashion',
    dimensions: '1600 × 1600 px',
  },
  {
    id: 'm-13',
    name: 'Kasbah Architectural Export & Logistics Port',
    url: '/images/catalog/worldwide_export_kasbah.jpg',
    category: 'Export',
    dimensions: '1920 × 1080 px',
  },
  {
    id: 'm-14',
    name: 'Riad Heritage Courtyard Architecture',
    url: '/images/catalog/hero_riad.jpg',
    category: 'Heritage',
    dimensions: '1920 × 1080 px',
  },
]

interface MediaPickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
  title?: string
}

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Media Image',
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library')
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_CRAFT_MEDIA)
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => {
    const set = new Set(mediaList.map((m) => m.category))
    return ['All', ...Array.from(set)]
  }, [mediaList])

  const filteredMedia = useMemo(() => {
    return mediaList.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCat =
        selectedCategory === 'All' || item.category === selectedCategory
      return matchesSearch && matchesCat
    })
  }, [mediaList, searchQuery, selectedCategory])

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    setUploadError(null)

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose a valid image file (PNG, JPG, WEBP, SVG).')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        const newItem: MediaItem = {
          id: `upload-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          url: result,
          category: 'Uploaded',
          dimensions: 'Original Size',
        }
        setMediaList((prev) => [newItem, ...prev])
        setSelectedUrl(result)
        setActiveTab('library')
      }
    }
    reader.onerror = () => {
      setUploadError('Failed to read file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  const handleConfirm = () => {
    if (selectedUrl) {
      onSelect(selectedUrl)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-2.5">
            <FolderOpen className="h-5 w-5 text-[#B85D36]" />
            <h2 className="font-serif text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3">
          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={cn(
              'border-b-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
              activeTab === 'library'
                ? 'border-[#B85D36] text-[#B85D36]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            )}
          >
            Craft Media Library ({mediaList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={cn(
              'border-b-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5',
              activeTab === 'upload'
                ? 'border-[#B85D36] text-[#B85D36]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            )}
          >
            <Upload className="h-3.5 w-3.5" />
            Upload New Image
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[350px]">
          {activeTab === 'library' ? (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by craft item name or category..."
                    className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs focus:border-[#B85D36] focus:outline-hidden"
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        'shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors cursor-pointer',
                        selectedCategory === cat
                          ? 'bg-[#1a130e] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Images */}
              {filteredMedia.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <ImagePlus className="mx-auto h-12 w-12 text-slate-300 mb-2" />
                  <p className="text-sm font-semibold">No craft images found</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try another search keyword or switch category.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredMedia.map((item) => {
                    const isSelected = selectedUrl === item.url
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedUrl(item.url)}
                        className={cn(
                          'group relative aspect-square overflow-hidden rounded-xl border-2 transition-all cursor-pointer bg-slate-100',
                          isSelected
                            ? 'border-[#B85D36] ring-3 ring-[#B85D36]/20'
                            : 'border-slate-200 hover:border-slate-400'
                        )}
                      >
                        <Image
                          src={item.url}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay on hover or selected */}
                        <div
                          className={cn(
                            'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5 transition-opacity',
                            isSelected
                              ? 'opacity-100'
                              : 'opacity-0 group-hover:opacity-100'
                          )}
                        >
                          <span className="text-[10px] font-semibold text-white truncate">
                            {item.name}
                          </span>
                          <span className="text-[9px] text-[#E8CFA0] uppercase font-bold tracking-wider">
                            {item.category}
                          </span>
                        </div>

                        {/* Selected Checkmark Badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#B85D36] text-white shadow-md">
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Upload New Tab */
            <div className="flex flex-col items-center justify-center h-full py-12">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-full max-w-lg p-10 border-2 border-dashed border-slate-300 rounded-2xl hover:border-[#B85D36] bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer text-center group"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 group-hover:bg-[#B85D36]/10 text-[#B85D36] transition-colors mb-4">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-base font-semibold text-slate-800">
                  Click to upload or drag & drop image
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Upload authentic Moroccan craft photos: JPG, PNG, WEBP, or SVG.
                </p>
                <button
                  type="button"
                  className="mt-5 px-5 py-2 rounded-lg bg-[#1a130e] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B85D36] transition-colors cursor-pointer"
                >
                  Browse File on Computer
                </button>
              </div>

              {uploadError && (
                <p className="mt-4 text-xs font-semibold text-red-600">
                  {uploadError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
          <div className="text-xs text-slate-500">
            {selectedUrl ? (
              <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> 1 Image selected
              </span>
            ) : (
              'Click an image to choose it'
            )}
          </div>
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
              disabled={!selectedUrl}
              onClick={handleConfirm}
              className={cn(
                'rounded-lg px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer',
                selectedUrl
                  ? 'bg-[#B85D36] hover:bg-[#9c4b27] shadow-sm'
                  : 'bg-slate-300 cursor-not-allowed text-slate-400'
              )}
            >
              Insert Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
