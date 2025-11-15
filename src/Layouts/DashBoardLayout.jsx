import React from 'react';
import Navbar from './../Components/Navbar';
import Footer from './../Components/Footer';
import { Outlet } from 'react-router';

const DashBoardLayout = () => {
    return (
         <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {/* Outlet renders the page-specific content */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
    );
};

export default DashBoardLayout;