import React from "react";
import Calender from "../components/profile/CalendarComponent";

const CalendarPage: React.FC = () => {
  return (
    <div>
      <h1>Your Training Calendar</h1>
      <Calender /> {/* Kalenderkomponenten som hanterar all logik */}
    </div>
  );
};

export default CalendarPage;
