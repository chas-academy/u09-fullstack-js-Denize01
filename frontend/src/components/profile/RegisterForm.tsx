import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importera useNavigate

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // För att hantera felmeddelanden
  const [success, setSuccess] = useState<boolean>(false); // För att visa framgångsmeddelande

  const navigate = useNavigate(); // Skapa navigate-funktionen

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to register. Please try again."
        );
      }

      const data = await response.json();
      console.log("Registration successful:", data);

      // Om registreringen lyckas, sätt ett framgångsmeddelande
      setSuccess(true);
      setError(null);

      // Vid lyckad registrering, navigera till LoginPage efter en kort fördröjning
      setTimeout(() => {
        navigate("/login"); // Vidarebefordra användaren till LoginPage
      }, 2000); // Du kan justera tidsfördröjningen om du vill
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // om err är ett Error-objekt, få dess meddelande
      } else {
        setError("An unexpected error occurred."); // fallback för andra typer av fel
      }
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-neutral-900 via-purple-500 to-indigo-900">
      <div className="bg-white bg-opacity-20 border-4 border-gray-400 backdrop-blur-lg p-6 rounded-xl shadow-xl max-w-xs mx-auto my-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-white animate-bounce">
          Register to <span className="text-black-500">Trackster</span>
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-white text-center mb-4">
            Registration successful! Redirecting to login...
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-white text-lg">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

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
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-white text-lg"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
