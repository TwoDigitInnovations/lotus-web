import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogs as dummyBlogs } from "@/data/siteData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function normalize(item) {
  return {
    id: item._id || item.id,
    slug: item.slug,
    title: item.title,
    date: item.date || item.createdAt?.slice(0, 10) || '',
    description: item.description || item.excerpt || '',
    image: item.image || '',
    content: Array.isArray(item.content) ? item.content : [item.content || item.description || ''],
  };
}

export async function getStaticPaths() {
  return {
    paths: dummyBlogs.map((b) => ({ params: { slug: b.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  let blog = null;
  let allBlogs = dummyBlogs;

  try {
    const [blogRes, listRes] = await Promise.allSettled([
      fetch(`${API_BASE}/api/blog/${params.slug}`),
      fetch(`${API_BASE}/api/blog`),
    ]);

    if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
      const data = await blogRes.value.json();
      blog = normalize(data.data || data);
    }

    if (listRes.status === 'fulfilled' && listRes.value.ok) {
      const data = await listRes.value.json();
      const items = Array.isArray(data) ? data : data.data || [];
      if (items.length) allBlogs = items.map(normalize);
    }
  } catch {
    // backend not available — use siteData
  }

  if (!blog) blog = dummyBlogs.find((b) => b.slug === params.slug) || null;
  if (!blog) return { notFound: true };

  const related = allBlogs.filter((b) => b.slug !== params.slug).slice(0, 2);
  return { props: { blog, related }, revalidate: 60 };
}

export default function BlogDetail({ blog, related }) {
  if (!blog) return null;

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ height: "320px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-6 pb-10 w-full">
            <motion.p
              className="text-white/70 text-sm mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {blog.date}
            </motion.p>
            <motion.h1
              className="text-white text-3xl md:text-4xl font-semibold leading-snug"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {blog.title}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#078DD4" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#078DD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blogs
          </Link>
        </motion.div>

        {/* Underline */}
        <motion.span
          className="block h-0.5 mb-10"
          style={{ background: "#078DD4", width: 56 }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Paragraphs */}
        <div className="flex flex-col gap-6">
          {blog.content.map((para, i) => (
            <motion.p
              key={i}
              className="text-gray-600 text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Related Blogs */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Related Articles</h2>
            <motion.span
              className="block h-0.5 mb-8"
              style={{ background: "#078DD4", width: 56 }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/blog/${item.slug}`}>
                    <motion.div
                      className="rounded-2xl overflow-hidden cursor-pointer"
                      style={{ background: "#078DD4" }}
                      whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(27,157,226,0.4)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-3">
                        <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "180px" }}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-6 pb-6">
                        <p className="text-white/70 text-xs mb-1">{item.date}</p>
                        <h3 className="text-white text-base font-semibold leading-snug mb-2">{item.title}</h3>
                        <p className="text-white/75 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
