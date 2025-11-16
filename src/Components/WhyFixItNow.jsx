import React from "react";
import { motion } from "framer-motion";
import { FaTools, FaHandshake, FaHome } from "react-icons/fa";

const WhyFixItNow = () => {
  return (
    <section className="bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-primary mb-4"
        >
          Why <span className="text-gray-700 dark:text-blue-400">FixItNow</span>?
        </motion.h2>

        {/* Fresh paragraph 1 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6"
        >
          Home maintenance shouldn’t feel like a burden. At <strong>FixItNow</strong>, 
          we take the chaos out of repairs and renovations. From small household fixes 
          to large-scale remodeling, our team ensures every task is handled with skill, 
          honesty, and precision. We value your time and comfort — our goal is to deliver 
          reliable results without the usual stress, mess, or miscommunication.
        </motion.p>

        {/* Fresh paragraph 2 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
        >
          What makes us different is our promise to care for your space like it’s our own. 
          We combine professional craftsmanship with transparency and trust. Every project 
          is guided by clear communication, detailed planning, and genuine commitment to 
          quality. Whether it’s fixing a leaky faucet or giving your office a new look, 
          we make it simple, safe, and satisfying — that’s the <strong>FixItNow</strong> way.
        </motion.p>
      </div>

      {/* Feature Icons */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <FaTools className="text-primary text-4xl mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
            Skilled Professionals
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Every technician is trained, verified, and equipped to provide 
            top-notch service that lasts.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <FaHandshake className="text-primary text-4xl mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
            Honest Communication
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            We keep things transparent — from pricing to progress — so you always 
            know exactly what’s happening.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <FaHome className="text-primary text-4xl mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
            Effortless Experience
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            From booking to completion, we make home repair simple, quick, and 
            completely worry-free.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyFixItNow;
