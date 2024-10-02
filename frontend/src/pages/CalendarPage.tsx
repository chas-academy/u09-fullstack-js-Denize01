import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <h1>Min Träningskalender</h1>
      <Calendar onChange={() => setSelectedDate} value={selectedDate} />
      {selectedDate && <p>Du har valt: {selectedDate.toDateString()}</p>}
    </div>
  );
};

export default CalendarPage;
