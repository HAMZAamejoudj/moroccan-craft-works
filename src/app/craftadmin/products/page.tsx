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
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  Globe2,
  ImagePlus,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { ProductFormModal, ProductFormData } from '@/components/admin/ProductFormModal'
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

export default function CraftAdminProductsPage() {
  const [products, setProducts] = useState<CatalogProduct[]>(CATALOG_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  // Open Edit Modal
  const handleOpenEdit = (p: CatalogProduct) => {
    setEditingProduct(p)
    setIsModalOpen(true)
  }

  // Delete Product
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
      showToast(`Product "${name}" deleted.`)
    }
  }

  // Save Product Callback from ProductFormModal
  const handleSaveProduct = (formData: ProductFormData) => {
    if (formData.id) {
      // Update existing
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === formData.id) {
            return {
              ...p,
              title: formData.nameEn || p.title,
              category: formData.category,
              categoryId: formData.categoryId,
              image: formData.mainImage || p.image,
              description: formData.descEn || p.description,
              material: formData.material || p.material,
              origin: formData.origin || p.origin,
              dimensions: formData.dimensions || p.dimensions,
              moq: formData.moq || p.moq,
              leadTime: formData.leadTime || p.leadTime,
              sampleAvailable: formData.sampleAvailable,
              badge: formData.badge || undefined,
            }
          }
          return p
        })
      )
      showToast(`Product "${formData.nameEn}" successfully updated!`)
    } else {
      // Create new
      const newProduct: CatalogProduct = {
        id: `prod-${Date.now()}`,
        slug: formData.slugEn || `craft-item-${Date.now()}`,
        title: formData.nameEn,
        category: formData.category,
        categoryId: formData.categoryId,
        origin: formData.origin || 'Morocco',
        image: formData.mainImage || '/images/catalog/beni_ourain_rug.jpg',
        description: formData.descEn || formData.shortDescEn || '',
        material: formData.material || 'Authentic Handcrafted Material',
        dimensions: formData.dimensions || 'Bespoke / Custom sizing',
        moq: formData.moq || '10 pcs',
        leadTime: formData.leadTime || '2-3 weeks',
        sampleAvailable: formData.sampleAvailable,
        badge: formData.badge || undefined,
        tags: [formData.category.toLowerCase(), 'craft', 'handmade'],
      }
      setProducts((prev) => [newProduct, ...prev])
      showToast(`Product "${formData.nameEn}" created successfully!`)
    }
  }

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.origin && p.origin.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory =
        selectedCategory === 'all' || p.categoryId === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  return (
    <>
      <AdminHeader
        title="Products Catalog"
        description="Manage wholesale items, artisan craft specs, multi-language descriptions (EN/FR/AR), and photography"
        action={
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#B85D36] hover:bg-[#984725] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Craft Product</span>
          </button>
        }
      />

      <div className="space-y-6 p-6 sm:p-8">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2">
            <Check className="h-4 w-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search products by title, guild, or region..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-xs focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full sm:w-auto rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Craft Categories ({products.length})</option>
                {CATALOG_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 self-end sm:self-auto rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={cn(
                'rounded-md p-1.5 transition-colors cursor-pointer',
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              )}
              title="Table view"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-md p-1.5 transition-colors cursor-pointer',
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              )}
              title="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Products Table View */}
        {viewMode === 'table' ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <tr>
                    <th className="py-3.5 pl-6 pr-3">Product Item</th>
                    <th className="px-3 py-3.5">Category</th>
                    <th className="px-3 py-3.5">Artisan Origin</th>
                    <th className="px-3 py-3.5">MOQ</th>
                    <th className="px-3 py-3.5">Lead Time</th>
                    <th className="px-3 py-3.5">Status</th>
                    <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {paginatedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No products match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                              <Image
                                src={p.image || '/images/catalog/beni_ourain_rug.jpg'}
                                alt={p.title}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 max-w-xs sm:max-w-sm">
                              <p className="font-semibold text-slate-900 truncate">
                                {p.title}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                {p.material || 'Authentic Moroccan Craft'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-slate-600">
                          {p.origin || 'Morocco'}
                        </td>
                        <td className="px-3 py-3.5 font-bold text-slate-800">
                          {p.moq || '10 pcs'}
                        </td>
                        <td className="px-3 py-3.5 text-slate-500">
                          {p.leadTime || '2-3 weeks'}
                        </td>
                        <td className="px-3 py-3.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                            Active
                          </span>
                        </td>
                        <td className="py-3.5 pl-3 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(p)}
                              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p.id, p.title)}
                              className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedProducts.map((p) => (
              <div
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={p.image || '/images/catalog/beni_ourain_rug.jpg'}
                    alt={p.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-serif text-sm font-bold text-slate-900 line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {p.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#B85D36]">MOQ: {p.moq}</span>
                    <span className="text-[11px] text-slate-400">{p.origin}</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-50">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(p)}
                      className="flex-1 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(p.id, p.title)}
                      className="p-1.5 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4 rounded-xl shadow-xs text-xs">
            <span className="text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
              {filteredProducts.length} items
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              {getPageNumbers(currentPage, totalPages).map((num, i) =>
                num === '...' ? (
                  <span key={i} className="px-2 text-slate-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(num as number)}
                    className={cn(
                      'min-w-8 h-8 rounded-md text-xs font-semibold transition-colors cursor-pointer',
                      currentPage === num
                        ? 'bg-[#B85D36] text-white shadow-xs'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                    )}
                  >
                    {num}
                  </button>
                )
              )}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal (Full English / French / Arabic & Uploads) */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </>
  )
}
