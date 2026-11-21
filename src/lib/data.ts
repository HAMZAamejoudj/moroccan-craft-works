export interface SubProduct {
  title: string;
  href: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  image: string;
  href: string;
  count?: string;
  description: string;
  shortDescription?: string;
  tags?: string;
  linkText?: string;
  subProducts?: SubProduct[];
}

export interface ValueProp {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ClientBadge {
  id: string;
  title: string;
  icon: string;
}

export interface FeaturedProduct {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
  linkText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
}

export const VALUE_PROPS: ValueProp[] = [
  {
    id: "wholesale",
    title: "Wholesale Supply",
    subtitle: "Bulk and B2B Orders",
    icon: "Package",
  },
  {
    id: "custom",
    title: "Custom Manufacturing",
    subtitle: "Your Designs and Specifications",
    icon: "Scissors",
  },
  {
    id: "private-label",
    title: "Private Label",
    subtitle: "Your Brand, Our Craft",
    icon: "Tag",
  },
  {
    id: "export",
    title: "International Export",
    subtitle: "Worldwide Shipping",
    icon: "Globe",
  },
  {
    id: "quality",
    title: "Quality Assurance",
    subtitle: "Authentic and Handmade",
    icon: "ShieldCheck",
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "rugs",
    title: "Rugs and Carpets",
    href: "/products/rugs-carpets",
    description: "Hand-knotted and flat-woven Moroccan rugs, from cream Beni Ourain wool to colorful Azilal, Boujad and recycled-textile Boucherouite styles.",
    shortDescription: "Hand-knotted Beni Ourain, Azilal and vintage kilims in 100% Atlas virgin wool.",
    tags: "Beni Ourain · Azilal · Boujad · Kilim · Custom",
    linkText: "View Rugs Details",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Beni Ourain Rugs", href: "/products/beni-ourain-rugs" },
      { title: "Azilal Rugs", href: "/products/azilal-rugs" },
      { title: "Boujad Rugs", href: "/products/boujad-rugs" },
      { title: "Boucherouite Rugs", href: "/products/boucherouite-rugs" },
      { title: "Kilim Rugs", href: "/products/kilim-rugs" },
      { title: "Vintage Moroccan Rugs", href: "/products/vintage-moroccan-rugs" },
      { title: "Handwoven Wool Carpets", href: "/products/handwoven-wool-carpets" },
      { title: "Custom-Made Rugs", href: "/products/custom-made-rugs" },
    ],
  },
  {
    id: "zellige",
    title: "Zellige and Architecture",
    href: "/products/zellige-architecture",
    description: "Hand-cut glazed terracotta zellige for walls, floors, pools and fountains, plus mosaic table tops and washbasins for architectural projects.",
    shortDescription: "Hand-chiseled glazed terracotta tiles, mosaic tables and architectural fountains.",
    tags: "Wall and floor tiles · Mosaics · Table tops · Custom",
    linkText: "View Zellige Details",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Handmade Zellige Tiles", href: "/products/handmade-zellige-tiles" },
      { title: "Zellige Mosaic Patterns", href: "/products/zellige-mosaic-patterns" },
      { title: "Zellige Wall Tiles", href: "/products/zellige-wall-tiles" },
      { title: "Zellige Floor Tiles", href: "/products/zellige-floor-tiles" },
      { title: "Zellige Table Tops", href: "/products/zellige-table-tops" },
      { title: "Zellige Washbasins", href: "/products/zellige-washbasins" },
      { title: "Zellige Fountains", href: "/products/zellige-fountains" },
      { title: "Custom Zellige Designs", href: "/products/custom-zellige-designs" },
    ],
  },
  {
    id: "pottery",
    title: "Pottery and Ceramics",
    href: "/products/pottery-ceramics",
    description: "Hand-thrown and hand-painted Moroccan ceramics, including tagines, tableware, serving dishes and decorative vases for retail and hospitality.",
    shortDescription: "Artisan hand-thrown tagines, glazed tableware and decorative ceramic vases.",
    tags: "Tagines · Tableware · Bowls · Custom collections",
    linkText: "View Ceramics Details",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Handmade Moroccan Tagines", href: "/products/handmade-moroccan-tagines" },
      { title: "Ceramic Plates", href: "/products/ceramic-plates" },
      { title: "Ceramic Bowls", href: "/products/ceramic-bowls" },
      { title: "Decorative Vases", href: "/products/decorative-vases" },
      { title: "Ceramic Cups and Mugs", href: "/products/ceramic-cups-mugs" },
      { title: "Serving Dishes", href: "/products/serving-dishes" },
      { title: "Decorative Pottery", href: "/products/decorative-pottery" },
      { title: "Custom Ceramic Collections", href: "/products/custom-ceramic-collections" },
    ],
  },
  {
    id: "brass",
    title: "Brass and Copper",
    href: "/products/brass-copper",
    description: "Hammered and hand-engraved brass and copper trays, bowls, teapots, mirrors and lanterns, finished by Moroccan metalworkers.",
    shortDescription: "Intricate filigree brass lanterns, engraved trays and hammered metalwork.",
    tags: "Brass trays · Copper teapots · Lanterns · Custom",
    linkText: "View Brass Details",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Handmade Brass Trays", href: "/products/handmade-brass-trays" },
      { title: "Copper Trays", href: "/products/copper-trays" },
      { title: "Brass Bowls", href: "/products/brass-bowls" },
      { title: "Copper Teapots", href: "/products/copper-teapots" },
      { title: "Moroccan Lanterns", href: "/products/moroccan-lanterns" },
      { title: "Brass Mirrors", href: "/products/brass-mirrors" },
      { title: "Decorative Metal Plates", href: "/products/decorative-metal-plates" },
      { title: "Custom Brass and Copper Products", href: "/products/custom-brass-copper-products" },
    ],
  },
  {
    id: "leather",
    title: "Leather Goods",
    href: "/products/leather-goods",
    description: "Moroccan leather poufs, babouche slippers, bags, cushions and accessories, stitched by hand and available in custom colors.",
    shortDescription: "Vegetable-tanned leather poufs, traditional babouches and hand-stitched travel bags.",
    tags: "Poufs · Babouches · Bags · Ottomans · Custom leather",
    linkText: "View Leather Details",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Moroccan Leather Poufs", href: "/products/moroccan-leather-poufs" },
      { title: "Leather Babouches", href: "/products/leather-babouches" },
      { title: "Handmade Leather Bags", href: "/products/handmade-leather-bags" },
      { title: "Leather Cushions", href: "/products/leather-cushions" },
      { title: "Leather Ottomans", href: "/products/leather-ottomans" },
      { title: "Leather Belts", href: "/products/leather-belts" },
      { title: "Leather Accessories", href: "/products/leather-accessories" },
      { title: "Custom Leather Products", href: "/products/custom-leather-products" },
    ],
  },
  {
    id: "basketry",
    title: "Basketry and Raffia",
    href: "/products/basketry-raffia",
    description: "Handwoven baskets, bags and lampshades in raffia and palm leaf — lightweight, natural-fiber pieces suited to home decor and lifestyle retail.",
    shortDescription: "Handwoven natural palm leaf and raffia baskets, market bags and ambient lamps.",
    tags: "Raffia baskets · Palm leaf · Storage · Custom weaving",
    linkText: "View Basketry Details",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Raffia Baskets", href: "/products/raffia-baskets" },
      { title: "Palm Leaf Baskets", href: "/products/palm-leaf-baskets" },
      { title: "Woven Storage Baskets", href: "/products/woven-storage-baskets" },
      { title: "Handmade Raffia Bags", href: "/products/handmade-raffia-bags" },
      { title: "Decorative Baskets", href: "/products/decorative-baskets" },
      { title: "Woven Laundry Baskets", href: "/products/woven-laundry-baskets" },
      { title: "Raffia Lampshades", href: "/products/raffia-lampshades" },
      { title: "Custom Woven Products", href: "/products/custom-woven-products" },
    ],
  },
  {
    id: "wood",
    title: "Wood Crafts and Furniture",
    href: "/products/wood-crafts-furniture",
    description: "Thuya wood boxes, carved mirrors, trays, side tables and handmade furniture, from small gift items to custom woodwork for interiors.",
    shortDescription: "Rare fragrant Thuya wood boxes, carved mirrors, side tables and bespoke furniture.",
    tags: "Thuya boxes · Trays · Mirrors · Custom furniture",
    linkText: "View Wood Details",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Thuya Wood Boxes", href: "/products/thuya-wood-boxes" },
      { title: "Handmade Wooden Trays", href: "/products/handmade-wooden-trays" },
      { title: "Carved Wooden Mirrors", href: "/products/carved-wooden-mirrors" },
      { title: "Wooden Bowls", href: "/products/wooden-bowls" },
      { title: "Side Tables", href: "/products/side-tables" },
      { title: "Handmade Wooden Furniture", href: "/products/handmade-wooden-furniture" },
      { title: "Decorative Wood Objects", href: "/products/decorative-wood-objects" },
      { title: "Custom Woodwork", href: "/products/custom-woodwork" },
    ],
  },
  {
    id: "lighting",
    title: "Lighting and Wrought Iron",
    href: "/products/lighting-wrought-iron",
    description: "Moroccan lanterns, brass pendant lights, ceiling lights, wall sconces and wrought iron screens, mirrors and furniture — including custom lighting projects.",
    shortDescription: "Hand-pierced Moroccan pendant chandeliers, wall sconces and forged ironwork.",
    tags: "Metal lanterns · Brass pendants · Sconces · Custom lighting",
    linkText: "View Lighting Details",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Moroccan Metal Lanterns", href: "/products/moroccan-metal-lanterns" },
      { title: "Brass Pendant Lights", href: "/products/brass-pendant-lights" },
      { title: "Ceiling Lights", href: "/products/ceiling-lights" },
      { title: "Wall Sconces", href: "/products/wall-sconces" },
      { title: "Wrought Iron Mirrors", href: "/products/wrought-iron-mirrors" },
      { title: "Decorative Iron Screens", href: "/products/decorative-iron-screens" },
      { title: "Metal Furniture", href: "/products/metal-furniture" },
      { title: "Custom Lighting Projects", href: "/products/custom-lighting-projects" },
    ],
  },
  {
    id: "textiles",
    title: "Textiles and Home Accessories",
    href: "/products/textiles-home-accessories",
    description: "Handwoven blankets, throws, bedspreads, cushion covers, embroidered tablecloths and floor cushions for residential and hospitality interiors.",
    shortDescription: "Artisanal pom-pom blankets, handwoven wool throws and decorative floor cushions.",
    tags: "Cushions · Blankets · Throws · Custom textiles",
    linkText: "View Textiles Details",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Handmade Cushion Covers", href: "/products/handmade-cushion-covers" },
      { title: "Moroccan Blankets", href: "/products/moroccan-blankets" },
      { title: "Bedspreads", href: "/products/bedspreads" },
      { title: "Handwoven Textiles", href: "/products/handwoven-textiles" },
      { title: "Embroidered Tablecloths", href: "/products/embroidered-tablecloths" },
      { title: "Decorative Throws", href: "/products/decorative-throws" },
      { title: "Floor Cushions", href: "/products/floor-cushions" },
      { title: "Custom Textile Collections", href: "/products/custom-textile-collections" },
    ],
  },
  {
    id: "clothing",
    title: "Traditional Clothing",
    href: "/products/traditional-clothing",
    description: "Moroccan kaftans, djellabas and takchitas with hand embroidery and traditional finishing, plus handmade belts, babouches and accessories.",
    shortDescription: "Handcrafted Moroccan kaftans, djellabas and takchitas with bespoke sfifa embroidery.",
    tags: "Kaftans · Djellabas · Takchitas · Hand embroidery",
    linkText: "View Clothing Details",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=1000&q=80",
    subProducts: [
      { title: "Moroccan Kaftans", href: "/products/moroccan-kaftans" },
      { title: "Traditional Djellabas", href: "/products/traditional-djellabas" },
      { title: "Moroccan Takchitas", href: "/products/moroccan-takchitas" },
      { title: "Handmade Traditional Belts", href: "/products/handmade-traditional-belts" },
      { title: "Embroidered Garments", href: "/products/embroidered-garments" },
      { title: "Traditional Accessories", href: "/products/traditional-accessories" },
      { title: "Handmade Babouches", href: "/products/traditional-babouches" },
      { title: "Custom Clothing Collections", href: "/products/custom-clothing-collections" },
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "wholesale-service",
    title: "Wholesale",
    description: "B2B and Bulk Orders",
    icon: "Layers",
  },
  {
    id: "manufacturing-service",
    title: "Custom Manufacturing",
    description: "Tailored to your bespoke designs",
    icon: "Wrench",
  },
  {
    id: "private-label-service",
    title: "Private Label",
    description: "Your brand branding and packaging",
    icon: "Tag",
  },
  {
    id: "custom-projects-service",
    title: "Custom Projects",
    description: "Hotels, Riads and Interiors",
    icon: "Building2",
  },
];

export const CLIENT_BADGES: ClientBadge[] = [
  { id: "hotels", title: "Hotels and Resorts", icon: "Building" },
  { id: "designers", title: "Interior Designers", icon: "Sofa" },
  { id: "retailers", title: "Retailers and Boutiques", icon: "ShoppingBag" },
  { id: "importers", title: "Importers and Distributors", icon: "Box" },
  { id: "architecture", title: "Architecture Projects", icon: "Compass" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "A reliable and professional partner. The quality, authenticity and attention to detail of MoroccanCraftWorks products are outstanding.",
    author: "Sophie Laurent",
    role: "Interior Design Studio",
    location: "France",
    avatar: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    quote:
      "Working with MoroccanCraftWorks for our luxury hotel resort in Dubai was seamless. Their custom brass lanterns and zellige exceeded every standard.",
    author: "Marc Anderson",
    role: "Procurement Director, Luxury Hospitality",
    location: "UAE",
    avatar: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    quote:
      "From bespoke Beni Ourain rugs to handcrafted ceramics, the shipment arrived punctually in California with pristine packaging.",
    author: "Elena Rostova",
    role: "Boutique Owner",
    location: "United States",
    avatar: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
  },
];

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "beni-ourain-rug",
    category: "Rugs and Carpets",
    title: "Handwoven Beni Ourain Wool Rug",
    description: "Thick-pile wool rug in natural cream with hand-knotted geometric lines, inspired by the weaving traditions of the Middle Atlas. Available in standard and custom sizes.",
    href: "/products?category=rugs/beni-ourain-rugs",
    linkText: "Request pricing",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "handmade-zellige",
    category: "Zellige and Architecture",
    title: "Handmade Glazed Zellige Tiles",
    description: "Hand-cut terracotta tiles with a glossy glaze and natural surface variation, for kitchens, bathrooms, pools and feature walls. Supplied in a wide range of colors and formats.",
    href: "/products?category=zellige/handmade-zellige-tiles",
    linkText: "Request pricing",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "leather-pouf",
    category: "Leather Goods",
    title: "Hand-Stitched Moroccan Leather Pouf",
    description: "Round leather pouf with traditional embroidered stitching, shipped unstuffed to reduce freight volume. Offered in natural, tan, brown and custom leather colors.",
    href: "/products?category=leather/moroccan-leather-poufs",
    linkText: "Request pricing",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "brass-pendant",
    category: "Lighting and Wrought Iron",
    title: "Pierced Brass Pendant Light",
    description: "Hand-chased brass pendant that casts patterned light, suited to restaurants, hotel lobbies and residential interiors. Wiring can be adapted for EU or US standards.",
    href: "/products?category=lighting/brass-pendant-lights",
    linkText: "Request pricing",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ceramic-tagine",
    category: "Pottery and Ceramics",
    title: "Hand-Painted Ceramic Tagine",
    description: "Decorative and serving tagines, thrown and painted by hand, for gift retail, homeware stores and restaurant tableware. Custom glazes are available for larger orders.",
    href: "/products?category=pottery/moroccan-tagines",
    linkText: "Request pricing",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "raffia-basket",
    category: "Basketry and Raffia",
    title: "Handwoven Raffia Basket",
    description: "Natural-fiber basket woven by hand, finished with leather handles. A strong seasonal line for lifestyle, beach and home retailers, with custom sizes and private label tags.",
    href: "/products?category=basketry/raffia-baskets",
    linkText: "Request pricing",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
  },
];
