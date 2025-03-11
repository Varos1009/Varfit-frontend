import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProgressByUserId, updateWorkoutStatus } from "../services/ProgressService";
import { getWeightByUserId, addWeightEntry } from "../services/WeightService";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns"; // We'll use date-fns for formatting dates

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [alertMessage, setAlertMessage] = useState(null); // For custom alerts

  // Fetch weight and progress on mount
  useEffect(() => {
    if (currentUser?.uid) {
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
        setAlertMessage({ type: "success", message: "Weight added successfully!" });
        fetchWeightData(); // Re-fetch weight data to update the chart
      } catch (error) {
        console.error("Error adding weight:", error);
        setAlertMessage({ type: "error", message: "Failed to add weight. Please try again." });
      }
    } else {
      setAlertMessage({ type: "error", message: "Please enter a valid weight." });
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
      await updateWorkoutStatus(currentUser.uid, selectedDate, workoutId, !completed);
      fetchProgressData();
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  // Close alert message after 5 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000); // Close alert after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  // Date formatter function for the X-Axis
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MM/dd/yyyy"); // You can adjust the format as per your preference
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-21 bg-white shadow-lg rounded-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Dashboard</h1>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`mb-4 p-4 rounded-lg w-full max-w-xs ${
            alertMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          <p className="text-center">{alertMessage.message}</p>
        </div>
      )}

      {/* Weight Tracking */}
      <div className="mb-6 w-full p-2 border rounded-lg shadow-sm bg-gray-50 max-w-xs sm:max-w-4xl">
        <h2 className="text-2xl text-center font-semibold text-red-800">Weight Progress</h2>
        <form onSubmit={handleAddWeight} className="flex flex-row justify-center items-center mt-4">
          <input
            type="number"
            id="weight"
            name="weight"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            required
            placeholder="Enter your weight"
            className="px-4 py-2  mr-2 border rounded-md  text-gray-700 focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button
            type="submit"
            className=" px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        <ResponsiveContainer width="100%" height={300} className="mt-6">
          <LineChart data={weightData}>
            <XAxis
              dataKey="date"
              tickFormatter={formatDate} // Apply the date formatting function here
            />
            <YAxis domain={["dataMin", "dataMax"]} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calendar */}
      <div className="mb-6 w-full max-w-xs sm:max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800">Workout Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="mt-4 p-4 rounded-lg border shadow-md w-full max-w-xs sm:max-w-md"
        />
      </div>

      {/* Workout List */}
      {selectedWorkouts.length > 0 && (
        <div className="mt-6 p-6 bg-gray-50 border rounded-lg shadow-sm w-full max-w-xs sm:max-w-md">
          <h3 className="text-xl font-semibold text-gray-800">Workouts for {selectedDate.toDateString()}</h3>
          {selectedWorkouts.map((workout) => (
            <div key={workout.workoutId} className="flex items-center gap-4 border-b p-2 mt-2">
              <input
                type="checkbox"
                checked={workout.completed}
                onChange={() => toggleWorkoutCompletion(workout.workoutId, workout.completed)}
                className="focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-800">{workout.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
