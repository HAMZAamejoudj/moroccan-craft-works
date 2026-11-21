'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Tags,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Package,
  Layers,
  X,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { CATALOG_CATEGORIES, CATALOG_PRODUCTS } from '@/lib/products-catalog'

interface CategoryItem {
  id: string
  label: string
  description: string
  image: string
  artisanRegion: string
}

const CRAFT_CATEGORIES: CategoryItem[] = [
  {
    id: 'rugs',
    label: 'Rugs and Carpets',
    description: 'Beni Ourain, Azilal, Boujad, and Kilims hand-knotted on vertical wooden looms with Atlas virgin sheep wool.',
    image: '/images/catalog/beni_ourain_rug.jpg',
    artisanRegion: 'Middle & High Atlas Mountains',
  },
  {
    id: 'zellige',
    label: 'Zellige and Architecture',
    description: 'Chiseled glazed terracotta tiles, mosaic fountain panels, and handcrafted star tables from Marrakech medina.',
    image: '/images/catalog/zellige_tiles.jpg',
    artisanRegion: 'Moroccan Architectural Guilds',
  },
  {
    id: 'pottery',
    label: 'Pottery and Ceramics',
    description: 'Hand-thrown decorative and culinary tagines, Safi hand-painted ceramics, and Tamegroute ancient earth kilns.',
    image: '/images/catalog/moroccan_tagine.jpg',
    artisanRegion: 'Safi & Tamegroute',
  },
  {
    id: 'brass',
    label: 'Brass and Copper',
    description: 'Hand-pierced filigree lamps, chased tea trays, engraved lanterns, and unlacquered raw brass fittings.',
    image: '/images/catalog/engraved_brass_tray.jpg',
    artisanRegion: 'Souq Nhas, Marrakech',
  },
  {
    id: 'leather',
    label: 'Leather Goods',
    description: 'Vegetable-tanned goat leather poufs, traditional babouches, and bespoke leather architectural upholstery.',
    image: '/images/catalog/leather_pouf.jpg',
    artisanRegion: 'Bab Debbagh, Marrakech',
  },
  {
    id: 'basketry',
    label: 'Basketry and Raffia',
    description: 'Hand-plaited Doum wild dwarf palm hampers, bohemian raffia pendant lights, and tote bags with leather trim.',
    image: '/images/catalog/raffia_storage_basket.jpg',
    artisanRegion: 'Essaouira & Coastal Atlas',
  },
  {
    id: 'wood',
    label: 'Wood Crafts and Thuya',
    description: 'Fragrant Thuya wood burr boxes, hand-carved cedar moucharabieh lattices, and artisanal riad furniture.',
    image: '/images/catalog/carved_wood_panel.jpg',
    artisanRegion: 'Essaouira & Middle Atlas',
  },
  {
    id: 'lighting',
    label: 'Lighting and Metalwork',
    description: 'Cathedral-scale brass lanterns, geometric pierced sconces, and hand-forged wrought iron tables.',
    image: '/images/catalog/moroccan_lantern.jpg',
    artisanRegion: 'Marrakech Metal Foundry',
  },
  {
    id: 'textiles',
    label: 'Textiles and Throws',
    description: 'Loom-woven pom-pom blankets, Sabra vegan cactus silk cushion covers, and tribal Berber embroidery.',
    image: '/images/catalog/moroccan_throw.jpg',
    artisanRegion: 'High Atlas & Marrakech Dye Houses',
  },
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(CRAFT_CATEGORIES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null)
  const [formData, setFormData] = useState<CategoryItem>({
    id: '',
    label: '',
    description: '',
    image: '/images/catalog/beni_ourain_rug.jpg',
    artisanRegion: '',
  })

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat)
    setFormData({ ...cat })
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.label.trim()) return

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? { ...formData } : c))
      )
    } else {
      const newCat: CategoryItem = {
        ...formData,
        id: formData.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      }
      setCategories((prev) => [...prev, newCat])
    }
    setIsModalOpen(false)
  }

  return (
    <>
      <AdminHeader
        title="Craft Collections & Categories"
        description="Organize Moroccan artisan guilds, heritage descriptions and visual identities"
        action={
          <button
            type="button"
            onClick={() => {
              setEditingCategory(null)
              setFormData({
                id: '',
                label: '',
                description: '',
                image: '/images/catalog/beni_ourain_rug.jpg',
                artisanRegion: 'Morocco',
              })
              setIsModalOpen(true)
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#B85D36] hover:bg-[#984725] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Collection</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const productCount = CATALOG_PRODUCTS.filter(
              (p) => p.categoryId === cat.id
            ).length

            return (
              <div
                key={cat.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full bg-stone-100">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-xs uppercase">
                      {productCount} Products
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-serif text-lg font-bold text-slate-900">{cat.label}</h4>
                    </div>
                    <p className="text-[11px] font-semibold text-[#996733] uppercase tracking-wider">
                      {cat.artisanRegion}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-4 text-xs">
                  <Link
                    href={`/products?category=${cat.id}`}
                    target="_blank"
                    className="text-[#B85D36] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Public</span>
                    <ExternalLink size={12} />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Edit Category"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove "${cat.label}"?`)) {
                          setCategories((prev) => prev.filter((c) => c.id !== cat.id))
                        }
                      }}
                      className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-700 transition-colors cursor-pointer"
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {editingCategory ? 'Edit Craft Collection' : 'Create New Collection'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Collection Name</label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Architectural Ceramic Zellige"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Artisan Region / Guild</label>
                <input
                  type="text"
                  value={formData.artisanRegion}
                  onChange={(e) => setFormData({ ...formData, artisanRegion: e.target.value })}
                  placeholder="e.g. Marrakech Medina Architectural Guilds"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image Path / URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/catalog/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Heritage</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of craftsmanship, materials and regional significance..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B85D36] hover:bg-[#984725] text-white font-bold rounded-md transition-colors cursor-pointer"
                >
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
