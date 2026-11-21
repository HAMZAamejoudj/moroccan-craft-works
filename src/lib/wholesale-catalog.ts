export interface WholesaleCategory {
  id: string
  slug: string
  aliases?: string[]
  title: string
  category: string
  categoryId: string
  price: number
  moq: string
  sampleMoq: string
  leadTime: string
  sampleLead: string
  desc: string
  detailedDescription: string
  image: string
  images: string[]
  badge: string
  materials: string
  dimensions: string
  origin: string
  qualityStandard: string
  discountTiers: Array<{ tier: string; volume: string; discount: string }>
  specs: Array<{ label: string; value: string }>
}

export const WHOLESALE_CATEGORIES: WholesaleCategory[] = [
  {
    id: 'rugs-carpets',
    slug: 'rugs-carpets',
    aliases: ['rugs'],
    title: 'Rugs and Carpets Master Wholesale Collection',
    category: 'Rugs and Carpets',
    categoryId: 'rugs',
    price: 180.0,
    moq: '3 pieces',
    sampleMoq: '1 piece (evaluation prototype)',
    leadTime: '3 - 4 weeks',
    sampleLead: '5 - 7 business days',
    desc: 'Hand-knotted Beni Ourain, Azilal, Boujad, Kilim, and custom-woven Atlas wool carpets sourced directly from hereditary weaver cooperatives.',
    detailedDescription: 'Hand-knotted in the High Atlas mountains using 100% natural, unbleached virgin sheep wool. Each carpet is woven on upright traditional timber looms using hand-carded and hand-spun yarn. We support custom dimensions, pile density specifications, and bespoke geometric designs for hospitality, interior architecture, and retail boutique accounts worldwide.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Wholesale & Trade',
    materials: '100% Live Atlas Virgin Sheep Wool, Natural Plant & Mineral Dyes, Cotton Warp',
    dimensions: 'Standard trade sizes (1.5x2m, 2x3m, 3x4m) or bespoke architectural CAD dimensions',
    origin: 'High Atlas & Middle Atlas Guild Cooperatives, Morocco',
    qualityStandard: 'Commercial Hospitality & Residential Grade · Knot Density: 80,000–120,000/m²',
    discountTiers: [
      { tier: 'Boutique Starter', volume: '3 - 9 pieces', discount: '25% Off Retail' },
      { tier: 'Trade & LCL', volume: '10 - 24 pieces', discount: '38% Off Retail' },
      { tier: 'Container FCL', volume: '25+ pieces', discount: 'Up to 50% Off Retail' },
    ],
    specs: [
      { label: 'Craft Category', value: 'Hand-Knotted Moroccan Wool Carpets' },
      { label: 'Fleece Grade', value: '100% Virgin High Atlas Mountain Wool' },
      { label: 'Minimum Order (MOQ)', value: '3 pieces (mix & match patterns allowed)' },
      { label: 'Evaluation Sample', value: '1 piece shipped via DHL Express (5-7 days)' },
      { label: 'Production Lead Time', value: '3 - 4 weeks depending on pile density' },
      { label: 'Custom Sizing', value: 'Bespoke dimensions up to 6m x 10m available' },
      { label: 'Export Packaging', value: 'Moisture-sealed polywrap + reinforced burlap sack' },
    ],
  },
  {
    id: 'zellige-architecture',
    slug: 'zellige-architecture',
    aliases: ['zellige'],
    title: 'Zellige & Architectural Mosaics Wholesale',
    category: 'Zellige & Architecture',
    categoryId: 'zellige',
    price: 120.0,
    moq: '10 m²',
    sampleMoq: 'Curated 8-tile sample swatch box',
    leadTime: '2 - 3 weeks',
    sampleLead: '3 - 5 business days',
    desc: 'Hand-chiseled glazed terracotta tiles, pre-assembled mesh-mounted geometric mosaics, fountains, and mosaic table tops for architectural projects.',
    detailedDescription: 'Handcrafted by master Maâlem artisans using natural gray clay refined and sun-dried in hereditary workshops. Kiln-fired with natural mineral glazes and individually chiseled with a sharp iron hammer (menqach) into bevel-edged tesserae. Pre-assembled on fiberglass mesh sheets for rapid, flawless installation across commercial and luxury residential walls, floors, pools, and facades.',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Wholesale & Trade',
    materials: 'Natural Moroccan Gray Clay, Vitrified Mineral Glaze, Epoxy/Fiberglass Mesh Backing',
    dimensions: 'Standard 10x10cm, 5x5cm, bevel 10x10cm, or custom mosaic interlocking sheets (30x30cm)',
    origin: 'Historic Guild Pottery & Tile Works, Morocco',
    qualityStandard: 'Architectural Hospitality & Wet-Area Commercial Grade · Frost & Heat Resistant',
    discountTiers: [
      { tier: 'Boutique Project', volume: '10 - 29 m²', discount: '20% Off Retail' },
      { tier: 'Commercial Pallet', volume: '30 - 99 m²', discount: '35% Off Retail' },
      { tier: 'Direct Container', volume: '100+ m²', discount: 'Up to 50% Off Retail' },
    ],
    specs: [
      { label: 'Craft Category', value: 'Authentic Chiseled Terracotta Zellige' },
      { label: 'Glaze Formulation', value: 'High-Temperature Fired Mineral Glass Glaze' },
      { label: 'Minimum Order (MOQ)', value: '10 m² (assorted colorways allowed)' },
      { label: 'Sample Box', value: '8 colorway swatches shipped within 3-5 days' },
      { label: 'Production Lead Time', value: '2 - 3 weeks per 50 m²' },
      { label: 'Backing System', value: 'Paper-faced or fiberglass mesh-mounted modules' },
      { label: 'Crating Standard', value: 'ISPM-15 heat-treated export pallets with shock foam' },
    ],
  },
  {
    id: 'brass-copper',
    slug: 'brass-copper',
    aliases: ['brass'],
    title: 'Brass and Copper Metalwork Wholesale Collection',
    category: 'Brass & Copper',
    categoryId: 'brass',
    price: 145.0,
    moq: '5 pieces',
    sampleMoq: '1 piece',
    leadTime: '2 - 3 weeks',
    sampleLead: '5 - 7 business days',
    desc: 'Pierced filigree brass lanterns, chandeliers, wall sconces, hand-hammered copper teapots, trays, and bathroom vanity hardware.',
    detailedDescription: 'Hand-hammered and pierced by second-generation guild artisans from heavy-gauge solid unlacquered brass and copper sheets. Every perforation is chiseled by hand with tempered steel punches to project intricate geometric shadow patterns. Available with living unlacquered finish, antique oxidized bronze patina, brushed satin brass, or polished high-luster gold.',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Wholesale & Trade',
    materials: 'Solid Moroccan Sheet Brass (C26000 Grade, 0.8mm–1.5mm thickness), Pure Hammered Copper',
    dimensions: 'Pendants from 30cm to 120cm diameter; custom monumental chandeliers to 2.5m',
    origin: 'Historic Metal Guilds of Marrakech, Morocco',
    qualityStandard: 'UL / CE Electrical Compliance Certified Fittings Available',
    discountTiers: [
      { tier: 'Studio Tier', volume: '5 - 14 pieces', discount: '25% Off Retail' },
      { tier: 'Hospitality Pallet', volume: '15 - 39 pieces', discount: '38% Off Retail' },
      { tier: 'Direct Factory Gate', volume: '40+ pieces', discount: 'Up to 50% Off Retail' },
    ],
    specs: [
      { label: 'Craft Category', value: 'Hand-Pierced Filigree Brass & Metalwork' },
      { label: 'Metal Composition', value: 'Solid Unlacquered Brass & Pure Red Copper' },
      { label: 'Minimum Order (MOQ)', value: '5 pieces (mix fixture styles allowed)' },
      { label: 'Evaluation Sample', value: '1 piece shipped via DHL Express (5-7 days)' },
      { label: 'Electrical Wiring', value: 'CE (Europe) / UL (North America) certified sockets' },
      { label: 'Finish Options', value: 'Raw Unlacquered, Antique Bronze, Satin, Matte Black' },
      { label: 'Crating Standard', value: 'Custom plywood crates with molded micro-foam cradles' },
    ],
  },
  {
    id: 'pottery-ceramics',
    slug: 'pottery-ceramics',
    aliases: ['pottery'],
    title: 'Pottery and Ceramics Master Wholesale',
    category: 'Pottery & Ceramics',
    categoryId: 'pottery',
    price: 65.0,
    moq: '15 pieces',
    sampleMoq: '2 sample units',
    leadTime: '2 - 3 weeks',
    sampleLead: '5 - 7 business days',
    desc: 'Glazed terracotta tagines, dinnerware sets, serving platters, decorative urns, and commercial hospitality tableware.',
    detailedDescription: 'Hand-thrown on manual kick-wheels and twice-fired in traditional wood and gas kilns. Hand-painted with hereditary geometric patterns and vibrant mineral glazes. Formulated with 100% lead-free, food-safe glazes compliant with FDA and European Regulation (EC) No 1935/2004 for commercial restaurant and hotel food service.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Wholesale & Trade',
    materials: 'Natural Moroccan Terracotta Clay, 100% Food-Safe Lead-Free Vitrified Glazes',
    dimensions: 'Plates 20–35cm, Tagines 20–40cm, Bowls 12–28cm, Urns up to 90cm height',
    origin: 'Traditional Artisan Guild Kilns, Morocco',
    qualityStandard: 'FDA & EU Food-Contact Certified · Dishwasher Safe Hospitality Formulation',
    discountTiers: [
      { tier: 'Cafe / Retail Test', volume: '15 - 49 pieces', discount: '25% Off Retail' },
      { tier: 'Restaurant Set', volume: '50 - 149 pieces', discount: '38% Off Retail' },
      { tier: 'Hotel Chain / FCL', volume: '150+ pieces', discount: 'Up to 50% Off Retail' },
    ],
    specs: [
      { label: 'Craft Category', value: 'Hand-Thrown Glazed Terracotta Tableware' },
      { label: 'Food Contact Safety', value: '100% Certified Lead & Cadmium Free' },
      { label: 'Minimum Order (MOQ)', value: '15 pieces (mix dinnerware sets allowed)' },
      { label: 'Evaluation Sample', value: '2 sample pieces via air courier within 5 days' },
      { label: 'Thermal Resistance', value: 'Oven-safe up to 230°C for cooking tagines' },
      { label: 'Custom Glazes', value: 'Pantone color-matching for restaurant branding' },
      { label: 'Packaging', value: 'Cellular dividers, bubble cushioning, double-wall export carton' },
    ],
  },
  {
    id: 'leather-goods',
    slug: 'leather-goods',
    aliases: ['leather'],
    title: 'Moroccan Leather Goods & Poufs Wholesale',
    category: 'Leather Goods',
    categoryId: 'leather',
    price: 85.0,
    moq: '10 pieces',
    sampleMoq: '1 piece',
    leadTime: '2 weeks',
    sampleLead: '5 - 7 business days',
    desc: 'Vegetable-tanned leather poufs, ottomans, cushions, traditional babouche slippers, and bespoke hospitality leather goods.',
    detailedDescription: 'Tanned using natural vegetable tannins (mimosa bark and cedar oils) without harsh chrome chemicals. Hand-stitched with heavy-duty bonded thread and edge-burnished with natural beeswax. Available unfilled (flat-packed for economical air and ocean shipping) or pre-stuffed with recycled cotton batting for turnkey retail distribution.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Wholesale & Trade',
    materials: '100% Full-Grain Vegetable-Tanned Moroccan Cowhide and Goat Leather',
    dimensions: 'Standard poufs 53cm dia x 35cm h; custom square and cylindrical ottomans',
    origin: 'Marrakech Historic Guild Tanneries, Morocco',
    qualityStandard: 'Luxury Retail & Commercial Hospitality Grade · Heavy-Duty YKK Brass Zippers',
    discountTiers: [
      { tier: 'Boutique Starter', volume: '10 - 29 pieces', discount: '25% Off Retail' },
      { tier: 'Commercial Trade', volume: '30 - 99 pieces', discount: '38% Off Retail' },
      { tier: 'Container Volume', volume: '100+ pieces', discount: 'Up to 50% Off Retail' },
    ],
    specs: [
      { label: 'Craft Category', value: 'Vegetable-Tanned Moroccan Leathercraft' },
      { label: 'Tannage Type', value: '100% Chrome-Free Plant & Bark Vegetable Tanning' },
      { label: 'Minimum Order (MOQ)', value: '10 units (assorted colors allowed)' },
      { label: 'Evaluation Sample', value: '1 piece shipped via DHL Express (5-7 days)' },
      { label: 'Filling Options', value: 'Unfilled (flat-packed) or stuffed with recycled cotton' },
      { label: 'Custom Branding', value: 'Blind heat debossing or gold foil stamping available' },
      { label: 'Packaging', value: 'Individual polybag, export carton (15 flat poufs/box)' },
    ],
  },
  {
    id: 'lighting-wrought-iron',
    slug: 'lighting-wrought-iron',
    aliases: ['lighting'],
    title: 'Lighting and Wrought Iron Wholesale Collection',
    category: 'Lighting & Metalwork',
    categoryId: 'lighting',
    price: 195.0,
    moq: '5 pieces',
    sampleMoq: '1 piece',
    leadTime: '3 - 4 weeks',
    sampleLead: '5 - 7 business days',
    desc: 'Wrought iron mirrors, filigree chandeliers, architectural wall sconces, forged patio furniture, and commercial lighting installations.',
    detailedDescription: 'Hand-forged over coal fires using solid wrought iron and chiseled brass fittings. Finished with protective anti-rust coatings and matte baked patinas suitable for humid coastal resorts, luxury patios, and interior lighting projects. Pre-wired with UL/CE certified hardware ready for commercial installation.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Wholesale & Trade',
    materials: 'Forged Solid Wrought Iron, Pierced Sheet Brass, CE/UL Certified Fixtures',
    dimensions: 'Wall sconces 30–60cm, pendant chandeliers 40–120cm, forged mirrors up to 2m',
    origin: 'Marrakech Metalworking & Iron Forging Guilds, Morocco',
    qualityStandard: 'UL Listed / CE Certified Components · Weather-Resistant Powder Coat',
    discountTiers: [
      { tier: 'Studio Tier', volume: '5 - 14 pieces', discount: '25% Off Retail' },
      { tier: 'Hospitality Pallet', volume: '15 - 39 pieces', discount: '38% Off Retail' },
      { tier: 'Direct Container', volume: '40+ pieces', discount: 'Up to 50% Off Retail' },
    ],
    specs: [
      { label: 'Craft Category', value: 'Hand-Forged Wrought Iron & Filigree Lighting' },
      { label: 'Anti-Corrosion', value: 'Zinc phosphate primer + high-durability baked enamel' },
      { label: 'Minimum Order (MOQ)', value: '5 pieces (mix fixtures allowed)' },
      { label: 'Evaluation Sample', value: '1 piece shipped via DHL Express (5-7 days)' },
      { label: 'Production Lead Time', value: '3 - 4 weeks for commercial orders' },
      { label: 'Custom CAD Metalwork', value: 'Bespoke chandeliers and iron gates made to architectural plan' },
      { label: 'Packaging', value: 'Custom-built wooden crates with rigid foam cushioning' },
    ],
  },
]

export function getWholesaleBySlug(slug: string): WholesaleCategory | undefined {
  const normalized = (slug || '').toLowerCase().trim()
  return WHOLESALE_CATEGORIES.find((cat) => {
    const pSlug = cat.slug.toLowerCase().trim()
    const pId = cat.id.toLowerCase().trim()
    const matchesAlias = cat.aliases?.some((a) => a.toLowerCase().trim() === normalized)
    return pSlug === normalized || pId === normalized || matchesAlias
  })
}

export function getRelatedWholesale(currentSlug: string, limit: number = 3): WholesaleCategory[] {
  const current = getWholesaleBySlug(currentSlug)
  return WHOLESALE_CATEGORIES.filter((c) => c.slug !== current?.slug && c.id !== current?.id).slice(0, limit)
}
