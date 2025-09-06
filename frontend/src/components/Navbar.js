import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Logout from "./Logout";
import Auth0Profile from "./Auth0Profile";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={closeMenu}>
            <div className="text-2xl font-bold text-white">
              Auto<span className="text-yellow-400">Pool</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/viewpools"
                className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                View Pools
              </Link>
              <Link
                to="/addPools"
                className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Add Pools
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <div className="text-white">
                <Auth0Profile />
              </div>
            )}
            <div>
              {isAuthenticated ? <Logout /> : <Login />}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-900/95 backdrop-blur-sm">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-white hover:text-yellow-400 hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/viewpools"
              onClick={closeMenu}
              className="text-white hover:text-yellow-400 hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              View Pools
            </Link>
            <Link
              to="/addPools"
              onClick={closeMenu}
              className="text-white hover:text-yellow-400 hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Add Pools
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="text-white hover:text-yellow-400 hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-white hover:text-yellow-400 hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            
            {/* Mobile Auth Section */}
            <div className="border-t border-white/20 pt-4">
              {isAuthenticated && (
                <div className="text-white px-3 py-2">
                  <Auth0Profile />
                </div>
              )}
              <div className="px-3 py-2">
                {isAuthenticated ? <Logout /> : <Login />}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
