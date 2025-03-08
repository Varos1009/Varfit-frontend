import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

// Fetch all workouts for a user
export const getAllWorkouts = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const response = await axios.get(`${API_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error;
  }
};

// Fetch a specific workout for a user
export const getWorkoutsByUser = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
 
  try {
    const response = await axios.get(`${API_URL}/?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching workout:", error);
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
    console.error("updateWorkouts error: Missing id or updatedWorkout", { id, updatedWorkout });
    throw new Error("Workout ID and data are required.");
  }

  // Check if updatedWorkout has the required properties
  if (!updatedWorkout.name || !updatedWorkout.category || !updatedWorkout.duration || !updatedWorkout.difficulty) {
    console.error("updateWorkouts error: Missing fields in updatedWorkout", updatedWorkout);
    throw new Error("All fields (name, category, duration, difficulty) are required.");
  }

  // Add userId to the updatedWorkout payload
  const workoutWithUserId = {
    ...updatedWorkout,
    userId, // Include the userId in the payload
  };

  try {
    console.log("Updating workout with ID:", id, "Payload:", workoutWithUserId);

    const response = await axios.put(`${API_URL}/${id}`, workoutWithUserId, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response from backend:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating workout with ID", id, "Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error updating workout");
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
