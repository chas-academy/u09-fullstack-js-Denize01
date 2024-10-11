import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importera Link för navigering
import CalendarComponent from "../components/profile/CalendarComponent";

const UserProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string | null>("");
  const navigate = useNavigate(); //Hook för navigering

  //Hämta användarnamnet från localStorage när sidan laddas
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
    //Ta bort användaren från localStorage
    localStorage.removeItem("username");
    // Ta bort eventuell annan inloggningsdata, t.ex. auth-token
    localStorage.removeItem("authToken");

    //Navigera användaren tillbaka till Login
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome {username ? username : "User"}!</h1>
      <p>This is your user profile page.</p>

      {/* Visa kalendern direkt här */}
      <CalendarComponent />

      {/* Logga ut-knappen */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
      >
        Logga ut
      </button>
    </div>
  );
};

export default UserProfilePage;
