export interface BrandingOption {
  title: string
  desc: string
  badge: string
  icon: 'stamp' | 'award' | 'palette' | 'layers' | 'zap' | 'package' | 'wrench' | 'check' | 'compass'
}

export interface TechnicalHighlight {
  title: string
  desc: string
  icon: 'hammer' | 'shield' | 'layers' | 'zap' | 'droplets' | 'leaf' | 'flame' | 'palette' | 'compass' | 'tree' | 'wind' | 'lock' | 'award'
}

export interface PrivateLabelProduct {
  id: string
  slug: string
  title: string
  category: string
  categoryId: string
  price: number
  tagline: string
  desc: string
  detailedDescription: string
  image: string
  images: string[]
  badge: string
  sampleMoq: string
  productionMoq: string
  sampleLead: string
  prodLead: string
  toolingMethod: string
  brandingOptions: BrandingOption[]
  compatibleProducts: string[]
  materials: string
  dimensions: string
  origin: string
  qualityStandard: string
  specs: Array<{ label: string; value: string }>
  workflow: Array<{ step: string; title: string; desc: string }>
  technicalHighlights: TechnicalHighlight[]
}

export const PRIVATE_LABEL_PRODUCTS: PrivateLabelProduct[] = [
  {
    id: 'pl-custom-leather-debossing',
    slug: 'custom-leather-debossing',
    title: 'Custom Leather Debossing & Foil Stamping',
    category: 'Leather Goods & Poufs',
    categoryId: 'leather',
    price: 165.0,
    tagline: 'Precision CNC brass heat-embossing dies, blind debossing, and metallic foil branding on vegetable-tanned Moroccan leather.',
    desc: 'Launch or elevate your bespoke leather goods line with custom branded hardware, heat-debossed signature logos, and fine foil accents. We manufacture custom CNC brass dies that impart crisp, permanent impressions onto authentic full-grain cowhide and goat leather.',
    detailedDescription: 'Crafted exclusively in the historic guild tanneries of Marrakech, our private label leather atelier produces retail-ready and hospitality-grade leather collections. Using custom-machined heat-embossing brass dies, your logo, monogram, or bespoke geometric pattern is permanently pressed into vegetable-tanned full-grain leather. Options include tactile blind debossing, matte metallic gold foil, burnished antique bronze, or sterling silver foil stamping. Every item is hand-stitched with reinforced nylon or waxed linen thread, edge-burnished with natural beeswax, and finished with your proprietary branded tags and retail packaging.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'OEM & Private Label',
    sampleMoq: '1 Piece (Full Prototype Approval)',
    productionMoq: '10 Pieces (Per SKU)',
    sampleLead: '5 - 7 Business Days',
    prodLead: '2 - 3 Weeks',
    toolingMethod: 'Reusable High-Precision CNC Milled Solid Brass Heating Die',
    brandingOptions: [
      {
        title: 'Deep Blind Heat Debossing',
        desc: 'Heat-pressed impression without foil for subtle, understated tactile luxury that patinas naturally.',
        badge: 'Tactile Press',
        icon: 'stamp',
      },
      {
        title: 'Matte Gold Metallic Foil Stamping',
        desc: 'Heated foil bonding that resists flaking and creates a brilliant regal finish on darker hides.',
        badge: 'Metallic Foil',
        icon: 'palette',
      },
      {
        title: 'Antique Bronze & Silver Foil',
        desc: 'Muted metallic foils tailored for heritage, vintage, or contemporary hospitality aesthetics.',
        badge: 'Color Foil',
        icon: 'palette',
      },
      {
        title: 'Inset Riveted Brass Logo Plaques',
        desc: 'Solid cast brass plaques anchored to leather with heavy-duty back plates and flush rivets.',
        badge: 'Brass Hardware',
        icon: 'award',
      },
      {
        title: 'Custom Printed Woven Linings',
        desc: 'Jacquard woven damask or organic cotton interior lining carrying your brand pattern.',
        badge: 'Interior Linings',
        icon: 'layers',
      },
      {
        title: 'Bespoke Barcode & Retail Packaging',
        desc: 'Drop-tested branded gift boxes, velvet dust bags, and retail swing tags ready for store shelves.',
        badge: 'Retail Ready',
        icon: 'package',
      },
    ],
    compatibleProducts: [
      'Stuffed & Unstuffed Leather Poufs',
      'Luxury Hotel Guestroom Menu Binders',
      'Desk Accessories & Blotters',
      'Handmade Babouche Slippers',
      'Travel Duffle Bags & Weekend Totes',
      'Coaster Sets & Valet Trays',
    ],
    materials: '100% Vegetable-Tanned Moroccan Cowhide & Goat Leather, Solid Brass Hardware',
    dimensions: 'Custom dimensions according to your CAD tech pack or standard collection sizes',
    origin: 'Marrakech Historic Guild Tanneries, Morocco',
    qualityStandard: 'Luxury Retail & 5-Star Commercial Hospitality Grade',
    specs: [
      { label: 'Craft Category', value: 'Fine Moroccan Leatherwork & Tannery Goods' },
      { label: 'Branding Discipline', value: 'Heat Debossing, Hot Foil Stamping & Brass Plaques' },
      { label: 'Tooling Fabrication', value: 'Custom CNC Solid Brass Die (Client-Owned)' },
      { label: 'Pre-Production Sample', value: '5 - 7 business days via DHL Express' },
      { label: 'Production MOQ', value: '10 units per style (low barrier testing)' },
      { label: 'Batch Turnaround', value: '2 - 3 weeks for full batch crating' },
      { label: 'Material Provenance', value: '100% Natural vegetable-tanned Moroccan leather' },
      { label: 'NDA Protection', value: 'Strict Mutual Non-Disclosure Agreement Guaranteed' },
    ],
    workflow: [
      { step: '01', title: 'Tech Pack & Vector Submission', desc: 'Send your logo in vector format (AI, EPS, PDF) along with placement, dimension, and foil preference.' },
      { step: '02', title: 'Solid Brass Die Tooling', desc: 'Our machinists mill a custom solid brass stamp calibrated to temperature and leather thickness.' },
      { step: '03', title: 'Express DHL Sample Dispatch', desc: 'A physical sample is pressed and air-freighted to your desk in 5-7 days for tactile verification.' },
      { step: '04', title: 'Guild Batch Fabrication', desc: 'Upon sign-off, our master leatherworkers assemble your batch with dual milestone video updates.' },
    ],
    technicalHighlights: [
      {
        title: 'Reusable Tooling Vault',
        desc: 'Your custom brass die remains in our climate-controlled vault for zero-tooling cost reorders.',
        icon: 'layers',
      },
      {
        title: 'Vegetable Tanning Heritage',
        desc: 'Tanned using natural bark and mimosa extracts, creating an organic leather that patinas beautifully with age.',
        icon: 'leaf',
      },
      {
        title: 'Hand-Waxed Edge Burnishing',
        desc: 'Edges are hand-burnished with natural beeswax to prevent fraying and resist moisture in commercial hospitality use.',
        icon: 'shield',
      },
    ],
  },
  {
    id: 'pl-cast-laser-brass-plates',
    slug: 'cast-laser-brass-plates',
    title: 'Cast & Laser-Engraved Brass Logo Plates',
    category: 'Lighting, Mirrors & Hardware',
    categoryId: 'brass',
    price: 220.0,
    tagline: 'Discrete engraved or sand-cast solid unlacquered brass brand plaques riveted or flush-inset onto artisanal lighting and mirrors.',
    desc: 'Brand your architectural lighting, wall sconces, hand-carved mirrors, and hardware collections with prestigious brass hallmarks. We offer precision micro-laser engraving and traditional sand-cast brass badges that meld seamlessly with hand-chiseled Moroccan metalwork.',
    detailedDescription: 'Handcrafted by master copper and brass smiths in Marrakech Medina, our private label metalwork program delivers museum-grade lighting fixtures and decorative hardware. Each luminaire is hand-pierced with thousands of micro-perforations using traditional chisels. Your brand is permanently identified using either diamond-cut laser engraving directly onto the metal chassis, or via a solid unlacquered brass hallmark plaque mounted with flush brass rivets. We wire all lighting fixtures to UL-listed (US/Canada 110V) or CE-certified (Europe/UK 220V) standards, complete with heavy-duty mounting hardware and customized packaging.',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'OEM & Private Label',
    sampleMoq: '1 Piece (Full Prototype Approval)',
    productionMoq: '5 Pieces (Fixtures / Lighting)',
    sampleLead: '7 - 10 Business Days',
    prodLead: '3 - 4 Weeks',
    toolingMethod: 'Sand-Cast Foundry Bronze or Micro-Laser Engraved Solid Brass Plate',
    brandingOptions: [
      {
        title: 'Micro-Laser Serialized Hallmarks',
        desc: 'High-precision direct engraving of client crest, serial number, and logo directly onto the metal chassis.',
        badge: 'Direct Engrave',
        icon: 'stamp',
      },
      {
        title: 'Sand-Cast Solid Brass Raised Badges',
        desc: '3D raised relief metal foundry emblem with hand-polished highlights and brushed antique background.',
        badge: 'Cast Metal',
        icon: 'award',
      },
      {
        title: 'Flush Hand-Riveted Identity Plaques',
        desc: 'Brass plaques set flush into the fixture chassis and anchored with solid unlacquered brass rivets.',
        badge: 'Flush Mount',
        icon: 'wrench',
      },
      {
        title: 'Custom Antique Chemical Patinas',
        desc: 'Formulated living finishes: unlacquered raw brass, oil-rubbed bronze, satin gold, or matte black.',
        badge: 'Bespoke Finish',
        icon: 'palette',
      },
      {
        title: 'UL / CE Certified Junction Labels',
        desc: 'Regulatory commercial compliance tags printed with your brand identity and electrical ratings.',
        badge: 'Certified',
        icon: 'zap',
      },
      {
        title: 'Reinforced Wooden Crate Packaging',
        desc: 'Custom foam cradles inside ISPM-15 heat-treated plywood export crates with your branded exterior stencils.',
        badge: 'Export Crates',
        icon: 'package',
      },
    ],
    compatibleProducts: [
      'Pierced Brass Pendant Chandeliers',
      'Architectural Wall Sconces & Flush Mounts',
      'Hand-Chiseled Arch Vanity Mirrors',
      'Custom Solid Brass Faucets & Spouts',
      'Heavy Commercial Door Pulls & Hardware',
      'Decorative Brass Serving Trays',
    ],
    materials: 'Solid Unrefined Heavy-Gauge Brass, Solid Bronze, Certified Electrical Components',
    dimensions: 'Custom architectural heights and diameters up to 2.5 meters',
    origin: 'Marrakech Historic Copper Guilds, Morocco',
    qualityStandard: 'UL / CE Electrical Compliance · 100% Rust-Resistant Solid Brass',
    specs: [
      { label: 'Craft Category', value: 'Chiseled Brassware, Lighting & Hardware' },
      { label: 'Branding Discipline', value: 'Cast Brass Plaques & Laser-Etched Hallmarks' },
      { label: 'Electrical Wiring', value: 'UL-Listed (US) / CE (EU) Compliant Assemblies' },
      { label: 'Pre-Production Sample', value: '7 - 10 business days with video testing' },
      { label: 'Production MOQ', value: '5 pieces per lighting design' },
      { label: 'Finish Formulations', value: 'Raw Unlacquered, Antique Bronze, Matte Black, Satin Gold' },
      { label: 'Export Crating', value: 'ISPM-15 Certified Heat-Treated Plywood Crates' },
      { label: 'Contract Warranty', value: '5-Year Structural Artisan Guarantee' },
    ],
    workflow: [
      { step: '01', title: 'CAD & Lumen Specifications', desc: 'Share your architectural fixture elevations, canopy requirements, and electrical voltage targets.' },
      { step: '02', title: 'Plaque Casting or Laser Calibration', desc: 'We fabricate the branded brass badges and test-fit them onto the prototype chassis.' },
      { step: '03', title: 'Photometric & Wiring Test', desc: 'The finished prototype is electrically wired, illuminated, and documented for client approval.' },
      { step: '04', title: 'Guild Fabrication & Crating', desc: 'Master artisans hand-pierce your batch before individually shock-proofing each luminaire.' },
    ],
    technicalHighlights: [
      {
        title: 'Solid Unlacquered Brass',
        desc: 'We use genuine solid brass sheets (not electroplated steel) that develop a rich living patina over time.',
        icon: 'hammer',
      },
      {
        title: 'Electrical Certification',
        desc: 'Sockets, cords, and ground wires conform to North American (UL) and European (CE) regulatory building codes.',
        icon: 'zap',
      },
      {
        title: 'Anti-Tarnish Sealants',
        desc: 'Optional micro-crystalline wax sealants preserve high-luster satin finishes in humid bath or coastal environments.',
        icon: 'droplets',
      },
    ],
  },
  {
    id: 'pl-woven-damask-linen-labels',
    slug: 'woven-damask-linen-labels',
    title: 'Custom Woven Damask & Linen Labels',
    category: 'Rugs, Blankets & Textiles',
    categoryId: 'rugs',
    price: 290.0,
    tagline: 'High-density woven damask back-labels, metallic thread badges, and organic linen tags hand-stitched by Atlas Berber weavers.',
    desc: 'Infuse your rug and home textile collections with authentic private label pedigree. We produce high-resolution jacquard woven brand labels, serial number identifiers, and unbleached cotton care tags stitched directly onto custom hand-knotted Beni Ourain rugs and pom-pom blankets.',
    detailedDescription: 'Hand-knotted in the remote villages of the Middle and High Atlas Mountains by indigenous Berber women artisans, our private label textile program celebrates ancestral weaving heritage. We integrate your brand through custom woven damask back-corner labels, metallic lurex embroidery, or rustic stone-washed linen tags hand-sewn onto the fringe edge. From pile density (number of knots per square meter) to bespoke Pantone-matched yarn dyeing, we translate your textile design boards into heirloom statement carpets and hospitality-grade throws.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'OEM & Private Label',
    sampleMoq: '1 Piece (Full Prototype Approval)',
    productionMoq: '3 Pieces (Rugs) · 10 Pieces (Blankets / Cushions)',
    sampleLead: '10 - 14 Business Days',
    prodLead: '3 - 4 Weeks',
    toolingMethod: 'Custom High-Density Jacquard Damask Loom Weave & Stitched Corner Patches',
    brandingOptions: [
      {
        title: 'Jacquard Damask Woven Badges',
        desc: 'High-thread-count back corner labels with crisp logo & typography weave stitched to backing.',
        badge: 'Woven Damask',
        icon: 'layers',
      },
      {
        title: 'Raw Linen Stamped Tags with Wax Seals',
        desc: 'Unbleached stone-washed linen tags hand-stamped with natural mineral ink and wax emblem.',
        badge: 'Organic Linen',
        icon: 'stamp',
      },
      {
        title: 'Border-Integrated Monograms',
        desc: 'Client signature motifs and geometric crests hand-knotted directly into the carpet edge fringe.',
        badge: 'Hand-Knotted',
        icon: 'layers',
      },
      {
        title: 'Solid Brass Corner Medallions',
        desc: 'Stamped brass hallmarks riveted into the underside corner webbing for collector certification.',
        badge: 'Solid Brass',
        icon: 'award',
      },
      {
        title: 'Fiber Composition & Care Booklets',
        desc: 'Bespoke provenance cards detailing Atlas mountain tribe origin, wool density, and care instructions.',
        badge: 'Care Guide',
        icon: 'palette',
      },
      {
        title: 'Heavy Moisture-Barrier Roll Crating',
        desc: 'Multi-ply breathable wrapping with reinforced cardboard tube cores for ocean and air freight.',
        badge: 'Export Roll',
        icon: 'package',
      },
    ],
    compatibleProducts: [
      'Plush Virgin Wool Beni Ourain Rugs',
      'Expressive Colorful Azilal & Boujad Carpets',
      'Flat-Woven Geometric Kilims',
      'Traditional Hand-Spun Pom-Pom Cotton Blankets',
      'Embroidered Cactus Silk (Sabra) Floor Cushions',
      'Artisanal Wool Bed Runners & Throws',
    ],
    materials: '100% Unbleached Virgin Atlas Sheep Wool, Natural Vegetable Plant Dyes, Organic Cotton',
    dimensions: 'Custom dimensions up to 6 x 10 meters, circular, runner, or freeform shapes',
    origin: 'Middle & High Atlas Mountain Weaving Guilds, Morocco',
    qualityStandard: 'Hand-Knotted Double-Knot Weave · Zero Chemical Bleaches or Synthetics',
    specs: [
      { label: 'Craft Category', value: 'Hand-Knotted Moroccan Rugs & Woven Textiles' },
      { label: 'Branding Discipline', value: 'Damask Woven Corner Badges & Embroidered Tags' },
      { label: 'Wool Source', value: '100% Natural virgin live-shorn Atlas Mountain sheep wool' },
      { label: 'Pre-Production Sample', value: '10 - 14 days (Swatch or 1x1m Mini Rug)' },
      { label: 'Production MOQ', value: '3 pieces for carpets · 10 pieces for throws' },
      { label: 'Loom Capabilities', value: 'Vertical wood looms up to 6m wide seamless' },
      { label: 'Washing Process', value: '4x Mountain stream wash and open-air sun cure' },
      { label: 'Fair Trade Ethics', value: 'Direct guild compensation supporting female artisan families' },
    ],
    workflow: [
      { step: '01', title: 'Pattern & Knot Density Sizing', desc: 'Provide your graphic pattern, pile height target (high plush vs. low flat-weave), and dimensions.' },
      { step: '02', title: 'Yarn Dyeing & Loom Setup', desc: 'Raw virgin wool is spun by hand and dyed using botanicals (madder root, indigo, pomegranate peel).' },
      { step: '03', title: 'Weaving & Label Integration', desc: 'Master weavers knot the rug row-by-row on vertical looms and hand-stitch your branded label.' },
      { step: '04', title: 'Washing, Sun-Curing & Dispatch', desc: 'Each rug is sun-dried, brushed, rolled in moisture-barrier wrap, and dispatched globally.' },
    ],
    technicalHighlights: [
      {
        title: 'Live-Shorn Virgin Wool',
        desc: 'High lanolin content ensures natural stain resistance and unmatched softness underfoot.',
        icon: 'layers',
      },
      {
        title: 'True Berber Double Knot',
        desc: 'Knotted over double warps to ensure 50+ year structural durability in high-traffic commercial spaces.',
        icon: 'shield',
      },
      {
        title: 'Custom Color Matching',
        desc: 'We match custom interior color palettes using non-toxic natural plant and low-impact mineral dyes.',
        icon: 'palette',
      },
    ],
  },
  {
    id: 'pl-proprietary-glaze-ceramics',
    slug: 'proprietary-glaze-ceramics',
    title: 'Proprietary Glaze Colors & Ceramic Stamps',
    category: 'Pottery, Ceramics & Tableware',
    categoryId: 'pottery',
    price: 125.0,
    tagline: 'Custom Pantone mineral glazes, underglaze fired bottom stamps, and bespoke rim geometries for luxury hospitality tableware.',
    desc: 'Create an exclusive ceramic tableware or decorative pottery line formulated exclusively for your brand. We formulate proprietary food-safe glazes, cast custom clay silhouettes, and permanently fire your logo into the underside of each piece.',
    detailedDescription: 'From the earthy manganese green kilns of Tamegroute to the intricate cobalt blue ateliers of Marrakech and the coastal potteries of Safi, our private label pottery atelier creates bespoke ceramic collections. Master potters throw each piece on manual foot wheels using natural riverbed clay. We can formulate exclusive glaze colors matched to your brand’s Pantone specifications, including semi-matte, high-gloss crackle, and unglazed tactile terracotta finishes. Every piece can feature your permanent fired underglaze maker’s mark, ensuring durable brand prestige through years of commercial restaurant dishwashing.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'OEM & Private Label',
    sampleMoq: '1 Set (Evaluation Prototype)',
    productionMoq: '15 Pieces (Per Ceramic Model)',
    sampleLead: '7 - 10 Business Days',
    prodLead: '2 - 3 Weeks',
    toolingMethod: 'Hand-Carved Clay Impression Stamp & Custom Mineral Oxide Formulation',
    brandingOptions: [
      {
        title: 'Permanent Fired Underglaze Foot Stamp',
        desc: 'Indelible maker mark fired under clear glaze on the plate foot or vessel base that never wears off.',
        badge: 'Underglaze Stamp',
        icon: 'stamp',
      },
      {
        title: 'Pantone-Matched Proprietary Glazes',
        desc: 'Custom mineral oxide glaze recipes formulated exclusively for your brand or restaurant concept.',
        badge: 'Custom Glaze',
        icon: 'palette',
      },
      {
        title: '24k Gold & Silver Rim Lustre',
        desc: 'Precious liquid metal applied by hand-brush and fired in a specialized third kiln cycle.',
        badge: 'Precious Lustre',
        icon: 'award',
      },
      {
        title: 'Hand-Painted Client Heraldry',
        desc: 'Master Moroccan ceramicists hand-paint family crests, hotel monograms, and custom geometric borders.',
        badge: 'Hand-Painted',
        icon: 'palette',
      },
      {
        title: 'Drop-Tested Molded Pulp Packaging',
        desc: 'Custom-contoured shock-absorbing cradles engineered for zero transit breakage in courier delivery.',
        badge: 'Drop-Tested',
        icon: 'package',
      },
      {
        title: 'Commercial Food-Safety Compliance Tags',
        desc: 'Official lead-free and commercial dishwasher safe certification backstamps conforming to FDA/EU law.',
        badge: 'FDA / EU Safe',
        icon: 'layers',
      },
    ],
    compatibleProducts: [
      'Signature Restaurant Dinner Plates & Pasta Bowls',
      'Traditional Functional Cooking & Serving Tagines',
      'Large Centerpiece Decorative Urns & Vases',
      'Glazed Tamegroute Architectural Candlesticks',
      'Tapas Dish Sets & Mezze Bowls',
      'Custom Espresso & Tea Ceramic Cups',
    ],
    materials: '100% Natural Moroccan Grey & Red Terracotta Clay, Food-Safe Mineral Glazes',
    dimensions: 'Custom diameter, depth, and volume specifications',
    origin: 'Safi Coastal Kilns & Marrakech Historic Pottery Guilds, Morocco',
    qualityStandard: 'FDA & EU Food-Contact Safe · Heavy-Duty Commercial Dishwasher Safe',
    specs: [
      { label: 'Craft Category', value: 'Artisan Wheel-Thrown & Cast Moroccan Ceramics' },
      { label: 'Branding Discipline', value: 'Underglaze Ceramic Backstamps & Custom Glazes' },
      { label: 'Food Safety', value: 'Certified Lead-Free & Cadmium-Free Glazes' },
      { label: 'Pre-Production Sample', value: '7 - 10 business days with fired color swatches' },
      { label: 'Production MOQ', value: '15 pieces per model' },
      { label: 'Kiln Firing', value: 'Double-fired at 1,050°C for thermal shock resistance' },
      { label: 'Packaging', value: 'Individual molded pulp cradles inside master export cartons' },
      { label: 'Dishwasher Durability', value: 'Tested for 500+ commercial dishwashing cycles' },
    ],
    workflow: [
      { step: '01', title: 'Silhouette & Glaze Profile', desc: 'Submit dimensions, rim profiles, and reference glaze swatches or Pantone color codes.' },
      { step: '02', title: 'Clay Formulation & Maker Stamp', desc: 'Our ceramicists carve your steel backstamp and blend proprietary mineral oxide glaze baths.' },
      { step: '03', title: 'First-Fire Sample Dispatch', desc: 'Prototypes undergo bisque firing, glazing, and high-temp gloss firing before DHL dispatch.' },
      { step: '04', title: 'Batch Wheel-Throwing & QA', desc: 'Guild master potters wheel-throw your run, stamping each base before final kiln firing.' },
    ],
    technicalHighlights: [
      {
        title: 'Certified Food-Safe Compliance',
        desc: 'All tableware glazes are independently tested and certified free of lead, cadmium, and toxic fluxes.',
        icon: 'shield',
      },
      {
        title: 'Thermal Shock Resistance',
        desc: 'Our specialized clay blends resist cracking under rapid temperature transitions from high heat to table.',
        icon: 'flame',
      },
      {
        title: 'Artisan Wheel-Thrown Character',
        desc: 'Subtle hand-thrown wheel grooves and glaze pooling give each dining table an authentic handmade soul.',
        icon: 'award',
      },
    ],
  },
  {
    id: 'pl-architectural-zellige-modules',
    slug: 'architectural-zellige-modules',
    title: 'Architectural Zellige Patterns & Modules',
    category: 'Zellige Tiles & Mosaics',
    categoryId: 'zellige',
    price: 340.0,
    tagline: 'Translating architectural CAD drawings into pre-assembled mesh-mounted zellige mosaic panels and bespoke furniture.',
    desc: 'Empower your architectural projects and surface brand collections with authentic hand-chiseled Moroccan zellige. We translate your CAD blueprints into pre-assembled fiberglass mesh sheets, bespoke dining tables, and modular wall installations.',
    detailedDescription: 'Handmade in the sacred clay pits of Morocco using 10th-century techniques, our private label zellige workshop delivers turnkey architectural solutions for luxury hotels, interior designers, and high-end tile brands. Every tile is hand-formed, enameled, fired in olive-pit fueled kilns, and meticulously hand-beveled with a sharp iron chisel (menqash) by master maâlems. We assemble complex geometric mosaic compositions upside-down on resin templates, backing them with marine-grade fiberglass mesh for swift, seamless job-site installation anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'OEM & Private Label',
    sampleMoq: '1 Mesh Sample Sheet (30x30 cm)',
    productionMoq: '10 m² (Sheets) · 1 Piece (Custom Table / Fountain)',
    sampleLead: '7 - 10 Business Days',
    prodLead: '2 - 3 Weeks',
    toolingMethod: 'CAD Waterjet / Master Hand-Chiseled Menqash Tesserae Assembled on Mesh',
    brandingOptions: [
      {
        title: 'Custom CAD Geometric Tile Formats',
        desc: 'Your architectural vector files translated into precise hand-cut tile shapes and bespoke borders.',
        badge: 'CAD Geometry',
        icon: 'compass',
      },
      {
        title: 'Pre-Assembled Mesh-Mounted Sheets',
        desc: 'Interlocking 30x30cm fiberglass mesh panels for 10x faster and flawless job-site installation.',
        badge: 'Mesh-Mounted',
        icon: 'layers',
      },
      {
        title: 'Numbered Modular Placement Plans',
        desc: 'Architectural installation blueprints with numbered sheets and grout line specifications for tile setters.',
        badge: 'Numbered Plans',
        icon: 'stamp',
      },
      {
        title: 'Custom Color Blend Ratios (Ombré)',
        desc: 'Curated percentage formulas of complementary enamel tones for natural movement across large walls.',
        badge: 'Custom Blend',
        icon: 'palette',
      },
      {
        title: 'Pre-Mitred Bullnose & Corner Trims',
        desc: 'Factory-beveled perimeter edge modules for clean architectural corners without exposed raw clay.',
        badge: 'Pre-Mitred',
        icon: 'wrench',
      },
      {
        title: 'ISPM-15 Timber Crate Export Packaging',
        desc: 'Heavy timber crating cushioned with high-density foam sheets to prevent chipping in ocean transit.',
        badge: 'Export Crates',
        icon: 'package',
      },
    ],
    compatibleProducts: [
      'Pre-Assembled Mesh-Mounted Tile Sheets (30x30cm)',
      'Custom Outdoor Zellige Dining & Bistro Tables',
      'Luxury Riad-Style Water Fountains',
      'Curved Pool Borders & Waterline Accent Tiles',
      'Kitchen Backsplashes & Fireplace Facings',
      'Chiseled 10x10cm Beveled Glazed Subway Formats',
    ],
    materials: 'Authentic Moroccan Riverbed Grey Clay, Enameled Mineral Glazes, Fiberglass Mesh',
    dimensions: 'Standard 10x10cm, 5x5cm, custom stars, crosses, octagons, or bespoke CAD layouts',
    origin: 'Historic Moroccan Zellige Tile Guild, Morocco',
    qualityStandard: 'Artisanal Chiseled Menqash Edges · Zero Synthetic Additives · ASTM Frost-Safe',
    specs: [
      { label: 'Craft Category', value: 'Hand-Chiseled Moroccan Zellige Mosaics' },
      { label: 'Assembly Method', value: 'Mesh-mounted 30x30cm panels for rapid installation' },
      { label: 'Tile Thickness', value: '11mm - 13mm authentic hand-calibrated thickness' },
      { label: 'Pre-Production Sample', value: '7 - 10 business days via DHL air freight' },
      { label: 'Production MOQ', value: '10 square meters (or 1 custom furniture piece)' },
      { label: 'Water Absorption', value: '< 9% (suitable for interiors, steam showers & pools)' },
      { label: 'Grout Joint', value: 'Tight butt-joint (1mm) for authentic continuous mosaic look' },
      { label: 'CAD Engineering', value: 'Custom layout plans with numbered tiles for installers' },
    ],
    workflow: [
      { step: '01', title: 'Architectural Plan & Palette Review', desc: 'Send your project CAD layout, surface area in square meters, and desired color ratios.' },
      { step: '02', title: 'Tile Chiseling & Master Assembly', desc: 'Master artisans chisel raw glazed tiles into geometric polygons and assemble the prototype panel.' },
      { step: '03', title: 'Express DHL Sample Verification', desc: 'A 30x30cm mesh sheet is shipped to your site for color approval and lighting inspection.' },
      { step: '04', title: 'Container Crate Packaging', desc: 'Sheets are numbered, boxed in your branded sleeves, and packed inside heavy timber export crates.' },
    ],
    technicalHighlights: [
      {
        title: 'Authentic Moroccan Clay',
        desc: 'Sourced exclusively from the hills of Morocco, this unique clay contains zero lime, preventing tile cracking and thermal failure.',
        icon: 'layers',
      },
      {
        title: 'Menqash Beveled Edges',
        desc: 'Each tile is hand-beveled so only a razor-thin 1mm grout line is visible upon installation.',
        icon: 'compass',
      },
      {
        title: 'Iridescent Mineral Glazes',
        desc: 'Fired over olive-pit wood kilns, subtle temperature fluctuations yield the signature undulating shimmer of genuine zellige.',
        icon: 'palette',
      },
    ],
  },
  {
    id: 'pl-pyrography-inlaid-thuya',
    slug: 'pyrography-inlaid-thuya',
    title: 'Pyrography & Inlaid Thuya Woodwork',
    category: 'Wood Crafts & Furniture',
    categoryId: 'wood',
    price: 280.0,
    tagline: 'Deep pyrographic hot-branding, mother-of-pearl inlays, and silver-plated brass wire marquetry on fragrant exotic Thuya burl root.',
    desc: 'Bring the legendary scent and exotic swirling grain of Moroccan Thuya wood to your luxury brand. We create bespoke keepsake boxes, backgammon sets, desk accessories, and accent furniture finished with custom laser pyrography and intricate marquetry inlays.',
    detailedDescription: 'Found exclusively in the Atlantic foothills of the Essaouira region of Morocco, the burl root of the exotic Thuya tree (Tetraclinis articulata) is world-renowned for its dense bird’s-eye grain and naturally cedar-like therapeutic fragrance. Our master cabinetmakers craft heirloom giftware, luxury hotel amenity boxes, and bespoke furniture pieces. We offer precision laser pyrography, deep heat branding, and hand-chiseled marquetry inlays featuring mother-of-pearl, ebony, and silver-plated brass wire. Each piece is polished by hand with natural lemon oil and French shellac for an ultra-smooth, glass-like heirloom finish.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'OEM & Private Label',
    sampleMoq: '1 Piece (Full Prototype Approval)',
    productionMoq: '10 Pieces (Boxes / Giftware) · 2 Pieces (Furniture)',
    sampleLead: '7 - 10 Business Days',
    prodLead: '2 - 3 Weeks',
    toolingMethod: 'Laser Micro-Pyrography, Custom Branding Iron & Brass Wire Marquetry Inlay',
    brandingOptions: [
      {
        title: 'Micro-Laser Heat Pyrography',
        desc: 'High-resolution heat branding directly into the dense bird’s-eye burl root grain with razor-sharp fidelity.',
        badge: 'Laser Brand',
        icon: 'stamp',
      },
      {
        title: 'Hand-Inlaid Mother-of-Pearl Marquetry',
        desc: 'Micro-chiseled Atlantic seashell and ebony inlays forming your brand emblem flush with the wood surface.',
        badge: 'Pearl Inlay',
        icon: 'award',
      },
      {
        title: 'Flush Inset Solid Brass Plaques',
        desc: 'Engraved unlacquered brass plates embedded flush into carved wood recesses with hand-filed perimeter margins.',
        badge: 'Brass Inset',
        icon: 'wrench',
      },
      {
        title: 'Silver-Plated Brass Wire Marquetry',
        desc: 'Delicate metal wire hand-tapped into carved channels for regal geometric and typographic borders.',
        badge: 'Wire Inlay',
        icon: 'layers',
      },
      {
        title: 'Velvet & Leather Interior Lining',
        desc: 'Custom partitioned interior cavities lined in French velvet or glove-soft Moroccan leather.',
        badge: 'Interior Linings',
        icon: 'palette',
      },
      {
        title: 'Foil-Blocked Rigid Gift Packaging',
        desc: 'Custom heavy-duty presentation keepsake boxes complete with certificate of authentic Essaouira origin.',
        badge: 'Gift Boxed',
        icon: 'package',
      },
    ],
    compatibleProducts: [
      'Heirloom Jewelry & Keepsake Boxes with Secret Locks',
      'Custom Backgammon & Chess Tournament Boards',
      'Luxury Hotel In-Room Amenity Presentation Trays',
      'Humidors for Premium Cigars with Spanish Cedar Linings',
      'Round & Octagonal Carved Side Tables',
      'Executive Desk Stationery & Pen Holders',
    ],
    materials: '100% Sustainably Harvested Moroccan Thuya Burl Root, Lemonwood, Mother-of-Pearl',
    dimensions: 'Custom bespoke dimensions for giftware or full-scale residential furniture',
    origin: 'Essaouira Atlantic Woodworking Guilds, Morocco',
    qualityStandard: 'Hand-Planed · French Shellac Hand-Polished Finish · Naturally Fragrant',
    specs: [
      { label: 'Craft Category', value: 'Artisan Wood Marquetry & Thuya Burl Cabinetry' },
      { label: 'Branding Discipline', value: 'Laser Pyrography, Hot Branding & Marquetry Inlays' },
      { label: 'Wood Species', value: 'Tetraclinis articulata (Exotic Thuya burl root)' },
      { label: 'Pre-Production Sample', value: '7 - 10 business days via DHL Express' },
      { label: 'Production MOQ', value: '10 pieces (Giftware) · 2 pieces (Accent Furniture)' },
      { label: 'Finish Technique', value: 'Hand-rubbed natural lemon oil and clear French shellac' },
      { label: 'Secret Mechanisms', value: 'Traditional hidden sliding keyholes & lock mechanisms available' },
      { label: 'Environmental Sourcing', value: 'Sustainably harvested subterranean roots from managed Moroccan groves' },
    ],
    workflow: [
      { step: '01', title: 'Dimension & Inlay Specification', desc: 'Specify outer box dimensions, internal partitions, velvet lining color, and branding vector artwork.' },
      { step: '02', title: 'Burl Root Selection & Kiln Cure', desc: 'Master carpenters select burl cuts with the most intense swirling bird’s-eye grain figures.' },
      { step: '03', title: 'Laser Pyrography & Prototype', desc: 'Your branding is pyrographed onto the lid and the prototype is hand-polished for client review.' },
      { step: '04', title: 'Batch Handcrafting & Crating', desc: 'The batch is crafted, fitted with precision brass hinges, velvet-lined, and carefully boxed.' },
    ],
    technicalHighlights: [
      {
        title: 'Exotic Swirling Burl Grain',
        desc: 'Thuya burl root produces mesmerizing golden-amber and deep cognac grain swirls found nowhere else on earth.',
        icon: 'tree',
      },
      {
        title: 'Natural Aromatic Scent',
        desc: 'The high resin content emits a natural, calming cedar and camphor aroma that lasts for generations.',
        icon: 'wind',
      },
      {
        title: 'Traditional Secret Slide Locks',
        desc: 'Our artisans can integrate authentic traditional hidden sliding panel locks into keepsake boxes.',
        icon: 'lock',
      },
    ],
  },
]

export function getPrivateLabelProducts(): PrivateLabelProduct[] {
  return PRIVATE_LABEL_PRODUCTS
}

export function getPrivateLabelBySlug(slug: string): PrivateLabelProduct | undefined {
  return PRIVATE_LABEL_PRODUCTS.find((p) => p.slug === slug || p.id === slug)
}

export function getRelatedPrivateLabel(currentSlug: string, count: number = 3): PrivateLabelProduct[] {
  return PRIVATE_LABEL_PRODUCTS.filter((p) => p.slug !== currentSlug).slice(0, count)
}
