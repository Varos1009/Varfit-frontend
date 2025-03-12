import axios from "axios";

const API_URL = "https://varfit-backend.onrender.com/api/workouts";


// Fetch all workouts for a user
export const getWorkoutsByUser = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    console.log("Fetching workouts for user:", userId);
    
    // ✅ Fetch only the workouts belonging to the logged-in user
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error.response?.data || error.message);
    throw error;
  }
};


// Create a workout for the logged-in user
export const createWorkout = async (workoutData) => {
  try {
    const response = await axios.post(API_URL, workoutData);
    return response.data;
  } catch (error) {
    console.error("Workout API error:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Error creating workout.");
  }
};

// Update a specific workout by ID
export const updateWorkouts = async (id, updatedWorkout, userId) => {
  if (!id || !updatedWorkout) {
    throw new Error("Workout ID and data are required");
  }

  const workoutWithUserId = { ...updatedWorkout, userId };

  try {
    const response = await axios.put(`${API_URL}/${id}`, workoutWithUserId, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating workout", error);
    throw error;
  }
};

// Delete a workout
export const deleteWorkout = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    if (response.data) {
      return response.data;
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error(`Error deleting workout with ID ${id}:`, error);
    throw new Error("Error deleting workout");
  }
};
