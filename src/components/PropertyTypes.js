import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyTypes } from "@/store/slices/propertyTypeSlice";

export default function PropertyTypes() {
  const dispatch = useDispatch();
  const { types, fetched } = useSelector((s) => s.propertyType);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!fetched) dispatch(fetchPropertyTypes());
  }, []);

  const total = types.length;

  const goTo = (next) => {
    setDirection(next > current ? 1 : -1);
    setCurrent((next + total) % total);
  };

  const cardA = types[current % total];
  const cardB = types[(current + 1) % total];
  const mobileCard = types[current % total];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          {/* Left Arrow */}
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              onClick={() => goTo(current - 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#078DD4", boxShadow: "0 4px 14px rgba(27,157,226,0.45)" }}
              whileHover={{ scale: 1.12, boxShadow: "0 6px 20px rgba(27,157,226,0.6)" }}
              whileTap={{ scale: 0.88 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>

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
          <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              onClick={() => goTo(current + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#078DD4", boxShadow: "0 4px 14px rgba(27,157,226,0.45)" }}
              whileHover={{ scale: 1.12, boxShadow: "0 6px 20px rgba(27,157,226,0.6)" }}
              whileTap={{ scale: 0.88 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {types.map((_, i) => (
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
