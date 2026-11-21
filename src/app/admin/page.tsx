'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Package,
  ShoppingCart,
  Tags,
  Globe2,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building2,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES } from '@/lib/products-catalog'

const STAT_ITEMS = [
  {
    label: 'Total Products',
    value: CATALOG_PRODUCTS.length,
    desc: 'Active wholesale catalog items',
    icon: Package,
    color: 'bg-amber-500',
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-50',
    link: '/admin/products',
  },
  {
    label: 'Quote Requests',
    value: '42',
    desc: 'B2B & architectural inquiries',
    icon: ShoppingCart,
    color: 'bg-emerald-500',
    iconColor: 'text-emerald-700',
    iconBg: 'bg-emerald-50',
    link: '/admin/orders',
  },
  {
    label: 'Craft Guilds',
    value: CATALOG_CATEGORIES.length - 1,
    desc: 'Artisan disciplines',
    icon: Tags,
    color: 'bg-blue-500',
    iconColor: 'text-blue-700',
    iconBg: 'bg-blue-50',
    link: '/admin/categories',
  },
  {
    label: 'Export Markets',
    value: '38',
    desc: 'Countries shipped worldwide',
    icon: Globe2,
    color: 'bg-purple-500',
    iconColor: 'text-purple-700',
    iconBg: 'bg-purple-50',
    link: '/admin/orders',
  },
]

// Mock recent B2B quote inquiries matching Moroccan Craft Works context
const RECENT_INQUIRIES = [
  {
    id: 'INQ-9481',
    customer: 'Sarah Jenkins',
    company: 'Atelier Interior NYC',
    country: 'United States',
    item: 'Beni Ourain Hand-Knotted Diamond Wool Rug',
    volume: '15 pcs (Custom 3x4m)',
    status: 'PENDING',
    date: '2 hours ago',
  },
  {
    id: 'INQ-9480',
    customer: 'Marc Dupont',
    company: 'Hôtel Riad & Spa Provence',
    country: 'France',
    item: 'Authentic Hand-Cut Moroccan Glazed Zellige Tiles',
    volume: '120 m²',
    status: 'QUOTED',
    date: 'Yesterday',
  },
  {
    id: 'INQ-9479',
    customer: 'Klaus Weber',
    company: 'Boutique Boho Living',
    country: 'Germany',
    item: 'Hand-Pierced Arabesque Brass Dome Pendant',
    volume: '25 pcs',
    status: 'IN_PRODUCTION',
    date: '2 days ago',
  },
  {
    id: 'INQ-9478',
    customer: 'Layla Al-Maktoum',
    company: 'Emirates Luxury Residences',
    country: 'United Arab Emirates',
    item: 'Hand-Carved Cedar Moucharabieh Lattice Mirror',
    volume: '8 sets',
    status: 'SHIPPED',
    date: '3 days ago',
  },
]

export default function AdminDashboardPage() {
  const latestProducts = CATALOG_PRODUCTS.slice(0, 5)

  return (
    <>
      <AdminHeader
        title="Admin Overview"
        description="Wholesale inquiries, artisan catalog management, and export metrics"
        action={
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#B85D36] hover:bg-[#984725] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Plus size={14} />
            <span>Add Product</span>
          </Link>
        }
      />

      <div className="space-y-8 p-6 sm:p-8">
        {/* 1. Stats KPI Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STAT_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link
                href={item.link}
                key={item.label}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all duration-200 block"
              >
                <div className={`absolute top-0 left-0 h-1 w-full ${item.color}`} />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </p>
                    <h3 className="mt-1.5 text-2xl sm:text-3xl font-serif font-bold text-slate-900 group-hover:text-[#B85D36] transition-colors">
                      {item.value}
                    </h3>
                  </div>
                  <div
                    className={`rounded-lg ${item.iconBg} p-3 ${item.iconColor} transition-transform duration-300 group-hover:scale-108`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-slate-400 font-medium">{item.desc}</p>
              </Link>
            )
          })}
        </div>

        {/* 2. Main Two-Column Layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Recent Inquiries Table (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-[#B85D36]" />
                    <span>Recent Quote Inquiries</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Direct buyer and architectural requests</p>
                </div>
                <Link
                  href="/admin/orders"
                  className="text-xs font-semibold text-[#B85D36] hover:underline flex items-center gap-0.5"
                >
                  <span>View All</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-3.5">
                {RECENT_INQUIRIES.map((inq) => (
                  <div
                    key={inq.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-stone-50/70 hover:bg-stone-50 border border-stone-100 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{inq.customer}</span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-xs text-slate-600 truncate">{inq.company}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium truncate mt-0.5" title={inq.item}>
                        {inq.item}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>{inq.country}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-600">{inq.volume}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1.5 shrink-0">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider ${
                          inq.status === 'SHIPPED'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : inq.status === 'QUOTED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : inq.status === 'IN_PRODUCTION'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {inq.status.replace('_', ' ').toLowerCase()}
                      </span>
                      <span className="text-[10px] text-slate-400">{inq.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 text-center">
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Manage all B2B requests & export quotations →
              </Link>
            </div>
          </div>

          {/* Right: Latest Catalog Products (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                    <Package className="h-4 w-4 text-amber-700" />
                    <span>Catalog Items</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Recently updated craft collections</p>
                </div>
                <Link
                  href="/admin/products"
                  className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-0.5"
                >
                  <span>All Products</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {latestProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 group p-2 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative h-11 w-11 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate group-hover:text-[#B85D36] transition-colors">
                          {p.title}
                        </p>
                        <p className="text-[11px] text-[#996733] font-medium uppercase tracking-wider truncate">
                          {p.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-800 block">{p.moq}</span>
                      <span className="text-[10px] text-slate-400 block">{p.leadTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 text-center">
              <Link
                href="/admin/products"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Browse all {CATALOG_PRODUCTS.length} catalog items →
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Category Quick Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Tags className="h-4 w-4 text-blue-600" />
                <span>Craft Collections Distribution</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Active artisan lines represented</p>
            </div>
            <Link
              href="/admin/categories"
              className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-0.5"
            >
              <span>Manage Categories</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATALOG_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const count = CATALOG_PRODUCTS.filter((p) => p.categoryId === cat.id).length
              return (
                <Link
                  key={cat.id}
                  href={`/admin/products?category=${cat.id}`}
                  className="p-3.5 rounded-lg border border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-white transition-all text-center group"
                >
                  <p className="font-serif text-sm font-bold text-slate-800 group-hover:text-[#B85D36] transition-colors truncate">
                    {cat.label}
                  </p>
                  <span className="text-xs text-slate-400 mt-1 block">
                    <strong className="text-slate-700">{count}</strong> products
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
