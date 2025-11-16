import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";   // <-- ADD THIS
import PageTitle from "./../Shared/PageTitle";

const AddService = () => {
  const { user, api } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- ADD THIS

  const [service, setService] = useState({
    name: "",
    price: "",
    area: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a service.");
      return;
    }

    const newService = {
      ...service,
      providerName: user.displayName,
      providerEmail: user.email,
      providerImage: user.photoURL,
      createdAt: new Date(),
    };

    try {
      const res = await api.post("/services", newService);

      if (res.status === 201) {
        toast.success("Service added successfully!", {
          duration: 2000,
          style: {
            background: "#16a34a",
            color: "white",
            fontWeight: "500",
          },
        });

        setService({
          name: "",
          price: "",
          area: "",
          description: "",
          image: "",
        });

        // ✅ Redirect user after adding service
        setTimeout(() => {
          navigate("/services"); 
        }, 1200);

      } else {
        toast.error("Failed to add service");
      }
    } catch (err) {
      console.error("Error adding service:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-28 bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center items-start px-4 pb-10">
      <PageTitle title="Add Service" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Add a New Service</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Fill in the details to publish your service
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Service Name
            </label>
            <input
              type="text"
              name="name"
              value={service.name}
              onChange={handleChange}
              placeholder="e.g. Plumbing Repair"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Price (tk)
            </label>
            <input
              type="number"
              name="price"
              value={service.price}
              onChange={handleChange}
              placeholder="e.g. 500"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Service Area
            </label>
            <input
              type="text"
              name="area"
              value={service.area}
              onChange={handleChange}
              placeholder="e.g. Dhaka, Chittagong"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Service Image URL
            </label>
            <input
              type="url"
              name="image"
              value={service.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleChange}
            placeholder="Briefly describe your service..."
            className="textarea textarea-bordered w-full min-h-[120px] focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {user && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 flex items-center gap-4 shadow-inner">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="Provider"
              className="w-14 h-14 rounded-full border-2 border-primary object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">{user.displayName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="btn btn-primary w-full mt-8 text-lg font-semibold tracking-wide shadow-md"
        >
          Add Service
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddService;
