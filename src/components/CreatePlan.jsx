import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { useAuth } from "../context/AuthContext";
import { useWorkout } from "../context/WorkoutContext"; // Assuming you have this context

const CreatePlan = () => {
  const { addPlan } = usePlan();
  const { currentUser } = useAuth();
  const { workouts } = useWorkout(); 

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [selectedWorkouts, setSelectedWorkouts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleWorkoutSelection = (day, workoutId) => {
    setSelectedWorkouts((prev) => ({ ...prev, [day]: workoutId }));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      setError("You must be logged in to create a plan.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title for your plan.");
      return;
    }

    setLoading(true);
    setError("");

    const newPlan = {
      userId: currentUser.uid,
      title,
      workouts: Object.entries(selectedWorkouts).map(([day, workoutId]) => ({ day, workoutId })),
    };

    try {
      await addPlan(newPlan);
      setSuccess("Plan created successfully!");
      setTitle("");
      setSelectedWorkouts({});
      navigate("/plan");
    } catch (err) {
      setError("Failed to create plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mb-8 mt-21 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Create New Plan</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      {/* Plan Title */}
      <div className="mb-4">
        <label className="block text-md font-medium text-gray-700 mb-2" htmlFor="planTitle">
          Plan Title
        </label>
        <input
          type="text"
          id="planTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter plan title"
        />
      </div>

      {/* Days of Week Workouts */}
      <div className="space-y-3 mb-6">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex justify-between items-center">
            <label className="block text-md font-medium text-gray-700">{day}</label>
            <select
              onChange={(e) => handleWorkoutSelection(day, e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Workout</option>
              {workouts?.map((workout) => (
                <option key={workout._id} value={workout._id}>
                  {workout.name || 'Unnamed Workout'}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {loading ? "Creating..." : "Create Plan"}
        </button>
      </div>
    </div>
  );
};

export default CreatePlan;
