'use client'

import React, { useState } from 'react'
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
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'

interface MediaAsset {
  id: string
  name: string
  url: string
  category: string
  size: string
  dimensions: string
}

const MEDIA_ITEMS: MediaAsset[] = [
  {
    id: '1',
    name: 'Beni Ourain Wool Rug',
    url: '/images/catalog/beni_ourain_rug.jpg',
    category: 'Rugs',
    size: '940 KB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '2',
    name: 'Zellige Architectural Tiles',
    url: '/images/catalog/zellige_tiles.jpg',
    category: 'Zellige',
    size: '860 KB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '3',
    name: 'Moroccan Culinary Tagine',
    url: '/images/catalog/moroccan_tagine.jpg',
    category: 'Pottery',
    size: '840 KB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '4',
    name: 'Engraved Brass Tray',
    url: '/images/catalog/engraved_brass_tray.jpg',
    category: 'Brass',
    size: '920 KB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '5',
    name: 'Leather Ottoman Pouf',
    url: '/images/catalog/leather_pouf.jpg',
    category: 'Leather',
    size: '600 KB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '6',
    name: 'Raffia Storage Basket',
    url: '/images/catalog/raffia_storage_basket.jpg',
    category: 'Basketry',
    size: '800 KB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '7',
    name: 'Carved Cedar Wood Panel',
    url: '/images/catalog/carved_wood_panel.jpg',
    category: 'Wood',
    size: '1.05 MB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '8',
    name: 'Filigree Brass Lantern',
    url: '/images/catalog/moroccan_lantern.jpg',
    category: 'Lighting',
    size: '830 KB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '9',
    name: 'Moroccan Wool Throw',
    url: '/images/catalog/moroccan_throw.jpg',
    category: 'Textiles',
    size: '840 KB',
    dimensions: '1600 × 1600 px',
  },
  {
    id: '10',
    name: 'Mosaic Bistro Table',
    url: '/images/catalog/mosaic_side_table.jpg',
    category: 'Furniture',
    size: '160 KB',
    dimensions: '1200 × 1200 px',
  },
]

export default function AdminLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>(MEDIA_ITEMS)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null)

  const handleCopy = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url)
    setCopiedId(asset.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredMedia = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <AdminHeader
        title="Media & Assets Library"
        description="High-resolution artisan product photographs, showroom mockups and catalog assets"
        action={
          <button
            type="button"
            onClick={() => alert('Media upload dialog: In production connected to Supabase Storage / S3 bucket.')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#B85D36] hover:bg-[#984725] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Upload size={14} />
            <span>Upload New Photo</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media files by craft or name..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#B85D36]"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium">
            <strong>{filteredMedia.length}</strong> media assets available
          </span>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((asset) => {
            const isCopied = copiedId === asset.id
            return (
              <div
                key={asset.id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square bg-stone-100 overflow-hidden">
                  <Image
                    src={asset.url}
                    alt={asset.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAsset(asset)}
                      className="p-2 bg-white/90 rounded-full text-slate-700 hover:text-black hover:bg-white shadow"
                      title="Inspect"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(asset)}
                      className="p-2 bg-white/90 rounded-full text-slate-700 hover:text-black hover:bg-white shadow"
                      title="Copy URL"
                    >
                      {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <p className="font-bold text-slate-900 text-xs truncate" title={asset.name}>
                    {asset.name}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{asset.category}</span>
                    <span>{asset.size}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Media Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-serif text-base font-bold text-slate-900 truncate">
                {selectedAsset.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-stone-100">
              <Image
                src={selectedAsset.url}
                alt={selectedAsset.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-slate-50 rounded-lg">
              <div>
                <span className="text-slate-400 block text-[11px]">Dimensions</span>
                <strong className="text-slate-800">{selectedAsset.dimensions}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">File Size</span>
                <strong className="text-slate-800">{selectedAsset.size}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[11px]">Resource Path</span>
                <code className="text-slate-700 bg-white p-1 rounded border border-slate-200 block truncate">
                  {selectedAsset.url}
                </code>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleCopy(selectedAsset)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded text-xs font-bold hover:bg-slate-800"
              >
                {copiedId === selectedAsset.id ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedId === selectedAsset.id ? 'Copied!' : 'Copy Asset URL'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
