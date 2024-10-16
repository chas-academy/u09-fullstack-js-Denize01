import React, { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Typ för aktivitet (kan också läggas i en separat fil om du vill organisera bättre)
interface Activity {
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
    try {
      console.log("Fetching activities for:", formattedDate);
      const response = await fetch(
        `http://localhost:3000/api/activities/${formattedDate}`
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

  return (
    <div>
      <h2>Training Calendar</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />

      {selectedDate && (
        <div>
          <h3>Selected Date: {selectedDate.toDateString()}</h3>
          <input
            type="text"
            value={activity}
            onChange={handleActivityChange}
            placeholder="Log an activity"
          />
          <button onClick={handleAddActivity}>Add Activity</button>
        </div>
      )}

      {selectedDate && activities.length > 0 && (
        <div>
          <h3>Activities on {selectedDate.toDateString()}</h3>
          <ul>
            {activities.map((a, index) => (
              <li key={index}>{a.activity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
