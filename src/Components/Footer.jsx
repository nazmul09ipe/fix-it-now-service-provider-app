// src/components/Footer.jsx
import { FaFacebook, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import logo from "../assets/logo2.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="
        mt-16 border-t border-gray-200 dark:border-gray-800
        bg-linear-to-b from-[#f4f6fb] to-[#e9eef6] dark:from-gray-900 dark:to-gray-950
        text-gray-800 dark:text-gray-300
      "
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            onClick={scrollToTop}
            aria-label="Go to top"
            className="rounded-full p-1 hover:scale-105 transition-transform"
            title="Back to top"
          >
            <img
              src={logo}
              alt="FixItNow logo"
              loading="lazy"
              className="w-16 h-16 rounded-md shadow-md"
            />
          </button>

          <h3 className="text-xl font-bold tracking-wide text-primary mt-3">
            FixItNow
          </h3>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
            Reliable home repair services at your fingertips. We fix it — fast and professionally!
          </p>

          <a
            href="mailto:hello@fixitnow.com"
            className="mt-3 text-sm hover:text-primary transition-colors"
          >
            hello@fixitnow.com
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-3 text-primary">Quick Links</h3>
          <ul className="space-y-2 text-center md:text-left">
            <li><NavLink to="/" className="hover:text-primary transition">Home</NavLink></li>
            <li><NavLink to="/services" className="hover:text-primary transition">Services</NavLink></li>
            <li><NavLink to="/about" className="hover:text-primary transition">About Us</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-primary transition">Contact</NavLink></li>
          </ul>
        </div>

        {/* Social Media + Actions */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="font-semibold text-lg mb-3 text-primary">Connect With Us</h3>

          <div className="flex gap-5 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="FixItNow on Facebook"
              className="text-2xl hover:text-primary transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="FixItNow on LinkedIn"
              className="text-2xl hover:text-primary transition"
            >
              <FaLinkedin />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <FaArrowUp /> Back to top
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-primary">FixItNow</span> — All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
