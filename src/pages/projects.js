import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/store/slices/projectSlice";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SEO from "@/components/SEO";
import EmptyState from "@/components/EmptyState";

const PER_PAGE = 4;
const FALLBACK_BANNER = "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { list: projects, loading, fetched } = useSelector((s) => s.project);
  const { pageBanners, fetched: settingsFetched } = useSelector((s) => s.siteSettings);
  const bannerSrc = pageBanners?.projects || FALLBACK_BANNER;

  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
  const FILTERS = ["All", ...categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1))];

  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!fetched && !loading) dispatch(fetchProjects());
  }, [fetched, loading, dispatch]);

  useEffect(() => {
    if (!settingsFetched) dispatch(fetchSiteSettings());
  }, [settingsFetched, dispatch]);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter.toLowerCase());

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f) => {
    setActiveFilter(f);
    setPage(1);
  };

  const goPage = (next) => {
    if (next < 1 || next > totalPages) return;
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  return (
    <main>
      <SEO
        title="Projects"
        description="Explore Lotusss Real Estate's portfolio of luxury residential and commercial projects in Noida — 3 BHK apartments, villas, office spaces and more across prime sectors."
        url="/projects"
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
            alt="Projects"
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
            Projects
          </motion.h1>
          <motion.nav
            className="flex items-center gap-2 text-sm text-white/80"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="text-white/50">›</span>
            <span className="text-white/70">Projects</span>
          </motion.nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter Tabs */}
          <motion.div
            className="flex justify-end gap-6 mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => handleFilter(f)}
                className="text-sm relative pb-1 transition-colors"
                style={{
                  color: activeFilter === f ? "#078DD4" : "#9ca3af",
                  fontWeight: activeFilter === f ? 600 : 400,
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {f}
                {activeFilter === f && (
                  <motion.span
                    layoutId="projectFilter"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: "#078DD4" }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Cards */}
          <div style={{ minHeight: "600px" }}>
            {fetched && filtered.length === 0 ? (
              <EmptyState message="No projects available yet." />
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${activeFilter}-${page}`}
                  custom={direction}
                  initial={{ opacity: 0, y: direction * 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -direction * 40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col gap-5"
                >
                  {visible.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-gray-100"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Home icon */}
              <Link href="/">
                <motion.div
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400"
                  whileHover={{ borderColor: "#078DD4", color: "#078DD4", scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </motion.div>
              </Link>

              {/* Prev */}
              <motion.button
                onClick={() => goPage(page - 1)}
                disabled={page === 1}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 disabled:opacity-30"
                whileHover={page > 1 ? { borderColor: "#078DD4", color: "#078DD4", scale: 1.08 } : {}}
                transition={{ duration: 0.2 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>

              {/* Page indicator */}
              <span className="text-gray-500 text-sm font-medium px-2">
                {page} of {totalPages}
              </span>

              {/* Next */}
              <motion.button
                onClick={() => goPage(page + 1)}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 disabled:opacity-30"
                whileHover={page < totalPages ? { borderColor: "#078DD4", color: "#078DD4", scale: 1.08 } : {}}
                transition={{ duration: 0.2 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        className="relative rounded-2xl overflow-hidden w-full cursor-pointer"
        style={{ height: "450px" }}
        whileHover={{ scale: 1.01, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
        transition={{ duration: 0.3 }}
      >
        <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
          <div>
            <h3 className="text-white text-2xl font-semibold mb-3">{project.name}</h3>
            <div className="flex flex-col gap-0.5">
              <p className="text-white text-sm"><span className="font-semibold">Location: </span>{project.location}</p>
              <p className="text-white text-sm"><span className="font-semibold">Property Size: </span>{project.propertySize}</p>
              <p className="text-white text-sm"><span className="font-semibold">Price: </span>{project.price}</p>
              <p className="text-white text-sm"><span className="font-semibold">Status: </span>{project.status}</p>
            </div>
          </div>
          <motion.div
            className="w-10 h-10 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center shrink-0 ml-4"
            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.35)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
