import { createContext, useContext, useState, useEffect } from "react";
import { getAllWorkouts } from "../services/workoutService";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, loading }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  return useContext(WorkoutContext);
};
