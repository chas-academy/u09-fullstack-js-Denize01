import React, { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Typ för aktivitet (kan också läggas i en separat fil om du vill organisera bättre)
interface Activity {
  _id?: string; // För att identifiera varje aktivitet unikt från databasen (om backend returnerar ett id)
  date: string; // Datum i formatet YYYY-MM-DD
  activity: string;
}

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]); // Aktiviteter hämtas från backend
  const [activity, setActivity] = useState<string>("");

  // När komponenten laddas, hämta alla aktiviteter för den inloggade användaren
  useEffect(() => {
    fetchAllActivities();
  }, []);

  // Hämta alla aktiviteter från backend
  const fetchAllActivities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/activities", {
        credentials: "include",
      });
      const data = await response.json();
      setActivities(data); // Uppdatera med aktiviteter från backend
    } catch (err) {
      console.error("Error fetching activities", err);
    }
  };

  // När användaren väljer ett datum i kalendern
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(value);
    }
  };

  // Lägg till en "pin" på dagar som har aktiviteter
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0]; // Formatera datum som YYYY-MM-DD
      // Filtrera aktiviteter för att bara visa dem för det specifika datumet
      const activitiesForDate = activities.filter(
        (activity) => activity.date === formattedDate
      );

      if (activitiesForDate.length > 0) {
        return <div className="marker">📌</div>; // Visa en "pin" om det finns aktiviteter för detta datum
      }
    }
    return null;
  };

  // När användaren skriver in en aktivitet
  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value);
  };

  // När användaren vill lägga till en aktivitet
  const handleAddActivity = async () => {
    if (selectedDate && activity) {
      const newActivity = {
        date: selectedDate.toISOString().split("T")[0],
        activity: activity,
      };

      try {
        const response = await fetch("http://localhost:3000/api/activities", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newActivity),
        });

        if (response.ok) {
          fetchAllActivities(); // Uppdatera alla aktiviteter
          setActivity(""); // Rensa fältet efter inmatning
        } else {
          console.error("Failed to add activity");
        }
      } catch (err) {
        console.error("Error adding activity", err);
      }
    }
  };

  // När användaren vill radera en aktivitet
  const handleDeleteActivity = async (activityId: string | undefined) => {
    if (!activityId) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/activities/${activityId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchAllActivities(); // Uppdatera aktiviteter efter radering
      } else {
        console.error("Failed to delete activity");
      }
    } catch (err) {
      console.error("Error deleting activity", err);
    }
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={tileContent} // Använd tileContent för att visa pins
      />

      {selectedDate && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            Selected Date: {selectedDate.toDateString()}
          </h3>
          <input
            type="text"
            value={activity}
            onChange={handleActivityChange}
            placeholder="Log an activity"
            className="border rounded-md p-2 w-full mt-2"
          />
          <button
            onClick={handleAddActivity}
            className="bg-indigo-500 text-white px-4 py-2 mt-2 rounded hover:bg-indigo-600 transition duration-300"
          >
            Add Activity
          </button>
        </div>
      )}

      {selectedDate && activities.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Activities on {selectedDate.toDateString()}
          </h3>
          <ul className="list-disc pl-4 text-gray-700">
            {activities
              .filter(
                (a) => a.date === selectedDate.toISOString().split("T")[0]
              )
              .map((a) => (
                <li key={a._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <p>🥵</p>
                    <span>{a.activity}</span>
                  </div>
                  <svg
                    onClick={() => handleDeleteActivity(a._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer transition duration-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.225 4.225a.75.75 0 011.06 0L12 8.94l4.715-4.715a.75.75 0 111.06 1.06L13.06 10l4.715 4.715a.75.75 0 11-1.06 1.06L12 11.06l-4.715 4.715a.75.75 0 11-1.06-1.06L10.94 10 6.225 5.285a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
