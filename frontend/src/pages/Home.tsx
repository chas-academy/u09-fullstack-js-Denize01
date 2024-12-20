import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-neutral-900 via-purple-500 to-indigo-900">
      <div className="bg-white bg-opacity-20 border-4 border-gray-400 backdrop-blur-lg p-8 rounded-xl shadow-xl max-w-lg mx-auto">
        {/* Välkomsttext med bounce-effekt */}
        <h1 className="text-3xl font-bold mb-6 text-black text-center animate-bounce">
          Welcome to TRACKSTER
        </h1>
        <p className="text-lg text-white mb-8 text-center">
          ... your personal training calendar to help you keep track of your
          workouts!
        </p>

        {/* Länk till LoginPage */}
        <p className="text-xl font-semibold mb-8 text-center">
          <span>
            <Link
              to="/login"
              className="underline text-purple-50 hover:text-gray-700"
            >
              Login
            </Link>{" "}
            to continue
          </span>
        </p>

        {/* Länk till RegisterPage */}
        <p className="text-lg text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-purple-50 hover:text-gray-700"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
