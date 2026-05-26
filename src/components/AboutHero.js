import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { aboutHero } from "@/data/aboutData";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "320px" }}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image src={aboutHero.image} alt="About Us" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
        <motion.h1
          className="text-white text-4xl md:text-5xl font-semibold"
          style={{ letterSpacing: "0.2em" }}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {aboutHero.title}
        </motion.h1>

        <motion.nav
          className="flex items-center gap-2 text-sm text-white/80"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {aboutHero.breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/50">›</span>}
              {i === 0 ? (
                <Link href="/" className="hover:text-white transition">{crumb}</Link>
              ) : (
                <span className="text-white/70">{crumb}</span>
              )}
            </span>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
