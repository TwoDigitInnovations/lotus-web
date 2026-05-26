
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const heroSlides = [
  {
    id: 1,
    image: "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png",
    subtitle: "Find Your Dream Properties",
    title: "Luxury Living Redefined",
    highlight: "In Noida",
  },
  {
    id: 2,
    image: "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png",
    subtitle: "Premium Real Estate",
    title: "Your Dream Home",
    highlight: "Awaits You",
  },
  {
    id: 3,
    image: "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png",
    subtitle: "Invest In The Future",
    title: "Smart Properties",
    highlight: "For Smart People",
  },
];

export const welcomeContent = {
  title: "Welcome to Lotusss",
  description:
    "Growth today demands infrastructure that keeps up with the smarter layouts, stronger connectivity, locations backed by real demand and pricing structured with transparency and strategic logic.",
  images: [
    {
      id: 1,
      src: "/images/modern-luxury-home-with-contemporary-architecture-wood-accents.png",
      alt: "Modern luxury home",
    },
    {
      id: 2,
      src: "/images/contemporary-villa-with-pool-garden-sleek-design.png",
      alt: "Contemporary villa",
    },
    {
      id: 3,
      src: "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png",
      alt: "Luxury house with garden",
    },
  ],
};

export const propertyTypes = [
  {
    id: 1,
    label: "COMMERCIAL",
    image: "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png",
  },
  {
    id: 2,
    label: "RESIDENTIAL",
    image: "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png",
  },
  {
    id: 3,
    label: "VILLAS",
    image: "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png",
  },
  {
    id: 4,
    label: "PLOTS",
    image: "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png",
  },
];

export const whyChooseUs = [
  {
    id: 1,
    icon: "shield",
    title: "Modern & Safe Living",
    description:
      "Lorem Ipsum is Lorem Ipsum. Lorem Ipsum is. Lorem Ipsum text of the printing and  industry.",
  },
  {
    id: 2,
    icon: "location",
    title: "Modern & Safe Living",
    description:
      "Lorem Ipsum is Lorem Ipsum. Lorem Ipsum is. Lorem Ipsum text of the printing and  industry.",
  },
  {
    id: 3,
    icon: "payment",
    title: "Modern & Safe Living",
    description:
      "Lorem Ipsum is Lorem Ipsum. Lorem Ipsum is. Lorem Ipsum text of the printing and  industry.",
  },
];

const IMG1 = "/images/modern-luxury-home-with-contemporary-architecture-wood-accents.png";
const IMG2 = "/images/contemporary-villa-with-pool-garden-sleek-design.png";
const IMG3 = "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png";

export const projects = [
  {
    id: 1,
    name: "M3M Jacob Residences",
    location: "Sector 97, Noida",
    propertySize: "232.258 m² – 594.579 m²",
    price: "Starting from ₹7.50 Cr*",
    status: "Under Construction",
    category: "residential",
    image: IMG1,
    overview: "An architectural marvel beyond compare, M3M Jacob Residences offers uncompromising luxury at a prime locale. Meticulously crafted for the discerning few, and overlooking the picturesque Sector 97, these one-of-a-kind residences epitomise grandeur.",
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: { photos: [{ id: 1, name: "M3M Jacob Residences", location: "Sector 97, Noida", image: IMG1 }, { id: 2, name: "M3M Exterior", location: "Sector 97, Noida", image: IMG2 }, { id: 3, name: "M3M Lobby", location: "Sector 97, Noida", image: IMG3 }, { id: 4, name: "M3M Garden", location: "Sector 97, Noida", image: IMG2 }], videos: [{ id: 1, name: "Project Walkthrough", location: "Sector 97, Noida", thumbnail: IMG1, videoUrl: "#" }, { id: 2, name: "Site Tour", location: "Sector 97, Noida", thumbnail: IMG2, videoUrl: "#" }] },
    aboutCity: { name: "Noida", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    aboutSector: { name: "Sector 97", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    reraNumber: "P05500088580",
    reraUrl: "https://lorem.ipsum.gov.in/",
  },
  {
    id: 2,
    name: "Lotus Business Park",
    location: "Sector 62, Noida",
    propertySize: "500 m² – 2000 m²",
    price: "Starting from ₹12.00 Cr*",
    status: "Ready to Move",
    category: "commercial",
    image: IMG3,
    overview: "Lotus Business Park redefines the commercial landscape of Noida with state-of-the-art office spaces, premium retail zones, and world-class amenities. A landmark destination for businesses seeking growth in a thriving economic corridor.",
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: { photos: [{ id: 1, name: "Lotus Business Park", location: "Sector 62, Noida", image: IMG3 }, { id: 2, name: "Business Lobby", location: "Sector 62, Noida", image: IMG1 }, { id: 3, name: "Conference Room", location: "Sector 62, Noida", image: IMG2 }, { id: 4, name: "Rooftop View", location: "Sector 62, Noida", image: IMG1 }], videos: [{ id: 1, name: "Project Walkthrough", location: "Sector 62, Noida", thumbnail: IMG3, videoUrl: "#" }, { id: 2, name: "Site Tour", location: "Sector 62, Noida", thumbnail: IMG1, videoUrl: "#" }] },
    aboutCity: { name: "Noida", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    aboutSector: { name: "Sector 62", text: "Sector 62 is one of Noida's most established commercial and IT corridors, home to numerous Fortune 500 companies, tech parks, and premier office complexes. Excellent metro connectivity and proximity to Delhi make it the most sought-after address for corporate headquarters." },
    reraNumber: "P05500012345",
    reraUrl: "https://lorem.ipsum.gov.in/",
  },
  {
    id: 3,
    name: "Green Valley Homes",
    location: "Sector 150, Noida",
    propertySize: "180 m² – 450 m²",
    price: "Starting from ₹4.50 Cr*",
    status: "Under Construction",
    category: "residential",
    image: IMG2,
    overview: "Green Valley Homes brings nature and luxury together in perfect harmony. Nestled amid lush green landscapes in Sector 150, these meticulously designed residences offer a serene escape from the urban hustle while keeping you connected to every modern convenience.",
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: { photos: [{ id: 1, name: "Green Valley Homes", location: "Sector 150, Noida", image: IMG2 }, { id: 2, name: "Garden View", location: "Sector 150, Noida", image: IMG1 }, { id: 3, name: "Interior", location: "Sector 150, Noida", image: IMG3 }, { id: 4, name: "Amenities", location: "Sector 150, Noida", image: IMG1 }], videos: [{ id: 1, name: "Project Walkthrough", location: "Sector 150, Noida", thumbnail: IMG2, videoUrl: "#" }, { id: 2, name: "Site Tour", location: "Sector 150, Noida", thumbnail: IMG3, videoUrl: "#" }] },
    aboutCity: { name: "Noida", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    aboutSector: { name: "Sector 150", text: "Sector 150 is Noida's greenest and most premium residential destination, offering over 80% open green spaces. With world-class sports facilities, pristine air quality, and direct access to the Noida-Greater Noida Expressway, it is the ultimate address for a healthy and luxurious lifestyle." },
    reraNumber: "P05500067890",
    reraUrl: "https://lorem.ipsum.gov.in/",
  },
  {
    id: 4,
    name: "Lotus Tech Hub",
    location: "Sector 132, Noida",
    propertySize: "800 m² – 5000 m²",
    price: "Starting from ₹20.00 Cr*",
    status: "Under Construction",
    category: "commercial",
    image: IMG1,
    overview: "Lotus Tech Hub is a next-generation technology park designed to foster innovation and collaboration. With cutting-edge infrastructure, high-speed connectivity, and flexible workspace configurations, it is the ideal home for technology companies and startups.",
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: { photos: [{ id: 1, name: "Lotus Tech Hub", location: "Sector 132, Noida", image: IMG1 }, { id: 2, name: "Tech Campus", location: "Sector 132, Noida", image: IMG3 }, { id: 3, name: "Co-working Space", location: "Sector 132, Noida", image: IMG2 }, { id: 4, name: "Cafeteria", location: "Sector 132, Noida", image: IMG3 }], videos: [{ id: 1, name: "Project Walkthrough", location: "Sector 132, Noida", thumbnail: IMG1, videoUrl: "#" }, { id: 2, name: "Site Tour", location: "Sector 132, Noida", thumbnail: IMG2, videoUrl: "#" }] },
    aboutCity: { name: "Noida", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    aboutSector: { name: "Sector 132", text: "Sector 132 is rapidly emerging as Noida's premier IT and commercial destination. Strategically located along the Noida-Greater Noida Expressway with excellent metro access, it offers businesses a dynamic ecosystem with premium office spaces and a skilled workforce catchment." },
    reraNumber: "P05500099999",
    reraUrl: "https://lorem.ipsum.gov.in/",
  },
  {
    id: 5,
    name: "Lotus Heights",
    location: "Sector 168, Noida",
    propertySize: "150 m² – 380 m²",
    price: "Starting from ₹3.80 Cr*",
    status: "Ready to Move",
    category: "residential",
    image: IMG2,
    overview: "Lotus Heights stands as a benchmark of affordable luxury in Sector 168. Designed for modern families, it offers spacious 2 and 3 BHK residences with premium fittings, landscaped gardens, and a full suite of lifestyle amenities — all within a secure, gated community.",
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: { photos: [{ id: 1, name: "Lotus Heights", location: "Sector 168, Noida", image: IMG2 }, { id: 2, name: "Clubhouse", location: "Sector 168, Noida", image: IMG1 }, { id: 3, name: "Swimming Pool", location: "Sector 168, Noida", image: IMG3 }, { id: 4, name: "Garden View", location: "Sector 168, Noida", image: IMG2 }], videos: [{ id: 1, name: "Project Walkthrough", location: "Sector 168, Noida", thumbnail: IMG2, videoUrl: "#" }, { id: 2, name: "Site Tour", location: "Sector 168, Noida", thumbnail: IMG1, videoUrl: "#" }] },
    aboutCity: { name: "Noida", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    aboutSector: { name: "Sector 168", text: "Sector 168 is a fast-developing residential precinct along the Noida-Greater Noida Expressway. Known for its wide boulevards, proximity to corporate hubs, and excellent social infrastructure including schools, hospitals, and retail centres, it offers an ideal balance of connectivity and quality living." },
    reraNumber: "P05500077711",
    reraUrl: "https://lorem.ipsum.gov.in/",
  },
  {
    id: 6,
    name: "Emerald Square",
    location: "Sector 18, Noida",
    propertySize: "300 m² – 1500 m²",
    price: "Starting from ₹8.50 Cr*",
    status: "Ready to Move",
    category: "commercial",
    image: IMG3,
    overview: "Emerald Square is a premium commercial complex at the heart of Sector 18, Noida's most vibrant retail and business district. The development features Grade-A office spaces, high-street retail units, and a food court, making it the ultimate destination for businesses and shoppers alike.",
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: { photos: [{ id: 1, name: "Emerald Square", location: "Sector 18, Noida", image: IMG3 }, { id: 2, name: "Retail Zone", location: "Sector 18, Noida", image: IMG2 }, { id: 3, name: "Office Lobby", location: "Sector 18, Noida", image: IMG1 }, { id: 4, name: "Food Court", location: "Sector 18, Noida", image: IMG3 }], videos: [{ id: 1, name: "Project Walkthrough", location: "Sector 18, Noida", thumbnail: IMG3, videoUrl: "#" }, { id: 2, name: "Site Tour", location: "Sector 18, Noida", thumbnail: IMG2, videoUrl: "#" }] },
    aboutCity: { name: "Noida", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    aboutSector: { name: "Sector 18", text: "Sector 18 is the commercial nerve centre of Noida — a bustling hub of malls, multiplexes, restaurants, and corporate offices. With direct metro access and footfall of over 200,000 visitors daily, it commands the highest commercial real estate premiums in the city." },
    reraNumber: "P05500033322",
    reraUrl: "https://lorem.ipsum.gov.in/",
  },
  {
    id: 7,
    name: "The Palm Residences",
    location: "Sector 120, Noida",
    propertySize: "200 m² – 520 m²",
    price: "Starting from ₹5.20 Cr*",
    status: "Under Construction",
    category: "residential",
    image: IMG1,
    overview: "The Palm Residences is a boutique luxury community in Sector 120, offering a rare combination of privacy, nature, and urban convenience. Each residence is thoughtfully designed with double-height living rooms, private terraces, and premium European fittings that elevate everyday living.",
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: { photos: [{ id: 1, name: "The Palm Residences", location: "Sector 120, Noida", image: IMG1 }, { id: 2, name: "Terrace View", location: "Sector 120, Noida", image: IMG3 }, { id: 3, name: "Living Room", location: "Sector 120, Noida", image: IMG2 }, { id: 4, name: "Landscaped Gardens", location: "Sector 120, Noida", image: IMG1 }], videos: [{ id: 1, name: "Project Walkthrough", location: "Sector 120, Noida", thumbnail: IMG1, videoUrl: "#" }, { id: 2, name: "Site Tour", location: "Sector 120, Noida", thumbnail: IMG3, videoUrl: "#" }] },
    aboutCity: { name: "Noida", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    aboutSector: { name: "Sector 120", text: "Sector 120 is an established residential sector in Noida known for its tree-lined streets, strong social infrastructure, and peaceful environment. Well-connected to business districts via the metro and expressway, it is a preferred choice for families seeking quality living away from the city's bustle." },
    reraNumber: "P05500044433",
    reraUrl: "https://lorem.ipsum.gov.in/",
  },
  {
    id: 8,
    name: "Lotus Grand Mall",
    location: "Sector 38, Noida",
    propertySize: "600 m² – 3500 m²",
    price: "Starting from ₹15.00 Cr*",
    status: "Under Construction",
    category: "commercial",
    image: IMG2,
    overview: "Lotus Grand Mall is set to become Noida's most iconic retail and entertainment destination. Spread across 1.2 million square feet, it will house international brands, a multiplex, fine dining restaurants, an indoor sports arena, and premium office towers — redefining retail real estate in NCR.",
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: { photos: [{ id: 1, name: "Lotus Grand Mall", location: "Sector 38, Noida", image: IMG2 }, { id: 2, name: "Mall Atrium", location: "Sector 38, Noida", image: IMG3 }, { id: 3, name: "Retail Promenade", location: "Sector 38, Noida", image: IMG1 }, { id: 4, name: "Entertainment Zone", location: "Sector 38, Noida", image: IMG2 }], videos: [{ id: 1, name: "Project Walkthrough", location: "Sector 38, Noida", thumbnail: IMG2, videoUrl: "#" }, { id: 2, name: "Site Tour", location: "Sector 38, Noida", thumbnail: IMG3, videoUrl: "#" }] },
    aboutCity: { name: "Noida", text: "Noida (New Okhla Industrial Development Authority) is a premier, planned satellite city in the Gautam Buddh Nagar district of Uttar Pradesh, India. As an integral part of the Delhi National Capital Region (NCR), it is a major economic, IT, and residential hub known for its modern infrastructure, wide roads, and extensive green cover." },
    aboutSector: { name: "Sector 38", text: "Sector 38 is strategically located at the intersection of Noida's major arterial roads, offering excellent connectivity to all parts of the city and Delhi NCR. Its rapidly growing catchment population and high vehicular traffic make it an outstanding location for large-format retail and entertainment developments." },
    reraNumber: "P05500055566",
    reraUrl: "https://lorem.ipsum.gov.in/",
  },
];

export const lotusssStats = [
  { value: "14,850+", label: "Workforce\nStrong Expertise" },
  { value: "30 Years of", label: "Passion at Work" },
  { value: "28 Cities in 14 States", label: "National Footprint" },
];

export const galleryPhotos = [
  {
    id: 1,
    name: "J2 Residences",
    location: "Sector 67, Noida",
    image: IMG1,
  },
  {
    id: 2,
    name: "M6 Residences",
    location: "Sector 67, Noida",
    image: IMG2,
  },
  {
    id: 3,
    name: "K4 Villas",
    location: "Sector 150, Noida",
    image: IMG3,
  },
  {
    id: 4,
    name: "Lotus Towers",
    location: "Sector 94, Noida",
    image: IMG1,
  },
  {
    id: 5,
    name: "Green Valley Homes",
    location: "Sector 150, Noida",
    image: IMG2,
  },
  {
    id: 6,
    name: "Lotus Business Park",
    location: "Sector 62, Noida",
    image: IMG3,
  },
  {
    id: 7,
    name: "Lotus Tech Hub",
    location: "Sector 132, Noida",
    image: IMG1,
  },
  {
    id: 8,
    name: "M3M Jacob Residences",
    location: "Sector 97, Noida",
    image: IMG2,
  },
  {
    id: 9,
    name: "Lotus Heights",
    location: "Sector 168, Noida",
    image: IMG3,
  },
  {
    id: 10,
    name: "Emerald Square",
    location: "Sector 18, Noida",
    image: IMG1,
  },
  {
    id: 11,
    name: "The Palm Residences",
    location: "Sector 120, Noida",
    image: IMG2,
  },
  {
    id: 12,
    name: "Lotus Grand Mall",
    location: "Sector 38, Noida",
    image: IMG3,
  },
];

export const galleryVideos = [
  {
    id: 1,
    name: "Project Walkthrough",
    location: "Sector 97, Noida",
    thumbnail: IMG1,
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    name: "Site Tour 2024",
    location: "Sector 62, Noida",
    thumbnail: IMG3,
    videoUrl: "#",
  },
  {
    id: 3,
    name: "Construction Update",
    location: "Sector 150, Noida",
    thumbnail: IMG2,
    videoUrl: "#",
  },
  {
    id: 4,
    name: "Amenities Preview",
    location: "Sector 132, Noida",
    thumbnail: IMG1,
    videoUrl: "#",
  },
  {
    id: 5,
    name: "Drone Tour 2024",
    location: "Sector 168, Noida",
    thumbnail: IMG2,
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFuns.mp4",
  },
  {
    id: 6,
    name: "Client Testimonials",
    location: "Sector 18, Noida",
    thumbnail: IMG3,
    videoUrl: "#",
  },
  {
    id: 7,
    name: "Foundation Day Highlights",
    location: "Sector 120, Noida",
    thumbnail: IMG1,
    videoUrl: "#",
  },
  {
    id: 8,
    name: "Infrastructure Overview",
    location: "Sector 38, Noida",
    thumbnail: IMG2,
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
];

export const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero",
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

export const blogs = [
  {
    id: 1,
    image: IMG1,
    title: "The impact of technology on commercial real estate",
    description:
      "Technology has become a foundation of almost every industry and commercial real estate (CRE) is no exception. Technology's impact on CRE is profound, from improving operations to transforming tenant experience.",
    date: "May 15, 2025",
    slug: "technology-impact-commercial-real-estate",
    content: [
      "Technology has become a foundation of almost every industry and commercial real estate (CRE) is no exception. Technology's impact on CRE is profound, from improving operations to transforming tenant experience.",
      "Smart building systems now allow property managers to monitor energy usage, security, and maintenance in real time. IoT sensors embedded throughout a building collect data that can predict equipment failures before they occur, dramatically reducing downtime and repair costs.",
      "Proptech platforms have streamlined the leasing process, enabling digital tours, e-signatures, and automated rent collection. Tenants no longer need to visit a property in person before making a decision — high-resolution virtual walkthroughs give a complete picture from anywhere in the world.",
      "Data analytics plays a growing role in site selection. Developers now use foot-traffic data, demographic trends, and macro-economic indicators to pinpoint the most profitable locations for new commercial developments. This data-driven approach reduces risk and improves return on investment.",
      "Looking ahead, artificial intelligence will continue to reshape how commercial properties are valued, marketed, and managed. Firms that embrace these tools early will hold a significant competitive advantage in the evolving real estate landscape.",
    ],
  },
  {
    id: 2,
    image: IMG2,
    title: "Top 5 factors to consider before buying property in Noida",
    description:
      "Buying a property is one of the most significant financial decisions of your life. In a dynamic market like Noida, there are five critical factors every buyer must evaluate before signing on the dotted line.",
    date: "May 10, 2025",
    slug: "top-5-factors-buying-property-noida",
    content: [
      "Buying a property is one of the most significant financial decisions of your life. In a dynamic market like Noida, there are five critical factors every buyer must evaluate before signing on the dotted line.",
      "Location is paramount. Proximity to metro stations, expressways, and employment hubs directly impacts both liveability and resale value. Sectors along the Noida-Greater Noida Expressway and the Aqua Line metro corridor have consistently outperformed in capital appreciation over the past five years.",
      "RERA registration is non-negotiable. Always verify that the project is registered with the Uttar Pradesh RERA authority before committing any funds. This protects you against project delays, fraudulent developers, and ensures your investment is backed by legal safeguards.",
      "Builder reputation and track record matter enormously. Research the developer's past projects, delivery timelines, construction quality, and customer reviews. A credible builder with a history of on-time delivery significantly reduces your investment risk.",
      "Future development plans in the surrounding area can either enhance or diminish the value of your purchase. Infrastructure projects like new metro lines, flyovers, or commercial hubs planned in the vicinity can substantially boost property prices in the medium term.",
    ],
  },
  {
    id: 3,
    image: IMG3,
    title: "Why Noida is the next real estate hotspot",
    description:
      "With world-class infrastructure, seamless metro connectivity, and rapidly appreciating property values, Noida has emerged as the most sought-after destination for both residential and commercial investment.",
    date: "May 5, 2025",
    slug: "noida-next-real-estate-hotspot",
    content: [
      "With world-class infrastructure, seamless metro connectivity, and rapidly appreciating property values, Noida has emerged as the most sought-after destination for both residential and commercial investment.",
      "The Yamuna Expressway corridor has unlocked massive development potential, with projects spanning luxury residences, IT parks, retail hubs, and logistics centres. Land prices along this stretch have appreciated by over 40% in the last three years alone.",
      "Noida's proximity to Delhi, combined with superior road networks and the upcoming Jewar International Airport, makes it an exceptionally attractive proposition for investors seeking long-term capital growth. The airport is expected to handle 70 million passengers annually at peak capacity.",
      "The city's administrative efficiency, transparent land acquisition policies, and investor-friendly governance have attracted major domestic and international developers. This institutional confidence further de-risks investments for individual buyers.",
      "For end-users, Noida offers an unmatched quality of life — wide green boulevards, top-tier schools and hospitals, premium retail destinations, and a rapidly expanding metro network that connects every major sector. Buying here today means securing tomorrow's most desirable address.",
    ],
  },
  {
    id: 4,
    image: IMG1,
    title: "How green architecture is shaping modern real estate",
    description:
      "Sustainability is no longer a niche trend — it has become a core driver of real estate development. Green architecture is reshaping how homes and offices are designed, built, and experienced.",
    date: "April 28, 2025",
    slug: "green-architecture-modern-real-estate",
    content: [
      "Sustainability is no longer a niche trend — it has become a core driver of real estate development. Green architecture is reshaping how homes and offices are designed, built, and experienced across India and the world.",
      "Green-certified buildings in India — rated by bodies like IGBC and GRIHA — command a rental premium of 10–20% over conventional properties. Energy efficiency, reduced water consumption, and healthier indoor environments make them attractive to both occupiers and investors.",
      "Developers are increasingly integrating solar panels, rainwater harvesting systems, grey water recycling, and natural ventilation into their projects. These features not only reduce the environmental footprint but also lower monthly utility costs for residents by up to 35%.",
      "Biophilic design — the practice of incorporating nature into built environments through vertical gardens, water features, and abundant natural light — has been shown to improve occupant well-being and productivity. It is becoming a standard expectation in premium residential and commercial projects.",
      "As climate consciousness grows among buyers and regulatory bodies tighten green building norms, developers who invest in sustainable design today will be best positioned to capture premium valuations and investor demand in the decade ahead.",
    ],
  },
  {
    id: 5,
    image: IMG2,
    title: "RERA compliance: What every homebuyer must know",
    description:
      "The Real Estate (Regulation and Development) Act transformed the Indian property market by bringing in much-needed transparency and accountability. Here is what every buyer needs to understand about RERA.",
    date: "April 20, 2025",
    slug: "rera-compliance-homebuyer-guide",
    content: [
      "The Real Estate (Regulation and Development) Act, 2016 transformed the Indian property market by bringing in much-needed transparency and accountability, protecting buyers from unscrupulous developers.",
      "Under RERA, all real estate projects above 500 sq. m. or with more than 8 units must be registered with the state RERA authority before marketing or selling. Buyers can verify any project's registration, approvals, and progress on the official RERA portal.",
      "Developers are now legally required to deposit 70% of collected funds in a designated escrow account, used solely for construction. This prevents the diversion of buyer funds to other projects — a common practice that had led to widespread project delays in the pre-RERA era.",
      "If a builder fails to deliver possession by the agreed date, buyers are entitled to a full refund with interest or monthly compensation for the delay period. This provision has significantly strengthened the bargaining position of homebuyers in disputes.",
      "Before purchasing any property, always check the RERA registration number on the state portal, review the approved building plans, and confirm the possession timeline. A RERA-registered project is not just a legal requirement — it is your most important shield as a buyer.",
    ],
  },
  {
    id: 6,
    image: IMG3,
    title: "Interior design trends dominating luxury homes in 2025",
    description:
      "From japandi minimalism to maximalist statement walls, the interior design landscape for luxury homes in 2025 is rich with personality, texture, and a renewed appreciation for craftsmanship.",
    date: "April 12, 2025",
    slug: "interior-design-trends-luxury-homes-2025",
    content: [
      "From japandi minimalism to maximalist statement walls, the interior design landscape for luxury homes in 2025 is rich with personality, texture, and a renewed appreciation for craftsmanship and natural materials.",
      "Warm, earthy tones are dominating the palette — terracotta, warm white, sage green, and deep walnut are replacing the cool greys and stark whites that defined the previous decade. These tones create a sense of comfort and groundedness that resonates with post-pandemic buyers prioritising wellness at home.",
      "Natural materials are having a renaissance. Travertine stone, rattan, solid wood, and handmade ceramics are appearing in kitchens, bathrooms, and living rooms as buyers increasingly prefer the organic imperfection of natural materials over polished synthetics.",
      "Smart home integration is now expected in the luxury segment. Voice-controlled lighting, motorised shading, climate control via smartphone, and integrated security systems are standard rather than premium features in high-end developments.",
      "Multi-functional spaces — home offices that double as libraries, dining areas that convert to entertainment spaces — reflect the enduring shift in how people use their homes. Clever storage solutions and furniture with dual purpose are key elements that luxury buyers are prioritising in 2025.",
    ],
  },
];

export const footerData = {
  description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
  menuLinks: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  contact: {
    phone: "+91 1234556",
    altPhone: "+91 9876543",
    email: "info@lotusss.com",
    website: "www.lotusss.com",
    address: "Sector 94, Noida",
    addressLine2: "New Jersey 45463",
  },
  socialLinks: [
    { platform: "twitter", href: "#", label: "Twitter" },
    { platform: "instagram", href: "#", label: "Instagram" },
    { platform: "facebook", href: "#", label: "Facebook" },
  ],
  socialTextLinks: [
    { label: "Lorem ipsum", href: "#" },
    { label: "Lorem ipsum dolor", href: "#" },
  ],
  whatsapp: "+911234556",
};
