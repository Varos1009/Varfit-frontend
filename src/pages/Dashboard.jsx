import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getWeightByUserId, addWeightEntry } from "../services/WeightService";
import { useWorkout } from "../context/WorkoutContext";
import { usePlan } from "../context/PlanContext";
import WeightProgress from "../components/WeightProgress";
import Calendar from "../components/Calendar";
import WorkoutCalendar from "../components/WorkoutCalendar";
import { format } from "date-fns";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { workouts } = useWorkout();
  const { getAllPlan } = usePlan();

  const [weightData, setWeightData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newWeight, setNewWeight] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [workoutsForDay, setWorkoutsForDay] = useState([]);
  const [plan, setPlan] = useState(null);

  const formatDate = (date) => format(new Date(date), "MMM dd, yyyy");

  const getFirstPlan = async () => {
    try {
      const plans = await getAllPlan(currentUser.uid);
      return plans?.length ? plans[0] : null;
    } catch (error) {
      console.error("Error fetching first plan:", error);
      return null;
    }
  };

  const fetchFirstPlan = async () => {
    if (currentUser?.uid) {
      const firstPlan = await getFirstPlan();
      setPlan(firstPlan);
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      fetchWeightData();
      fetchFirstPlan();
    }
  }, [currentUser]);

  const fetchWeightData = async () => {
    try {
      const data = await getWeightByUserId(currentUser.uid);
      setWeightData(data);
    } catch (error) {
      console.error("Error fetching weight data:", error);
    }
  };

  const handleAddWeight = async (event) => {
    event.preventDefault();
    if (!newWeight) {
      setAlertMessage({ type: "error", message: "Please enter a valid weight." });
      return;
    }

    try {
      await addWeightEntry(currentUser.uid, new Date(), newWeight);
      setNewWeight("");
      setAlertMessage({ type: "success", message: "Weight added successfully!" });
      fetchWeightData();
    } catch (error) {
      console.error("Error adding weight:", error);
      setAlertMessage({ type: "error", message: "Failed to add weight. Please try again." });
    }
  };

  const updateWorkoutsForSelectedDay = (date) => {
    if (!plan || !plan.workouts) return;

    const dayOfWeek = format(date, "EEEE");
    const plannedWorkouts = plan.workouts.filter((workout) => workout.day === dayOfWeek);
    const detailedWorkouts = plannedWorkouts
      .map((workout) => workouts.find((w) => w._id === workout.workoutId))
      .filter(Boolean);

    setWorkoutsForDay(detailedWorkouts);
  };

  useEffect(() => {
    if (plan) {
      updateWorkoutsForSelectedDay(selectedDate);
    }
  }, [plan, selectedDate]);

  const handleDateChange = (date) => setSelectedDate(date);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-21 bg-white shadow-lg rounded-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Dashboard</h1>
      {alertMessage && (
        <div
          className={`mb-4 p-4 rounded-lg w-full max-w-xs ${alertMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          <p className="text-center">{alertMessage.message}</p>
        </div>
      )}
      <WeightProgress
        weightData={weightData}
        newWeight={newWeight}
        setNewWeight={setNewWeight}
        handleAddWeight={handleAddWeight}
        formatDate={formatDate}
      />
      <Calendar selectedDate={selectedDate} setSelectedDate={handleDateChange} />
      <WorkoutCalendar workoutsForDay={workoutsForDay} selectedDate={selectedDate} />
    </div>
  );
};

export default Dashboard;
