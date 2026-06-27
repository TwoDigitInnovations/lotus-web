import Head from "next/head";

const SITE = "Lotusss Real Estate";
const SITE_URL = "https://lotusssinfra.com";
const DEFAULT_DESC =
  "Lotusss Real Estate — Premium residential and commercial properties in Noida. Luxury apartments, villas, plots and office spaces in Sector 150, 94, 79 and across the Noida Expressway corridor.";
const DEFAULT_IMAGE = `${SITE_URL}/images/logo.png`;
const KEYWORDS =
  "real estate Noida, luxury apartments Noida, residential projects Noida, commercial property Noida, villas Noida, plots Yamuna Expressway, 3 BHK Noida, ready to move flats Noida, Lotusss Infra, best builder Noida, RERA registered Noida";

export default function SEO({ title, description, image, url, type = "website" }) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} — Luxury Properties in Noida`;
  const desc = description || DEFAULT_DESC;
  const img = image || DEFAULT_IMAGE;
  const canonical = `${SITE_URL}${url || ""}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="author" content={SITE} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {/* Extra */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Noida, Uttar Pradesh" />
    </Head>
  );
}
