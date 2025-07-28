// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          Code<span className="text-white">Connect</span>
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-blue-400 transition duration-200">Home</Link>
          <Link to="/problems" className="hover:text-blue-400 transition duration-200">Problems</Link>
          <a href="#" className="hover:text-blue-400 transition duration-200">Leaderboard</a>
          <a href="#" className="hover:text-blue-400 transition duration-200">Profile</a>
        </div>

        {/* Auth Button */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/auth" 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-200 text-sm"
          >
            Sign In
          </Link>
          <button className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition duration-200 text-sm">
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
