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
    projectType: 'Luxury Hotel Project',
    itemsRequested: 'Beni Ourain Hand-Knotted Diamond Wool Rug',
    volumeOrBudget: '15 pieces (Custom 3x4m & 2.5x3.5m)',
    message: 'We are furnishing 15 luxury suites in upstate NY. We require high pile Atlas wool in custom dimensions. Please provide container freight estimate to Newark port.',
    status: 'PENDING',
    createdAt: '2026-11-18 09:30',
  },
  {
    id: '2',
    reference: 'MCW-8920',
    customerName: 'Marc Dupont',
    email: 'm.dupont@riad-provence.fr',
    company: 'Hôtel Riad & Spa Provence',
    country: 'France',
    phone: '+33 4 90 12 34 56',
    projectType: 'Architectural Restoration',
    itemsRequested: 'Authentic Hand-Cut Moroccan Glazed Zellige Tiles (Emerald & White)',
    volumeOrBudget: '120 m² (10x10cm subway format)',
    message: 'Need 120 square meters of genuine hand-chiseled Moroccan zellige for steam room and courtyard fountain. Looking for sample verification.',
    status: 'QUOTED',
    createdAt: '2026-11-17 14:15',
  },
  {
    id: '3',
    reference: 'MCW-8919',
    customerName: 'Klaus Weber',
    email: 'klaus@boholiving-berlin.de',
    company: 'Boutique Boho Living GmbH',
    country: 'Germany',
    phone: '+49 30 9876543',
    projectType: 'B2B Retail Wholesale',
    itemsRequested: 'Hand-Pierced Arabesque Brass Dome Pendant & Filigree Sconces',
    volumeOrBudget: '35 pendants, 20 sconces',
    message: 'We operate 4 boutique lifestyle concept stores across Germany. We need CE compliant wiring and custom antique bronze patina finish.',
    status: 'IN_PRODUCTION',
    createdAt: '2026-11-16 11:20',
  },
  {
    id: '4',
    reference: 'MCW-8918',
    customerName: 'Layla Al-Maktoum',
    email: 'l.maktoum@emilux.ae',
    company: 'Emirates Luxury Residences',
    country: 'United Arab Emirates',
    phone: '+971 4 300 1234',
    projectType: 'Private Palace Villa',
    itemsRequested: 'Hand-Carved Cedar Moucharabieh Lattice Mirror & Thuya Boxes',
    volumeOrBudget: '8 monumental mirrors, 50 gift boxes',
    message: 'High architectural grade Atlas cedarwood. All customs export papers and air freight delivery to Dubai DWC airport.',
    status: 'SHIPPED',
    createdAt: '2026-11-14 16:40',
  },
  {
    id: '5',
    reference: 'MCW-8917',
    customerName: 'Liam O’Connor',
    email: 'liam@dublindesign.ie',
    company: 'O’Connor Commercial Furnishings',
    country: 'Ireland',
    phone: '+353 1 234 5678',
    projectType: 'Bespoke Restaurant Interior',
    itemsRequested: 'Vegetable-Tanned Genuine Leather Ottoman Poufs (Tan & Cognac)',
    volumeOrBudget: '40 poufs',
    message: 'Naturally tanned leather with custom restaurant logo hot-stamped on bottom seam. Shipped pre-filled.',
    status: 'COMPLETED',
    createdAt: '2026-11-11 10:05',
  },
]

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; border: string; icon: typeof Clock }
> = {
  PENDING: { label: 'Pending Review', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', icon: Clock },
  QUOTED: { label: 'Quote Sent', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  IN_PRODUCTION: { label: 'In Production', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Clock },
  SHIPPED: { label: 'Export Shipped', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: Truck },
  COMPLETED: { label: 'Fulfilled', bg: 'bg-stone-100', text: 'text-stone-700', border: 'border-stone-300', icon: CheckCircle2 },
  CANCELLED: { label: 'Declined', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: XCircle },
}

export default function AdminOrdersPage() {
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>(INITIAL_INQUIRIES)
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalInquiry, setActiveModalInquiry] = useState<QuoteInquiry | null>(null)

  // Update Status
  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
    if (activeModalInquiry && activeModalInquiry.id === id) {
      setActiveModalInquiry({ ...activeModalInquiry, status: newStatus })
    }
  }

  // Filter inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus =
        selectedStatus === 'ALL' || inq.status === selectedStatus
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        inq.customerName.toLowerCase().includes(q) ||
        inq.company.toLowerCase().includes(q) ||
        inq.country.toLowerCase().includes(q) ||
        inq.reference.toLowerCase().includes(q) ||
        inq.itemsRequested.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [inquiries, selectedStatus, searchQuery])

  return (
    <>
      <AdminHeader
        title="Quote Requests & Inquiries"
        description="Review international wholesale RFQs, architectural requests and production status"
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* KPI Counts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Inquiries
            </span>
            <h4 className="text-2xl font-serif font-bold text-slate-900 mt-1">
              {inquiries.length}
            </h4>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Pending Review
            </span>
            <h4 className="text-2xl font-serif font-bold text-amber-800 mt-1">
              {inquiries.filter((i) => i.status === 'PENDING').length}
            </h4>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              In Production
            </span>
            <h4 className="text-2xl font-serif font-bold text-blue-800 mt-1">
              {inquiries.filter((i) => i.status === 'IN_PRODUCTION').length}
            </h4>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
              Shipped Overseas
            </span>
            <h4 className="text-2xl font-serif font-bold text-purple-800 mt-1">
              {inquiries.filter((i) => i.status === 'SHIPPED').length}
            </h4>
          </div>
        </div>

        {/* Toolbar: Search & Status Pills */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {['ALL', 'PENDING', 'QUOTED', 'IN_PRODUCTION', 'SHIPPED'].map((status) => {
              const isActive = selectedStatus === status
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer',
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  {status === 'ALL'
                    ? 'All Requests'
                    : status === 'IN_PRODUCTION'
                    ? 'In Production'
                    : status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, company, country..."
              className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#B85D36]"
            />
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-3 px-4">Ref #</th>
                  <th className="py-3 px-4">Client & Company</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Requested Products</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      No inquiries match your selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => {
                    const statusConfig = STATUS_CONFIG[inq.status]
                    return (
                      <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{inq.reference}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{inq.customerName}</span>
                          <span className="text-[11px] text-slate-500 block">{inq.company}</span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">{inq.country}</td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <span className="font-semibold text-slate-800 block truncate" title={inq.itemsRequested}>
                            {inq.itemsRequested}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {inq.volumeOrBudget}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleStatusChange(inq.id, e.target.value as InquiryStatus)
                            }
                            className={cn(
                              'px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider cursor-pointer focus:outline-none',
                              statusConfig.bg,
                              statusConfig.text,
                              statusConfig.border
                            )}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="QUOTED">Quoted</option>
                            <option value="IN_PRODUCTION">In Production</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="COMPLETED">Fulfilled</option>
                            <option value="CANCELLED">Declined</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">{inq.createdAt}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setActiveModalInquiry(inq)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold text-xs cursor-pointer transition-colors"
                          >
                            <Eye size={13} />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {activeModalInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D36]">
                  Wholesale RFQ Reference
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {activeModalInquiry.reference}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalInquiry(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[11px]">Client Name</span>
                  <strong className="text-slate-900 text-sm">{activeModalInquiry.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Company / Organization</span>
                  <strong className="text-slate-900 text-sm">{activeModalInquiry.company}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Email</span>
                  <a
                    href={`mailto:${activeModalInquiry.email}`}
                    className="text-[#B85D36] font-semibold hover:underline"
                  >
                    {activeModalInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Country</span>
                  <strong className="text-slate-900">{activeModalInquiry.country}</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px] block mb-1">
                  Requested Items & Volume
                </span>
                <div className="p-3 bg-white rounded border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">{activeModalInquiry.itemsRequested}</p>
                  <p className="text-slate-600">Volume / Sizing: {activeModalInquiry.volumeOrBudget}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px] block mb-1">
                  Buyer Message & Project Specifications
                </span>
                <div className="p-3 bg-stone-50 rounded border border-stone-200 text-slate-700 leading-relaxed">
                  {activeModalInquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Status:</span>
                  <select
                    value={activeModalInquiry.status}
                    onChange={(e) =>
                      handleStatusChange(activeModalInquiry.id, e.target.value as InquiryStatus)
                    }
                    className="px-2.5 py-1 rounded text-xs font-bold border border-slate-300 bg-white"
                  >
                    <option value="PENDING">Pending Review</option>
                    <option value="QUOTED">Quote Sent</option>
                    <option value="IN_PRODUCTION">In Production</option>
                    <option value="SHIPPED">Export Shipped</option>
                    <option value="COMPLETED">Fulfilled</option>
                    <option value="CANCELLED">Declined</option>
                  </select>
                </div>

                <a
                  href={`mailto:${activeModalInquiry.email}?subject=Quotation from Moroccan Craft Works - ${activeModalInquiry.reference}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B85D36] hover:bg-[#984725] text-white font-bold rounded-md transition-colors"
                >
                  <Send size={13} />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
