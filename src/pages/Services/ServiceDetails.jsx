import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loading from './../../Components/Loading';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching service:", err);
        setLoading(false);
      });
  }, [id]);

   if (loading) return <Loading />;

  if (!service) {
    return (
      <div className="text-center py-20 text-gray-600 dark:text-gray-300">
        <p>Service not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen mt-10 bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60"
      >
        {/* Service Image */}
        <div className="w-full h-72 md:h-[420px] overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {service.name}
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Provider Information */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 sm:p-6 shadow-inner mb-6">
            <div className="flex items-center gap-4">
              {service.providerImage ? (
                <img
                  src={service.providerImage}
                  alt={service.providerName}
                  className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                />
              ) : (
                <FaUserCircle className="text-gray-500 text-5xl" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {service.providerName || "Service Provider"}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm mt-1">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{service.area || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              <p className="text-2xl font-bold text-primary">
                ৳{service.price}
              </p>
            </div>
          </div>

          {/* Book Button */}
          <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           className="btn btn-primary w-full text-lg font-semibold"
           onClick={() => navigate(`/book/${service._id}`)}
>
                 Book Now
        </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceDetails;
