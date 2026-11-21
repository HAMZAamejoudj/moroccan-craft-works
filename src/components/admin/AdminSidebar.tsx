'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Images,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Quote Inquiries', path: '/admin/orders', icon: ShoppingCart },
  { label: 'Categories', path: '/admin/categories', icon: Tags },
  { label: 'Media Library', path: '/admin/library', icon: Images },
]

interface AdminSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen flex-col bg-slate-900 text-white transition-all duration-300 border-r border-slate-800 shadow-xl',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Top Brand Bar */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B85D36]" />
            <span className="font-serif text-base font-bold text-amber-400 tracking-wide">
              MCW Admin
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {!collapsed ? 'Store Management' : '•••'}
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive =
            item.path === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.path)

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-200',
                isActive
                  ? 'bg-[#B85D36] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}

        {!collapsed && (
          <div className="pt-4">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Live B2B Portals
            </div>
            <div className="space-y-0.5 mt-1">
              <Link
                href="/services/private-label"
                target="_blank"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition-colors"
              >
                <span>Private Label Page</span>
                <ExternalLink size={13} />
              </Link>
              <Link
                href="/services/wholesale"
                target="_blank"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition-colors"
              >
                <span>Wholesale Page</span>
                <ExternalLink size={13} />
              </Link>
              <Link
                href="/about"
                target="_blank"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition-colors"
              >
                <span>About Us Page</span>
                <ExternalLink size={13} />
              </Link>
              <Link
                href="/contact"
                target="_blank"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition-colors"
              >
                <span>Contact Page</span>
                <ExternalLink size={13} />
              </Link>
              <Link
                href="/products"
                target="_blank"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition-colors"
              >
                <span>Products Catalog (160 items)</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Footer / Quick View Site Link */}
      <div className="border-t border-slate-800 p-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ExternalLink size={16} className="shrink-0 text-amber-400" />
          {!collapsed && <span>View Live Site</span>}
        </Link>
      </div>
    </aside>
  )
}
