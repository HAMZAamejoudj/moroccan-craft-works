'use client'

import React from 'react'
import Link from 'next/link'
import { ExternalLink, Sparkles } from 'lucide-react'

interface AdminHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex flex-col sm:flex-row sm:h-20 sm:items-center justify-between gap-4 border-b border-slate-200 bg-white/95 backdrop-blur-xs px-8 py-4 shadow-2xs">
      <div>
        <h1 className="font-serif text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>

      <div className="flex items-center gap-3">
        {action}
        <Link
          href="/products"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <span>Live Catalog</span>
          <ExternalLink size={13} />
        </Link>
      </div>
    </header>
  )
}
