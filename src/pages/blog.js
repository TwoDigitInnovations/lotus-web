import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/store/slices/blogSlice";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const FALLBACK_BANNER = "/images/luxury-house-with-large-garden-warm-lights-elegant-modern-architecture.png";

export default function BlogPage() {
  const dispatch = useDispatch();
  const { list: blogs, loading } = useSelector((s) => s.blog);
  const { pageBanners, fetched: settingsFetched } = useSelector((s) => s.siteSettings);
  const bannerSrc = pageBanners?.blog || FALLBACK_BANNER;

  useEffect(() => {
    if (!loading) dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    if (!settingsFetched) dispatch(fetchSiteSettings());
  }, [settingsFetched, dispatch]);

  return (
    <main>
      <SEO
        title="Blog"
        description="Read the latest insights on Noida real estate — market trends, investment tips, project updates, home buying guides and more from Lotusss Real Estate."
        url="/blog"
      />
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "320px" }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src={bannerSrc}
            alt="Blog"
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
            Blog
          </motion.h1>
          <motion.nav
            className="flex items-center gap-2 text-sm text-white/80"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="text-white/50">›</span>
            <span className="text-white/70">Blog</span>
          </motion.nav>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogs.map((blog) => (
              <motion.div key={blog.id} variants={fadeInUp}>
                <Link href={`/blog/${blog.slug}`}>
                  <motion.div
                    className="rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                    style={{ background: "#078DD4", height: "480px" }}
                    whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(7,141,212,0.4)" }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Image */}
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

                    {/* Content */}
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
                          whileHover={{ scale: 1.15, background: "rgba(255,255,255,0.35)" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
