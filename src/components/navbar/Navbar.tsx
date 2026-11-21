'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ShoppingBag,
  Globe,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Package,
  Wrench,
  Tag,
  Building2,
} from 'lucide-react'
import { MoroccanLogo } from '../ui/MoroccanLogo'
import { PRODUCT_CATEGORIES, SERVICES } from '@/lib/data'
import { useCart } from '@/context/CartContext'

// Custom Luxury Services Icons matching Moroccan craftsmanship branding
const PrivateLabelIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    className={className}
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* House structure */}
    <path d="M18 4.5 L31 14.5 L28 14.5 L28 29.5 L8 29.5 L8 14.5 L5 14.5 Z" />
    {/* Diamond inside */}
    <polygon points="18,12 24,18 18,24.5 12,18" strokeWidth="1.8" />
    <line x1="12" y1="18" x2="24" y2="18" strokeWidth="1.4" />
    <polyline points="15,12 18,18 21,12" strokeWidth="1.4" />
    <line x1="18" y1="18" x2="18" y2="24.5" strokeWidth="1.4" />
  </svg>
)

const WholesaleBoxIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    className={className}
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* 3D Isometric Cargo Box */}
    <path d="M18 4.5 L30 11.5 L30 25.5 L18 32.5 L6 25.5 L6 11.5 Z" />
    <path d="M6 11.5 L18 18.5 L30 11.5" />
    <path d="M18 18.5 L18 32.5" />
    {/* Box handles / flaps */}
    <path d="M11 15.5 L11 21 L13.5 22.5 L13.5 17" strokeWidth="1.7" />
    <path d="M25 15.5 L25 21 L22.5 22.5 L22.5 17" strokeWidth="1.7" />
  </svg>
)

const SERVICES_NAV_ITEMS = [
  {
    id: 'private-label',
    title: 'Private Label',
    subtitle: 'Your Brand, Our Craftsmanship',
    href: '/services/private-label',
    icon: PrivateLabelIcon,
  },
  {
    id: 'wholesale',
    title: 'Wholesale',
    subtitle: 'Bulk Orders, Best Prices',
    href: '/services/wholesale',
    icon: WholesaleBoxIcon,
  },
]

// Pure SVG Country Flags (Crisp on all platforms, including Windows)
const UKFlag: React.FC<{ className?: string }> = ({ className = 'w-4 h-3' }) => (
  <svg
    className={className}
    viewBox="0 0 60 40"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: '2px', display: 'inline-block' }}
    aria-hidden="true"
  >
    <clipPath id="uk-flag-clip">
      <rect width="60" height="40" rx="2" />
    </clipPath>
    <g clipPath="url(#uk-flag-clip)">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#FFF" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0 V40 M0 20 H60" stroke="#FFF" strokeWidth="12" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="7" />
    </g>
  </svg>
)

const FranceFlag: React.FC<{ className?: string }> = ({ className = 'w-4 h-3' }) => (
  <svg
    className={className}
    viewBox="0 0 60 40"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: '2px', display: 'inline-block' }}
    aria-hidden="true"
  >
    <rect width="20" height="40" fill="#002654" />
    <rect x="20" width="20" height="40" fill="#FFFFFF" />
    <rect x="40" width="20" height="40" fill="#CE1126" />
  </svg>
)

const MoroccoFlag: React.FC<{ className?: string }> = ({ className = 'w-4 h-3' }) => (
  <svg
    className={className}
    viewBox="0 0 60 40"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: '2px', display: 'inline-block' }}
    aria-hidden="true"
  >
    <rect width="60" height="40" fill="#C1272D" />
    <path
      d="M30 10 L35.29 26.28 L21.44 16.22 L38.56 16.22 L24.71 26.28 Z"
      fill="none"
      stroke="#006233"
      strokeWidth="2.2"
      strokeLinejoin="miter"
    />
  </svg>
)

const LANGUAGES = [
  { code: 'EN', name: 'English (EN)', Flag: UKFlag },
  { code: 'FR', name: 'Français (FR)', Flag: FranceFlag },
  { code: 'AR', name: 'العربية (AR)', Flag: MoroccoFlag },
]

const PAGES_NAV_ITEMS = [
  {
    id: 'how-to-order',
    title: 'How to Order',
    subtitle: '5-step ordering guide and custom quotes',
    href: '/how-to-order',
    badge: 'Guide',
  },
  {
    id: 'faq',
    title: 'FAQ',
    subtitle: 'Frequently asked questions and trade policies',
    href: '/faq',
  },
]

interface NavbarProps {
  onRequestQuote?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestQuote }) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  // Pages that feature an editorial dark hero where the navbar floats with white text until scrolled
  const hasDarkHero =
    pathname === '/' ||
    pathname === '/how-to-order' ||
    pathname === '/faq' ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname === '/services/private-label' ||
    pathname === '/services/wholesale' ||
    pathname?.startsWith('/how-to-order') ||
    pathname?.startsWith('/faq') ||
    pathname?.startsWith('/about') ||
    pathname?.startsWith('/contact')
  const [isScrolled, setIsScrolled] = useState(false)
  const isLight = !hasDarkHero || isScrolled
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('EN')
  const { totalItems, openCart } = useCart()
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null)

  const productsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const servicesTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const pagesTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current)
      productsTimeoutRef.current = null
    }
    setProductsOpen(true)
  }

  const handleProductsLeave = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current)
    }
    productsTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false)
    }, 280) // 280ms grace buffer so the user can easily move the mouse anywhere into the mega-menu
  }

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
      servicesTimeoutRef.current = null
    }
    setServicesOpen(true)
  }

  const handleServicesLeave = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
    }
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 280)
  }

  const handlePagesEnter = () => {
    if (pagesTimeoutRef.current) {
      clearTimeout(pagesTimeoutRef.current)
      pagesTimeoutRef.current = null
    }
    setPagesOpen(true)
  }

  const handlePagesLeave = () => {
    if (pagesTimeoutRef.current) {
      clearTimeout(pagesTimeoutRef.current)
    }
    pagesTimeoutRef.current = setTimeout(() => {
      setPagesOpen(false)
    }, 280)
  }

  // Close menus when scrolling or clicking outside
  useEffect(() => {
    const handleCloseOnScroll = () => {
      if (window.scrollY > 30) {
        // keep open or smooth
      }
    }
    window.addEventListener('scroll', handleCloseOnScroll)
    return () => window.removeEventListener('scroll', handleCloseOnScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-none outline-none transition-[background,padding,box-shadow,backdrop-filter] duration-300 ${
        isLight
          ? 'bg-[#FAF7F2] backdrop-blur-md border-b border-stone-200/80 shadow-sm py-2.5'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-3 sm:py-4 shadow-none backdrop-blur-none'
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <MoroccanLogo
              layout="horizontal"
              variant={isLight ? 'gold' : 'white'}
              height={74}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className={`relative text-[15.5px] font-bold transition-colors py-1 group ${
                isLight
                  ? 'text-moroccan-dark hover:text-moroccan-terracotta'
                  : 'text-white hover:text-moroccan-gold-light drop-shadow-sm'
              }`}
            >
              Home
              {isHomePage && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-moroccan-terracotta rounded-full shadow" />
              )}
            </Link>

            {/* Products Dropdown (Full-Width Mega Menu) */}
            <div
              className="static"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <Link
                href="/products"
                onClick={() => setProductsOpen(false)}
                className={`relative flex items-center gap-1.5 text-[15.5px] font-bold transition-colors py-1 cursor-pointer ${
                  isLight
                    ? 'text-stone-800 hover:text-moroccan-terracotta'
                    : 'text-white hover:text-moroccan-gold-light drop-shadow-sm'
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] ${
                    productsOpen
                      ? 'rotate-180 text-moroccan-terracotta'
                      : isLight
                      ? 'text-stone-500'
                      : 'text-white/80'
                  }`}
                />
                {pathname?.startsWith('/products') && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-moroccan-terracotta rounded-full shadow" />
                )}
              </Link>

              {productsOpen && (
                <div
                  className="absolute top-full left-0 right-0 sm:left-2 sm:right-2 lg:left-0 lg:right-0 pt-2 z-50 animate-fade-in"
                  onMouseEnter={handleProductsEnter}
                  onMouseLeave={handleProductsLeave}
                >
                  {/* Invisible hover bridge to eliminate any gap */}
                  <div className="absolute -top-5 left-0 right-0 h-5 bg-transparent" />

                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden text-moroccan-dark">
                    {/* Top luxury artisan bar */}
                    <div className="h-1 bg-gradient-to-r from-moroccan-gold via-moroccan-terracotta to-moroccan-gold" />

                    {/* 5-Column Grid with 10 Categories and all Sub-menus */}
                    <div className="grid grid-cols-5 gap-6 lg:gap-7 xl:gap-8 p-6 lg:p-7 xl:p-8 bg-[#FCFAF7]">
                      {[
                        [PRODUCT_CATEGORIES[0], PRODUCT_CATEGORIES[5]], // Rugs and Carpets, Basketry and Raffia
                        [PRODUCT_CATEGORIES[1], PRODUCT_CATEGORIES[6]], // Zellige and Architecture, Wood Crafts and Furniture
                        [PRODUCT_CATEGORIES[2], PRODUCT_CATEGORIES[7]], // Pottery and Ceramics, Lighting and Wrought Iron
                        [PRODUCT_CATEGORIES[3], PRODUCT_CATEGORIES[8]], // Brass and Copper, Textiles and Home Accessories
                        [PRODUCT_CATEGORIES[4], PRODUCT_CATEGORIES[9]], // Leather Goods, Traditional Clothing
                      ].map((columnPair, colIdx) => (
                        <div key={colIdx} className="space-y-6">
                          {columnPair.map((cat) => (
                            <div key={cat.id} className="space-y-2">
                              {/* Category Header Link */}
                              <Link
                                href={cat.href}
                                onClick={() => setProductsOpen(false)}
                                className="group flex items-start justify-between pb-1.5 border-b border-stone-200/80 hover:border-moroccan-terracotta transition-colors gap-2"
                              >
                                <span className="font-serif text-[12.5px] xl:text-[13px] font-bold text-moroccan-dark tracking-wide uppercase group-hover:text-moroccan-terracotta transition-colors leading-tight">
                                  {cat.title}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-moroccan-terracotta group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                              </Link>

                              {/* Sub-products list */}
                              <ul className="space-y-1.5 pt-1">
                                {cat.subProducts?.map((sub) => (
                                  <li key={sub.title}>
                                    <Link
                                      href={sub.href}
                                      onClick={() => setProductsOpen(false)}
                                      className="text-[12px] text-stone-600 hover:text-moroccan-terracotta hover:translate-x-0.5 transition-all py-0.5 flex items-start gap-1.5 font-medium group leading-snug"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-moroccan-terracotta group-hover:scale-125 transition-all shrink-0 mt-1" />
                                      <span className="leading-snug">{sub.title}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className={`flex items-center gap-1.5 text-[15.5px] font-bold transition-colors py-1 cursor-pointer ${
                  servicesOpen
                    ? isLight
                      ? 'text-moroccan-terracotta'
                      : 'text-moroccan-gold-light'
                    : isLight
                    ? 'text-stone-800 hover:text-moroccan-terracotta'
                    : 'text-white hover:text-moroccan-gold-light drop-shadow-sm'
                }`}
                onClick={() => {
                  if (servicesTimeoutRef.current) {
                    clearTimeout(servicesTimeoutRef.current)
                    servicesTimeoutRef.current = null
                  }
                  setServicesOpen((prev) => !prev)
                }}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] ${
                    servicesOpen
                      ? 'rotate-180 text-moroccan-terracotta'
                      : isLight
                      ? 'text-stone-500'
                      : 'text-white/80'
                  }`}
                />
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-fade-in"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  {/* Invisible hover bridge buffer */}
                  <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />

                  {/* Top pointer triangle (white matching Products menu) */}
                  <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-b-[9px] border-b-white z-20 pointer-events-none drop-shadow-[0_-2px_4px_rgba(0,0,0,0.08)]" />

                  {/* Light Luxury Dropdown Card (Exact match with Products Menu) */}
                  <div className="relative w-[350px] rounded-2xl bg-white/98 backdrop-blur-xl border border-stone-200/90 shadow-2xl overflow-hidden text-moroccan-dark">
                    {/* Top luxury artisan bar */}
                    <div className="h-1 bg-gradient-to-r from-moroccan-gold via-moroccan-terracotta to-moroccan-gold" />

                    {/* Services Items list */}
                    <div className="bg-[#FCFAF7] p-2 divide-y divide-stone-200/70">
                      {SERVICES_NAV_ITEMS.map((item) => {
                        const IconComponent = item.icon
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center justify-between gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 group hover:bg-white hover:shadow-xs"
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-amber-50/90 border border-amber-200/60 flex items-center justify-center text-moroccan-gold group-hover:bg-moroccan-gold group-hover:text-white transition-all flex-shrink-0 shadow-2xs">
                                <IconComponent className="w-6 h-6" />
                              </div>
                              <div className="text-left min-w-0">
                                <div className="font-serif text-[16px] font-bold text-moroccan-dark group-hover:text-moroccan-terracotta tracking-wide leading-tight transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-[12px] text-stone-500 font-medium mt-0.5 tracking-normal truncate">
                                  {item.subtitle}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-moroccan-terracotta group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Us */}
            <Link
              href="/about"
              className={`text-[15.5px] font-bold transition-colors py-1 ${
                isLight
                  ? 'text-stone-800 hover:text-moroccan-terracotta'
                  : 'text-white hover:text-moroccan-gold-light drop-shadow-sm'
              }`}
            >
              About Us
            </Link>

            {/* Pages Dropdown */}
            <div
              className="relative"
              onMouseEnter={handlePagesEnter}
              onMouseLeave={handlePagesLeave}
            >
              <button
                className={`flex items-center gap-1.5 text-[15.5px] font-bold transition-colors py-1 cursor-pointer ${
                  pagesOpen
                    ? isLight
                      ? 'text-moroccan-terracotta'
                      : 'text-moroccan-gold-light'
                    : isLight
                    ? 'text-stone-800 hover:text-moroccan-terracotta'
                    : 'text-white hover:text-moroccan-gold-light drop-shadow-sm'
                }`}
                onClick={() => {
                  if (pagesTimeoutRef.current) {
                    clearTimeout(pagesTimeoutRef.current)
                    pagesTimeoutRef.current = null
                  }
                  setPagesOpen((prev) => !prev)
                }}
              >
                Pages
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] ${
                    pagesOpen
                      ? 'rotate-180 text-moroccan-terracotta'
                      : isLight
                      ? 'text-stone-500'
                      : 'text-white/80'
                  }`}
                />
              </button>

              {pagesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-fade-in"
                  onMouseEnter={handlePagesEnter}
                  onMouseLeave={handlePagesLeave}
                >
                  {/* Invisible hover bridge buffer */}
                  <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />

                  {/* Top pointer triangle */}
                  <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-b-[9px] border-b-white z-20 pointer-events-none drop-shadow-[0_-2px_4px_rgba(0,0,0,0.08)]" />

                  {/* Light Luxury Dropdown Card matching Services and Products */}
                  <div className="relative w-[340px] rounded-2xl bg-white/98 backdrop-blur-xl border border-stone-200/90 shadow-2xl overflow-hidden text-moroccan-dark">
                    <div className="h-1 bg-gradient-to-r from-moroccan-gold via-moroccan-terracotta to-moroccan-gold" />

                    <div className="bg-[#FCFAF7] p-2 divide-y divide-stone-200/70">
                      {PAGES_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setPagesOpen(false)}
                          className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 group hover:bg-white hover:shadow-xs"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-[15.5px] font-bold text-moroccan-dark group-hover:text-moroccan-terracotta tracking-wide transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-moroccan-gold/15 text-moroccan-gold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[12px] text-stone-500 font-medium mt-0.5 truncate">
                              {item.subtitle}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-moroccan-terracotta group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              className={`text-[15.5px] font-bold transition-colors py-1 ${
                isLight
                  ? 'text-stone-800 hover:text-moroccan-terracotta'
                  : 'text-white hover:text-moroccan-gold-light drop-shadow-sm'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons and CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className={`relative p-2.5 rounded-full transition-colors cursor-pointer ${
                isLight
                  ? 'text-stone-700 hover:text-moroccan-dark hover:bg-stone-200/60'
                  : 'text-white hover:text-white hover:bg-white/15'
              }`}
              title="Shopping Cart"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 bg-[#B85D36] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className={`flex items-center gap-1.5 text-sm font-bold py-1.5 px-2.5 rounded-md transition-colors cursor-pointer ${
                  isLight
                    ? 'text-stone-800 hover:text-moroccan-dark hover:bg-stone-200/60'
                    : 'text-white hover:bg-white/15 drop-shadow-sm'
                }`}
                aria-label="Select language"
              >
                <Globe className={`w-4 h-4 stroke-[2.2] ${isLight ? 'text-stone-600' : 'text-white/90'}`} />
                <span>{selectedLang}</span>
                <ChevronDown className={`w-3.5 h-3.5 stroke-[2.2] transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''} ${isLight ? 'text-stone-500' : 'text-white/80'}`} />
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-stone-200/90 py-1.5 z-50 overflow-hidden">
                  {LANGUAGES.map(({ code, name, Flag }) => (
                    <button
                      key={code}
                      onClick={() => {
                        setSelectedLang(code)
                        setLanguageOpen(false)
                      }}
                      className={`w-full flex items-center gap-2.5 text-left px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        selectedLang === code
                          ? 'font-bold text-moroccan-terracotta bg-[#FAF4ED]'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      <Flag className="w-4 h-3 shrink-0 rounded-xs shadow-2xs border border-stone-200/50" />
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-moroccan-terracotta hover:bg-moroccan-terracotta-dark text-white text-sm font-bold tracking-wide shadow-md hover:shadow-xl transition-all group"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Trigger & Cart */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openCart}
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                isLight ? 'text-stone-700 hover:bg-stone-100' : 'text-white hover:bg-white/15'
              }`}
              title="Shopping Cart"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 bg-[#B85D36] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={onRequestQuote}
              className="px-3.5 py-1.5 rounded-full bg-moroccan-terracotta text-white text-xs font-bold"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isLight
                  ? 'text-stone-700 hover:text-moroccan-dark hover:bg-stone-100'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 pt-3 pb-6 space-y-3 ${
            isLight
              ? 'border-stone-200 bg-[#FAF7F2]'
              : 'border-white/15 bg-stone-950/95 backdrop-blur-xl text-white'
          }`}
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[15px] font-bold text-moroccan-terracotta border-b border-white/10"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-[15px] font-bold border-b ${
              isLight ? 'text-stone-800 border-stone-200' : 'text-white border-white/10'
            }`}
          >
            Products
          </Link>
          {/* Mobile Products with Accordion Sub-categories */}
          <div className="py-2 border-b border-white/10">
            <div className="text-xs uppercase font-bold text-moroccan-gold mb-2">
              Product Collections
            </div>
            <div className="space-y-1">
              {PRODUCT_CATEGORIES.map((cat) => {
                const isExpanded = expandedMobileCategory === cat.id
                return (
                  <div key={cat.id} className="rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobileCategory(isExpanded ? null : cat.id)
                      }
                      className={`w-full flex items-center justify-between py-1.5 px-2 text-xs font-semibold rounded-md transition-colors ${
                        isLight
                          ? 'text-stone-800 hover:bg-stone-200/50'
                          : 'text-stone-200 hover:bg-white/10'
                      }`}
                    >
                      <span>{cat.title}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-moroccan-terracotta' : 'text-stone-400'
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-4 pr-2 py-1.5 space-y-1 bg-black/5 rounded-md my-1">
                        <Link
                          href={cat.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[11px] font-bold text-moroccan-terracotta hover:underline block py-1"
                        >
                          View all {cat.title} →
                        </Link>
                        {cat.subProducts?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-0.5 text-[11.5px] ${
                              isLight
                                ? 'text-stone-600 hover:text-moroccan-terracotta'
                                : 'text-stone-300 hover:text-white'
                            }`}
                          >
                            • {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          {/* Mobile Services */}
          <div className={`py-2 border-b ${isLight ? 'border-stone-200/40' : 'border-white/10'}`}>
            <div className={`text-[15px] font-bold mb-1.5 ${isLight ? 'text-stone-800' : 'text-stone-100'}`}>
              Services
            </div>
            <div className="pl-2 space-y-1.5">
              {SERVICES_NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 text-xs ${
                    isLight ? 'text-stone-600 hover:text-moroccan-gold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <div className="font-serif text-[13px] font-medium text-moroccan-gold-light">
                    {item.title}
                  </div>
                  <div className="text-[10.5px] text-stone-400">
                    {item.subtitle}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-[15px] font-bold border-b ${
              isLight
                ? 'text-stone-800 border-stone-200/40'
                : 'text-stone-100 border-white/10'
            }`}
          >
            About Us
          </Link>

          {/* Mobile Pages */}
          <div className={`py-2 border-b ${isLight ? 'border-stone-200/40' : 'border-white/10'}`}>
            <div className={`text-[15px] font-bold mb-1.5 ${isLight ? 'text-stone-800' : 'text-stone-100'}`}>
              Pages
            </div>
            <div className="pl-2 space-y-1.5">
              {PAGES_NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 text-xs ${
                    isLight ? 'text-stone-600 hover:text-moroccan-gold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <div className="font-serif text-[13px] font-medium text-moroccan-gold-light flex items-center gap-1.5">
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded-sm bg-moroccan-gold/20 text-moroccan-gold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10.5px] text-stone-400">
                    {item.subtitle}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-[15px] font-bold border-b ${
              isLight
                ? 'text-stone-800 border-stone-200/40'
                : 'text-stone-100 border-white/10'
            }`}
          >
            Contact
          </Link>

          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-2 pt-2">
            {LANGUAGES.map(({ code, Flag }) => (
              <button
                key={code}
                onClick={() => setSelectedLang(code)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  selectedLang === code
                    ? 'bg-moroccan-terracotta text-white border-moroccan-terracotta shadow-xs'
                    : isLight
                    ? 'bg-stone-100 text-stone-700 border-stone-200'
                    : 'bg-white/10 text-stone-200 border-white/20'
                }`}
              >
                <Flag className="w-3.5 h-2.5 rounded-xs shrink-0" />
                <span>{code}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onRequestQuote?.()
            }}
            className="w-full mt-3 flex items-center justify-center gap-2 py-3 bg-moroccan-terracotta text-white rounded-xl text-sm font-bold shadow-lg"
          >
            Request a Quote <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </header>
  )
}