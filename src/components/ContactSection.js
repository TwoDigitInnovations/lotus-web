import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { submitContact, resetContact } from "@/store/slices/contactSlice";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/lib/animations";

const EMPTY = { name: "", phone: "", subject: "", message: "" };

export default function ContactSection() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.contact);
  const [form, setForm] = useState(EMPTY);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.subject.trim() || !form.message.trim()) return;
    dispatch(submitContact(form));
    setForm(EMPTY);
  };

  const fields = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "phone", type: "tel", placeholder: "Phone Number" },
    { name: "subject", type: "text", placeholder: "Subject..." },
  ];

  return (
    <section id="contact" className="py-16" style={{ background: "#078DD4" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left: Form Card */}
          <motion.div
            className="lg:w-5/12 rounded-2xl p-8 flex flex-col"
            style={{ background: "#1a2e44" }}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-white text-3xl font-normal mb-2">
              Partner With Us
            </h2>
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
                  <p className="text-white/70 text-sm text-center">We&apos;ll get back to you shortly.</p>
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
                  className="flex flex-col gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {fields.map((f) => (
                    <motion.input
                      key={f.name}
                      variants={fadeInUp}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-white/25 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none transition"
                      whileFocus={{ borderColor: "rgba(255,255,255,0.7)", boxShadow: "0 0 0 2px rgba(255,255,255,0.1)" }}
                    />
                  ))}
                  <motion.textarea
                    variants={fadeInUp}
                    name="message"
                    placeholder="Write Your Message Here..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border border-white/25 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none transition resize-none"
                    whileFocus={{ borderColor: "rgba(255,255,255,0.7)", boxShadow: "0 0 0 2px rgba(255,255,255,0.1)" }}
                  />
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
                    className="w-full bg-white text-gray-800 font-semibold py-3 rounded-full text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={status !== "loading" ? { scale: 1.03, boxShadow: "0 8px 24px rgba(255,255,255,0.25)" } : {}}
                    whileTap={status !== "loading" ? { scale: 0.97 } : {}}
                  >
                    {status === "loading" ? "Sending..." : "Submit"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="lg:flex-1 relative rounded-2xl overflow-hidden min-h-64"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png"
              alt="Noida city aerial view"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
