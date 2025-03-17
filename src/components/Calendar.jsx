import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mb-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-red-800 text-center">Workout Calendar</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="mt-4 p-4 rounded-lg border shadow-md w-full"
        />
      </div>
    </div>




  );
};

export default CalendarComponent;
