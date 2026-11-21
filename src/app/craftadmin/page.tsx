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
  Images,
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
    link: '/craftadmin/products',
  },
  {
    label: 'Quote Requests',
    value: '42',
    desc: 'B2B & architectural inquiries',
    icon: ShoppingCart,
    color: 'bg-emerald-500',
    iconColor: 'text-emerald-700',
    iconBg: 'bg-emerald-50',
    link: '/craftadmin/orders',
  },
  {
    label: 'Craft Guilds',
    value: CATALOG_CATEGORIES.length - 1,
    desc: 'Artisan disciplines',
    icon: Tags,
    color: 'bg-blue-500',
    iconColor: 'text-blue-700',
    iconBg: 'bg-blue-50',
    link: '/craftadmin/categories',
  },
  {
    label: 'Export Markets',
    value: '38',
    desc: 'Countries shipped worldwide',
    icon: Globe2,
    color: 'bg-purple-500',
    iconColor: 'text-purple-700',
    iconBg: 'bg-purple-50',
    link: '/craftadmin/orders',
  },
]

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

export default function CraftAdminDashboardPage() {
  const latestProducts = CATALOG_PRODUCTS.slice(0, 5)

  return (
    <>
      <AdminHeader
        title="CraftAdmin Dashboard"
        description="Moroccan Craft Works B2B wholesale management, catalog control, and export metrics"
        action={
          <Link
            href="/craftadmin/products"
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
                    <p className="text-xs font-medium text-slate-500">{item.label}</p>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-slate-900">
                      {item.value}
                    </h3>
                  </div>
                  <div className={`rounded-lg p-2.5 ${item.iconBg} ${item.iconColor}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>{item.desc}</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform text-slate-400" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* 2. Main Content Split: Recent Inquiries & Catalog Fast Track */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Recent B2B Quote Requests (2 Cols) */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h2 className="font-serif text-base font-bold text-slate-900">
                  Recent B2B Quote Requests
                </h2>
                <p className="text-xs text-slate-500">Live inquiries from international trade buyers</p>
              </div>
              <Link
                href="/craftadmin/orders"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#B85D36] hover:text-[#984725]"
              >
                <span>View All Inquiries</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {RECENT_INQUIRIES.map((inq) => (
                <div
                  key={inq.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 -mx-3 px-3 rounded-lg transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{inq.customer}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-medium text-slate-600">{inq.company}</span>
                      <span className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        {inq.country}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {inq.item} <span className="text-slate-400">({inq.volume})</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : inq.status === 'QUOTED'
                          ? 'bg-blue-100 text-blue-800'
                          : inq.status === 'IN_PRODUCTION'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {inq.status.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-slate-400 w-20 text-right">{inq.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Sourcing & Catalog Highlights */}
          <div className="space-y-6">
            {/* Quick Sourcing Actions */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="font-serif text-sm font-bold text-slate-900 mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  href="/craftadmin/products"
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Package size={16} className="text-[#B85D36]" />
                    <span>Manage Products Catalog</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  href="/craftadmin/categories"
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Tags size={16} className="text-amber-600" />
                    <span>Manage Craft Guilds</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  href="/craftadmin/hero-slides"
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#B85D36]" />
                    <span>Manage Hero Slides &amp; H1</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  href="/craftadmin/seo"
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe2 size={16} className="text-emerald-600" />
                    <span>SEO, Meta Tags &amp; Google Snippets</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  href="/craftadmin/library"
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Images size={16} className="text-blue-600" />
                    <span>Media Library & Uploads</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Catalog Snapshot */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-sm font-bold text-slate-900">
                  Latest Catalog Additions
                </h3>
                <Link
                  href="/craftadmin/products"
                  className="text-xs font-semibold text-[#B85D36] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {latestProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-stone-100">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-800">{p.title}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{p.category} · MOQ: {p.moq}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
