'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  Check,
  SlidersHorizontal,
  ChevronRight,
  Package,
  RotateCcw,
  Sparkles,
  ChevronLeft,
} from 'lucide-react'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'
import { QuoteModal } from '@/components/ui/QuoteModal'
import { ProductCard } from '@/components/products/ProductCard'
import {
  CATALOG_PRODUCTS,
  CATALOG_CATEGORIES,
  CatalogProduct,
} from '@/lib/products-catalog'
import { cn } from '@/lib/utils'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'moq-asc' | 'lead-asc'

function ProductsCatalogContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  // Selected categories state (multi-select like Antique Brass)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    return initialCategory && initialCategory !== 'all' ? [initialCategory] : []
  })

  // Sync state when query parameter changes in URL (e.g. from Navbar mega-menu category clicks)
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const q = searchParams.get('q') || searchParams.get('search')
    if (categoryParam) {
      if (categoryParam === 'all') {
        setSelectedCategories([])
      } else {
        setSelectedCategories([categoryParam])
      }
    }
    if (q !== null && q !== undefined) {
      setSearchQuery(q)
    }
    setCurrentPage(1)
  }, [searchParams])

  // Filters state
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all')
  const [selectedMoqRange, setSelectedMoqRange] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Quote modal & wishlist state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [quoteProductTitle, setQuoteProductTitle] = useState<string | undefined>()
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  const handleOpenQuote = (title?: string) => {
    setQuoteProductTitle(title)
    setIsQuoteModalOpen(true)
  }

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const element = document.getElementById('catalog-products-top')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Toggle category checkbox
  const handleCategoryToggle = (catId: string) => {
    setCurrentPage(1)
    if (catId === 'all') {
      setSelectedCategories([])
    } else {
      setSelectedCategories((prev) => {
        if (prev.includes(catId)) {
          return prev.filter((id) => id !== catId)
        } else {
          return [...prev, catId]
        }
      })
    }
  }

  const isAllCategories = selectedCategories.length === 0

  // Extract unique materials for quick filter
  const allMaterials = useMemo(() => {
    const set = new Set<string>()
    CATALOG_PRODUCTS.forEach((p) => {
      const firstWord = p.material.split(/[,(&]/)[0].trim()
      if (firstWord) set.add(firstWord)
    })
    return Array.from(set).slice(0, 8)
  }, [])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...CATALOG_PRODUCTS]

    // 1. Category filter
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.categoryId))
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    // 3. Material filter
    if (selectedMaterial !== 'all') {
      list = list.filter((p) =>
        p.material.toLowerCase().includes(selectedMaterial.toLowerCase())
      )
    }

    // 4. MOQ filter
    if (selectedMoqRange === 'low') {
      list = list.filter((p) => {
        const num = parseInt(p.moq.replace(/\D/g, '')) || 0
        return num <= 5
      })
    } else if (selectedMoqRange === 'bulk') {
      list = list.filter((p) => {
        const num = parseInt(p.moq.replace(/\D/g, '')) || 0
        return num > 10
      })
    }

    // 5. Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'price-desc':
        list.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case 'name-asc':
        list.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'moq-asc':
        list.sort((a, b) => {
          const numA = parseInt(a.moq.replace(/\D/g, '')) || 0
          const numB = parseInt(b.moq.replace(/\D/g, '')) || 0
          return numA - numB
        })
        break
      case 'lead-asc':
        list.sort((a, b) => a.leadTime.localeCompare(b.leadTime))
        break
      case 'featured':
      default:
        // Keep default curated order
        break
    }

    return list
  }, [selectedCategories, searchQuery, selectedMaterial, selectedMoqRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage])

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    searchQuery.trim() !== '' ||
    selectedMaterial !== 'all' ||
    selectedMoqRange !== 'all'

  const resetFilters = () => {
    setSelectedCategories([])
    setSearchQuery('')
    setSelectedMaterial('all')
    setSelectedMoqRange('all')
    setSortBy('featured')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. MASTER SITE NAVBAR (Preserved exactly as requested) */}
      <Navbar onRequestQuote={() => handleOpenQuote()} />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-32">
        {/* 2. ELEGANT PAGE HEADER (Inspired by Antique Brass shop header) */}
        <section className="border-b border-stone-200/80 bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
            {/* Title in Serif */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#201610] tracking-tight mb-3">
              Handcrafted Moroccan Collections
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Explore authentic handmade pieces crafted by generational artisans across Morocco.
              Custom sizing, hospitality-grade finishes, and worldwide container shipping available.
            </p>

            {/* Breadcrumb path */}
            <nav className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-500 font-medium">
              <Link href="/" className="hover:text-[#B85D36] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-900 font-semibold">Products Catalog</span>
              {selectedCategories.length === 1 && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-[#996733] font-semibold capitalize">
                    {CATALOG_CATEGORIES.find((c) => c.id === selectedCategories[0])?.label ||
                      selectedCategories[0]}
                  </span>
                </>
              )}
            </nav>
          </div>
        </section>

        {/* 3. MAIN CATALOG LAYOUT (2 Columns: Sticky Sidebar + Main Area) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* ================= LEFT SIDEBAR ================= */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Categories Box */}
                <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#201610] flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#996733]" />
                      <span>Collections</span>
                    </h3>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="text-[11px] font-semibold text-[#B85D36] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>

                  <ul className="space-y-2.5">
                    {/* All Products Item */}
                    <li>
                      <label className="flex items-center justify-between gap-3 cursor-pointer select-none group py-1">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isAllCategories}
                            onChange={() => handleCategoryToggle('all')}
                            className="sr-only"
                          />
                          <div
                            className={cn(
                              'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200',
                              isAllCategories
                                ? 'bg-[#996733] border-[#996733] text-white shadow-xs'
                                : 'bg-white border-stone-300 text-transparent group-hover:border-[#996733]'
                            )}
                          >
                            <Check size={11} className="stroke-[3]" />
                          </div>
                          <span
                            className={cn(
                              'text-xs transition-colors',
                              isAllCategories
                                ? 'font-bold text-stone-900'
                                : 'text-stone-600 group-hover:text-stone-900'
                            )}
                          >
                            All Collections
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400 font-medium">
                          {CATALOG_PRODUCTS.length}
                        </span>
                      </label>
                    </li>

                    {/* Specific Categories */}
                    {CATALOG_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                      const isChecked = selectedCategories.includes(cat.id)
                      const count = CATALOG_PRODUCTS.filter((p) => p.categoryId === cat.id).length
                      return (
                        <li key={cat.id}>
                          <label className="flex items-center justify-between gap-3 cursor-pointer select-none group py-1">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCategoryToggle(cat.id)}
                                className="sr-only"
                              />
                              <div
                                className={cn(
                                  'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200',
                                  isChecked
                                    ? 'bg-[#996733] border-[#996733] text-white shadow-xs'
                                    : 'bg-white border-stone-300 text-transparent group-hover:border-[#996733]'
                                )}
                              >
                                <Check size={11} className="stroke-[3]" />
                              </div>
                              <span
                                className={cn(
                                  'text-xs transition-colors',
                                  isChecked
                                    ? 'font-bold text-stone-900'
                                    : 'text-stone-600 group-hover:text-stone-900'
                                )}
                              >
                                {cat.label}
                              </span>
                            </div>
                            <span className="text-[11px] text-stone-400 font-medium">{count}</span>
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Secondary Filters Box (Material & MOQ) */}
                <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs space-y-4">
                  {/* Material Filter */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Filter by Material
                    </label>
                    <select
                      value={selectedMaterial}
                      onChange={(e) => {
                        setSelectedMaterial(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-700 focus:outline-none focus:border-[#996733] cursor-pointer"
                    >
                      <option value="all">All Materials</option>
                      {allMaterials.map((mat) => (
                        <option key={mat} value={mat}>
                          {mat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* MOQ Filter */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Minimum Order (MOQ)
                    </label>
                    <select
                      value={selectedMoqRange}
                      onChange={(e) => {
                        setSelectedMoqRange(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-700 focus:outline-none focus:border-[#996733] cursor-pointer"
                    >
                      <option value="all">Any Quantity</option>
                      <option value="low">Low MOQ (≤ 5 pcs)</option>
                      <option value="bulk">Wholesale Volume (10+ pcs)</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* ================= RIGHT MAIN CATALOG ================= */}
            <section className="lg:col-span-3 flex flex-col">
              {/* Toolbar: Search + Count + Sort */}
              <div className="bg-white rounded-xl border border-stone-200/90 p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search Bar with Search Icon */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    placeholder="Search by product name, craft, material or tag..."
                    className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#996733] focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Right: Counter and Sort By */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <span className="text-xs text-stone-500 font-medium">
                    Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-600 hidden md:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-700 focus:outline-none focus:border-[#996733] cursor-pointer"
                    >
                      <option value="featured">Featured Curated</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name (A — Z)</option>
                      <option value="moq-asc">Lowest MOQ</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filter Tags */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap mb-6 text-xs">
                  <span className="text-stone-500 font-semibold">Active filters:</span>
                  {selectedCategories.map((cId) => (
                    <span
                      key={cId}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-stone-300 text-stone-800 font-medium"
                    >
                      <span>
                        {CATALOG_CATEGORIES.find((c) => c.id === cId)?.label || cId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle(cId)}
                        className="hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-stone-300 text-stone-800 font-medium">
                      <span>Query: &quot;{searchQuery}&quot;</span>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedMaterial !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-stone-300 text-stone-800 font-medium">
                      <span>Material: {selectedMaterial}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedMaterial('all')}
                        className="hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[#B85D36] hover:underline font-semibold ml-2 cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Anchor for smooth scroll on page change */}
              <div id="catalog-products-top" className="scroll-mt-32" />

              {/* Products Grid (3 Columns on desktop, luxury cards) */}
              {paginatedProducts.length === 0 ? (
                <div className="bg-white rounded-xl border border-stone-200 p-12 text-center my-6">
                  <Package className="w-12 h-12 text-stone-300 mx-auto mb-3 stroke-1" />
                  <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">
                    No handcrafted pieces found
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5 leading-relaxed">
                    We could not find any products matching your current filters. Try resetting your search or selecting a different collection.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 bg-[#996733] hover:bg-[#7A4E22] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onRequestQuote={handleOpenQuote}
                      isWishlisted={Boolean(wishlist[product.id])}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {filteredProducts.length > 0 && (
                <div className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
                  <div className="text-stone-600 font-medium">
                    Showing <strong className="text-stone-900 font-bold">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)}</strong> –{' '}
                    <strong className="text-stone-900 font-bold">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> of{' '}
                    <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> products
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className="px-3 py-1.5 rounded-md border border-stone-200 bg-white text-stone-700 font-semibold flex items-center gap-1 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1.5">
                      {getPageNumbers(currentPage, totalPages).map((page, idx) =>
                        page === '...' ? (
                          <span
                            key={`ellipsis-${idx}`}
                            className="w-8 h-8 flex items-center justify-center text-stone-400 font-bold select-none text-xs"
                          >
                            …
                          </span>
                        ) : (
                          <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page as number)}
                            className={cn(
                              'w-8 h-8 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center justify-center',
                              currentPage === page
                                ? 'bg-[#201610] text-white shadow-xs'
                                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-950'
                            )}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className="px-3 py-1.5 rounded-md border border-stone-200 bg-white text-stone-700 font-semibold flex items-center gap-1 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                      aria-label="Next page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* 4. MASTER SITE FOOTER (Preserved exactly as requested) */}
      <Footer />

      {/* GLOBAL QUOTE MODAL */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialProduct={quoteProductTitle}
      />
    </div>
  )
}

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

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-stone-800 font-serif">
          Loading Moroccan Craft Works Catalog...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  )
}
