import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/store/slices/blogSlice";
import { fadeInUp } from "@/lib/animations";

const DESKTOP_COUNT = 3;

export default function RecentBlogs() {
  const dispatch = useDispatch();
  const { list: blogs, status } = useSelector((s) => s.blog);
  const total = blogs.length;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (status === "idle") dispatch(fetchBlogs());
  }, [status, dispatch]);

  const goTo = (next) => {
    const n = (next + total) % total;
    setDirection(next >= current ? 1 : -1);
    setCurrent(n);
  };

  const desktopBlogs = Array.from({ length: DESKTOP_COUNT }, (_, i) => blogs[(current + i) % total]);
  const mobileCard = blogs[current % total];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading row */}
        <motion.div
          className="flex items-center justify-between mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl font-normal text-gray-800 mb-3">Recent Blogs</h2>
            <motion.span
              className="inline-block h-0.5"
              style={{ background: "#078DD4" }}
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>
          {/* Arrows */}
          <div className="flex gap-2">
            {[{ dir: -1, path: "M9 2L4 7l5 5" }, { dir: 1, path: "M5 2l5 5-5 5" }].map(({ dir, path }) => (
              <motion.button
                key={dir}
                onClick={() => goTo(current + dir)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                style={{ background: "#078DD4", boxShadow: "0 3px 10px rgba(27,157,226,0.3)" }}
                whileHover={{ scale: 1.12, boxShadow: "0 6px 18px rgba(27,157,226,0.45)" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d={path} stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:block overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-3 gap-6"
            >
              {desktopBlogs.map((blog, i) => (
                <BlogCard key={`${blog.id}-${i}`} blog={blog} delay={i * 0.08} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: 1 card */}
        <div className="md:hidden overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <BlogCard blog={mobileCard} delay={0} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {blogs.map((_, i) => (
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

        {/* View All */}
        <div className="flex justify-center mt-8">
          <Link href="/blog">
            <motion.span
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-2.5 rounded-full cursor-pointer border-2"
              style={{ color: "#078DD4", borderColor: "#078DD4" }}
              whileHover={{ background: "#078DD4", color: "white", scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              View All Blogs
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ blog, delay }) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <motion.div
        className="rounded-2xl overflow-hidden flex flex-col cursor-pointer"
        style={{ background: "#078DD4", height: "480px" }}
        whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(27,157,226,0.4)" }}
        transition={{ duration: 0.35, delay }}
      >
        {/* Image — fixed height */}
        <div className="p-3 shrink-0">
          <motion.div
            className="relative w-full rounded-xl overflow-hidden"
            style={{ height: "210px" }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Content — fills remaining height */}
        <div className="px-6 pb-6 flex flex-col flex-1 overflow-hidden">
          <p className="text-white/70 text-xs mb-2 shrink-0">{blog.date}</p>
          <h3 className="text-white text-lg font-semibold mb-3 leading-snug shrink-0 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-white/80 text-sm leading-relaxed flex-1 line-clamp-4">
            {blog.description}
          </p>
          <div className="flex justify-end mt-4 shrink-0">
            <motion.div
              className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
              whileHover={{ scale: 1.15, background: "rgba(255,255,255,0.35)", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
