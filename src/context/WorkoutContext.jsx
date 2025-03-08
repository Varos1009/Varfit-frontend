import React, { createContext, useState, useEffect, useContext } from "react";
import { getWorkoutsByUser } from "../services/WorkoutService"; // Import your workout fetching function
import { useAuth } from "../context/AuthContext"; // Import Auth context to track login state

const WorkoutContext = createContext();

export const useWorkout = () => {
  return useContext(WorkoutContext);
};

export const WorkoutProvider = ({ children }) => {
  const { userLoggedIn } = useAuth(); // Track if the user is logged in
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!userLoggedIn) {
        console.log("No user logged in, skipping workout fetch");
        setLoading(false);
        return;
      }
  
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          console.log("Fetching workouts for user:", userId); // ✅ Debugging log
          const fetchedWorkouts = await getWorkoutsByUser(userId);
          console.log("Fetched workouts:", fetchedWorkouts); // ✅ Debugging log
          setWorkouts(fetchedWorkouts);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
      setLoading(false);
    };
  
    fetchWorkouts();
  }, [userLoggedIn]);
   

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, loading }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;