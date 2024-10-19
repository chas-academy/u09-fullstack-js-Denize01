import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarComponent from "./CalendarComponent";

const UserProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string | null>("");
  const navigate = useNavigate();

  // Hämta användarnamnet från localStorage när sidan laddas
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      // Om användaren inte är inloggad, navigera till Login
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Ta bort användaren från localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");

    // Navigera användaren tillbaka till Login
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-neutral-900 via-purple-500 to-indigo-900">
      {/* Välkomstmeddelandet utanför huvudcontainern, med extra margin-top */}
      <div className="text-center animate-bounce bg-opacity-20 bg-white p-4 rounded-lg shadow-md mb-8 mt-16">
        <h1 className="text-3xl font-bold text-black">
          Welcome {username ? username : "User"}!
        </h1>
        <p className="text-lg text-white">
          Another day, another amazing workout!
        </p>
      </div>

      {/* Huvudcontainer som innehåller kalender och annan funktionalitet */}
      <div className="bg-white bg-opacity-20 border-4 border-gray-400 backdrop-blur-lg p-6 rounded-xl shadow-xl max-w-4xl mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kalenderkomponent */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-opacity-20 bg-white p-4 rounded-lg shadow-md">
              <CalendarComponent />
            </div>
          </div>

          {/* Placeholder för annan funktionalitet */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-opacity-20 bg-white p-4 rounded-lg shadow-md">
              <p className="text-white text-lg">
                Other user-related content here.
              </p>
            </div>
          </div>
        </div>

        {/* Logga ut-knappen */}
        <div className="flex justify-center mt-8 md:block hidden">
          <button
            onClick={handleLogout}
            className="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Logga ut
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
