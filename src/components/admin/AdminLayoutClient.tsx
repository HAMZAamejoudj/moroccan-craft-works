'use client'

import React, { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { cn } from '@/lib/utils'

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className={cn(
          'min-h-screen transition-all duration-300 flex flex-col',
          collapsed ? 'ml-20' : 'ml-64'
        )}
      >
        {children}
      </main>
    </div>
  )
}
