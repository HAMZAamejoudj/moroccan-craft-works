'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Package,
  Plus,
  Search,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import {
  CATALOG_PRODUCTS,
  CATALOG_CATEGORIES,
  CatalogProduct,
} from '@/lib/products-catalog'
import { cn } from '@/lib/utils'

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<CatalogProduct[]>(CATALOG_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null)
  const [formData, setFormData] = useState<Partial<CatalogProduct>>({
    title: '',
    category: 'Rugs and Carpets',
    categoryId: 'rugs',
    origin: 'Middle Atlas, Morocco',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80',
    description: '',
    material: '',
    dimensions: '',
    moq: '10 pcs',
    leadTime: '2-3 weeks',
    sampleAvailable: true,
    badge: 'Artisan Masterpiece',
    tags: [],
  })

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      title: '',
      category: 'Rugs and Carpets',
      categoryId: 'rugs',
      origin: 'Middle Atlas, Morocco',
      image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80',
      description: '',
      material: '',
      dimensions: '',
      moq: '10 pcs',
      leadTime: '2-3 weeks',
      sampleAvailable: true,
      badge: '',
      tags: [],
    })
    setIsModalOpen(true)
  }

  // Open Edit Modal
  const handleOpenEdit = (p: CatalogProduct) => {
    setEditingProduct(p)
    setFormData({ ...p })
    setIsModalOpen(true)
  }

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title?.trim()) return

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? ({ ...item, ...formData } as CatalogProduct)
            : item
        )
      )
    } else {
      const newProduct: CatalogProduct = {
        id: `custom-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: formData.title,
        category: formData.category || 'Handcrafted',
        categoryId: formData.categoryId || 'rugs',
        origin: formData.origin || 'Morocco',
        image: formData.image || '/images/catalog/beni_ourain_rug.jpg',
        description: formData.description || 'Authentic handcrafted Moroccan piece.',
        material: formData.material || 'Artisan Materials',
        dimensions: formData.dimensions || 'Standard sizing',
        moq: formData.moq || '10 pcs',
        leadTime: formData.leadTime || '2-3 weeks',
        sampleAvailable: Boolean(formData.sampleAvailable),
        badge: formData.badge,
        tags: formData.tags || ['Handmade'],
      }
      setProducts((prev) => [newProduct, ...prev])
    }
    setIsModalOpen(false)
  }

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product from catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  // Filter Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.origin.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === 'all' || p.categoryId === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage])

  return (
    <>
      <AdminHeader
        title="Products Catalog"
        description="Manage wholesale items, specifications, materials and export lead times"
        action={
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#B85D36] hover:bg-[#984725] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={14} />
            <span>Add New Product</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Items
            </span>
            <h4 className="text-2xl font-serif font-bold text-slate-900 mt-1">
              {products.length}
            </h4>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Categories
            </span>
            <h4 className="text-2xl font-serif font-bold text-slate-900 mt-1">
              {CATALOG_CATEGORIES.length - 1}
            </h4>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sample Ready
            </span>
            <h4 className="text-2xl font-serif font-bold text-emerald-700 mt-1">
              {products.filter((p) => p.sampleAvailable).length}
            </h4>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Hospitality Grade
            </span>
            <h4 className="text-2xl font-serif font-bold text-[#B85D36] mt-1">
              {products.filter((p) => p.hospitalityGrade).length}
            </h4>
          </div>
        </div>

        {/* Toolbar: Search, Filter Category, View Mode Toggle */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search products by title, material, origin..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#B85D36]"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-700 focus:outline-none focus:border-[#B85D36] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATALOG_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Right: Counter and View Mode Toggle */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{filteredProducts.length}</strong> products
            </span>

            <div className="flex items-center bg-slate-100 rounded-md p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={cn(
                  'p-1.5 rounded text-xs font-medium transition-colors cursor-pointer',
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                )}
                title="Table view"
              >
                <List size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-1.5 rounded text-xs font-medium transition-colors cursor-pointer',
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                )}
                title="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Table View */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Material</th>
                    <th className="py-3 px-4">MOQ</th>
                    <th className="py-3 px-4">Lead Time</th>
                    <th className="py-3 px-4">Origin</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-slate-400">
                        No products match your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map((p) => {
                      const slug = p.slug || p.id
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-11 w-11 rounded-lg overflow-hidden bg-stone-100 border border-slate-200 shrink-0">
                                <Image
                                  src={p.image}
                                  alt={p.title}
                                  fill
                                  sizes="44px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0 max-w-xs">
                                <span className="font-bold text-slate-900 block truncate" title={p.title}>
                                  {p.title}
                                </span>
                                {p.badge && (
                                  <span className="text-[10px] text-amber-700 font-semibold uppercase">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {p.category}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 max-w-[150px] truncate" title={p.material}>
                            {p.material}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-900">{p.moq}</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{p.leadTime}</td>
                          <td className="py-3.5 px-4 text-slate-500">{p.origin.split(',')[0]}</td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/products/${slug}`}
                                target="_blank"
                                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                                title="View public page"
                              >
                                <ExternalLink size={14} />
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(p)}
                                className="p-1.5 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                                title="Edit product"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                title="Delete product"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Products Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginatedProducts.map((p) => {
              const slug = p.slug || p.id
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square bg-stone-100">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover"
                      />
                      {p.badge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[9px] font-bold uppercase rounded-xs">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#996733]">
                        {p.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-slate-900 line-clamp-1" title={p.title}>
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{p.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-3 text-xs">
                    <span className="font-bold text-slate-800">{p.moq}</span>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/products/${slug}`}
                        target="_blank"
                        className="p-1 text-slate-400 hover:text-slate-800"
                        title="View Live"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="p-1 text-slate-400 hover:text-amber-700 cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1 text-slate-400 hover:text-red-700 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
            <span>
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              {getPageNumbers(currentPage, totalPages).map((page, idx) =>
                page === '...' ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold select-none text-xs"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page as number)}
                    className={cn(
                      'w-8 h-8 rounded text-xs font-bold transition-colors cursor-pointer',
                      currentPage === page
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-8 h-8 rounded border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Handcrafted Product'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Beni Ourain Hand-Knotted Diamond Wool Rug"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => {
                      const selected = CATALOG_CATEGORIES.find((c) => c.id === e.target.value)
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                        category: selected?.label || 'Rugs and Carpets',
                      })
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                  >
                    {CATALOG_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Origin Region</label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. Middle Atlas Mountains"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://... or /images/catalog/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MOQ</label>
                  <input
                    type="text"
                    value={formData.moq}
                    onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                    placeholder="e.g. 10 pcs"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lead Time</label>
                  <input
                    type="text"
                    value={formData.leadTime}
                    onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                    placeholder="e.g. 2-3 weeks"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Bestseller"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Materials</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. 100% Atlas Virgin Sheep Wool"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="e.g. Custom sizing (200x300cm)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of craftsmanship, handcrafting techniques, and specifications..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#B85D36]"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sampleAvailable}
                    onChange={(e) => setFormData({ ...formData, sampleAvailable: e.target.checked })}
                    className="rounded text-[#B85D36] focus:ring-0"
                  />
                  <span className="font-medium text-slate-700">Sample Available for Order</span>
                </label>
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
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
