import Link from "next/link";
import { motion } from "framer-motion";
import { ABOUT_HERO as fallback } from "@/data/fallback";

export default function AboutHero({ data }) {
  const title = data?.heading || fallback.title;
  const subheading = data?.subheading || "";
  const imageSrc = data?.image || fallback.image;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "320px" }}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img src={imageSrc} alt="About Us" className="absolute inset-0 w-full h-full object-cover" />
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
          {title}
        </motion.h1>
        {subheading && (
          <motion.p
            className="text-white/80 text-base"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {subheading}
          </motion.p>
        )}
        <motion.nav
          className="flex items-center gap-2 text-sm text-white/80"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {fallback.breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/50">›</span>}
              {i === 0
                ? <Link href="/" className="hover:text-white transition">{crumb}</Link>
                : <span className="text-white/70">{crumb}</span>}
            </span>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
