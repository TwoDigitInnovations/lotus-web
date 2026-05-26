import Image from "next/image";
import { motion } from "framer-motion";
import { aboutStory } from "@/data/aboutData";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

export default function AboutStory() {
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
            <Image src={aboutStory.image} alt="Our Story" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
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
              className="rounded-2xl p-8 w-full h-full flex items-center"
              style={{ background: "#078DD4", boxShadow: "0 20px 50px rgba(27,157,226,0.35)" }}
              whileHover={{ boxShadow: "0 28px 60px rgba(27,157,226,0.5)" }}
            >
              <p className="text-white text-sm leading-relaxed">
                {aboutStory.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
