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
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/craftadmin', icon: LayoutDashboard },
  { label: 'Products', path: '/craftadmin/products', icon: Package },
  { label: 'Quote Inquiries', path: '/craftadmin/orders', icon: ShoppingCart },
  { label: 'Categories', path: '/craftadmin/categories', icon: Tags },
  { label: 'Media Library', path: '/craftadmin/library', icon: Images },
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
            item.path === '/craftadmin'
              ? pathname === '/craftadmin' || pathname === '/admin'
              : pathname.startsWith(item.path) || pathname.startsWith(item.path.replace('/craftadmin', '/admin'))

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
      </nav>

      {/* Footer / Quick View Site Link */}
      <div className="border-t border-slate-800 p-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ExternalLink size={16} className="shrink-0 text-amber-400" />
          {!collapsed && <span>View Live Store</span>}
        </Link>
      </div>
    </aside>
  )
}
