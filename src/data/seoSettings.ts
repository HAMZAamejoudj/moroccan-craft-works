export interface PageSeoItem {
  id: string
  pageName: string
  path: string
  badge: string
  // English
  h1: string
  title: string
  description: string
  keywords: string
  // French
  h1Fr: string
  titleFr: string
  descriptionFr: string
  keywordsFr: string
  // Arabic
  h1Ar: string
  titleAr: string
  descriptionAr: string
  keywordsAr: string
  // Shared
  ogImage: string
  canonicalUrl: string
  indexRobots: boolean
  lastUpdated: string
}

export const DEFAULT_SEO_SETTINGS: PageSeoItem[] = [
  {
    id: 'home',
    pageName: 'Home Page',
    path: '/',
    badge: 'Core Gateway',
    h1: 'Authentic Moroccan Handicrafts for Global Markets',
    title: 'Moroccan Craft Works | Authentic Moroccan Handicrafts for Global Markets',
    description:
      'Premier Moroccan B2B supplier of handmade Beni Ourain rugs, glazed zellige tiles, pierced brass lighting, and leather poufs. Direct artisan export worldwide.',
    keywords:
      'Moroccan handicrafts, wholesale rugs, zellige tiles, brass lanterns, leather goods, artisan supplier Morocco',
    h1Fr: 'Artisanat Marocain Authentique pour les Marchés Mondiaux',
    titleFr: 'Moroccan Craft Works | Artisanat d’Art Marocain pour l’Export International',
    descriptionFr:
      'Fournisseur marocain B2B d’artisanat d’art : tapis Beni Ouarain, zellige fait main, lustres en laiton ciselé et maroquinerie. Export direct dans le monde entier.',
    keywordsFr:
      'artisanat marocain, vente en gros tapis, zellige marocain, luminaires laiton, poufs cuir, export artisanat Maroc',
    h1Ar: 'الصناعة التقليدية المغربية الأصيلة للأسواق العالمية',
    titleAr: 'موروكو كرافت ووركس | تحف وصناعة تقليدية مغربية فاخرة للتصدير الدولي',
    descriptionAr:
      'المورد المغربي الأول للمنتجات الحرفية الأصيلة: زرابي بني ورين، زليج فاسي، ثريات نحاسية، ومصنوعات جلدية. شحن تجاري موثوق لكافة دول العالم.',
    keywordsAr:
      'صناعة تقليدية مغربية, بيع بالجملة, زرابي مغربية, زليج فاسي, فوانيس نحاسية, جلد طبيعي, تصدير الحرف اليدوية',
    ogImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://moroccancraftworks.com/',
    indexRobots: true,
    lastUpdated: '2026-11-21',
  },
  {
    id: 'products',
    pageName: 'Products Catalog (160 Items)',
    path: '/products',
    badge: 'E-Catalog',
    h1: 'Curated Moroccan Artisan Wholesale Catalog',
    title: 'Products Catalog | 160 Authentic Moroccan Handicrafts | MCW',
    description:
      'Explore 160 master-crafted Moroccan products across 10 heritage guilds: Berber carpets, architectural zellige, ceramics, copperware, and organic leather.',
    keywords:
      'Moroccan catalog, wholesale catalog, handmade furniture, Atlas rugs, Safi pottery, Thuya wood, Moroccan crafts b2b',
    h1Fr: 'Catalogue Grossiste de l’Artisanat d’Art Marocain',
    titleFr: 'Catalogue Produits | 160 Pièces d’Artisanat Marocain | MCW',
    descriptionFr:
      'Découvrez 160 produits d’exception issus de 10 corporations artisanales : tapis berbères, zelliges, poterie de Safi, ferronnerie et vannerie.',
    keywordsFr:
      'catalogue artisanat marocain, vente en gros, tapis atlas, zellige émaillé, poterie safi, luminaires marocains',
    h1Ar: 'كتالوج التحف والمنتجات التقليدية المغربية بالجملة',
    titleAr: 'كتالوج المنتجات | 160 تحفة من الصناعة التقليدية المغربية | MCW',
    descriptionAr:
      'تصفح 160 منتجاً تقليدياً معتمداً عبر 10 أصناف رئيسية: سجاد الأطلس، زليج أندلسي، فخار آسفي، نحاسيات، وخشب العرعار.',
    keywordsAr:
      'كتالوج المنتجات المغربية, صناعة يدوية بالجملة, زرابي أصيلة, زليج معماري, خزف مغربي, إضاءة شرقية',
    ogImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://moroccancraftworks.com/products',
    indexRobots: true,
    lastUpdated: '2026-11-21',
  },
  {
    id: 'wholesale',
    pageName: 'Wholesale B2B Program',
    path: '/services/wholesale',
    badge: 'B2B Trade',
    h1: 'Wholesale Moroccan Handicrafts Supply & Tiered Pricing',
    title: 'Wholesale Moroccan Handicrafts | B2B Commercial Tiers & Export | MCW',
    description:
      'Direct master guild wholesale terms with volume tiers up to 50% discount. Door-to-door express air and FCL 20ft/40ft ocean container consolidation with EUR.1 certificates.',
    keywords:
      'wholesale handicrafts morocco, b2b craft importer, fcl container morocco, volume discounts craft, hotel supplier decor',
    h1Fr: 'Vente en Gros & Export d’Artisanat Marocain B2B',
    titleFr: 'Vente en Gros Artisanat Marocain | Tarifs Dégressifs B2B & Export | MCW',
    descriptionFr:
      'Tarifs de gros directs d’ateliers avec remises sur volume jusqu’à 50%. Consolidation de conteneurs maritimes 20ft/40ft, expéditions aériennes et certificats EUR.1.',
    keywordsFr:
      'vente en gros artisanat, grossiste maroc, importation artisanat marocain, conteneur maritime maroc, certificat eur1',
    h1Ar: 'برنامج البيع بالجملة والتصدير للشركات والمستوردين',
    titleAr: 'البيع بالجملة للحرف المغربية | أسعار تفضيلية وشحن تجاري | MCW',
    descriptionAr:
      'أسعار الجملة المباشرة من تعاونيات الحرفيين مع خصومات تصل إلى 50%. شحن جوي سريع وحاويات بحرية كاملة مع وثائق وشهادات المنشأ الرسمية.',
    keywordsAr:
      'بيع بالجملة للمحلات, استيراد منتجات مغربية, حاويات بحرية, خصومات الكميات, شهادة المنشأ التصديرية',
    ogImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://moroccancraftworks.com/services/wholesale',
    indexRobots: true,
    lastUpdated: '2026-11-21',
  },
  {
    id: 'private-label',
    pageName: 'Private Label & Custom OEM',
    path: '/services/private-label',
    badge: 'Manufacturing',
    h1: 'Bespoke Moroccan Manufacturing & Private Labeling',
    title: 'Private Label Moroccan Crafts | Custom OEM Manufacturing | MCW',
    description:
      'Launch your proprietary home decor collection manufactured by authentic Moroccan master artisans. Custom branding, debossed brass tags, woven labels, and export packing.',
    keywords:
      'private label morocco, bespoke craft manufacturing, custom rugs private label, custom ceramic branding, artisan oem',
    h1Fr: 'Fabrication Sur-Mesure & Marque Blanche au Maroc',
    titleFr: 'Marque Blanche & Marque Distributeur Artisanat Marocain | MCW',
    descriptionFr:
      'Créez votre propre collection haut de gamme fabriquée par les maîtres artisans marocains. Étiquetage personnalisé, plaques laiton gravées et finitions sur-mesure.',
    keywordsFr:
      'marque blanche artisanat, fabrication sur mesure maroc, étiquetage personnalisé, sous traitance artisanale maroc',
    h1Ar: 'التصنيع المخصص والعلامة التجارية الخاصة (Private Label)',
    titleAr: 'التصنيع المخصص للماركات الخاصة | إنتاج يدوي حصري | MCW',
    descriptionAr:
      'أطلق علامتك التجارية الخاصة في الديكور والمفروشات بالتعاون مع كبار الحرفيين المغاربة. وسم المنتجات، حفر النحاس، وشارات مخصصة مع مراقبة جودة صارمة.',
    keywordsAr:
      'تصنيع علامة خاصة, صناعة حسب الطلب, نقش الشعارات على النحاس, ماركة تجارية للمفروشات, إنتاج حصري المغرب',
    ogImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://moroccancraftworks.com/services/private-label',
    indexRobots: true,
    lastUpdated: '2026-11-21',
  },
  {
    id: 'about',
    pageName: 'About Our Heritage',
    path: '/about',
    badge: 'Brand Story',
    h1: 'Ten Centuries of Guild Craftsmanship & Ethical Heritage',
    title: 'About Our Heritage | 10 Centuries of Moroccan Artisan Guilds | MCW',
    description:
      'Learn how Moroccan Craft Works connects ancestral artisan workshops from Fes, Marrakech, and the Atlas Mountains directly to modern international spaces.',
    keywords:
      'about moroccan crafts, artisan guilds fes, sustainable craft morocco, fair trade artisan heritage, atlas weavers',
    h1Fr: 'Dix Siècles de Savoir-Faire Artisanal et de Transmission',
    titleFr: 'Notre Histoire & Héritage | Artisans du Maroc & Savoir-Faire | MCW',
    descriptionFr:
      'Découvrez comment Moroccan Craft Works valorise les corporations artisanales ancestrales de Fès, Marrakech et de l’Atlas auprès des acteurs mondiaux du design.',
    keywordsFr:
      'histoire artisanat marocain, corporations fès, commerce équitable artisanat, maîtres artisans marrakech, patrimoine maroc',
    h1Ar: 'عشرة قرون من الأصالة والإبداع الحرفي المغربي',
    titleAr: 'عن هويتنا وتراثنا | عشرة قرون من الصناعة التقليدية | MCW',
    descriptionAr:
      'تعرف على مسيرة موروكو كرافت ووركس في ربط ورشات المعلمين الحرفيين في فاس ومراكش والأطلس بالمشاريع المعمارية والفنادق العالمية.',
    keywordsAr:
      'عن الصناعة التقليدية, تراث المغرب, معلمي فاس ومراكش, تجارة عادلة مع الحرفيين, أصالة الصناعة اليدوية',
    ogImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://moroccancraftworks.com/about',
    indexRobots: true,
    lastUpdated: '2026-11-21',
  },
  {
    id: 'contact',
    pageName: 'Contact & Commercial Inquiries',
    path: '/contact',
    badge: 'Support & Inquiries',
    h1: 'Get in Touch for B2B Wholesale Quotes and Custom Orders',
    title: 'Contact Us | B2B Wholesale Quotes & Custom Projects | MCW',
    description:
      'Reach our export team in Marrakech and Casablanca for wholesale price lists, sample requests, container quotes, and private label project consultations.',
    keywords:
      'contact moroccan craft works, wholesale quote handicrafts, marrakech craft exporter, b2b craft inquiry',
    h1Fr: 'Contactez Notre Équipe Export & Demande de Devis B2B',
    titleFr: 'Contactez-Nous | Devis Grossiste & Projets Sur-Mesure | MCW',
    descriptionFr:
      'Échangez avec nos équipes à Marrakech et Casablanca pour obtenir nos catalogues de prix de gros, devis conteneur ou conseils de fabrication personnalisée.',
    keywordsFr:
      'contact grossiste maroc, devis artisanat b2b, exportateur marrakech, demande de prix artisanat marocain',
    h1Ar: 'تواصل معنا لطلب عروض الأسعار والمشاريع المخصصة',
    titleAr: 'اتصل بنا | عروض أسعار الجملة واستشارات التصدير | MCW',
    descriptionAr:
      'تواصل مباشرة مع فريق التصدير في مراكش والدار البيضاء للحصول على كتالوجات الأسعار، عينات المنتجات، واستشارات تصنيع المشاريع الفندقية والتجارية.',
    keywordsAr:
      'اتصل بنا, طلب عرض أسعار جملة, تصدير من المغرب, طلبيات مخصصة, استيراد الديكور المغربي',
    ogImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://moroccancraftworks.com/contact',
    indexRobots: true,
    lastUpdated: '2026-11-21',
  },
  {
    id: 'faq',
    pageName: 'Frequently Asked Questions (FAQ)',
    path: '/faq',
    badge: 'Help & Knowledge',
    h1: 'Frequently Asked Questions about Ordering, Export & Quality',
    title: 'FAQ | Wholesale Ordering, Freight Logistics & Export Guide | MCW',
    description:
      'Everything you need to know about minimum order quantities (MOQ), production lead times, shipping options, custom sample requests, and import duties.',
    keywords:
      'moroccan crafts faq, wholesale moq, shipping times morocco, customs duty eur1, export crating questions',
    h1Fr: 'Foire Aux Questions : Commandes, Fret & Modalités d’Export',
    titleFr: 'FAQ | Guide des Commandes Grossistes, Fret & Douanes | MCW',
    descriptionFr:
      'Retrouvez toutes les réponses concernant les quantités minimales (MOQ), les délais de fabrication, les formalités douanières et l’emballage export sécurisé.',
    keywordsFr:
      'faq artisanat marocain, moq grossiste, délais fabrication, douanes import maroc, caisses bois export',
    h1Ar: 'الأسئلة الشائعة حول الطلبيات، الشحن، وإجراءات التصدير',
    titleAr: 'الأسئلة الشائعة | دليل الشحن، الجمارك، والطلبيات التجارية | MCW',
    descriptionAr:
      'إجابات شاملة لجميع تساؤلات المستوردين حول الحد الأدنى للطلبيات (MOQ)، مدة الإنتاج اليدوي، شهادات الإعفاء الجمركي EUR.1، وتغليف الشحن الدولي.',
    keywordsAr:
      'الأسئلة الشائعة, الحد الأدنى للطلب, مدة الشحن, الجمارك والتصدير, شهادة المنشأ, تغليف الصناديق الخشبية',
    ogImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://moroccancraftworks.com/faq',
    indexRobots: true,
    lastUpdated: '2026-11-21',
  },
  {
    id: 'how-to-order',
    pageName: 'How to Order B2B Guide',
    path: '/how-to-order',
    badge: 'Buyer Guide',
    h1: 'Step-by-Step B2B Procurement and Export Logistics Process',
    title: 'How to Order | B2B Procurement & Direct Guild Export Guide | MCW',
    description:
      'A transparent 5-step sourcing process from catalog curation and sample approval to artisanal production, quality inspection, and customs-cleared global freight.',
    keywords:
      'how to order moroccan crafts, craft procurement process, sample approval craft, b2b import guide, container consolidation',
    h1Fr: 'Guide d’Achat B2B : Processus de Commande & Logistique d’Export',
    titleFr: 'Comment Commander | Guide d’Approvisionnement Artisanal B2B | MCW',
    descriptionFr:
      'Un parcours d’achat clair en 5 étapes : sélection sur catalogue, validation d’échantillons, production en atelier, contrôle qualité et livraison internationale.',
    keywordsFr:
      'guide commande b2b, processus achat artisanat, validation échantillon, contrôle qualité maroc, logistique export',
    h1Ar: 'دليل خطوات الشراء والطلب التجاري خطوة بخطوة',
    titleAr: 'كيفية الطلب | دليل الشراء التجاري وخطوات التصدير المباشر | MCW',
    descriptionAr:
      'مسار احترافي شفاف في 5 خطوات: اختيار المنتجات، اعتماد العينات، التصنيع اليدوي بالورشات، الفحص الشامل للجودة، والتسليم حتى باب مستودعاتكم.',
    keywordsAr:
      'خطوات الطلب بالجملة, كيفية الشراء, اعتماد العينات, فحص الجودة, الشحن الدولي للتجار',
    ogImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://moroccancraftworks.com/how-to-order',
    indexRobots: true,
    lastUpdated: '2026-11-21',
  },
]
