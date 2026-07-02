import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { WHY_CHOOSE_US as fallback } from "@/data/fallback";
import { fadeInUp, scaleInBounce, staggerContainer } from "@/lib/animations";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";

const DefaultIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);

const iconMap = {
  shield: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  Shield: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  location: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  MapPin: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  payment: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
  CreditCard: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
};

export default function WhyChooseUs() {
  const dispatch = useDispatch();
  const { whyChooseUs, fetched } = useSelector((s) => s.siteSettings);

  useEffect(() => {
    if (!fetched) dispatch(fetchSiteSettings());
  }, []);

  const heading = whyChooseUs?.heading || "Why Choose Us?";
  const features = (Array.isArray(whyChooseUs?.features) && whyChooseUs.features.length > 0)
    ? whyChooseUs.features
    : fallback;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-14" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          <h2 className="text-4xl font-normal text-gray-800 mb-3">{heading}</h2>
          <motion.span
            className="inline-block h-0.5"
            style={{ background: "#078DD4" }}
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          {features.map((item, i) => (
            <motion.div key={item.id || i} variants={fadeInUp} className="flex flex-col group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "#078DD4", boxShadow: "0 4px 14px rgba(27,157,226,0.3)" }}
                variants={scaleInBounce}
                whileHover={{ scale: 1.15, boxShadow: "0 8px 22px rgba(27,157,226,0.5)" }}
              >
                {iconMap[item.icon] || <DefaultIcon />}
              </motion.div>
              <h3 className="text-xl font-normal text-gray-800 mb-3">{item.title}</h3>
              {item.description?.trim().startsWith("<")
                ? <div className="rich-html text-gray-400 text-sm leading-relaxed mb-5 flex-1" dangerouslySetInnerHTML={{ __html: item.description }} />
                : <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{item.description}</p>
              }
              <Link href="/about">
                <motion.span
                  className="inline-flex items-center gap-1 text-sm font-semibold tracking-widest cursor-pointer"
                  style={{ color: "#078DD4" }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  READ MORE
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="ml-1">
                    <path d="M1 9h10M7 1l4 4-4 4" stroke="#078DD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
