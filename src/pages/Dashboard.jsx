import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProgressByUserId, updateWorkoutStatus } from "../services/ProgressService";
import { getWeightByUserId, addWeightEntry } from "../services/WeightService";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const {currentUser } = useAuth();
  const [progress, setProgress] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [newWeight, setNewWeight] = useState("");

  // Fetch weight and progress on mount
  useEffect(() => {
    if (currentUser) {
      fetchWeightData();
      fetchProgressData();
    }
  }, [currentUser]);

  // Fetch weight data for the user
  const fetchWeightData = async () => {
    try {
      const data = await getWeightByUserId(currentUser.uid);
      setWeightData(data);
    } catch (error) {
      console.error("Error fetching weight data:", error);
    }
  };

  // Fetch progress data for the user
  const fetchProgressData = async () => {
    try {
      const data = await getProgressByUserId(currentUser.uid);
      setProgress(data);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  // Handle adding a new weight entry
  const handleAddWeight = async (event) => {
    event.preventDefault();

    // Ensure weight is provided
    if (newWeight) {
      const date = new Date(); // Use today's date or a user-selected date
      try {
        await addWeightEntry(currentUser.uid, date, newWeight);
        setNewWeight(""); // Clear input after successful submission
        alert("Weight added successfully");
        fetchWeightData(); // Re-fetch weight data to update the chart
      } catch (error) {
        console.error("Error adding weight:", error);
        alert("Failed to add weight.");
      }
    } else {
      alert("Please enter a valid weight.");
    }
  };

  // Handle date change from calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0]; // Format date for matching
    const workoutsForDay = progress.find(
      (entry) => entry.date.split("T")[0] === formattedDate
    )?.workouts || [];
    setSelectedWorkouts(workoutsForDay);
  };

  // Toggle workout completion status
  const toggleWorkoutCompletion = async (workoutId, completed) => {
    try {
      await updateWorkoutStatus(userId, selectedDate, workoutId, !completed);
      fetchProgressData();
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Weight Tracking */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Weight Progress</h2>
        <form onSubmit={handleAddWeight}>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            name="weight" // Ensure the input name is 'weight'
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            required
            placeholder="Enter your weight"
          />
          <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>

        <ResponsiveContainer width="100%" height={200} className="mt-4">
          <LineChart data={weightData}>
            <XAxis dataKey="date" />
            <YAxis domain={["dataMin", "dataMax"]} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calendar */}
      <div>
        <h2 className="text-xl font-semibold">Workout Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="border mt-2 p-4 rounded"
        />
      </div>

      {/* Workout List */}
      {selectedWorkouts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Workouts for {selectedDate.toDateString()}</h3>
          {selectedWorkouts.map((workout) => (
            <div
              key={workout.workoutId}
              className="flex items-center gap-4 border p-2 rounded mt-2"
            >
              <input
                type="checkbox"
                checked={workout.completed}
                onChange={() => toggleWorkoutCompletion(workout.workoutId, workout.completed)}
              />
              <span>{workout.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
