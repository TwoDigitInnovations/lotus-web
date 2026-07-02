import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, fetchProjects } from "@/store/slices/projectSlice";
import { STATS as statsFallback } from "@/data/fallback";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import VideoModal from "@/components/VideoModal";

const fallbackDocIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </svg>
);

const docIcons = {
  "FLOOR PLAN": (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  "MASTER PLAN": (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  BROCHURE: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  ),
  "COMPLETION CERTIFICATE": (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      <path d="M9 8l2 2 4-4" />
    </svg>
  ),
};

function GallerySection({ gallery }) {
  const [tab, setTab] = useState("photos");
  const [startIndex, setStartIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const items = tab === "photos" ? gallery.photos : gallery.videos;
  const visible = items.slice(startIndex, startIndex + 2);

  const handlePrev = () => setStartIndex((p) => Math.max(0, p - 2));
  const handleNext = () =>
    setStartIndex((p) => (p + 2 < items.length ? p + 2 : p));
  const handleTab = (t) => {
    setTab(t);
    setStartIndex(0);
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">Gallery</h2>
          <motion.span
            className="inline-block h-0.5"
            style={{ background: "#078DD4" }}
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <div className="flex items-center justify-center gap-1 mt-5">
            {["photos", "videos"].map((t, i) => (
              <span key={t} className="flex items-center gap-1">
                {i > 0 && <span className="text-gray-300 mx-1">|</span>}
                <motion.button
                  onClick={() => handleTab(t)}
                  className="text-sm font-semibold relative pb-1 capitalize"
                  style={{ color: tab === t ? "#111" : "#9ca3af" }}
                  whileHover={{ y: -1 }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                  {tab === t && (
                    <motion.span
                      layoutId="projGalleryTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"
                    />
                  )}
                </motion.button>
              </span>
            ))}
          </div>
        </motion.div>

        <div className="flex gap-2 mb-5">
          {[
            { fn: handlePrev, dis: startIndex === 0, path: "M9 2L4 7l5 5" },
            {
              fn: handleNext,
              dis: startIndex + 2 >= items.length,
              path: "M5 2l5 5-5 5",
            },
          ].map(({ fn, dis, path }, i) => (
            <motion.button
              key={i}
              onClick={fn}
              disabled={dis}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white disabled:opacity-40"
              style={{
                background: "#078DD4",
                boxShadow: "0 3px 10px rgba(27,157,226,0.3)",
              }}
              whileHover={
                !dis
                  ? {
                      scale: 1.12,
                      boxShadow: "0 6px 18px rgba(27,157,226,0.45)",
                    }
                  : {}
              }
              whileTap={!dis ? { scale: 0.9 } : {}}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d={path}
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${startIndex}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
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
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}

function GalleryCard({ item, tab, onVideoClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ height: "240px" }}
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
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "rgba(27,157,226,0)" }}
        animate={{
          opacity: hovered ? 1 : 0,
          background: hovered ? "rgba(27,157,226,0.75)" : "rgba(27,157,226,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ scale: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "videos" ? (
            <svg width="50" height="50" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="white" strokeWidth="2" />
              <polygon points="22,18 40,28 22,38" fill="white" />
            </svg>
          ) : (
            <svg width="46" height="46" viewBox="0 0 52 52" fill="none">
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
      <div
        className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 60%, transparent)",
        }}
      >
        <span className="text-white text-sm font-medium">{item.name}</span>
        <span className="text-white text-xs opacity-80">{item.location}</span>
      </div>
    </motion.div>
  );
}

export default function ProjectOverview() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { byId, list, loading } = useSelector((s) => s.project);
  const { stats: apiStats, fetched: settingsFetched } = useSelector(
    (s) => s.siteSettings,
  );
  const lotusssStats = apiStats.length > 0 ? apiStats : statsFallback;

  const project =
    byId[id] || list.find((p) => String(p.id) === String(id)) || null;

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProjectById(id));
    if (!list.length) dispatch(fetchProjects());
  }, [id]);

  useEffect(() => {
    if (!settingsFetched) dispatch(fetchSiteSettings());
  }, [settingsFetched, dispatch]);

  if (!id || (!project && loading)) {
    return (
      <main className="bg-white min-h-screen">
        <div
          className="w-full bg-gray-200 animate-pulse"
          style={{ height: "320px" }}
        />
        <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col gap-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="bg-white min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Project not found.</p>
        <Link
          href="/projects"
          className="text-sm font-semibold"
          style={{ color: "#078DD4" }}
        >
          ← Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero Banner */}
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
            src={project.image}
            alt={project.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.52)" }}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <span className="text-white text-2xl font-semibold">
            {project.name}
          </span>
          <span className="text-white/80 text-sm">{project.location}</span>
        </motion.div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
          <motion.h1
            className="text-white text-4xl md:text-5xl font-semibold"
            style={{ letterSpacing: "0.1em" }}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Project Overview
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
            <Link href="/projects" className="hover:text-white transition">
              Projects
            </Link>
            <span className="text-white/50">›</span>
            <span className="text-white/70">Overview</span>
          </motion.nav>
        </div>
      </section>

      {/* Project Overview Text */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Project Overview
            </h2> */}
            <motion.span
              className="inline-block h-0.5 mb-8"
              style={{ background: "#078DD4" }}
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <div
              className="rich-html text-gray-500 text-sm leading-relaxed text-left"
              dangerouslySetInnerHTML={{ __html: project.overview }}
            />
          </motion.div>
        </div>
      </section>

      {/* Documents */}
      {project.documents.length > 0 && (
        <section className="pb-14 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {project.documents.map((doc) => (
                <motion.a
                  key={doc.label}
                  href={doc.url}
                  variants={fadeInUp}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "#078DD4",
                      boxShadow: "0 4px 16px rgba(27,157,226,0.35)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 8px 24px rgba(27,157,226,0.5)",
                    }}
                  >
                    {docIcons[doc.label] || fallbackDocIcon}
                  </motion.div>
                  <span className="text-xs font-bold tracking-widest text-gray-700 flex items-center gap-1">
                    {doc.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="#078DD4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 1v7M2 5l4 4 4-4M1 11h10" />
                    </svg>
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <GallerySection gallery={project.gallery} />

      {/* Location */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Location
            </h2>
            <motion.span
              className="inline-block h-0.5 mb-8"
              style={{ background: "#078DD4" }}
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>
          <motion.div
            className="relative w-full rounded-2xl overflow-hidden mb-8"
            style={{ height: "260px" }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src={project.image}
              alt="Location map"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <motion.button
                className="px-8 py-3 rounded-full text-white text-sm font-semibold"
                style={{
                  background: "#078DD4",
                  boxShadow: "0 4px 16px rgba(27,157,226,0.4)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 24px rgba(27,157,226,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Book a Site Visit
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About City */}
      {project.aboutCity?.name && (
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                About {project.aboutCity.name}
              </h2>
              <motion.span
                className="inline-block h-0.5 mb-6"
                style={{ background: "#078DD4" }}
                initial={{ width: 0 }}
                whileInView={{ width: 56 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <div
                className="rich-html text-gray-500 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.aboutCity.text }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* About Sector */}
      {project.aboutSector?.name && (
        <section className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                About {project.aboutSector.name}
              </h2>
              <motion.span
                className="inline-block h-0.5 mb-6"
                style={{ background: "#078DD4" }}
                initial={{ width: 0 }}
                whileInView={{ width: 56 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <div
                className="rich-html text-gray-500 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.aboutSector.text }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* About Lotusss */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              About Lotusss
            </h2>
            <motion.span
              className="inline-block h-0.5 mb-6"
              style={{ background: "#078DD4" }}
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              LOTUSSS is a premier real estate developer committed to delivering
              iconic projects across residential, commercial, and mixed-use
              spaces. With a legacy of excellence spanning decades, we have set
              new benchmarks in design, quality, and customer trust across Noida
              and NCR.
            </p>
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {lotusssStats.map((stat) => (
                <motion.div
                  key={stat.value}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <p
                    className="font-bold text-base leading-snug"
                    style={{ color: "#078DD4" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm whitespace-pre-line">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {project.reraNumber && (
        <section className="py-8" style={{ background: "#078DD4" }}>
          <div className="text-center">
            <p className="text-white font-bold text-sm tracking-widest mb-1">
              RERA NUMBER
            </p>
            <p className="text-white text-sm mb-1">{project.reraNumber}</p>
            <a
              href={project.reraUrl}
              className="text-white/80 text-xs underline hover:text-white transition"
            >
              {project.reraUrl}
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
