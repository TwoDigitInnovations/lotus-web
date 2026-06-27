// Single source of all static fallback data for the website.
// These values are shown when the API is unavailable or returns empty data.
// All exports use UPPER_SNAKE_CASE to distinguish fallback constants from API data.

const IMG_LUXURY =
  "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png";
const IMG_MODERN =
  "/images/modern-luxury-home-with-contemporary-architecture-wood-accents.png";
const IMG_VILLA =
  "/images/contemporary-villa-with-pool-garden-sleek-design.png";

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ─── Home — Hero ──────────────────────────────────────────────────────────────

export const HERO_SLIDES = [
  {
    id: 1,
    image: IMG_LUXURY,
    subtitle: "Find Your Dream Properties",
    title: "Luxury Living Redefined",
    highlight: "In Noida",
  },
  {
    id: 2,
    image: IMG_LUXURY,
    subtitle: "Premium Real Estate",
    title: "Your Dream Home",
    highlight: "Awaits You",
  },
  {
    id: 3,
    image: IMG_LUXURY,
    subtitle: "Invest In The Future",
    title: "Smart Properties",
    highlight: "For Smart People",
  },
];

// ─── Home — Welcome section ───────────────────────────────────────────────────

export const WELCOME = {
  title: "Welcome to Lotusss",
  description:
    "Growth today demands infrastructure that keeps up with the smarter layouts, stronger connectivity, locations backed by real demand and pricing structured with transparency and strategic logic.",
  images: [
    { src: IMG_MODERN, alt: "Modern luxury home" },
    { src: IMG_VILLA, alt: "Contemporary villa" },
    { src: IMG_LUXURY, alt: "Luxury house with garden" },
  ],
};

// ─── Home — Property Types carousel ──────────────────────────────────────────

export const PROPERTY_TYPES = [
  { id: 1, label: "COMMERCIAL", image: IMG_LUXURY },
  { id: 2, label: "RESIDENTIAL", image: IMG_MODERN },
  { id: 3, label: "VILLAS", image: IMG_VILLA },
  { id: 4, label: "PLOTS", image: IMG_VILLA },
];

// ─── Home — Why Choose Us ─────────────────────────────────────────────────────

export const WHY_CHOOSE_US = [
  {
    id: 1,
    icon: "shield",
    title: "Trusted & Secure Investments",
    description:
      "Every project we offer is RERA-registered and legally verified, giving you complete peace of mind. Your investment is backed by full transparency, clear documentation, and regulatory compliance.",
  },
  {
    id: 2,
    icon: "location",
    title: "Prime Locations in Noida",
    description:
      "We specialise in properties across Noida's most sought-after sectors — strategically chosen for connectivity, growth potential, and proximity to key infrastructure and employment hubs.",
  },
  {
    id: 3,
    icon: "payment",
    title: "Flexible Payment Plans",
    description:
      "Choose from a range of tailored financing options designed to make your dream home achievable. We partner with leading banks and NBFCs for seamless home loan assistance at competitive rates.",
  },
];

// ─── Home — Testimonials ──────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    id: 1,
    text: "Lotusss made our home-buying journey completely stress-free. From shortlisting the right property in Sector 150 to handling all the paperwork, their team was professional, transparent, and genuinely invested in our satisfaction.",
    name: "Ahmed Elsayed",
    role: "Our Client",
  },
  {
    id: 2,
    text: "Exceptional properties and outstanding service. The team at Lotusss helped us find our dream home in Noida. Highly recommend their professional approach and transparent pricing.",
    name: "Priya Sharma",
    role: "Our Client",
  },
  {
    id: 3,
    text: "Investing with Lotusss was the best decision we made. Prime locations, transparent pricing, and excellent support throughout the entire purchase process.",
    name: "Rajesh Kumar",
    role: "Our Client",
  },
];

// ─── Home — Gallery fallback ──────────────────────────────────────────────────

export const GALLERY_PHOTOS = [
  { id: 1, name: "J2 Residences", location: "Sector 67, Noida", image: IMG_MODERN },
  { id: 2, name: "M6 Residences", location: "Sector 67, Noida", image: IMG_VILLA },
  { id: 3, name: "K4 Villas", location: "Sector 150, Noida", image: IMG_LUXURY },
  { id: 4, name: "Lotus Towers", location: "Sector 94, Noida", image: IMG_MODERN },
  { id: 5, name: "Green Valley Homes", location: "Sector 150, Noida", image: IMG_VILLA },
  { id: 6, name: "Lotus Business Park", location: "Sector 62, Noida", image: IMG_LUXURY },
  { id: 7, name: "Lotus Tech Hub", location: "Sector 132, Noida", image: IMG_MODERN },
  { id: 8, name: "M3M Jacob Residences", location: "Sector 97, Noida", image: IMG_VILLA },
  { id: 9, name: "Lotus Heights", location: "Sector 168, Noida", image: IMG_LUXURY },
  { id: 10, name: "Emerald Square", location: "Sector 18, Noida", image: IMG_MODERN },
  { id: 11, name: "The Palm Residences", location: "Sector 120, Noida", image: IMG_VILLA },
  { id: 12, name: "Lotus Grand Mall", location: "Sector 38, Noida", image: IMG_LUXURY },
];

export const GALLERY_VIDEOS = [
  {
    id: 1,
    name: "Project Walkthrough",
    location: "Sector 97, Noida",
    thumbnail: IMG_MODERN,
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  { id: 2, name: "Site Tour 2024", location: "Sector 62, Noida", thumbnail: IMG_LUXURY, videoUrl: "#" },
  { id: 3, name: "Construction Update", location: "Sector 150, Noida", thumbnail: IMG_VILLA, videoUrl: "#" },
  { id: 4, name: "Amenities Preview", location: "Sector 132, Noida", thumbnail: IMG_MODERN, videoUrl: "#" },
  {
    id: 5,
    name: "Drone Tour 2024",
    location: "Sector 168, Noida",
    thumbnail: IMG_VILLA,
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFuns.mp4",
  },
  { id: 6, name: "Client Testimonials", location: "Sector 18, Noida", thumbnail: IMG_LUXURY, videoUrl: "#" },
  { id: 7, name: "Foundation Day Highlights", location: "Sector 120, Noida", thumbnail: IMG_MODERN, videoUrl: "#" },
  {
    id: 8,
    name: "Infrastructure Overview",
    location: "Sector 38, Noida",
    thumbnail: IMG_VILLA,
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
];

// ─── Company stats (project detail page) ─────────────────────────────────────

export const STATS = [
  { value: "14,850+", label: "Workforce\nStrong Expertise" },
  { value: "30 Years of", label: "Passion at Work" },
  { value: "28 Cities in 14 States", label: "National Footprint" },
];

// ─── Home — Recent Blogs fallback ─────────────────────────────────────────────

export const BLOGS = [
  {
    id: 1,
    image: IMG_MODERN,
    title: "The impact of technology on commercial real estate",
    description:
      "Technology has become a foundation of almost every industry and commercial real estate (CRE) is no exception.",
    date: "May 15, 2025",
    slug: "technology-impact-commercial-real-estate",
    content: [
      "Technology has become a foundation of almost every industry and commercial real estate (CRE) is no exception.",
    ],
  },
  {
    id: 2,
    image: IMG_VILLA,
    title: "Top 5 factors to consider before buying property in Noida",
    description:
      "Buying a property is one of the most significant financial decisions of your life.",
    date: "May 10, 2025",
    slug: "top-5-factors-buying-property-noida",
    content: [
      "Buying a property is one of the most significant financial decisions of your life.",
    ],
  },
  {
    id: 3,
    image: IMG_LUXURY,
    title: "Why Noida is the next real estate hotspot",
    description:
      "With world-class infrastructure, seamless metro connectivity, and rapidly appreciating property values.",
    date: "May 5, 2025",
    slug: "noida-next-real-estate-hotspot",
    content: [
      "With world-class infrastructure, seamless metro connectivity, and rapidly appreciating property values.",
    ],
  },
];

// ─── Home — Projects fallback ─────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: 1,
    name: "M3M Jacob Residences",
    location: "Sector 97, Noida",
    propertySize: "232 m² – 594 m²",
    price: "Starting from ₹7.50 Cr*",
    status: "Under Construction",
    category: "residential",
    image: IMG_MODERN,
    overview: "An architectural marvel beyond compare, M3M Jacob Residences offers uncompromising luxury at a prime locale.",
    documents: [{ label: "FLOOR PLAN", url: "#" }, { label: "BROCHURE", url: "#" }],
    gallery: { photos: [], videos: [] },
    aboutCity: { name: "Noida", text: "" },
    aboutSector: { name: "Sector 97", text: "" },
    reraNumber: "P05500088580",
    reraUrl: "#",
  },
  {
    id: 2,
    name: "Lotus Business Park",
    location: "Sector 62, Noida",
    propertySize: "500 m² – 2000 m²",
    price: "Starting from ₹12.00 Cr*",
    status: "Ready to Move",
    category: "commercial",
    image: IMG_LUXURY,
    overview: "Lotus Business Park redefines the commercial landscape of Noida with state-of-the-art office spaces.",
    documents: [{ label: "FLOOR PLAN", url: "#" }, { label: "BROCHURE", url: "#" }],
    gallery: { photos: [], videos: [] },
    aboutCity: { name: "Noida", text: "" },
    aboutSector: { name: "Sector 62", text: "" },
    reraNumber: "P05500012345",
    reraUrl: "#",
  },
  {
    id: 3,
    name: "Green Valley Homes",
    location: "Sector 150, Noida",
    propertySize: "180 m² – 450 m²",
    price: "Starting from ₹4.50 Cr*",
    status: "Under Construction",
    category: "residential",
    image: IMG_VILLA,
    overview: "Green Valley Homes brings nature and luxury together in perfect harmony.",
    documents: [{ label: "FLOOR PLAN", url: "#" }, { label: "BROCHURE", url: "#" }],
    gallery: { photos: [], videos: [] },
    aboutCity: { name: "Noida", text: "" },
    aboutSector: { name: "Sector 150", text: "" },
    reraNumber: "P05500067890",
    reraUrl: "#",
  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER = {
  description:
    "Your trusted partner in premium real estate across Noida & NCR. We connect homeowners and investors with the finest residential, commercial, and villa projects.",
  menuLinks: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  contact: {
    phone: "+91 1234556",
    email: "info@lotusss.com",
    address: "Sector 94, Noida",
  },
  socialLinks: [
    { platform: "twitter", href: "#", label: "Twitter" },
    { platform: "instagram", href: "#", label: "Instagram" },
    { platform: "facebook", href: "#", label: "Facebook" },
  ],
  socialTextLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
  whatsapp: "+911234556",
};

// ─── About — Hero ─────────────────────────────────────────────────────────────

export const ABOUT_HERO = {
  image: IMG_LUXURY,
  title: "ABOUT US",
  breadcrumb: ["Home", "About Us"],
};

// ─── About — Story ────────────────────────────────────────────────────────────

export const ABOUT_STORY = {
  image: IMG_LUXURY,
  description:
    "LOTUSSS Group stands at the forefront of the real estate industry, specialising in luxurious residential buildings in Noida and spacious commercial projects in Ghaziabad. With a rich history spanning over a decade, we have become synonymous with trust and dependability.",
};

// ─── About — Commitments ──────────────────────────────────────────────────────

export const COMMITMENTS = [
  { id: 1, label: "Customer Satisfaction", icon: "star" },
  { id: 2, label: "Professionalism & Expertise", icon: "person" },
  { id: 3, label: "Delivering Projects on Time", icon: "clock" },
  { id: 4, label: "Quality & Excellence", icon: "trophy" },
];

// ─── About — Leaders ──────────────────────────────────────────────────────────

export const LEADERS = [
  {
    id: 1,
    name: "Shailendra Sharma",
    role: "Chairman & Managing Director",
    description:
      "Visionary leader with nearly a decade in civil construction, driving Lotusss Group's growth across NCR with a focus on quality and transparency.",
    image: IMG_LUXURY,
    imageAlign: "right",
  },
  {
    id: 2,
    name: "Priya Kumari Ray",
    role: "CFO & Director",
    description:
      "Finance strategist overseeing all investment and fiscal operations, ensuring sustainable growth and investor confidence across every project.",
    image: IMG_LUXURY,
    imageAlign: "left",
  },
];
