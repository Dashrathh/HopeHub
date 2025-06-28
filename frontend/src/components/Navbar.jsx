import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DonateDropdown from "../pages/DonateDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white text-teal-700 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-teal-100 rounded-full p-1 mr-3">
                <div className="bg-teal-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">HC</span>
                </div>
              </div>
              <span className="ml-1 text-xl font-bold">HopeHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <DonateDropdown />
            <NavLink to="/products" label="Products" />
            <NavLink to="/volunteer" label="Volunteer" />
            <NavLink to="/about" label="About" />
            <NavLink to="/contact" label="Contact" />
          </div>

          {/* Right Section: Login or User */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="bg-teal-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold uppercase">
                  {user.name?.charAt(0)}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-400 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-amber-500 hover:bg-amber-400 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-teal-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-50">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <NavLink to="/" label="Home" mobile />
            <NavLink to="/donate" label="Donate" mobile />
            <NavLink to="/products" label="Products" mobile />
            <NavLink to="/volunteer" label="Volunteer" mobile />
            <NavLink to="/about" label="About" mobile />
            <NavLink to="/contact" label="Contact" mobile />
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 rounded-md text-base font-medium bg-red-500 text-center text-white hover:bg-red-400"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block w-full px-4 py-2 rounded-md text-base font-medium bg-amber-500 text-center text-white hover:bg-amber-400"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// ✅ Reusable NavLink
const NavLink = ({ to, label, mobile = false }) => (
  <Link
    to={to}
    className={`${
      mobile
        ? "block px-4 py-2 text-base hover:bg-teal-100"
        : "px-3 py-2 rounded-md text-sm hover:text-teal-900"
    } font-medium`}
  >
    {label}
  </Link>
);

export default Navbar;
