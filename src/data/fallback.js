// Single source of all static fallback data for the website.
// These values are shown when the API is unavailable or returns empty data.
// All exports use UPPER_SNAKE_CASE to distinguish fallback constants from API data.

const IMG_LUXURY =
  "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png";

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
// Only static site navigation lives here — content fields (description, contact
// info, social links) come from the API with no fallback; see Footer.js.

export const FOOTER = {
  menuLinks: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  socialTextLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

// ─── About — Hero ─────────────────────────────────────────────────────────────

export const ABOUT_HERO = {
  image: IMG_LUXURY,
  title: "ABOUT US",
  breadcrumb: ["Home", "About Us"],
};
