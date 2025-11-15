import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import PageTitle from './../Shared/PageTitle';

const ManageServices = () => {
  const { user, api } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

  // Fetch services for the logged-in provider
  useEffect(() => {
    if (!user?.email) return;

    const fetchServices = async () => {
      try {
        const res = await api.get("/bookings");
        const userServices = res.data.filter(
          (s) => s.providerEmail === user.email
        );
        setServices(userServices);
      } catch (err) {
        console.error("Error fetching services:", err);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user, api]);

  // Delete service with SweetAlert
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/services/${id}`);
        setServices((prev) => prev.filter((s) => s._id !== id));
        Swal.fire("Deleted!", "Service has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete service.", "error");
      }
    }
  };

  // Update service from modal
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      serviceName: form.name.value,
      price: form.price.value,
      description: form.description.value,
      serviceImage: form.image.value,
    };

    try {
      await api.put(`/services/${editingService._id}`, updated);
      setServices((prev) =>
        prev.map((s) =>
          s._id === editingService._id ? { ...s, ...updated } : s
        )
      );
      setEditingService(null);
      toast.success("Service updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update service");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
    <PageTitle title="Manage Service" />
      
      <h1 className="text-3xl font-bold text-gray-700 dark:text-white text-center mb-8">
        Manage Your Services
      </h1>

      {services.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-400 text-lg"
        >
          You haven’t added any services yet.
        </motion.p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={service.serviceImage || "/placeholder.png"}
                alt={service.serviceName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-semibold text-primary">
                  {service.serviceName}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Description:</strong>{" "}
                  {service.description?.slice(0, 80) || "No description"}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      service.serviceStatus === "pending"
                        ? "text-yellow-500"
                        : service.serviceStatus === "working"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {service.serviceStatus || "pending"}
                  </span>
                </p>
                <p className="text-lg font-bold text-primary">৳{service.price}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setEditingService(service)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">
              Update Service
            </h2>
            <input
              name="name"
              defaultValue={editingService.serviceName}
              className="input input-bordered w-full mb-3"
              placeholder="Service Name"
              
            />
            <input
              name="price"
              type="number"
              defaultValue={editingService.price}
              className="input input-bordered w-full mb-3"
              placeholder="Price"
              
            />
            <input
              name="image"
              defaultValue={editingService.serviceImage}
              className="input input-bordered w-full mb-3"
              placeholder="Image URL"
            />
            <textarea
              name="description"
              defaultValue={editingService.description}
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Description"
              
            />
            <div className="flex justify-between">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setEditingService(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
