import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.lotusssinfra.com/";

const sections = [
  {
    title: "Acceptance of Terms",
    body: [
      "By accessing or using the Lotusss website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.",
      "We reserve the right to update or modify these Terms of Service at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the revised terms.",
    ],
  },
  {
    title: "Use of Website",
    body: [
      "You may use our website solely for lawful purposes and in accordance with these Terms. You agree not to use the website in any way that violates applicable local, national, or international laws or regulations.",
      "You must not transmit any unsolicited or unauthorised advertising material, attempt to gain unauthorised access to any part of the website, or engage in any conduct that restricts or inhibits anyone's use or enjoyment of the site.",
    ],
  },
  {
    title: "Property Information & Accuracy",
    body: [
      "All property details, pricing, floor plans, specifications, and images displayed on this website are for informational and marketing purposes only. While we make every effort to ensure accuracy, Lotusss does not warrant that any information on the website is complete, current, or free of errors.",
      "Prices and availability are subject to change without notice. Final details of any property transaction are governed solely by the legally executed sale agreement between the buyer and Lotusss.",
    ],
  },
  {
    title: "Enquiries & Contact Forms",
    body: [
      "When you submit an enquiry through our contact forms or request a callback, you consent to being contacted by our sales team via phone, email, or WhatsApp for the purpose of addressing your query and sharing relevant property information.",
      "Submitting an enquiry does not constitute a booking or reservation of any property. Any such commitment must be formalised through a signed agreement and payment of applicable booking amounts.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "All content on this website — including text, images, graphics, logos, project renderings, video walkthroughs, and design elements — is the exclusive property of Lotusss and is protected under applicable intellectual property laws.",
      "You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any content from this website without prior written permission from Lotusss.",
    ],
  },
  {
    title: "Third-Party Links",
    body: [
      "Our website may contain links to third-party websites, including RERA portals, financial institutions, and partner services. These links are provided for your convenience only. Lotusss has no control over the content of those sites and accepts no responsibility for them.",
      "The inclusion of any link does not imply endorsement by Lotusss of the linked site. Use of any such third-party website is at your own risk.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Lotusss shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of (or inability to access or use) this website or any content on it.",
      "This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if Lotusss has been advised of the possibility of such damage.",
    ],
  },
  {
    title: "Governing Law",
    body: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Gautam Buddh Nagar, Uttar Pradesh.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "If you have any questions about these Terms of Service, please contact us at:",
      "Lotusss Real Estate — Sector 94, Noida, Uttar Pradesh 201301 | Email: info@lotusss.com | Phone: +91 1234556",
    ],
  },
];

export default function TermsOfService() {
  const [dynamicContent, setDynamicContent] = useState(null);

  useEffect(() => {
    axios.get(`${API}site-settings`).then((res) => {
      const c = res.data?.data?.data?.termsOfService;
      if (c) setDynamicContent(c);
    }).catch(() => {});
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "320px" }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src="/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png"
            alt="Terms of Service"
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
            Terms of Service
          </motion.h1>
          <motion.nav
            className="flex items-center gap-2 text-sm text-white/80"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="text-white/50">›</span>
            <span className="text-white/70">Terms of Service</span>
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
