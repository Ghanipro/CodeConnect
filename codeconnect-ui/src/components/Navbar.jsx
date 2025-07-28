// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-500">
          Code<span className="text-white">Connect</span>
        </div>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-blue-400 transition duration-200">Home</a>
          <a href="#" className="hover:text-blue-400 transition duration-200">Problems</a>
          <a href="#" className="hover:text-blue-400 transition duration-200">Leaderboard</a>
          <a href="#" className="hover:text-blue-400 transition duration-200">Profile</a>
        </div>

        {/* Theme Toggle Placeholder */}
        <button className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition duration-200 text-sm">
          Toggle Theme
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
