import { motion } from "framer-motion";
import { leaders as fallback } from "@/data/aboutData";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";

export default function Leaders({ data }) {
  const items = (Array.isArray(data) && data.length > 0) ? data : fallback;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-14" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-3xl font-normal text-gray-800 mb-3">Our Leaders</h2>
          <motion.span className="inline-block h-0.5" style={{ background: "#078DD4" }} initial={{ width: 0 }} whileInView={{ width: 56 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} />
        </motion.div>

        <div className="flex flex-col gap-16">
          {items.map((leader, i) => (
            <LeaderCard key={leader.id || leader._id || i} leader={leader} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderCard({ leader, index }) {
  // API leaders don't have imageAlign, alternate by index
  const isImageRight = leader.imageAlign === "right" || (leader.imageAlign === undefined && index % 2 === 0);

  return (
    <motion.div
      className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 ${!isImageRight ? "md:flex-row-reverse" : ""}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Text */}
      <motion.div className="flex-1 flex flex-col gap-3" variants={isImageRight ? fadeInLeft : fadeInRight}>
        <h3 className="text-4xl font-semibold" style={{ color: "#078DD4" }}>{leader.name}</h3>
        <p className="text-2xl font-semibold" style={{ color: "#078DD4" }}>{leader.role}</p>
        <p className="text-gray-500 text-xl leading-relaxed mt-1">{leader.description}</p>
      </motion.div>

      {/* Image */}
      <motion.div
        className="w-full md:w-1/2 shrink-0 relative rounded-2xl overflow-hidden"
        style={{ height: "380px" }}
        variants={isImageRight ? fadeInRight : fadeInLeft}
        whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(0,0,0,0.18)" }}
        transition={{ duration: 0.35 }}
      >
        {leader.image ? (
          <img src={leader.image} alt={leader.name} className="absolute inset-0 w-full h-full object-cover object-top" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <span className="text-slate-300 text-6xl font-bold">{leader.name?.[0]}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
