import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS as fallback } from "@/data/fallback";
import { fadeInUp, slideLeft } from "@/lib/animations";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";

export default function Testimonials() {
  const dispatch = useDispatch();
  const { testimonials: apiItems, fetched } = useSelector((s) => s.siteSettings);
  const items = apiItems.length > 0 ? apiItems : fallback;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!fetched) dispatch(fetchSiteSettings());
  }, []);

  const go = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + items.length) % items.length);
  };

  const item = items[current] || {};
  // Support both API shape (name/role/quote) and legacy siteData shape (name/role/text)
  const quote = item.quote || item.text || "";

  return (
    <section className="py-20" style={{ background: "#078DD4" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-white text-4xl font-normal mb-3">People Who Wished Us</h2>
          <motion.span className="inline-block h-0.5 bg-white/60 mb-12" initial={{ width: 0 }} whileInView={{ width: 56 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} />
        </motion.div>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Prev */}
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
              <motion.div key={current} custom={direction} variants={slideLeft} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center">

                {/* Avatar */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white/80 shadow-lg">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: "rgba(255,255,255,0.2)" }}>
                        {item.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                  {/* Quote mark badge */}
                  <div
                    className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[#078DD4] text-base font-black leading-none"
                    style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                  >
                    ❝
                  </div>
                </div>

                {/* Quote */}
                {quote?.trim().startsWith("<")
                  ? <div className="rich-html-white text-base md:text-lg leading-relaxed mb-6 italic" dangerouslySetInnerHTML={{ __html: quote }} />
                  : <p className="text-white text-base md:text-lg leading-relaxed mb-6 italic">&ldquo;{quote}&rdquo;</p>
                }

                {/* Stars */}
                {item.rating > 0 && (
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < item.rating ? "white" : "rgba(255,255,255,0.3)"}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                )}

                {/* Name + role */}
                <p className="text-white font-semibold text-base mb-0.5">{item.name}</p>
                <p className="text-white/70 text-sm">{item.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
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
          {items.map((_, i) => (
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
