import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "@/store/slices/gallerySlice";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import VideoModal from "@/components/VideoModal";

export default function Gallery() {
  const dispatch = useDispatch();
  const { photos, videos, status } = useSelector((s) => s.gallery);
  const [tab, setTab] = useState("photos");
  const [startIndex, setStartIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(fetchGallery());
  }, [status, dispatch]);

  const items = tab === "photos" ? photos : videos;
  const visible = items.slice(startIndex, startIndex + 2);

  const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 2));
  const handleNext = () => setStartIndex((prev) => prev + 2 < items.length ? prev + 2 : prev);
  const handleTabChange = (t) => { setTab(t); setStartIndex(0); };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div className="text-center mb-8" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-4xl font-normal text-gray-800 mb-3">Gallery</h2>
          <motion.span className="inline-block h-0.5" style={{ background: "#078DD4" }} initial={{ width: 0 }} whileInView={{ width: 56 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} />
          <div className="flex items-center justify-center gap-4 mt-6">
            {["photos", "videos"].map((t, i) => (
              <motion.button key={t} onClick={() => handleTabChange(t)}
                className="text-sm font-semibold transition-colors capitalize relative pb-1"
                style={{ color: tab === t ? "#111" : "#9ca3af" }}
                whileHover={{ y: -1 }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {tab === t && <motion.span layoutId="galleryTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800" />}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Nav Buttons */}
        <div className="flex gap-2 mb-5">
          {[{ fn: handlePrev, dis: startIndex === 0, path: "M9 2L4 7l5 5" }, { fn: handleNext, dis: startIndex + 2 >= items.length, path: "M5 2l5 5-5 5" }].map(({ fn, dis, path }, i) => (
            <motion.button key={i} onClick={fn} disabled={dis} whileHover={!dis ? { scale: 1.12, boxShadow: "0 6px 18px rgba(27,157,226,0.45)" } : {}} whileTap={!dis ? { scale: 0.9 } : {}}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white disabled:opacity-40"
              style={{ background: "#078DD4", boxShadow: "0 3px 10px rgba(27,157,226,0.3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d={path} stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${startIndex}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {visible.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                tab={tab}
                delay={i * 0.1}
                onVideoClick={tab === "videos" ? () => setActiveVideo(item) : undefined}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* View All */}
      <div className="flex justify-center mt-8">
        <Link href="/gallery">
          <motion.span
            className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-2.5 rounded-full cursor-pointer border-2"
            style={{ color: "#078DD4", borderColor: "#078DD4" }}
            whileHover={{ background: "#078DD4", color: "white", scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            View All Gallery
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </Link>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}

function GalleryCard({ item, tab, delay, onVideoClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay } } }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ height: "280px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onVideoClick}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.18)" }}
      transition={{ duration: 0.3 }}
    >
      <Image src={item.image || item.thumbnail} alt={item.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "rgba(27,157,226,0)" }}
        animate={{ opacity: hovered ? 1 : 0, background: hovered ? "rgba(27,157,226,0.75)" : "rgba(27,157,226,0)" }}
        transition={{ duration: 0.3 }}
      >
        <motion.div animate={{ scale: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
          {tab === "videos" ? (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="white" strokeWidth="2" /><polygon points="22,18 40,28 22,38" fill="white" />
            </svg>
          ) : (
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="2" />
              <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="2" />
              <line x1="30" y1="30" x2="38" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 60%, transparent)" }}>
        <span className="text-white text-base font-medium">{item.name}</span>
        <span className="text-white text-sm opacity-80">{item.location}</span>
      </div>
    </motion.div>
  );
}
