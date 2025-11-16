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
        mt-16 border-t border-gray-300 dark:border-gray-800
        bg-linear-to-br from-indigo-50 via-blue-50 to-purple-100
        dark: bg-linear-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black
        backdrop-blur-xl shadow-inner
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
            className="rounded-full p-1 hover:scale-105 transition-transform hover:drop-shadow-lg"
            title="Back to top"
          >
            <img
              src={logo}
              alt="FixItNow logo"
              loading="lazy"
              className="w-16 h-16 rounded-lg shadow-md hover:shadow-xl transition"
            />
          </button>

          <h3 className="text-xl font-bold tracking-wide mt-3 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            FixItNow
          </h3>

          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 max-w-xs">
            Reliable home repair services at your fingertips. We fix it — fast and professionally!
          </p>

          <a
            href="mailto:hello@fixitnow.com"
            className="mt-3 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            hello@fixitnow.com
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-3 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Quick Links
          </h3>

          <ul className="space-y-2 text-center md:text-left">
            <li><NavLink to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</NavLink></li>
            <li><NavLink to="/services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Services</NavLink></li>
            <li><NavLink to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Us</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</NavLink></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="font-semibold text-lg mb-3 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Connect With Us
          </h3>

          <div className="flex gap-5 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="FixItNow on Facebook"
              className="text-2xl hover:text-indigo-600 dark:hover:text-indigo-400 transition hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="FixItNow on LinkedIn"
              className="text-2xl hover:text-indigo-600 dark:hover:text-indigo-400 transition hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="inline-flex items-center gap-2 text-sm font-medium
              hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <FaArrowUp /> Back to top
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-800 py-4 text-center text-sm text-gray-700 dark:text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          FixItNow
        </span>{" "}
        — All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
