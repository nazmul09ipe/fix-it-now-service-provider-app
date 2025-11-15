import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { motion } from "framer-motion";
import toast  from "react-hot-toast";
import Loading from "../../Components/Loading";
import PageTitle from './../Shared/PageTitle';


const ServiceToDo = () => {
  const { user,api } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for the provider
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings"); 
        const providerBookings = res.data.filter(
          (b) => b.providerEmail === user.email
        );
        setBookings(providerBookings);
      } catch (error) {
        console.error("Error fetching provider bookings:", error);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user,api]);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`/bookings/${id}`, {
        serviceStatus: newStatus,
      });

      if (res.status === 200) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id ? { ...b, serviceStatus: newStatus } : b
          )
        );
        toast.success(`Status updated to "${newStatus}"`);
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageTitle title="Service To-Do" />
      

      <h1 className="text-3xl font-bold text-gray-700 dark:text-white text-center mb-8">
        Service To Do
      </h1>

      {bookings.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-400 text-lg"
        >
          You don’t have any booked services yet.
        </motion.p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
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
                  <strong>Customer:</strong> {booking.customerName}
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Date:</strong> {booking.date || "N/A"}
                </p>

                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Price:</strong> ৳{booking.price}
                </p>

                {/* Status Dropdown */}
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Service Status
                  </label>

                  <select
                    value={booking.serviceStatus}
                    onChange={(e) =>
                      handleStatusChange(booking._id, e.target.value)
                    }
                    className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="working">Working</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceToDo;
