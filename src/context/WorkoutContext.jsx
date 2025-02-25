import { createContext, useContext, useState, useEffect } from "react";
import { getAllWorkouts } from "../services/WorkoutService";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        // If the response is an object with a key like 'data', extract the array
        setWorkouts(data.workouts || data); // Adjust according to your response structure
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const updateWorkouts = async () => {
    const data = await getAllWorkouts();
    setWorkouts(data);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, loading, updateWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  return useContext(WorkoutContext);
};
