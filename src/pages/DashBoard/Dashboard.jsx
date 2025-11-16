// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../AuthContext/AuthProvider";
// import { motion } from "framer-motion";
// import { Link } from "react-router";
// import {
//   FaTools,
//   FaClipboardList,
//   FaPlusCircle,
//   FaBell,
//   FaInbox,
//   FaUser,
// } from "react-icons/fa";

// const Dashboard = () => {
//   const { user, api } = useContext(AuthContext);

//   const [stats, setStats] = useState({
//     services: 0,
//     bookings: 0,
//     requests: 0,
//     messages: 0,
//   });

//   // Fetch Stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [servicesRes, bookingsRes, messagesRes] = await Promise.all([
//           api.get("/services"),
//           api.get("/bookings"),
//           api.get("/messages"),
//         ]);

//         setStats({
//           services: servicesRes.data.filter(
//             (s) => s.providerEmail === user?.email
//           ).length,
//           bookings: bookingsRes.data.filter(
//             (b) => b.customerEmail === user?.email
//           ).length,
//           requests: bookingsRes.data.filter(
//             (r) => r.providerEmail === user?.email
//           ).length,
//           messages: messagesRes.data.length,
//         });
//       } catch (err) {
//         console.error("Failed to load dashboard stats", err);
//       }
//     };

//     fetchStats();
//   }, [user]);

//   return (
//     <div className="min-h-screen px-4 pt-24 pb-12 bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-10 text-center"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold text-primary">
//           Welcome to Your Dashboard
//         </h1>
//         <p className="text-gray-600 dark:text-gray-300 mt-2">
//           Manage your services, bookings, and requests in one place.
//         </p>
//       </motion.div>

//       {/* User Info Card */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 flex items-center gap-5 mb-10"
//       >
//         <img
//           src={user?.photoURL || "/default-avatar.png"}
//           alt="User"
//           className="w-20 h-20 rounded-full border-2 border-primary object-cover"
//         />
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
//             {user?.displayName}
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
//           <p className="text-sm text-primary font-medium mt-1">
//             FixItNow Service Provider
//           </p>
//         </div>
//       </motion.div>

//       {/* Stats Grid */}
//       <div className="grid md:grid-cols-4 gap-6 mb-14">
//         {/* Services */}
//         <StatCard
//           title="Your Services"
//           value={stats.services}
//           icon={<FaTools />}
//           link="/dashboard/manage-services"
//         />
//         {/* Bookings */}
//         <StatCard
//           title="Your Bookings"
//           value={stats.bookings}
//           icon={<FaClipboardList />}
//           link="/dashboard/my-bookings"
//         />
//         {/* Requests */}
//         <StatCard
//           title="Service Requests"
//           value={stats.requests}
//           icon={<FaBell />}
//           link="/dashboard/service-requests"
//         />
//         {/* Messages */}
//         <StatCard
//           title="Messages"
//           value={stats.messages}
//           icon={<FaInbox />}
//           link="/dashboard/messages"
//         />
//       </div>

//       {/* Quick Actions */}
//       <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-300">
//         Quick Actions
//       </h2>

//       <div className="grid md:grid-cols-3 gap-6">
//         <ActionCard
//           title="Add New Service"
//           icon={<FaPlusCircle />}
//           description="Create and publish a new service for customers."
//           link="/dashboard/add-service"
//         />

//         <ActionCard
//           title="Manage Your Profile"
//           icon={<FaUser />}
//           description="Update your image, name, or contact details."
//           link="/dashboard/profile"
//         />

//         <ActionCard
//           title="View Service Requests"
//           icon={<FaBell />}
//           description="Accept or reject bookings from customers."
//           link="/dashboard/service-requests"
//         />
//       </div>
//     </div>
//   );
// };

// // ------------------ Reusable Components ------------------

// const StatCard = ({ title, value, icon, link }) => (
//   <Link to={link}>
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
//     >
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="text-gray-700 dark:text-gray-300 font-semibold">
//           {title}
//         </h3>
//         <span className="text-primary text-2xl">{icon}</span>
//       </div>
//       <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
//     </motion.div>
//   </Link>
// );

// const ActionCard = ({ title, description, icon, link }) => (
//   <Link to={link}>
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-6 rounded-3xl shadow-lg border border-primary/30 dark:border-primary/40 cursor-pointer"
//     >
//       <div className="text-primary text-3xl mb-3">{icon}</div>
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//         {title}
//       </h3>
//       <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
//     </motion.div>
//   </Link>
// );

// export default Dashboard;
