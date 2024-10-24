import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarComponent from "./CalendarComponent";

interface Activity {
  _id: string;
  date: string;
  description: string;
}

const UserProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string | null>("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchterm] = useState("");
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

  //Hantera sökning
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchterm(e.target.value);

    if (value.trim() === "") {
      setActivities([]);
      return;
    }
    fetchActivities(value);
  };

  //Hämta loggar från backend baserat på sökterm
  const fetchActivities = async (search: string = "") => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/activities?search=${search}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        setActivities([]);
      }
    } catch (err) {
      console.error("Error fetching activities", err);
    }
  };
  const handleLogout = () => {
    // Ta bort användaren från localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");

    // Navigera användaren tillbaka till Login
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Är du säker på att du vill radera ditt konto? Detta kan inte ångras."
      )
    ) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/delete", {
        method: "DELETE",
        credentials: "include", // Om du använder cookies för autentisering
      });

      if (response.ok) {
        // Logga ut användaren och rensa localStorage
        localStorage.removeItem("username");
        localStorage.removeItem("authToken");

        // Navigera till startsidan eller login
        navigate("/login");
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account", error);
    }
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

          {/* Placeholder för Sök aktivitet */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-opacity-20 bg-white p-4 rounded-lg shadow-md">
              <p className="text-white text-lg">Search activities</p>
              <input
                type="text"
                placeholder="Find your workout"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-2 mb-4 w-full rounded-md"
              />
              <div className="max-h-64 overflow-y-auto">
                <ul className="list-disc pl-4 text-gray-700">
                  {activities.map((activity) => (
                    <li key={activity._id}>
                      <p className="text-white">{activity.description}</p>
                      <p className="text-white text-sm">
                        Date: {activity.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              {/* Logga ut-knappen */}
              <div className="md:block hidden">
                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
                >
                  Logout
                </button>
              </div>

              {/* Radera konto-knappen */}
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full md:w-auto bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition duration-300"
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
