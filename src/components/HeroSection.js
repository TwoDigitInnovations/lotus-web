import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/data/siteData";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section id="home" className="relative w-full h-screen min-h-150 overflow-hidden">
      {/* Background Image with fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Mobile: bottom gradient so text at top/center is readable */}
          <div
            className="absolute inset-0 md:hidden"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 100%)" }}
          />
          {/* Desktop: left-heavy gradient for side text layout */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.25) 100%)" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial="hidden" animate="visible">
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } } }}
                className="text-white text-base font-light tracking-wider mb-3"
              >
                {slide.subtitle}
              </motion.p>
              <motion.h1
                variants={{ hidden: { opacity: 0, x: -70, filter: "blur(4px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.75, delay: 0.35, ease: "easeOut" } } }}
                className="text-white leading-tight mb-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600 }}
              >
                {slide.title}
              </motion.h1>
              <motion.h1
                variants={{ hidden: { opacity: 0, x: -70, filter: "blur(4px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.75, delay: 0.5, ease: "easeOut" } } }}
                className="leading-tight mb-8"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, color: "#078DD4" }}
              >
                {slide.highlight}
              </motion.h1>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.7 } } }}
              >
                <Link href="/about">
                  <motion.span
                    whileHover={{ scale: 1.07, boxShadow: "0 10px 30px rgba(7,141,212,0.55)" }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 text-white text-sm font-semibold px-7 py-3.5 rounded-full cursor-pointer"
                    style={{ background: "#078DD4", boxShadow: "0 4px 18px rgba(7,141,212,0.4)" }}
                  >
                    Read More
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{ width: i === current ? "28px" : "10px", background: i === current ? "#fff" : "rgba(255,255,255,0.5)" }}
            transition={{ duration: 0.35 }}
            className="rounded-full h-2.5"
          />
        ))}
      </div>
    </section>
  );
}
