import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "@/store/slices/gallerySlice";
import { fadeInUp } from "@/lib/animations";
import VideoModal from "@/components/VideoModal";

const PER_PAGE = 4;

export default function GalleryPage() {
  const dispatch = useDispatch();
  const { photos, videos, status } = useSelector((s) => s.gallery);
  const [tab, setTab] = useState("photos");
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(fetchGallery());
  }, [status, dispatch]);

  const items = tab === "photos" ? photos : videos;
  const totalPages = Math.ceil(items.length / PER_PAGE);
  const visible = items.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handlePrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage((p) => p - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage((p) => p + 1);
    }
  };
  const handleTab = (t) => {
    setTab(t);
    setPage(0);
    setDirection(1);
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "320px" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png"
            alt="Gallery"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.55)" }}
          />
        </motion.div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
          <motion.h1
            className="text-white text-4xl md:text-5xl font-semibold"
            style={{ letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Gallery
          </motion.h1>
          <motion.nav
            className="flex items-center gap-2 text-sm text-white/80"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="text-white/50">›</span>
            <span className="text-white/70">Gallery</span>
          </motion.nav>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            className="text-center mb-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-normal text-gray-800 mb-3">Gallery</h2>
            <motion.span
              className="inline-block h-0.5"
              style={{ background: "#078DD4" }}
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>

          {/* Controls: Arrows + Tabs */}
          <div className="flex items-center gap-5 mb-6">
            {/* Arrows */}
            <div className="flex gap-2">
              {[
                { fn: handlePrev, dis: page === 0, d: "M9 2L4 7l5 5" },
                {
                  fn: handleNext,
                  dis: page >= totalPages - 1,
                  d: "M5 2l5 5-5 5",
                },
              ].map(({ fn, dis, d }, i) => (
                <motion.button
                  key={i}
                  onClick={fn}
                  disabled={dis}
                  whileHover={
                    !dis
                      ? {
                          scale: 1.12,
                          boxShadow: "0 6px 18px rgba(7,141,212,0.45)",
                        }
                      : {}
                  }
                  whileTap={!dis ? { scale: 0.9 } : {}}
                  className="w-9 h-9 rounded-lg flex items-center justify-center disabled:opacity-40 transition-opacity"
                  style={{ background: "#078DD4" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d={d}
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1">
              {["photos", "videos"].map((t, i) => (
                <span key={t} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-gray-300 mx-2 select-none">|</span>
                  )}
                  <motion.button
                    onClick={() => handleTab(t)}
                    className="text-sm font-semibold relative pb-1 transition-colors"
                    style={{ color: tab === t ? "#111" : "#9ca3af" }}
                    whileHover={{ y: -1 }}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                    {tab === t && (
                      <motion.span
                        layoutId="galleryPageTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"
                      />
                    )}
                  </motion.button>
                </span>
              ))}
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${tab}-${page}`}
              custom={direction}
              initial={{ opacity: 0, y: direction * 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -direction * 30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {visible.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  tab={tab}
                  onVideoClick={
                    tab === "videos" ? () => setActiveVideo(item) : undefined
                  }
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  );
}

function GalleryCard({ item, tab, onVideoClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ height: "280px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onVideoClick}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.18)" }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={item.image || item.thumbnail}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "rgba(7,141,212,0)" }}
        animate={{
          opacity: hovered ? 1 : 0,
          background: hovered ? "rgba(7,141,212,0.75)" : "rgba(7,141,212,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ scale: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "videos" ? (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="white" strokeWidth="2" />
              <polygon points="22,18 40,28 22,38" fill="white" />
            </svg>
          ) : (
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="2" />
              <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="2" />
              <line
                x1="30"
                y1="30"
                x2="38"
                y2="38"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.div>
      </motion.div>

      {/* Label bar */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 60%, transparent)",
        }}
      >
        <span className="text-white text-base font-medium">{item.name}</span>
        <span className="text-white/80 text-sm">{item.location}</span>
      </div>
    </motion.div>
  );
}
