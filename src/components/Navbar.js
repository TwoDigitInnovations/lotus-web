import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS as navLinks } from "@/data/fallback";
import { useSelector } from "react-redux";

export default function Navbar() {
  const logo = useSelector((s) => s.siteSettings.logo) || "/images/logo.png";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0)",
        backdropFilter: "blur(0px)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between ">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center gap-2">
            <div className=" p-1.5 w-20 h-20 rounded-full overflow-hidden shrink-0">
              <img
                src={logo}
                alt="Lotusss Logo"
                className="w-full h-full object-cover scale-[1.65]"
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: scrolled ? "#333" : "#fff" }}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Quick Enquiry Button */}
        <Link href="/contact" className="hidden md:block">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 24px rgba(7,141,212,0.55)" }}
            whileTap={{ scale: 0.94 }}
            className="inline-block text-white text-sm font-semibold px-5 py-2 rounded-full cursor-pointer"
            style={{ background: "#078DD4", boxShadow: "0 4px 14px rgba(7,141,212,0.35)" }}
          >
            QUICK ENQUIRY
          </motion.span>
        </Link>

        {/* Mobile Hamburger */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-6 h-0.5 block"
              animate={menuOpen ? { rotate: i === 1 ? 45 : i === 0 ? 45 : -45, y: i === 0 ? 8 : i === 2 ? -8 : 0, opacity: i === 1 ? 0 : 1 } : { rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{ background: scrolled ? "#333" : "#fff" }}
            />
          ))}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white px-6 py-4 shadow-xl overflow-hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="block text-center text-white text-sm font-semibold px-5 py-2 rounded-full cursor-pointer"
                    style={{ background: "#078DD4", boxShadow: "0 4px 14px rgba(7,141,212,0.35)" }}
                  >
                    QUICK ENQUIRY
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
