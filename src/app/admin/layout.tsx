import React from 'react'
import type { Metadata } from 'next'
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Moroccan Craft Works',
  description: 'Manage Moroccan Craft Works wholesale catalog, quote requests, and categories',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
