import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/siteData";
import { fadeInUp, slideLeft } from "@/lib/animations";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir) => { setDirection(dir); setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length); };

  const item = testimonials[current];

  return (
    <section className="py-20" style={{ background: "#078DD4" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-white text-4xl font-normal mb-3">
            People Who Wished Us
          </h2>
          <motion.span className="inline-block h-0.5 bg-white/60 mb-12" initial={{ width: 0 }} whileInView={{ width: 56 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} />
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.button
            onClick={() => go(-1)}
            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.2)", boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center text-white shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.button>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideLeft}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="text-white text-lg leading-relaxed mb-8" style={{ fontStyle: "italic" }}>
                  {item.text}
                </p>
                <p className="text-white font-semibold text-base mb-1">{item.name}</p>
                <p className="text-white/70 text-sm">{item.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={() => go(1)}
            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.2)", boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center text-white shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              animate={{ width: i === current ? "24px" : "10px", background: i === current ? "white" : "rgba(255,255,255,0.4)" }}
              transition={{ duration: 0.3 }}
              className="rounded-full h-2.5"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
