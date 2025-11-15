import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";


const PopularServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data.slice(0, 6))) // show only 6
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-14 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 relative inline-block">
          Popular Services
          <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-primary rounded-full transform -translate-x-1/2"></span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 text-sm md:text-base">
          Discover our most requested and top-rated home repair services,
          handpicked by thousands of happy customers.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service._id || index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all duration-300"
          >
            {/* Image */}
            <div className="sm:w-2/5 w-full h-52 sm:h-auto overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between p-6 sm:w-3/5">
              <div>
                <h3 className="text-xl font-bold text-gray-600 dark:text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                  {service.description?.slice(0, 100)}
                  {service.description?.length > 100 && "..."}
                </p>
              </div>

              {/* Footer (Provider & Price) */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  {service.providerImage ? (
                    <img
                      src={service.providerImage}
                      alt={service.providerName}
                      className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-500 text-3xl" />
                  )}
                  <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">
                    {service.providerName || "Service Provider"}
                  </p>
                </div>

                <p className="font-semibold text-primary text-lg">
                  ৳{service.price}
                </p>
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/services/${service._id}`)}
                className="btn btn-primary mt-5 w-full"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Services Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/services")}
          className="btn btn-outline btn-primary px-8 py-3 text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-300"
        >
          View All Services
        </motion.button>
      </motion.div>
    </section>
  );
};

export default PopularServices;
