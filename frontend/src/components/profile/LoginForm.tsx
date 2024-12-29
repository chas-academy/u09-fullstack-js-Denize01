import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../common/Button";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // För att hantera fel
  const [success, setSuccess] = useState<boolean>(false); // För att visa framgång

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      localStorage.setItem("username", data.user.username);

      // Om inloggningen lyckas, visa ett framgångsmeddelande
      setSuccess(true);
      setError(null);
      navigate("/profile");
    } catch (error: any) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-neutral-900 via-purple-500 to-indigo-900">
      <div className="bg-white bg-opacity-20 border-4 border-gray-400 backdrop-blur-lg p-8 rounded-xl shadow-xl max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-black animate-bounce">
          Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">Login successful!</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <ButtonComponent type="submit">Login</ButtonComponent>
        </form>

        <p className="text-center text-white mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-purple-200 hover:text-gray-300 underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
