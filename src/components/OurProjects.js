import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/store/slices/projectSlice";
import { fadeInUp } from "@/lib/animations";

const filters = ["All", "Commercial", "Residential"];

export default function OurProjects() {
  const dispatch = useDispatch();
  const { list: projects, loading, fetched } = useSelector((s) => s.project);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!fetched && !loading) dispatch(fetchProjects());
  }, [fetched, loading, dispatch]);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter.toLowerCase());

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };
  const handleFilter = (f) => {
    setActiveFilter(f);
    setCurrentIndex(0);
  };

  const mainProject = filtered[currentIndex];
  const peekProject = filtered[(currentIndex + 1) % filtered.length];

  const cardVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -80 : 80,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-normal text-gray-800 mb-3">
            Our Projects
          </h2>
          <motion.span
            className="inline-block h-0.5"
            style={{ background: "#078DD4" }}
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Controls Row */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-2">
            {[
              { fn: handlePrev, path: "M9 2L4 7l5 5" },
              { fn: handleNext, path: "M5 2l5 5-5 5" },
            ].map(({ fn, path }, i) => (
              <motion.button
                key={i}
                onClick={fn}
                whileHover={{
                  scale: 1.12,
                  boxShadow: "0 6px 18px rgba(27,157,226,0.45)",
                }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                style={{
                  background: "#078DD4",
                  boxShadow: "0 3px 10px rgba(27,157,226,0.3)",
                }}
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
          <div className="flex gap-6">
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => handleFilter(f)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm transition-colors relative"
                style={{
                  color: activeFilter === f ? "#078DD4" : "#9ca3af",
                  fontWeight: activeFilter === f ? 600 : 400,
                }}
              >
                {f}
                {activeFilter === f && (
                  <motion.span
                    layoutId="filterUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5"
                    style={{ background: "#078DD4" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Carousel */}
        {filtered.length > 0 && (
          <div className="flex gap-4 overflow-hidden">
            <div
              className="relative rounded-2xl overflow-hidden shrink-0"
              style={{ width: "72%", height: "420px" }}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={mainProject.image}
                    alt={mainProject.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 72vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 p-6 w-full"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 60%, transparent)",
                    }}
                  >
                    <h3 className="text-white text-2xl font-semibold mb-2">
                      {mainProject.name}
                    </h3>
                    <p className="text-white text-sm mb-1">
                      <span className="font-semibold">Location:</span>{" "}
                      {mainProject.location}
                    </p>
                    <p className="text-white text-sm mb-1">
                      <span className="font-semibold">Property Size:</span>{" "}
                      {mainProject.propertySize}
                    </p>
                    <p className="text-white text-sm mb-1">
                      <span className="font-semibold">Price:</span>{" "}
                      {mainProject.price}
                    </p>
                    <p className="text-white text-sm">
                      <span className="font-semibold">Status:</span>{" "}
                      {mainProject.status}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Transparent full-card link — sits above image, below arrow */}
              <Link
                href={`/projects/${mainProject.id}`}
                className="absolute inset-0 z-5"
                aria-label={`View ${mainProject.name}`}
              />

              {/* Arrow advances to next project — z-10 keeps it above the link */}
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.35)" }}
                whileTap={{ scale: 0.92 }}
                className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center z-10"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>

            {filtered.length > 1 && (
              <motion.div
                className="relative rounded-2xl overflow-hidden flex-1 cursor-pointer"
                style={{ height: "420px" }}
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                {/* Animated image crossfade */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`peek-img-${currentIndex}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={peekProject.image}
                      alt={peekProject.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 28vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Dark overlay */}
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.38)" }} />

                {/* Center click hint */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.18)" }}
                    whileHover={{ scale: 1.15, background: "rgba(255,255,255,0.3)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>

                {/* Animated text */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 60%, transparent)" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`peek-text-${currentIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white font-semibold text-base">{peekProject.name}</p>
                      <p className="text-white/65 text-xs mt-1">{peekProject.location}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        )}
        {/* View All */}
        <motion.div
          className="flex justify-center mt-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/projects">
            <motion.span
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-2.5 rounded-full cursor-pointer border-2"
              style={{ color: "#078DD4", borderColor: "#078DD4" }}
              whileHover={{ background: "#078DD4", color: "white", scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              View All Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
