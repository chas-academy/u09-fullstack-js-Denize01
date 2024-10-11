import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importera standardstilar

// Dummy activities list for testing
const dummyActivities = [
  { date: "2024-10-15", activity: "Running 5km" },
  { date: "2024-10-16", activity: "Yoga 1 hour" },
];

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activities, setActivities] = useState(dummyActivities); // Mock activities data
  const [activity, setActivity] = useState<string>("");

  // Uppdaterad funktion för att hantera alla typer av datumvärden, inklusive null
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (Array.isArray(value)) {
      setSelectedDate(value[0]); // Hantera intervall, ta första datumet
    } else if (value) {
      setSelectedDate(value); // Hantera ett enskilt datum
    } else {
      setSelectedDate(null); // Hantera null-fallet
    }
  };

  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value);
  };

  const handleAddActivity = () => {
    if (selectedDate && activity) {
      const newActivity = {
        date: selectedDate.toISOString().split("T")[0],
        activity: activity,
      };
      setActivities([...activities, newActivity]);
      setActivity("");
    }
  };

  const getActivityForDate = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return activities.find((a) => a.date === formattedDate)?.activity || "";
  };

  return (
    <div>
      <h2>Training Calendar</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />{" "}
      {/* Ingen röd markering nu */}
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
      {selectedDate && (
        <div>
          <h3>Activities on {selectedDate.toDateString()}</h3>
          <p>{getActivityForDate(selectedDate)}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
