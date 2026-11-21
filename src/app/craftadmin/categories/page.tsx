'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Tags,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Package,
  Layers,
  X,
  Check,
  Search,
  Globe2,
  ImagePlus,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { MediaPickerModal } from '@/components/admin/MediaPickerModal'
import { UkFlagIcon, FranceFlagIcon, MoroccoFlagIcon } from '@/components/ui/CountryFlags'
import { cn } from '@/lib/utils'

interface CraftCategoryItem {
  id: string
  slug: string
  // English
  nameEn: string
  descriptionEn: string
  // French
  nameFr: string
  descriptionFr: string
  // Arabic
  nameAr: string
  descriptionAr: string

  image: string
  artisanRegion: string
  productCount: number
}

// All 10 front-end Categories from the Products page
const INITIAL_ALL_CATEGORIES: CraftCategoryItem[] = [
  {
    id: 'rugs',
    slug: 'rugs',
    nameEn: 'Rugs and Carpets',
    descriptionEn: 'Authentic hand-knotted Beni Ourain, Azilal, Boujad, and Kilims woven on vertical wooden looms with virgin Atlas sheep wool.',
    nameFr: 'Tapis & Moquettes',
    descriptionFr: 'Tapis authentiques noués main Beni Ouarain, Azilal, Boujad et Kilims tissés sur des métiers traditionnels en pure laine vierge.',
    nameAr: 'الزرابي والسجاد المغربي',
    descriptionAr: 'زرابي بني ورين، أزيلال، بوجعد وكليم منسوجة يدوياً على الأنوال الخشبية التقليدية بصوف خراف جبال الأطلس الطبيعي.',
    image: '/images/catalog/beni_ourain_rug.jpg',
    artisanRegion: 'Middle & High Atlas Mountains',
    productCount: 16,
  },
  {
    id: 'zellige',
    slug: 'zellige',
    nameEn: 'Zellige and Architecture',
    descriptionEn: 'Chiseled glazed terracotta tiles, mosaic fountain panels, and handcrafted geometric star tables from Fes and Marrakech medinas.',
    nameFr: 'Zellige & Architecture',
    descriptionFr: 'Carreaux de terre cuite émaillés taillés à la main, panneaux de fontaines en mosaïque et tables étoilées artisanales.',
    nameAr: 'الزليج المغربي والعمارة الأندلسية',
    descriptionAr: 'قطع الزليج الفاسي المنحوتة يدوياً، النوافير الجدارية وموائد الفسيفساء الأندلسية الفاخرة للقصور والرياضات.',
    image: '/images/catalog/zellige_tiles.jpg',
    artisanRegion: 'Fes & Marrakech Architectural Guilds',
    productCount: 16,
  },
  {
    id: 'pottery',
    slug: 'pottery',
    nameEn: 'Pottery and Ceramics',
    descriptionEn: 'Hand-thrown culinary tagines, Safi hand-painted decorative glazed tableware, and ancient green Tamegroute earth kilns.',
    nameFr: 'Poterie & Céramique',
    descriptionFr: 'Tajines de cuisson culinaires, céramiques émaillées décoratives peintes de Safi et poterie verte de Tamegroute.',
    nameAr: 'الفخار والخزف التقليدي',
    descriptionAr: 'طواجن الطهي والضيافة، أواني خزف آسفي المزخرفة بالألوان التراثية، وفخار تامكروت الأخضر العتيق.',
    image: '/images/catalog/moroccan_tagine.jpg',
    artisanRegion: 'Safi & Tamegroute Cooperatives',
    productCount: 16,
  },
  {
    id: 'brass',
    slug: 'brass',
    nameEn: 'Brass and Copper',
    descriptionEn: 'Pierced filigree brass lanterns, hanging arabesque pendants, hand-hammered copper sinks, and tea trays with bespoke patinas.',
    nameFr: 'Laiton & Cuivre',
    descriptionFr: 'Lanternes ajourées en laiton ciselé, suspensions arabesques, vasques martelées main et plateaux à thé traditionnels.',
    nameAr: 'النحاسيات والتحف المعدنية',
    descriptionAr: 'فوانيس وثريات النحاس المخرم، أحواض المغاسل النحاسية المطروقة يدوياً، وصواني الشاي والقهوة المغربية الفاخرة.',
    image: '/images/catalog/engraved_brass_tray.jpg',
    artisanRegion: 'Fes Medina Metalwork Souks',
    productCount: 16,
  },
  {
    id: 'leather',
    slug: 'leather',
    nameEn: 'Leather Goods',
    descriptionEn: 'Full-grain vegetable-tanned goat and cowhide leather poufs, weekender duffel bags, and bespoke embossed upholstery.',
    nameFr: 'Maroquinerie & Cuir',
    descriptionFr: 'Poufs en cuir véritable tanné végétal, sacs polochons de voyage et sellerie marocaine sur mesure.',
    nameAr: 'المصنوعات الجلدية الأصيلة',
    descriptionAr: 'بوفات الجلد الطبيعي المدبوغ في دار الدباغ بفاس، حقائب السفر الجلدية والوسائد الجلدية المتقنة.',
    image: '/images/catalog/leather_pouf.jpg',
    artisanRegion: 'Chouara Tannery, Fes',
    productCount: 16,
  },
  {
    id: 'basketry',
    slug: 'basketry',
    nameEn: 'Basketry and Raffia',
    descriptionEn: 'Hand-woven doum palm leaf storage baskets, natural raffia pendant lamp shades, laundry hampers, and floor planters.',
    nameFr: 'Vannerie & Raphia',
    descriptionFr: 'Paniers de rangement en feuilles de palmier doum, abat-jours en raphia naturel et corbeilles de décoration écologique.',
    nameAr: 'الحصائر ومنتجات الرافيا',
    descriptionAr: 'قفاف وسلال سعف النخيل المنسوجة يدوياً، ثريات ألياف الرافيا الطبيعية ومستلزمات الديكور البيئي الراقي.',
    image: '/images/catalog/raffia_storage_basket.jpg',
    artisanRegion: 'Essaouira Coastal Cooperatives',
    productCount: 16,
  },
  {
    id: 'wood',
    slug: 'wood',
    nameEn: 'Wood Crafts and Thuya',
    descriptionEn: 'Hand-carved cedar architectural lattice screens (moucharabieh), Thuya burl jewelry boxes, and sculptural tables.',
    nameFr: 'Artisanat du Bois & Thuya',
    descriptionFr: 'Moucharabiehs et paravents sculptés en bois de cèdre, boîtes précieuses en loupe de thuya et tables d\'appoint.',
    nameAr: 'النجارة الفنية وخشب العرعار',
    descriptionAr: 'مشربيات وخشب الأرز المنقوش، تحف وعلب خشب العرعار النادر من الصويرة والأثاث التقليدي للرياضات.',
    image: '/images/catalog/carved_wood_panel.jpg',
    artisanRegion: 'Essaouira & Middle Atlas',
    productCount: 16,
  },
  {
    id: 'lighting',
    slug: 'lighting',
    nameEn: 'Lighting and Metalwork',
    descriptionEn: 'Wrought iron and pierced filigree wall sconces, Moroccan riad floor lanterns, and architectural chandelier fixtures.',
    nameFr: 'Luminaires & Ferronnerie',
    descriptionFr: 'Appliques murales en fer forgé, lanternes de sol ciselées et suspensions architecturales pour hôtels et riads.',
    nameAr: 'الإضاءة والحديد المطروق',
    descriptionAr: 'أباليك جدارية من الحديد المطروق، مصابيح وفوانيس الإضاءة الخافتة للرياض والفنادق الفاخرة.',
    image: '/images/catalog/moroccan_lantern.jpg',
    artisanRegion: 'Marrakech & Fes Ateliers',
    productCount: 16,
  },
  {
    id: 'textiles',
    slug: 'textiles',
    nameEn: 'Textiles and Throws',
    descriptionEn: 'Hand-spun wool pom-pom wedding blankets (Handira), sabra cactus silk cushion covers, and natural dyed table runners.',
    nameFr: 'Textiles & Plaids',
    descriptionFr: 'Couvertures de mariage Handira à pompons en laine, coussins en soie de cactus sabra et linge de maison artisanal.',
    nameAr: 'المنسوجات والأغطية الحرفية',
    descriptionAr: 'بطانيات الحنديرة الصوفية بالكرات، وسائد حرير الصبار (الصبرا) المصبوغة بمواد طبيعية والمنسوجات اليدوية.',
    image: '/images/catalog/moroccan_throw.jpg',
    artisanRegion: 'High Atlas Weavers Cooperatives',
    productCount: 16,
  },
  {
    id: 'clothing',
    slug: 'clothing',
    nameEn: 'Traditional Clothing',
    descriptionEn: 'Master-tailored artisanal djellabas, ceremonial caftans, linen gandouras, and hand-stitched leather babouche slippers.',
    nameFr: 'Vêtements Traditionnels',
    descriptionFr: 'Djellabas artisanales cousues main, caftans marocains de cérémonie, gandouras en lin et babouches en cuir.',
    nameAr: 'الأزياء والملابس التقليدية',
    descriptionAr: 'الجلابة المغربية بخياطة المعلم، القفطان المغربي الأصيل، والبلغة الجلدية الفاسية التقليدية.',
    image: '/images/catalog/moroccan_djellaba.jpg',
    artisanRegion: 'Fes & Northern Morocco Guilds',
    productCount: 16,
  },
]

type ModalLangTab = 'en' | 'fr' | 'ar'

export default function CraftAdminCategoriesPage() {
  const [categories, setCategories] = useState<CraftCategoryItem[]>(INITIAL_ALL_CATEGORIES)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalLang, setModalLang] = useState<ModalLangTab>('en')
  const [editingCategory, setEditingCategory] = useState<CraftCategoryItem | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState<CraftCategoryItem>({
    id: '',
    slug: '',
    nameEn: '',
    descriptionEn: '',
    nameFr: '',
    descriptionFr: '',
    nameAr: '',
    descriptionAr: '',
    image: '/images/catalog/beni_ourain_rug.jpg',
    artisanRegion: '',
    productCount: 16,
  })

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleOpenAdd = () => {
    setEditingCategory(null)
    setFormData({
      id: `cat-${Date.now()}`,
      slug: '',
      nameEn: '',
      descriptionEn: '',
      nameFr: '',
      descriptionFr: '',
      nameAr: '',
      descriptionAr: '',
      image: '/images/catalog/beni_ourain_rug.jpg',
      artisanRegion: 'Moroccan Artisans Guild',
      productCount: 0,
    })
    setModalLang('en')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (cat: CraftCategoryItem) => {
    setEditingCategory(cat)
    setFormData({ ...cat })
    setModalLang('en')
    setIsModalOpen(true)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id))
      showToast(`Category "${name}" removed.`)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nameEn.trim()) {
      alert('Please enter at least the English category name.')
      setModalLang('en')
      return
    }

    const slug =
      formData.slug.trim() ||
      formData.nameEn
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')

    const payload: CraftCategoryItem = {
      ...formData,
      slug,
      nameFr: formData.nameFr || formData.nameEn,
      nameAr: formData.nameAr || formData.nameEn,
      descriptionFr: formData.descriptionFr || formData.descriptionEn,
      descriptionAr: formData.descriptionAr || formData.descriptionEn,
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? payload : c))
      )
      showToast(`Category "${payload.nameEn}" successfully updated!`)
    } else {
      setCategories((prev) => [payload, ...prev])
      showToast(`Category "${payload.nameEn}" created!`)
    }
    setIsModalOpen(false)
  }

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const q = searchQuery.toLowerCase()
      return (
        c.nameEn.toLowerCase().includes(q) ||
        c.nameFr.toLowerCase().includes(q) ||
        c.nameAr.toLowerCase().includes(q) ||
        c.artisanRegion.toLowerCase().includes(q)
      )
    })
  }, [categories, searchQuery])

  return (
    <>
      <AdminHeader
        title="Craft Guilds & Categories"
        description="Manage all 10 front-end craft categories with full English, French, and Arabic translations"
        action={
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#B85D36] hover:bg-[#984725] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Craft Guild</span>
          </button>
        }
      />

      <div className="space-y-6 p-6 sm:p-8">
        {/* Toast */}
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 shadow-sm animate-in fade-in">
            <Check className="h-4 w-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Search & Overview Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guilds by EN, FR, AR name or region..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-xs focus:border-[#B85D36] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Total Categories: <strong className="text-slate-900">{categories.length} Front-End Guilds</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-[#B85D36] font-semibold">
              <Globe2 className="h-3.5 w-3.5" />
              Multilingual (EN / FR / AR)
            </span>
          </div>
        </div>

        {/* 10 Front-End Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all"
            >
              {/* Category Cover Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.nameEn}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                {/* Bottom Title bar on image */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-lg font-bold text-white leading-tight">
                    {cat.nameEn}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-amber-200/90 font-medium mt-1">
                    <span className="truncate">{cat.nameFr}</span>
                    <span dir="rtl" className="font-bold text-[#E8CFA0]">{cat.nameAr}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-2 pb-2 border-b border-slate-100">
                  <span className="text-[#8C6D58] font-semibold">
                    {cat.artisanRegion}
                  </span>
                  <span className="text-slate-400">{cat.productCount} products</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  {cat.descriptionEn}
                </p>

                {/* Arabic preview snippet */}
                <p dir="rtl" className="text-[11px] text-slate-500 font-medium mt-2 pt-2 border-t border-slate-100 line-clamp-1 text-right">
                  {cat.descriptionAr}
                </p>

                {/* Card Actions */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/products#${cat.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#B85D36] hover:underline"
                  >
                    <span>View in Store</span>
                    <ExternalLink size={12} />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(cat)}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <Edit2 size={13} />
                      <span>Edit Guild</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat.id, cat.nameEn)}
                      className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete category"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multilingual Category Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-[#B85D36]">
                  <Tags size={18} />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {editingCategory ? `Edit Guild: ${editingCategory.nameEn}` : 'Add New Craft Guild'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure titles & descriptions in English, French, and Arabic.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Common Info: Slug, Region & Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Artisan Guild Region
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artisanRegion}
                    onChange={(e) => setFormData((p) => ({ ...p, artisanRegion: e.target.value }))}
                    placeholder="e.g. Fes Medina Architectural Guilds"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#B85D36] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    URL Identifier (Slug)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                    placeholder="e.g. rugs, zellige, pottery"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs focus:border-[#B85D36] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Cover Photo Slot */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Guild Cover Photography
                </label>
                <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="relative h-16 w-24 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-200">
                    <Image
                      src={formData.image}
                      alt="Cover"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-slate-600 truncate">{formData.image}</p>
                    <button
                      type="button"
                      onClick={() => setPickerOpen(true)}
                      className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-[#1a130e] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B85D36] transition-colors cursor-pointer"
                    >
                      <ImagePlus size={13} />
                      <span>Change Photo from Library</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Multilingual Tabs with REAL FLAG ICONS */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Multilingual Content
                  </span>
                  <span className="text-[11px] text-slate-400">Select language tab to translate</span>
                </div>

                {/* Flag Tabs */}
                <div className="grid grid-cols-3 rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setModalLang('en')}
                    className={cn(
                      'flex items-center justify-center gap-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer',
                      modalLang === 'en'
                        ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                        : 'text-slate-600 hover:bg-slate-200/50'
                    )}
                  >
                    <UkFlagIcon className="w-5 h-3.5 rounded-xs shadow-xs shrink-0" />
                    <span>English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalLang('fr')}
                    className={cn(
                      'flex items-center justify-center gap-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer',
                      modalLang === 'fr'
                        ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                        : 'text-slate-600 hover:bg-slate-200/50'
                    )}
                  >
                    <FranceFlagIcon className="w-5 h-3.5 rounded-xs shadow-xs shrink-0" />
                    <span>Français</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalLang('ar')}
                    className={cn(
                      'flex items-center justify-center gap-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer',
                      modalLang === 'ar'
                        ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                        : 'text-slate-600 hover:bg-slate-200/50'
                    )}
                  >
                    <MoroccoFlagIcon className="w-5 h-3.5 rounded-xs shadow-xs shrink-0" />
                    <span>العربية</span>
                  </button>
                </div>

                {/* Tab 1: English */}
                {modalLang === 'en' && (
                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">
                        Category Title (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nameEn}
                        onChange={(e) => setFormData((p) => ({ ...p, nameEn: e.target.value }))}
                        placeholder="e.g. Rugs and Carpets"
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">
                        Artisan Guild Description (English)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.descriptionEn}
                        onChange={(e) => setFormData((p) => ({ ...p, descriptionEn: e.target.value }))}
                        placeholder="Traditional loom weaving, materials, virgin sheep wool..."
                        className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 2: French */}
                {modalLang === 'fr' && (
                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">
                        Nom de la Catégorie (Français)
                      </label>
                      <input
                        type="text"
                        value={formData.nameFr}
                        onChange={(e) => setFormData((p) => ({ ...p, nameFr: e.target.value }))}
                        placeholder="ex. Tapis & Moquettes"
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">
                        Description Artisanale (Français)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.descriptionFr}
                        onChange={(e) => setFormData((p) => ({ ...p, descriptionFr: e.target.value }))}
                        placeholder="Tapis faits main Beni Ouarain, tissage traditionnel sur métiers..."
                        className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 3: Arabic */}
                {modalLang === 'ar' && (
                  <div dir="rtl" className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs text-right">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">
                        اسم الحرفة / الفئة (بالعربية) *
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={formData.nameAr}
                        onChange={(e) => setFormData((p) => ({ ...p, nameAr: e.target.value }))}
                        placeholder="مثال: الزرابي والسجاد المغربي"
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden text-right"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">
                        الوصف التراثي للحرفة (بالعربية)
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={formData.descriptionAr}
                        onChange={(e) => setFormData((p) => ({ ...p, descriptionAr: e.target.value }))}
                        placeholder="زرابي بني ورين وأزيلال وبوجعد منسوجة يدوياً بصوف جبال الأطلس..."
                        className="w-full rounded-lg border border-slate-200 p-3 text-xs font-medium focus:border-[#B85D36] focus:outline-hidden text-right"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#B85D36] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#984725] transition-colors cursor-pointer"
                >
                  {editingCategory ? 'Save Changes' : 'Create Guild Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => setFormData((p) => ({ ...p, image: url }))}
        title="Choose Category Cover Photo"
      />
    </>
  )
}
