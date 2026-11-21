export interface HeroSlideItem {
  id: number
  tag: string
  title: string // Primary H1 Headline
  subtitle: string
  description: string
  primaryCtaText: string
  primaryCtaHref?: string
  secondaryCtaText: string
  secondaryCtaHref: string
  image: string
  alt: string
  // Multilingual fields
  tagFr?: string
  tagAr?: string
  titleFr?: string
  titleAr?: string
  subtitleFr?: string
  subtitleAr?: string
  descriptionFr?: string
  descriptionAr?: string
  active?: boolean
}

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 1,
    tag: 'Wholesale and Global B2B Export',
    tagFr: 'Vente en Gros & Export B2B International',
    tagAr: 'البيع بالجملة والتصدير التجاري العالمي',
    title: 'Authentic Moroccan Handicrafts for Global Markets',
    titleFr: 'Artisanat Marocain Authentique pour les Marchés Mondiaux',
    titleAr: 'الصناعة التقليدية المغربية الأصيلة للأسواق العالمية',
    subtitle: 'Handcrafted Heritage • Worldwide Shipping',
    subtitleFr: 'Héritage Artisanal • Expédition Mondiale',
    subtitleAr: 'تراث يدوي أصيل • شحن دولي موثوق',
    description:
      'A trusted Moroccan supplier for importers, luxury hotels, retailers, and interior architects. Handcrafted masterworks, bespoke manufacturing, and reliable worldwide freight export.',
    descriptionFr:
      'Fournisseur marocain de confiance pour importateurs, hôtels de luxe, détaillants et architectes d’intérieur. Pièces maîtresses artisanales, fabrication sur-mesure et fret mondial sécurisé.',
    descriptionAr:
      'المورد المغربي المعتمد للمستوردين، الفنادق الفاخرة، المتاجر ومهندسي الديكور. تحف يدوية فريدة، تصنيع حسب الطلب وشحن دولي موثوق.',
    primaryCtaText: 'Request a Quote',
    secondaryCtaText: 'Explore Collections',
    secondaryCtaHref: '#products',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85',
    alt: 'Authentic Moroccan Architecture and Handicrafts',
    active: true,
  },
  {
    id: 2,
    tag: 'Bespoke Textiles and Weaving',
    tagFr: 'Textiles Sur-Mesure et Tissage',
    tagAr: 'منسوجات وزرابي حسب الطلب',
    title: 'Handwoven Berber and Beni Ourain Rugs',
    titleFr: 'Tapis Berbères et Beni Ouarain Tissés Main',
    titleAr: 'زرابي بني ورين وسجاد بربري منسوج يدوياً',
    subtitle: '100% Atlas Mountain Virgin Wool',
    subtitleFr: '100% Pure Laine Vierge de l’Atlas',
    subtitleAr: '100% صوف طبيعي خالص من جبال الأطلس',
    description:
      'Custom tribal weaves handcrafted by master Berber weavers in the High Atlas. Organic un-dyed wool, minimalist geometric patterns, and custom sizing for luxury residential and commercial spaces.',
    descriptionFr:
      'Tissages tribaux confectionnés par des maîtres tisserands de l’Atlas. Laine vierge naturelle non teintée, motifs géométriques minimalistes et dimensions sur-mesure.',
    descriptionAr:
      'زرابي قبلية أصيلة منسوجة بأنامل نساء الأطلس الكبير. صوف طبيعي غير مصبوغ، زخارف هندسية راقية، وتفصيل بمقاسات مخصصة للمشاريع الفاخرة.',
    primaryCtaText: 'Order Custom Rugs',
    secondaryCtaText: 'View Rug Catalog',
    secondaryCtaHref: '/products/rugs',
    image:
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=2000&q=85',
    alt: 'Authentic Moroccan Handwoven Rugs and Carpets',
    active: true,
  },
  {
    id: 3,
    tag: 'Architectural Surfaces',
    tagFr: 'Surfaces Architecturales & Zellige',
    tagAr: 'العمارة التقليدية والزليج الفاسي',
    title: 'Hand-Chiseled Moroccan Zellige Tiles',
    titleFr: 'Carreaux de Zellige Marocain Taillés à la Main',
    titleAr: 'بلاط الزليج المغربي المنحوت يدوياً',
    subtitle: 'Timeless Terracotta Art from Morocco',
    subtitleFr: 'Art Millénaire de la Terre Cuite du Maroc',
    subtitleAr: 'فن الخزف والطين المغربي الأصيل',
    description:
      'Authentic geometric mosaic tiles manually cut with artisan chisels in Morocco. Glazed with vibrant mineral enamels for signature hospitality projects, spas, feature walls, and luxury fountains.',
    descriptionFr:
      'Mosaïques géométriques traditionnelles taillées à la main avec les burins des maîtres artisans. Émaux minéraux éclatants pour projets hôteliers, spas et fontaines de prestige.',
    descriptionAr:
      'فسيفساء هندسية مقطوعة يدوياً بواسطة كبار المعلمين المغاربة. ألوان معدنية براقة لتزيين الفنادق الفخمة، المسابح، الجدران والنافورات.',
    primaryCtaText: 'Get Architectural Quote',
    secondaryCtaText: 'Explore Zellige',
    secondaryCtaHref: '/products/zellige',
    image:
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=2000&q=85',
    alt: 'Moroccan Zellige Tilework and Medina Architecture',
    active: true,
  },
  {
    id: 4,
    tag: 'Pottery and Tableware',
    tagFr: 'Poterie & Arts de la Table',
    tagAr: 'الفخار والخزف وأواني المائدة',
    title: 'Artisan Pottery and Terracotta Ceramics',
    titleFr: 'Poterie Artisanale et Céramiques en Terre Cuite',
    titleAr: 'فخار حرفي وخزف طيني تقليدي',
    subtitle: 'Hand-Thrown and Sun-Baked in Safi and Marrakech',
    subtitleFr: 'Tourné Main et Séché au Soleil à Safi et Marrakech',
    subtitleAr: 'مصنوع على الدولاب ومجفف تحت شمس آسفي ومراكش',
    description:
      'Traditional hand-thrown ceramics, decorative serving platters, glazed tagines, and statement planters. Custom color palettes, food-safe glazes, and reliable export pallet packaging.',
    descriptionFr:
      'Céramiques façonnées au tour, plats de service peints, tajines émaillés et grandes poteries de jardin. Couleurs personnalisées et conditionnement sécurisé pour l’export.',
    descriptionAr:
      'أواني خزفية مشكلة على الدولاب، صحون تقديم منقوشة، طواجن طهي مطلية، وأحواض نباتات كبرى. أصباغ غذائية آمنة وتغليف محكم للشحن البحري والجوي.',
    primaryCtaText: 'Wholesale Catalog',
    secondaryCtaText: 'Discover Pottery',
    secondaryCtaHref: '/products/pottery',
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=2000&q=85',
    alt: 'Handmade Moroccan Pottery and Ceramics',
    active: true,
  },
  {
    id: 5,
    tag: 'Lighting and Ambience',
    tagFr: 'Luminaires et Éclairage d’Ambiance',
    tagAr: 'الإضاءة النحاسية والفوانيس المغربية',
    title: 'Hand-Pierced Brass and Copper Lighting',
    titleFr: 'Luminaires en Laiton et Cuivre Ciselés Main',
    titleAr: 'ثريات وفوانيس نحاسية مثقوبة يدوياً',
    subtitle: 'Filigree Shadows and Ambient Warmth',
    subtitleFr: 'Ombres Féeriques et Chaleur Dorée',
    subtitleAr: 'ظلال هندسية ساحرة وإضاءة دافئة',
    description:
      'Intricate filigree lighting fixtures casting enchanting geometric shadows. Hand-hammered brass pendants, grand chandeliers, and outdoor lanterns crafted for statement hospitality ambience.',
    descriptionFr:
      'Suspensions et lustres en laiton ciselé projetant des motifs géométriques enchanteurs. Lanternes monumentales conçues pour l’hôtellerie de luxe et résidences exclusives.',
    descriptionAr:
      'فوانيس وثريات نحاسية منقوشة بدقة تنشر ظلالاً هندسية خلابة. معلقات نحاسية مطروقة يدوياً لتوفير إضاءة استثنائية للفنادق والمطاعم الراقية.',
    primaryCtaText: 'Get Lighting Quote',
    secondaryCtaText: 'View Lighting',
    secondaryCtaHref: '/products/brass',
    image:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=85',
    alt: 'Handcrafted Moroccan Brass and Copper Lanterns',
    active: true,
  },
  {
    id: 6,
    tag: 'Artisan Leathercraft',
    tagFr: 'Maroquinerie Artisanale & Cuir',
    tagAr: 'المصنوعات الجلدية الأصيلة',
    title: 'Vegetable-Tanned Moroccan Leather',
    titleFr: 'Cuir Marocain Tanné aux Extraits Végétaux',
    titleAr: 'جلد مغربي أصيل مدبوغ طبيعياً',
    subtitle: 'Sourced from the Ancient Tanneries of Marrakech & Fes',
    subtitleFr: 'Issu des Tanneries Historiques de Marrakech et Fès',
    subtitleAr: 'من الدباغات العريقة في فاس ومراكش',
    description:
      'Naturally dyed full-grain leather poufs, weekender duffels, and architectural accents. Chemical-free vegetable tanning processes passed down across ten centuries of Moroccan guilds.',
    descriptionFr:
      'Poufs en cuir pleine fleur, sacs de voyage et accessoires d’ameublement. Tannage 100% végétal et ancestral hérité de dix siècles de savoir-faire.',
    descriptionAr:
      'بوفات جلدية فاخرة، حقائب سفر وديكورات داخلية من أجود أنواع الجلود. دباغة نباتية طبيعية خالية من المواد الكيميائية متوارثة منذ عشرة قرون.',
    primaryCtaText: 'Request Leather Catalog',
    secondaryCtaText: 'Explore Leather',
    secondaryCtaHref: '/products/leather',
    image:
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=2000&q=85',
    alt: 'Authentic Moroccan Leatherwork and Poufs',
    active: true,
  },
]
