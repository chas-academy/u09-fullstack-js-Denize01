import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-wrap place-items-center">
      <nav className="flex justify-between items-center bg-gray-800 text-white w-full py-4 relative z-20">
        {/* TracksterApp text */}
        <p className="text-lg font-bold text-left ml-4 tracking-widest">
          T R A C K S T E R&nbsp;&nbsp;&nbsp;A P P
        </p>
        {/* Hamburgerknapp (endast synlig på små skärmar) */}
        <button
          className="text-white md:hidden ml-auto mr-4 focus:outline-none z-30"
          onClick={toggleMenu}
        >
          {/* Hamburgerikon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigationsmenyn - visas beroende på skärmstorlek och om menyn är öppen */}
        <ul
          className={`absolute top-0 left-0 w-full bg-gray-800 z-10 md:static md:flex md:items-center md:w-auto transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-16" : "-translate-y-full"
          } md:translate-y-0 px-4 font-semibold space-y-4 md:space-y-0 md:space-x-12 py-4 md:py-0`}
        >
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="hover:text-gray-200">
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/admin" className="hover:text-gray-200">
              Admin Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
