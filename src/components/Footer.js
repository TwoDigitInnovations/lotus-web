import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FOOTER as footerData } from "@/data/fallback";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);
const YouTubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const socialIconMap = {
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  linkedin: <LinkedInIcon />,
  youtube: <YouTubeIcon />,
};

export default function Footer() {
  const dispatch = useDispatch();
  const { footer: apiFooter, fetched } = useSelector((s) => s.siteSettings);

  useEffect(() => {
    if (!fetched) dispatch(fetchSiteSettings());
  }, []);

  const description = apiFooter?.description || "";
  const phone = apiFooter?.phone || "";
  const email = apiFooter?.email || "";
  const address = apiFooter?.address || "";
  const whatsappNum = apiFooter?.whatsapp || "";

  const dynamicSocialLinks = apiFooter?.socialLinks
    ? Object.entries(apiFooter.socialLinks)
        .filter(([, href]) => href)
        .map(([platform, href]) => ({ platform, href, label: platform }))
    : [];

  return (
    <footer className="relative">
      <div className="h-1" style={{ background: "#078DD4" }} />

      <div className="bg-white py-12">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Logo */}
            <motion.div variants={fadeInUp}>
              <motion.div
                className="w-20 h-20 rounded-full overflow-hidden mb-4 shrink-0"
                // style={{ boxShadow: "0 4px 16px rgba(27,157,226,0.35)" }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 8px 24px rgba(27,157,226,0.5)",
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Lotusss Logo"
                  className="w-full h-full object-cover scale-[1.65]"
                />
              </motion.div>
              {description && (
                description.trim().startsWith("<")
                  ? <div className="rich-html text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
                  : <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              )}
            </motion.div>

            {/* Menu */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-gray-700 font-semibold text-base mb-4">
                Menu
              </h4>
              <ul className="flex flex-col gap-2.5">
                {footerData.menuLinks.map((link) => (
                  <li key={link.label}>
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-block"
                    >
                      <Link
                        href={link.href}
                        className="text-gray-500 text-sm hover:text-gray-700 transition"
                      >
                        {link.label}
                      </Link>
                    </motion.span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-gray-700 font-semibold text-base mb-4">
                Contact Us
              </h4>
              <ul className="flex flex-col gap-2.5">
                {phone && <li className="text-gray-500 text-sm">{phone}</li>}
                {email && <li className="text-gray-500 text-sm">{email}</li>}
                {address && (
                  <li className="text-gray-500 text-sm">{address}</li>
                )}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-gray-700 font-semibold text-base mb-4">
                Policies & Links
              </h4>
              <ul className="flex flex-col gap-2.5 mb-5">
                {footerData.socialTextLinks.map((link) => (
                  <li key={link.label}>
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-block"
                    >
                      <Link
                        href={link.href}
                        className="text-gray-500 text-sm hover:text-gray-700 transition"
                      >
                        {link.label}
                      </Link>
                    </motion.span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                {dynamicSocialLinks.map((s) => (
                  <motion.div
                    key={s.platform}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={s.href}
                      aria-label={s.label}
                      className="text-gray-500 hover:text-gray-700 transition"
                    >
                      {socialIconMap[s.platform] || null}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Lotusss Infra. All rights reserved.
          </p>
          <Link
            href="https://www.techonika.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-400 text-xs hover:text-gray-600 transition"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
            Website by <span className="font-semibold">Techonika</span>
          </Link>
        </div>
      </div>

      {/* WhatsApp floating button */}
      {whatsappNum && (
        <motion.a
          href={`https://wa.me/${whatsappNum}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50"
          style={{
            background: "#25d366",
            boxShadow: "0 6px 20px rgba(37,211,102,0.5)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          whileHover={{
            scale: 1.12,
            boxShadow: "0 10px 30px rgba(37,211,102,0.6)",
          }}
          whileTap={{ scale: 0.92 }}
        >
          <WhatsAppIcon />
        </motion.a>
      )}
    </footer>
  );
}
