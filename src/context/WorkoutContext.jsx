import React, { createContext, useState, useEffect, useContext } from "react";
import { getWorkoutsByUser } from "../services/WorkoutService"; 
import { useAuth } from "../context/AuthContext"; 

const WorkoutContext = createContext();

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
  const { userLoggedIn } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch workouts
  const fetchWorkouts = async () => {
    if (!userLoggedIn) {
      setLoading(false);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const fetchedWorkouts = await getWorkoutsByUser(userId);
        setWorkouts(fetchedWorkouts);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [userLoggedIn]);

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, loading, refreshWorkouts: fetchWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
