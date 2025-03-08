import { createContext, useContext, useState, useEffect } from "react";
import { getWorkoutsByUser } from "../services/WorkoutService";
import { useAuth } from "./AuthContext"; 

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const { currentUser } = useAuth(); // Get logged-in user
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) {
      console.error("No user logged in, skipping workout fetch");
      setLoading(false); // Make sure to stop loading even if there's no user
      return;
    }
  
    const fetchUserWorkouts = async () => {
      try {
        const data = await getWorkoutsByUser(currentUser.uid);
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch user workouts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserWorkouts();
  }, [currentUser]);
  

  return (
    <WorkoutContext.Provider value={{ workouts, loading, setWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);
