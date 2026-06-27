import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SEO from "@/components/SEO";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We collect information you provide directly to us when you fill out a contact form, make an enquiry, subscribe to our newsletter, or interact with our website. This includes your name, phone number, email address, and any message you submit.",
      "We also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This data is collected through cookies and similar tracking technologies.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use the information we collect to respond to your enquiries, provide you with details about our projects and services, send you updates and marketing communications (where you have consented), and improve our website's performance and user experience.",
      "We may use your contact details to reach out about properties that match your stated interests, schedule site visits, and keep you informed about new launches and offers from Lotusss.",
    ],
  },
  {
    title: "Sharing of Information",
    body: [
      "We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.",
      "We may disclose your information if required by law, or to protect our rights, property, or safety, or the rights, property, and safety of our users and the public.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how visitors interact with our site.",
      "You may disable cookies through your browser settings. However, please note that disabling cookies may affect the functionality of certain features on our website.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All data transmission on our website is encrypted using SSL technology.",
      "While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      "You have the right to access, correct, or delete the personal information we hold about you. You may also withdraw your consent to receive marketing communications at any time by contacting us or using the unsubscribe link in our emails.",
      "To exercise any of these rights, please contact us at info@lotusss.com. We will respond to your request within 30 business days.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of any significant changes by posting the revised policy on this page with an updated effective date.",
      "We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes your acceptance of the updated Privacy Policy.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:",
      "Lotusss Real Estate — Sector 94, Noida, Uttar Pradesh 201301 | Email: info@lotusss.com | Phone: +91 1234556",
    ],
  },
];

const FALLBACK_BANNER = "/images/modern-luxury-home-with-contemporary-architecture-wood-accents.png";

export default function PrivacyPolicy() {
  const dispatch = useDispatch();
  const { privacyPolicy: dynamicContent, pageBanners, fetched } = useSelector((s) => s.siteSettings);
  const bannerSrc = pageBanners?.privacyPolicy || FALLBACK_BANNER;

  useEffect(() => {
    if (!fetched) dispatch(fetchSiteSettings());
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <SEO title="Privacy Policy" description="Read Lotusss Real Estate's Privacy Policy — how we collect, use and protect your personal information." url="/privacy-policy" />
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "320px" }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={bannerSrc}
            alt="Privacy Policy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.58)" }} />
        </motion.div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
          <motion.h1
            className="text-white text-3xl md:text-5xl font-semibold px-4 text-center"
            style={{ letterSpacing: "0.15em" }}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.nav
            className="flex items-center gap-2 text-sm text-white/80"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="text-white/50">›</span>
            <span className="text-white/70">Privacy Policy</span>
          </motion.nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div className="mb-6" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span className="block h-0.5 mb-6" style={{ background: "#078DD4", width: 56 }} initial={{ scaleX: 0, transformOrigin: "left" }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} />
          </motion.div>

          {dynamicContent ? (
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: dynamicContent }} />
            </motion.div>
          ) : (
            <motion.div className="flex flex-col gap-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {sections.map((section, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">{i + 1}. {section.title}</h2>
                  <div className="flex flex-col gap-3">
                    {section.body.map((para, j) => (
                      <p key={j} className="text-gray-500 text-sm leading-relaxed">{para}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Back link */}
          <motion.div
            className="mt-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#078DD4" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="#078DD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
