import { motion } from "framer-motion";
import { commitments } from "@/data/aboutData";
import { fadeInUp, scaleInBounce, staggerContainer } from "@/lib/animations";

const icons = {
  star: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  person: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /><path d="M16 11l1.5 1.5L20 10" /></svg>,
  clock: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  trophy: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 21v-4M7 4H4a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4M17 4h3a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4" /><path d="M7 4a5 5 0 0 0 10 0H7z" /></svg>,
};

export default function Commitments() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-10" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl md:text-4xl font-normal text-gray-800 mb-3">
            We are committed to
          </h2>
          <motion.span className="inline-block h-0.5" style={{ background: "#078DD4" }} initial={{ width: 0 }} whileInView={{ width: 56 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {commitments.map((item) => (
            <motion.div
              key={item.id}
              variants={scaleInBounce}
              className="flex flex-col items-center justify-center gap-4 rounded-2xl py-10 px-4 text-center cursor-pointer"
              style={{ background: "#078DD4", boxShadow: "0 4px 16px rgba(27,157,226,0.25)" }}
              whileHover={{ y: -8, scale: 1.04, boxShadow: "0 16px 40px rgba(27,157,226,0.45)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center justify-center"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {icons[item.icon]}
              </motion.div>
              <p className="text-white text-md font-medium leading-snug">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
