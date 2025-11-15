import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Counter = ({ end, numberColor, labelColor, label }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-500 w-64 sm:w-1/4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <span className={`${numberColor} font-bold text-4xl sm:text-5xl`}>
        {inView && <CountUp start={0} end={end} duration={2.5} separator="," />}
      </span>
      <span className={`${labelColor} font-semibold mt-2 text-center text-lg sm:text-xl`}>
        {label}
      </span>
    </motion.div>
  );
};

const JourneyCounters = () => {
  const counters = [
    {
      end: 2000,
      label: "Completed Projects",
      numberColor: "text-blue-600 dark:text-blue-400",
      labelColor: "text-gray-700 dark:text-gray-300",
    },
    {
      end: 400,
      label: "Clients Served",
      numberColor: "text-green-600 dark:text-green-400",
      labelColor: "text-gray-700 dark:text-gray-300",
    },
    {
      end: 100,
      label: "Resources Managed",
      numberColor: "text-purple-600 dark:text-purple-400",
      labelColor: "text-gray-700 dark:text-gray-300",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          In our 6 years journey, FixItNow has:
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {counters.map((counter, idx) => (
            <Counter
              key={idx}
              end={counter.end}
              numberColor={counter.numberColor}
              labelColor={counter.labelColor}
              label={counter.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyCounters;
