import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {/* Välkomsttext */}
      <h1 className="text-4xl font-bold mb-12">Welcome</h1>

      {/* Länk till LoginPage */}
      <p className="text-xl font-semibold mb-10">
        <span>
          <Link to="/login" className="underline text-gray-500">
            Login
          </Link>{" "}
          to continue
        </span>
      </p>

      {/* Länk till RegisterPage */}
      <p className="text-lg mb-6">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold text-gray-500">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Home;
