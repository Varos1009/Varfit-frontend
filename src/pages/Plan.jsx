import React, { useState } from "react";

const workoutData = [
  { day: "Monday", workout: "Chest & Triceps", completed: false },
  { day: "Tuesday", workout: "Back & Biceps", completed: true },
  { day: "Wednesday", workout: "Leg Day", completed: false },
  { day: "Thursday", workout: "Shoulders & Abs", completed: false },
  { day: "Friday", workout: "Cardio & Core", completed: true },
];

const Plan = () =>  {
  const [workouts, setWorkouts] = useState(workoutData);

  const toggleCompletion = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index].completed = !updatedWorkouts[index].completed;
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-6">🏋️ Your Weekly Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Workout Plan List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📆 Weekly Plan</h2>
          <ul className="space-y-3">
            {workouts.map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span className="font-medium">{item.day}: {item.workout}</span>
                <button 
                  onClick={() => toggleCompletion(index)}
                  className={`px-4 py-2 text-white rounded-md transition ${
                    item.completed ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {item.completed ? "✔ Done" : "Start"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📊 Progress</h2>
          <div className="relative w-full bg-gray-300 h-6 rounded-full">
            <div
              className="bg-green-500 h-6 rounded-full transition-all"
              style={{
                width: `${
                  (workouts.filter((w) => w.completed).length / workouts.length) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="text-gray-700 mt-2 text-center">
            {workouts.filter((w) => w.completed).length} / {workouts.length} Workouts Completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default Plan;
