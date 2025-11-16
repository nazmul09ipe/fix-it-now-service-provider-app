import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../AuthContext/AuthProvider";

const ServiceSearch = () => {
  const { api } = useContext(AuthContext); // Use Axios with JWT
  const [services, setServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services"); // Axios with JWT
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [api]);

  // Filter services by search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setFiltered([]);
      return;
    }

    const matched = services.filter((service) =>
      service.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFiltered(matched);
  }, [searchText, services]);

  if (loading) return <Loading />;

  // Highlight matched text
  const highlightText = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <motion.span
          key={i}
          className="bg-yellow-200 dark:bg-yellow-600 font-semibold px-1 rounded"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          {part}
        </motion.span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto my-12">
      {/* Search Input */}
      <motion.div
        className="flex items-center gap-3 bg-white dark:bg-gray-800 shadow-xl rounded-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 focus-within:border-blue-500 transition-all duration-300"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <i className="fa-solid fa-magnifying-glass text-gray-400 dark:text-gray-300 text-lg"></i>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for a service..."
          className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 text-lg sm:text-xl placeholder-gray-400 dark:placeholder-gray-500"
        />
      </motion.div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {searchText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-4 mt-2 z-50 max-h-96 overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <motion.p
                className="text-center text-gray-500 dark:text-gray-400 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No matching services found.
              </motion.p>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className="space-y-3"
              >
                {filtered.map((service) => (
                  <motion.div
                    key={service._id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-shadow shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                          {highlightText(service.name, searchText)}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          ৳{service.price} • {service.area}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/services/${service._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Details
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceSearch;
