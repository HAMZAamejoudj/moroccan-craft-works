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
  Check,
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
    description: 'Pierced filigree brass lanterns, hanging arabesque pendants, hammered sinks, and polished copper trays.',
    image: '/images/catalog/engraved_brass_tray.jpg',
    artisanRegion: 'Fes & Marrakech Metalwork Souks',
  },
  {
    id: 'leather',
    label: 'Leather Goods',
    description: 'Full-grain vegetable-tanned goat and cowhide leather poufs, travel bags, and custom embossed accessories.',
    image: '/images/catalog/leather_pouf.jpg',
    artisanRegion: 'Chouara Tannery, Fes',
  },
  {
    id: 'basketry',
    label: 'Basketry and Raffia',
    description: 'Woven palm leaf baskets, natural raffia lighting pendants, laundry hampers, and artisan floor planters.',
    image: '/images/catalog/raffia_storage_basket.jpg',
    artisanRegion: 'Essaouira & Coastal Cooperatives',
  },
  {
    id: 'wood',
    label: 'Wood Crafts and Thuya',
    description: 'Hand-carved cedar architectural lattice screens (moucharabieh), Thuya burl jewelry boxes, and tables.',
    image: '/images/catalog/carved_wood_panel.jpg',
    artisanRegion: 'Essaouira & Middle Atlas',
  },
  {
    id: 'textiles',
    label: 'Textiles and Throws',
    description: 'Hand-spun wool pom-pom wedding blankets (Handira), sabra cactus silk cushions, and dyed linen runners.',
    image: '/images/catalog/moroccan_throw.jpg',
    artisanRegion: 'High Atlas Weavers',
  },
]

export default function CraftAdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(CRAFT_CATEGORIES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null)
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    image: '/images/catalog/beni_ourain_rug.jpg',
    artisanRegion: '',
  })

  const handleOpenAdd = () => {
    setEditingCategory(null)
    setFormData({
      label: '',
      description: '',
      image: '/images/catalog/beni_ourain_rug.jpg',
      artisanRegion: '',
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat)
    setFormData({
      label: cat.label,
      description: cat.description,
      image: cat.image,
      artisanRegion: cat.artisanRegion,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.label.trim()) return

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formData } : c
        )
      )
    } else {
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        ...formData,
      }
      setCategories((prev) => [...prev, newCat])
    }
    setIsModalOpen(false)
  }

  return (
    <>
      <AdminHeader
        title="Craft Guilds & Categories"
        description="Organize master cooperatives, artisan origins, and catalog taxonomies"
        action={
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#B85D36] hover:bg-[#984725] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Craft Guild</span>
          </button>
        }
      />

      <div className="space-y-6 p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const productCount = CATALOG_PRODUCTS.filter(
              (p) => p.category.toLowerCase() === cat.label.toLowerCase()
            ).length

            return (
              <div
                key={cat.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8CFA0] block">
                        {cat.artisanRegion}
                      </span>
                      <h3 className="font-serif text-base font-bold text-white">
                        {cat.label}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {productCount || 4} items
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">
                    {cat.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/products"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#B85D36] hover:underline"
                    >
                      <span>View in Catalog</span>
                      <ExternalLink size={12} />
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(cat)}
                        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                        title="Edit category"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat.id, cat.label)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal for Add / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-base font-bold text-slate-900">
                {editingCategory ? 'Edit Craft Guild' : 'Add Craft Guild'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">
                  Guild / Category Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData((p) => ({ ...p, label: e.target.value }))}
                  placeholder="e.g. Copper and Brassware"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-[#B85D36]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">
                  Artisan Guild Region
                </label>
                <input
                  type="text"
                  required
                  value={formData.artisanRegion}
                  onChange={(e) => setFormData((p) => ({ ...p, artisanRegion: e.target.value }))}
                  placeholder="e.g. Fes Medina Heritage Guilds"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-[#B85D36]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">
                  Cover Photo Path
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-[#B85D36]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">
                  Artisan Heritage Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Techniques, hand tools, generational heritage..."
                  className="w-full rounded-lg border border-slate-200 p-3 text-xs focus:border-[#B85D36]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#B85D36] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#984725] cursor-pointer"
                >
                  Save Guild
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
