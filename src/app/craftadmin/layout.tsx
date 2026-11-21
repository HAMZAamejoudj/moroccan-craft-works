import React from 'react'
import type { Metadata } from 'next'
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient'

export const metadata: Metadata = {
  title: 'CraftAdmin | Moroccan Craft Works Management',
  description: 'Manage Moroccan Craft Works wholesale catalog, quote inquiries, and media library',
}

export default function CraftAdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
