import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { propertyTypes } from "@/data/siteData";

const total = propertyTypes.length;

export default function PropertyTypes() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next) => {
    setDirection(next > current ? 1 : -1);
    setCurrent((next + total) % total);
  };

  // Desktop: show card at `current` and the one after it
  const cardA = propertyTypes[current % total];
  const cardB = propertyTypes[(current + 1) % total];

  // Mobile: show only `current`
  const mobileCard = propertyTypes[current % total];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          {/* Left Arrow */}
          <motion.button
            onClick={() => goTo(current - 1)}
            className="absolute left-0 top-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              transform: "translateY(-50%) translateX(-50%)",
              background: "#078DD4",
              boxShadow: "0 4px 14px rgba(27,157,226,0.45)",
            }}
            whileHover={{ scale: 1.12, boxShadow: "0 6px 20px rgba(27,157,226,0.6)" }}
            whileTap={{ scale: 0.88 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          {/* Desktop: 2 cards side by side */}
          <div className="hidden md:block" style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex gap-5"
              >
                <div className="flex-1">
                  <PropertyCard type={cardA} />
                </div>
                <div className="flex-1">
                  <PropertyCard type={cardB} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: 1 card */}
          <div className="md:hidden" style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 80 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <PropertyCard type={mobileCard} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={() => goTo(current + 1)}
            className="absolute right-0 top-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              transform: "translateY(-50%) translateX(50%)",
              background: "#078DD4",
              boxShadow: "0 4px 14px rgba(27,157,226,0.45)",
            }}
            whileHover={{ scale: 1.12, boxShadow: "0 6px 20px rgba(27,157,226,0.6)" }}
            whileTap={{ scale: 0.88 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {propertyTypes.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            animate={{
              width: i === current % total ? "24px" : "10px",
              background: i === current % total ? "#078DD4" : "#d1d5db",
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full h-2.5"
          />
        ))}
      </div>
    </section>
  );
}

function PropertyCard({ type }) {
  return (
    <motion.div
      className="w-full relative rounded-2xl overflow-hidden"
      style={{ height: "340px" }}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}
      transition={{ duration: 0.35 }}
    >
      <Image
        src={type.image}
        alt={type.label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="border-2 border-white rounded-2xl px-8 py-3"
          style={{ background: "rgba(255,255,255,0.08)" }}
          whileHover={{ background: "rgba(255,255,255,0.18)", scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-white text-lg font-light tracking-[0.25em]"
          >
            {type.label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
