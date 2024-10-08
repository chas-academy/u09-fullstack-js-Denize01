import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-600 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-white">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="text-white">
            Register
          </Link>
        </li>
        <li>
          <Link to="/profile" className="text-white">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/calendar" className="text-white">
            Calendar
          </Link>
        </li>
        <li>
          <Link to="/admin" className="text-white">
            Admin Dashboard
          </Link>
        </li>
        {/* <li>
          <Link to="/notfound" className="text-white">
            Not Found
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
