import React from "react";
import { Link } from "react-router-dom";
import landingIcon from "../../assets/landingIcon.png";
import logo from "../../assets/logo2.png";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span className="font-semibold text-lg">ShopEase</span>
        </div>

        <div className="space-x-6 text-gray-700">
          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="hover:text-blue-600">
            Register
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between px-6">
          {/* Left Content */}
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              MAKE SHOPPING
              <br />
              <span className="text-blue-600">EASIER</span>
            </h1>

            <p className="text-gray-600 mt-6 text-lg">
              Welcome, this web application helps you manage and track the items
              you want to buy quickly and easily.
            </p>

            <Link
              to="/register"
              className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Right Image */}
          <div className="mt-12 md:mt-0">
            <img
              src={landingIcon}
              alt="shopping illustration"
              className="w-[420px] lg:w-[480px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
