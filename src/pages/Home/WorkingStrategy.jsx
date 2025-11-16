import React from "react";
import { FaLightbulb, FaUsers, FaTools, FaRegClock } from "react-icons/fa";
import { motion } from "framer-motion";

const strategyItems = [
  {
    icon: <FaLightbulb size={40} className="text-yellow-500" />,
    title: "Innovative Solutions",
    description:
      "We provide creative and effective solutions tailored to each client’s needs.",
  },
  {
    icon: <FaUsers size={40} className="text-green-500" />,
    title: "Client Collaboration",
    description:
      "We believe in working closely with our clients for the best results.",
  },
  {
    icon: <FaTools size={40} className="text-blue-500" />,
    title: "Professional Expertise",
    description:
      "Our skilled team uses the latest tools and technology for perfect execution.",
  },
  {
    icon: <FaRegClock size={40} className="text-purple-500" />,
    title: "Timely Delivery",
    description:
      "We value your time and ensure every project is delivered on schedule.",
  },
];

const StrategyCard = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center w-72 sm:w-60 md:w-64 hover:scale-105 transition-transform duration-300"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const WorkingStrategy = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Our Working Strategy
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-12">
          At FixItNow, we follow a strategy that ensures efficiency, quality, and customer satisfaction.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {strategyItems.map((item, index) => (
            <StrategyCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingStrategy;
