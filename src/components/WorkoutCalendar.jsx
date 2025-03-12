import React from "react";
import { format } from "date-fns";

const WorkoutCalendar = ({ workoutsForDay, selectedDate }) => {
  return (
    <div className="mt-6 p-6 bg-gray-50 border rounded-lg shadow-sm w-full max-w-md">
      <h3 className="text-xl font-semibold text-red-700 text-center">
        Workouts for {format(selectedDate, "MMMM d, yyyy")}
      </h3>

      {workoutsForDay.length > 0 ? (
        workoutsForDay.map((workout) => (
          <div key={workout._id} className="flex flex-col items-center gap-4 border-b p-4 mt-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-blue-900">{workout.name}</span>
            </div>

            <div className="text-sm text-gray-700">
              <p><strong className="font-medium text-gray-900">Duration:</strong> {workout.duration} minutes</p>
              <p><strong className="font-medium text-gray-900">Difficulty:</strong> {workout.difficulty}</p>
            </div>
          </div>

        ))
      ) : (
        <p className="text-gray-600 text-center mt-4">No workouts planned for this day.</p>
      )}
    </div>
  );
};

export default WorkoutCalendar;
