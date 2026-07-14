import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { submitContact, resetContact } from "@/store/slices/contactSlice";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SEO from "@/components/SEO";

const ENQUIRY_TYPES = ["Partner Enquiry", "General/Sales Enquiry"];

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "", enquiryType: ENQUIRY_TYPES[1] };

function validate(form) {
  const e = {};
  if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your name";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address";
  if (!form.phone.trim() || !/^\d{7,15}$/.test(form.phone.trim())) e.phone = "Phone number must be 7–15 digits (numbers only)";
  if (!ENQUIRY_TYPES.includes(form.enquiryType)) e.enquiryType = "Please select an enquiry type";
  if (!form.subject.trim()) e.subject = "Please enter a subject";
  if (!form.message.trim()) e.message = "Please write your message";
  return e;
}

export default function ContactPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.contact);
  const { footer: apiFooter, pageBanners, fetched } = useSelector((s) => s.siteSettings);
  const bannerSrc = pageBanners?.contact || "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png";

  useEffect(() => {
    if (!fetched) dispatch(fetchSiteSettings());
  }, []);

  const contact = {
    phone: apiFooter?.phone || "",
    altPhone: apiFooter?.altPhone || "",
    email: apiFooter?.email || "",
    website: apiFooter?.website || "",
    address: apiFooter?.address || "",
    addressLine2: apiFooter?.addressLine2 || "",
  };
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleaned = name === "phone" ? value.replace(/\D/g, "").slice(0, 15) : value;
    setForm((prev) => ({ ...prev, [name]: cleaned }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    dispatch(submitContact(form));
    setForm(EMPTY);
  };

  const infoItems = [
    {
      label: "Call Now",
      lines: [contact.phone, contact.altPhone],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
        </svg>
      ),
    },
    {
      label: "Email Address",
      lines: [contact.email, contact.website],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: "Location",
      lines: [contact.address, contact.addressLine2],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  const fields = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "tel", placeholder: "Phone Number" },
    { name: "subject", type: "text", placeholder: "Subject..." },
  ];

  return (
    <main>
      <SEO
        title="Contact Us"
        description="Get in touch with Lotusss Real Estate. Visit our office in Sector 94, Noida or call us to schedule a site visit, enquire about projects or speak with our sales team."
        url="/contact"
      />
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden" style={{ height: "320px" }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src={bannerSrc}
            alt="Contact"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
        </motion.div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
          <motion.h1
            className="text-white text-3xl md:text-5xl font-semibold px-4 text-center"
            style={{ letterSpacing: "0.15em" }}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Contact
          </motion.h1>
          <motion.nav
            className="flex items-center gap-2 text-sm text-white/80"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="text-white/50">›</span>
            <span className="text-white/70">Contact</span>
          </motion.nav>
        </div>
      </section>

      {/* Form + Image — overflow-hidden prevents x-animation overflow on mobile */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Form Card */}
            <motion.div
              className="lg:w-5/12 rounded-2xl p-8 flex flex-col"
              style={{ background: "#1a2e44" }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <h2 className="text-white text-3xl font-normal mb-2">Get in touch with us</h2>
              <span className="block w-12 h-0.5 bg-white/40 mb-7" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center gap-4 py-8"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-white text-xl font-semibold text-center">Message Sent!</p>
                    <p className="text-white/70 text-sm text-center">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                    <motion.button
                      onClick={() => dispatch(resetContact())}
                      className="mt-2 text-white/60 text-sm underline underline-offset-2"
                      whileHover={{ color: "rgba(255,255,255,0.9)" }}
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {fields.map((f) => (
                      <motion.div key={f.name} variants={fadeInUp} className="flex flex-col gap-1">
                        <input
                          type={f.type}
                          name={f.name}
                          placeholder={f.placeholder}
                          value={form[f.name]}
                          onChange={handleChange}
                          className="w-full bg-transparent rounded-lg px-4 py-3 text-white text-sm outline-none transition-all"
                          style={{
                            border: `1px solid ${errors[f.name] ? "rgba(252,165,165,0.7)" : "rgba(255,255,255,0.25)"}`,
                          }}
                          onFocus={(e) => { e.target.style.borderColor = errors[f.name] ? "rgba(252,165,165,0.9)" : "rgba(255,255,255,0.7)"; }}
                          onBlur={(e) => { e.target.style.borderColor = errors[f.name] ? "rgba(252,165,165,0.7)" : "rgba(255,255,255,0.25)"; }}
                        />
                        {errors[f.name] && (
                          <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-xs px-1"
                          >
                            {errors[f.name]}
                          </motion.span>
                        )}
                      </motion.div>
                    ))}

                    <motion.div variants={fadeInUp} className="flex flex-col gap-1">
                      <select
                        name="enquiryType"
                        value={form.enquiryType}
                        onChange={handleChange}
                        className="w-full bg-transparent rounded-lg px-4 py-3 text-white text-sm outline-none transition-all"
                        style={{
                          border: `1px solid ${errors.enquiryType ? "rgba(252,165,165,0.7)" : "rgba(255,255,255,0.25)"}`,
                        }}
                        onFocus={(e) => { e.target.style.borderColor = errors.enquiryType ? "rgba(252,165,165,0.9)" : "rgba(255,255,255,0.7)"; }}
                        onBlur={(e) => { e.target.style.borderColor = errors.enquiryType ? "rgba(252,165,165,0.7)" : "rgba(255,255,255,0.25)"; }}
                      >
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t} value={t} style={{ color: "#1a2e44" }}>{t}</option>
                        ))}
                      </select>
                      {errors.enquiryType && (
                        <motion.span
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-300 text-xs px-1"
                        >
                          {errors.enquiryType}
                        </motion.span>
                      )}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="flex flex-col gap-1">
                      <textarea
                        name="message"
                        placeholder="Write Your Message Here..."
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-transparent rounded-lg px-4 py-3 text-white text-sm outline-none resize-none transition-all"
                        style={{
                          border: `1px solid ${errors.message ? "rgba(252,165,165,0.7)" : "rgba(255,255,255,0.25)"}`,
                        }}
                        onFocus={(e) => { e.target.style.borderColor = errors.message ? "rgba(252,165,165,0.9)" : "rgba(255,255,255,0.7)"; }}
                        onBlur={(e) => { e.target.style.borderColor = errors.message ? "rgba(252,165,165,0.7)" : "rgba(255,255,255,0.25)"; }}
                      />
                      {errors.message && (
                        <motion.span
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-300 text-xs px-1"
                        >
                          {errors.message}
                        </motion.span>
                      )}
                    </motion.div>

                    {status === "error" && error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-300 text-xs px-1 -mt-1"
                      >
                        {error}
                      </motion.p>
                    )}

                    <motion.button
                      variants={fadeInUp}
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-white text-gray-800 font-semibold py-3 rounded-full text-sm mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={status !== "loading" ? { scale: 1.03, boxShadow: "0 8px 24px rgba(255,255,255,0.25)" } : {}}
                      whileTap={status !== "loading" ? { scale: 0.97 } : {}}
                    >
                      {status === "loading" ? "Sending..." : "Submit"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Image */}
            <motion.div
              className="lg:flex-1 relative rounded-2xl overflow-hidden min-h-64"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <Image
                src={bannerSrc}
                alt="Contact"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Need More Help */}
      <section className="py-14" style={{ background: "#078DD4" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-white/20 mb-12" />

          <motion.h2
            className="text-white text-2xl font-semibold text-center mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Need more help?
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {infoItems.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                className="flex flex-col items-center text-center gap-3"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  {item.icon}
                </div>
                <p className="text-white font-semibold text-base">{item.label}</p>
                {item.lines.filter(Boolean).map((line, i) => (
                  <p key={i} className="text-white/80 text-sm">{line}</p>
                ))}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden w-full"
            style={{ height: "280px" }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src={bannerSrc}
              alt="Location map"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
