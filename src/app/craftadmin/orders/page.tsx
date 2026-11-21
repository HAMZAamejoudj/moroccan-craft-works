'use client'

import React, { useState, useMemo } from 'react'
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertCircle,
  Building2,
  Mail,
  MapPin,
  Calendar,
  X,
  Send,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { cn } from '@/lib/utils'

type InquiryStatus = 'PENDING' | 'QUOTED' | 'IN_PRODUCTION' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'

interface QuoteInquiry {
  id: string
  reference: string
  customerName: string
  email: string
  company: string
  country: string
  phone?: string
  projectType: string
  itemsRequested: string
  volumeOrBudget: string
  message: string
  status: InquiryStatus
  createdAt: string
}

const INITIAL_INQUIRIES: QuoteInquiry[] = [
  {
    id: '1',
    reference: 'MCW-8921',
    customerName: 'Sarah Jenkins',
    email: 'sarah@ateliernyc.com',
    company: 'Atelier Interior NYC',
    country: 'United States',
    phone: '+1 212 555 0192',
    projectType: 'Commercial Boutique Hotel',
    itemsRequested: 'Beni Ourain Wool Rugs, Hand-Pierced Brass Dome Pendants',
    volumeOrBudget: '15 rugs (3x4m) + 30 brass pendants',
    message: 'Looking for contract-grade pricing and air freight timeline to JFK, New York.',
    status: 'PENDING',
    createdAt: 'Today at 10:45 AM',
  },
  {
    id: '2',
    reference: 'MCW-8920',
    customerName: 'Marc Dupont',
    email: 'm.dupont@riadprovence.fr',
    company: 'Hôtel Riad & Spa Provence',
    country: 'France',
    phone: '+33 4 91 22 33 44',
    projectType: 'Architectural Renovation',
    itemsRequested: 'Glazed Zellige Terracotta Wall Tiles, Star Mosaic Fountain Panel',
    volumeOrBudget: '120 m² Zellige + 2 custom fountains',
    message: 'Need EUR.1 duty-free certificate and maritime crate pallet consolidation to Marseille port.',
    status: 'QUOTED',
    createdAt: 'Yesterday at 3:20 PM',
  },
  {
    id: '3',
    reference: 'MCW-8919',
    customerName: 'Klaus Weber',
    email: 'klaus@boholiving.de',
    company: 'Boutique Boho Living',
    country: 'Germany',
    phone: '+49 30 123456',
    projectType: 'Retail Store Wholesale Inventory',
    itemsRequested: 'Full-Grain Leather Poufs, Raffia Storage Baskets, Cactus Silk Throws',
    volumeOrBudget: '60 leather poufs, 80 baskets, 50 throws',
    message: 'Recurring quarterly replenishment. Please provide wholesale volume tier discounts.',
    status: 'IN_PRODUCTION',
    createdAt: 'Nov 19, 2026',
  },
  {
    id: '4',
    reference: 'MCW-8918',
    customerName: 'Layla Al-Maktoum',
    email: 'layla@emiratesluxury.ae',
    company: 'Emirates Luxury Residences',
    country: 'United Arab Emirates',
    phone: '+971 4 888 9999',
    projectType: 'Private Residential Villa',
    itemsRequested: 'Hand-Carved Cedar Moucharabieh Lattice Mirrors, Safi Ceramic Sets',
    volumeOrBudget: '8 carved mirrors + 12 ceramic tableware sets',
    message: 'Express air crating via DHL directly to Dubai International Airport.',
    status: 'SHIPPED',
    createdAt: 'Nov 18, 2026',
  },
  {
    id: '5',
    reference: 'MCW-8917',
    customerName: 'Oliver Smith',
    email: 'oliver@smithandco.co.uk',
    company: 'Smith & Co Design London',
    country: 'United Kingdom',
    phone: '+44 20 7946 0912',
    projectType: 'Restaurant & Bar Project',
    itemsRequested: 'Hammered Copper Sinks, Brass Tabletop Lanterns',
    volumeOrBudget: '12 copper sinks + 40 table lanterns',
    message: 'Bespoke antiqued dark patina required for brassware. Delivery to London Heathrow.',
    status: 'COMPLETED',
    createdAt: 'Nov 15, 2026',
  },
]

export default function CraftAdminOrdersPage() {
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>(INITIAL_INQUIRIES)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [selectedInquiry, setSelectedInquiry] = useState<QuoteInquiry | null>(null)

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        inq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.country.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'ALL' || inq.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [inquiries, searchQuery, statusFilter])

  const updateStatus = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  return (
    <>
      <AdminHeader
        title="B2B Quote Inquiries & Orders"
        description="Track trade requests, architectural project RFQs, export invoicing, and shipping status"
      />

      <div className="space-y-6 p-6 sm:p-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, company, reference..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-xs focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['ALL', 'PENDING', 'QUOTED', 'IN_PRODUCTION', 'SHIPPED', 'COMPLETED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0',
                  statusFilter === st
                    ? 'bg-[#1a130e] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {st === 'ALL' ? 'All Requests' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="py-3.5 pl-6 pr-3">Reference</th>
                  <th className="px-3 py-3.5">Trade Buyer</th>
                  <th className="px-3 py-3.5">Destination</th>
                  <th className="px-3 py-3.5">Requested Craft Items</th>
                  <th className="px-3 py-3.5">Date</th>
                  <th className="px-3 py-3.5">Status</th>
                  <th className="py-3.5 pl-3 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No quote inquiries found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 pl-6 pr-3 font-mono font-bold text-[#B85D36]">
                        {inq.reference}
                      </td>
                      <td className="px-3 py-3.5">
                        <div>
                          <p className="font-semibold text-slate-900">{inq.customerName}</p>
                          <p className="text-[11px] text-slate-400">{inq.company}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {inq.country}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 max-w-xs truncate text-slate-600">
                        {inq.itemsRequested}
                      </td>
                      <td className="px-3 py-3.5 text-slate-400 text-[11px]">
                        {inq.createdAt}
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            inq.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-800'
                              : inq.status === 'QUOTED'
                              ? 'bg-blue-100 text-blue-800'
                              : inq.status === 'IN_PRODUCTION'
                              ? 'bg-purple-100 text-purple-800'
                              : inq.status === 'SHIPPED'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {inq.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 pl-3 pr-6 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                          className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Slide-over / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#B85D36]">
                  {selectedInquiry.reference}
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                  Inquiry from {selectedInquiry.customerName} ({selectedInquiry.company})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Contact Email</span>
                <span className="font-semibold text-slate-800">{selectedInquiry.email}</span>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Phone / WhatsApp</span>
                <span className="font-semibold text-slate-800">{selectedInquiry.phone || 'N/A'}</span>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Project Category</span>
                <span className="font-semibold text-slate-800">{selectedInquiry.projectType}</span>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Volume & Target</span>
                <span className="font-semibold text-slate-800">{selectedInquiry.volumeOrBudget}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-slate-500">Requested Craft Pieces:</span>
              <p className="text-xs text-slate-800 rounded-lg bg-slate-50 p-3">
                {selectedInquiry.itemsRequested}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-slate-500">Buyer Message & Export Notes:</span>
              <p className="text-xs text-slate-700 rounded-lg bg-slate-50 p-3 leading-relaxed">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Status Change Controls */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => updateStatus(selectedInquiry.id, e.target.value as InquiryStatus)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#B85D36]"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="QUOTED">QUOTED</option>
                  <option value="IN_PRODUCTION">IN PRODUCTION</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-lg bg-[#1a130e] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B85D36] transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
