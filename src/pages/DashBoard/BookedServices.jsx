import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Components/Loading";

const BookedServices = () => {
  const { user, api } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        // Filter by current user's email
        const userBookings = res.data.filter(
          (b) => b.customerEmail === user.email
        );
        setBookings(userBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, api]);

  if (loading) return <Loading />;

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
     <PageTitle title="Booked Service" />
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-gray-700 dark:text-white text-center mb-8">
        Your Booked Services
      </h1>

      {bookings.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-400 text-lg"
        >
          You haven’t booked any services yet.
        </motion.p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-semibold text-primary">
                  {booking.serviceName}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Date:</strong> {booking.date || "N/A"}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Provider:</strong> {booking.providerName}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      booking.serviceStatus === "pending"
                        ? "text-yellow-500"
                        : booking.serviceStatus === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {booking.serviceStatus}
                  </span>
                </p>
                <p className="text-lg font-bold text-primary">
                  ৳{booking.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedServices;
