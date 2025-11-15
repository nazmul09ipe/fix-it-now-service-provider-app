import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import PageTitle from './../Shared/PageTitle';

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, api } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    date: "",
    instruction: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res.data);
      } catch (error) {
        console.error("Error loading service:", error);
        toast.error("Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, api]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book a service!");
      return;
    }

    const newBooking = {
      serviceId: service._id,
      serviceName: service.name,
      serviceImage: service.image,
      providerEmail: service.providerEmail,
      providerName: service.providerName,
      customerEmail: user.email,
      customerName: user.displayName,
      price: service.price,
      date: booking.date,
      instruction: booking.instruction,
      serviceStatus: "pending",
    };

    try {
      const res = await api.post("/bookings", newBooking);

      if (res.status === 201) {
        toast.success("Booking confirmed! Pending approval.", {
          duration: 3000,
          icon: "✔️",
          style: {
            background: "#16a34a",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "16px",
            zIndex: 999999,
          },
        });

        setBooking({ date: "", instruction: "" });

        setTimeout(() => {
          navigate("/services");
        }, 2000);
      } else {
        toast.error("Booking failed. Try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center items-start px-4 pt-12 pb-16">
    <PageTitle PageTitle="Book Service" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          Book Service
        </h2>

        {/* Service Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Service ID</label>
            <input
              value={service._id}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="label font-semibold">Service Name</label>
            <input
              value={service.name}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="label font-semibold">Provider Email</label>
            <input
              value={service.providerEmail}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="label font-semibold">Provider Name</label>
            <input
              value={service.providerName}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="label font-semibold">Your Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="label font-semibold">Your Name</label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Service Image */}
        <div className="mt-4">
          <label className="label font-semibold">Service Image</label>
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-56 object-cover rounded-xl border"
          />
        </div>

        {/* Editable Fields */}
        <div className="mt-6">
          <label className="label font-semibold">Service Date</label>
          <input
            type="date"
            name="date"
            value={booking.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mt-4">
          <label className="label font-semibold">Special Instructions</label>
          <textarea
            name="instruction"
            value={booking.instruction}
            onChange={handleChange}
            placeholder="Enter address, area, or customized plan..."
            className="textarea textarea-bordered w-full min-h-[100px]"
            required
          ></textarea>
        </div>

        <div className="mt-6">
          <label className="label font-semibold">Price</label>
          <input
            value={`৳${service.price}`}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 font-semibold text-primary"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="btn btn-primary w-full mt-8 text-lg font-semibold tracking-wide shadow-md"
        >
          Purchase
        </motion.button>
      </motion.form>
    </div>
  );
};

export default BookService;
