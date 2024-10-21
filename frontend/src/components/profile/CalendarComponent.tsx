import React, { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Typ för aktivitet (kan också läggas i en separat fil om du vill organisera bättre)
interface Activity {
  _id?: string; // För att identifiera varje aktivitet unikt från databasen (om backend returnerar ett id)
  date: string;
  activity: string;
}

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]); // Aktiviteter hämtas från backend
  const [activity, setActivity] = useState<string>("");

  // När ett nytt datum väljs, hämta aktiviteter från backend för det datumet
  useEffect(() => {
    if (selectedDate) {
      fetchActivitiesForSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  // Hämta aktiviteter från backend för valt datum
  const fetchActivitiesForSelectedDate = async (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    console.log("ISO Date", formattedDate);
    try {
      console.log("Fetching activities for:", formattedDate);

      const response = await fetch(
        `http://localhost:3000/api/activities/${formattedDate}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("Fetched activities:", data);

      setActivities(data); // Uppdatera med aktiviteter för valt datum
    } catch (err) {
      console.error("Error fetching activities", err);
    }
  };

  // När användaren skriver in en aktivitet
  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value);
  };

  // När användaren väljer ett datum i kalendern
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    console.log("Date value", value);
    if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else if (value) {
      setSelectedDate(value);
    } else {
      setSelectedDate(null);
    }
  };

  // När användaren vill lägga till en aktivitet
  const handleAddActivity = async () => {
    if (selectedDate && activity) {
      const newActivity = {
        date: selectedDate.toISOString().split("T")[0],
        activity: activity,
      };

      try {
        console.log("Adding activity:", newActivity);

        const response = await fetch("http://localhost:3000/api/activities", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newActivity),
        });

        if (response.ok) {
          console.log("Activity added successfully");

          fetchActivitiesForSelectedDate(selectedDate); // Uppdatera aktiviteter efter att ha lagt till en ny
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
        // Uppdatera aktiviteter efter radering
        if (selectedDate) {
          fetchActivitiesForSelectedDate(selectedDate);
        }
      } else {
        console.error("Failed to delete activity");
      }
    } catch (err) {
      console.error("Error deleting activity", err);
    }
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={selectedDate} />

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
            {activities.map((a) => (
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
