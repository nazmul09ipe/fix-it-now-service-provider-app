import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import PageTitle from "../Shared/PageTitle";
import ServiceSearch from "./ServiceSearch";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../AuthContext/AuthProvider";

const Services = () => {
  const { api } = useContext(AuthContext); // Axios instance with JWT
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services"); // Axios GET with JWT
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [api]);

  if (loading) return <Loading />;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-14 px-4 mt-6">
      <PageTitle title="All Services" />

      <ServiceSearch />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-white mb-3 relative inline-block">
          All Available Services
          <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-primary rounded-full transform -translate-x-1/2"></span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 text-sm md:text-base">
          Browse all the services offered by our verified providers and choose
          the right one for your needs.
        </p>
      </motion.div>

      {/* Services List */}
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {services.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No services available yet.
          </p>
        ) : (
          services.map((service, index) => (
            <motion.div
              key={service._id || index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300"
            >
              {/* Service Image */}
              <div className="md:w-2/5 w-full h-60 md:h-auto overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Service Info */}
              <div className="flex flex-col justify-between p-6 md:w-3/5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-600 dark:text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    {service.description?.slice(0, 100)}
                    {service.description?.length > 100 && "..."}
                  </p>

                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                    <FaMapMarkerAlt className="text-primary" />
                    <span className="text-sm">{service.area}</span>
                  </div>
                </div>

                {/* Footer (Provider & Price) */}
                <div className="flex items-center justify-between mt-3">
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

                {/* View Details Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/services/${service._id}`)}
                  className="btn btn-primary mt-5 w-full"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default Services;
