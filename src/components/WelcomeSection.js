import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WELCOME as welcomeContent } from "@/data/fallback";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.lotusssinfra.com/";

export default function WelcomeSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API}site-settings`).then((res) => {
      const w = res.data?.data?.data?.welcome;
      if (w) setData(w);
    }).catch(() => {});
  }, []);

  const title = data?.heading || welcomeContent.title;
  const subheading = data?.subheading || "";
  const description = data?.description || welcomeContent.description;
  const isHtml = description?.trim().startsWith("<");
  const apiImages = Array.isArray(data?.images) && data.images.length > 0
    ? data.images.map((src, i) => ({ src, alt: `Image ${i + 1}` }))
    : null;
  const images = apiImages || welcomeContent.images;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* Left: Text */}
          <motion.div
            className="w-full lg:w-6/12"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-4xl font-normal text-gray-800 mb-1">{title}</h2>
            {subheading && (
              <p className="text-gray-500 text-base mb-3">{subheading}</p>
            )}
            <motion.span
              className="block h-0.5 mb-6"
              style={{ background: "#078DD4", width: "106px" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            {isHtml
              ? <div className="rich-html text-gray-500 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
              : <p className="text-gray-500 text-base leading-relaxed">{description}</p>
            }
          </motion.div>

          {/* Right: Images */}
          <motion.div
            className="w-full lg:w-7/12 relative"
            style={{ height: "400px" }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInRight} className="absolute rounded-2xl overflow-hidden" style={{ left: 0, top: "36px", bottom: 0, width: "48%" }}>
              <img src={images[0]?.src} alt={images[0]?.alt || "Image 1"} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeInRight} className="absolute rounded-2xl overflow-hidden" style={{ right: 0, top: 0, width: "44%", height: "calc(50% - 8px)" }}>
              <img src={images[1]?.src} alt={images[1]?.alt || "Image 2"} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeInRight} className="absolute rounded-2xl overflow-hidden" style={{ right: 0, bottom: 0, width: "44%", height: "calc(50% - 8px)" }}>
              <img src={images[2]?.src} alt={images[2]?.alt || "Image 3"} className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
