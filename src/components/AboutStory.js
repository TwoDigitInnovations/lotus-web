import { motion } from "framer-motion";
import { ABOUT_STORY as fallback } from "@/data/fallback";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

export default function AboutStory({ data }) {
  const imageSrc = data?.image || fallback.image;
  const description = data?.description || fallback.description;
  const highlights = data?.highlights || [];

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex flex-col md:flex-row items-stretch gap-0">
          {/* Left: Image */}
          <motion.div
            className="relative rounded-2xl overflow-hidden w-full md:w-3/5 shrink-0"
            style={{ minHeight: "360px" }}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <img src={imageSrc} alt="Our Story" className="absolute inset-0 w-full h-full object-cover" />
          </motion.div>

          {/* Right: Blue card */}
          <motion.div
            className="relative z-10 flex items-center w-full md:w-2/5 md:-ml-16 mt-4 md:mt-8 md:mb-8"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div
              className="rounded-2xl p-8 w-full h-full flex flex-col justify-center gap-4"
              style={{ background: "#078DD4", boxShadow: "0 20px 50px rgba(27,157,226,0.35)" }}
              whileHover={{ boxShadow: "0 28px 60px rgba(27,157,226,0.5)" }}
            >
              {description?.trim().startsWith("<")
                ? <div className="rich-html-white text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
                : <p className="text-white text-sm leading-relaxed">{description}</p>
              }
              {highlights.length > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  {highlights.map((h, i) => (
                    <div key={i} className="text-center">
                      <p className="text-white text-2xl font-bold">{h.value}</p>
                      <p className="text-white/80 text-xs mt-0.5">{h.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
