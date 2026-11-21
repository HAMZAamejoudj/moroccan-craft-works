'use client'

import React, { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import {
  Images,
  Upload,
  Copy,
  Check,
  Search,
  Trash2,
  ExternalLink,
  Eye,
  X,
  ImagePlus,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { INITIAL_CRAFT_MEDIA, MediaItem } from '@/components/admin/MediaPickerModal'
import { cn } from '@/lib/utils'

export default function CraftAdminLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_CRAFT_MEDIA)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => {
    const set = new Set(media.map((m) => m.category))
    return ['All', ...Array.from(set)]
  }, [media])

  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [media, searchQuery, selectedCategory])

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from media library?`)) {
      setMedia((prev) => prev.filter((m) => m.id !== id))
    }
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]

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
        setMedia((prev) => [newItem, ...prev])
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <AdminHeader
        title="Media Library"
        description="Authentic high-resolution photography of Moroccan rugs, zellige, pottery, brass, and textiles"
        action={
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#B85D36] hover:bg-[#984725] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Upload size={14} />
            <span>Upload Photo</span>
          </button>
        }
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
      />

      <div className="space-y-6 p-6 sm:p-8">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images by name or category..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-xs focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0',
                  selectedCategory === cat
                    ? 'bg-[#1a130e] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all"
            >
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover actions overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewItem(item)}
                    className="p-2 rounded-full bg-white text-slate-800 hover:bg-amber-50 cursor-pointer transition-colors"
                    title="Preview image"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.url, item.id)}
                    className="p-2 rounded-full bg-white text-slate-800 hover:bg-amber-50 cursor-pointer transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? (
                      <Check size={15} className="text-emerald-600" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2 rounded-full bg-white text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                    title="Delete image"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <p className="truncate text-xs font-semibold text-slate-800" title={item.name}>
                  {item.name}
                </p>
                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-medium text-[#B85D36] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span>{item.dimensions || '1600x1600'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Lightbox */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h3 className="font-serif text-sm font-bold text-slate-900 truncate">
                  {previewItem.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">{previewItem.url}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="p-1 rounded-md text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-4/3 w-full bg-slate-900">
              <Image
                src={previewItem.url}
                alt={previewItem.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Category: <strong>{previewItem.category}</strong>
              </span>
              <button
                type="button"
                onClick={() => handleCopy(previewItem.url, previewItem.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B85D36] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedId === previewItem.id ? (
                  <>
                    <Check size={14} />
                    <span>Copied URL!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Asset Path</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
