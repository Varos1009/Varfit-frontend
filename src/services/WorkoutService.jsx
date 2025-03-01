import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

// Fetch all workouts
export const getAllWorkouts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data);

    if (response.status >= 200 && response.status < 300) {
      if (Array.isArray(response.data.workouts)) {
        return response.data.workouts;
      } else {
        console.error("Invalid API response format:", response.data);
        throw new Error("Invalid response format: Expected an array");
      }
    } else {
      throw new Error("Failed to fetch workouts");
    }
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error;
  }
};


// Fetch a specific workout by ID
export const getWorkoutById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    if (response.data) {
      return response.data;
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error(`Error fetching workout with ID ${id}:`, error);
    throw new Error("Error fetching workout details");
  }
};

// Create new workout
export const createWorkout = async (workoutData) => {
  try {
    const response = await axios.post(`${API_URL}`, workoutData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Error creating workout");
  }
};

// Update a specific workout by ID
export const updateWorkout = async (id, updatedWorkout) => {
  if (!updatedWorkout.name || !updatedWorkout.category || !updatedWorkout.duration || !updatedWorkout.difficulty) {
    throw new Error("All fields (name, category, duration, difficulty) are required.");
  }

  try {
    console.log("Updating workout with ID:", id);
    console.log("Payload:", updatedWorkout);

    const response = await axios.put(`${API_URL}/${id}`, updatedWorkout, {
      headers: { "Content-Type": "application/json" }, 
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating workout with ID ${id}:`, error.response?.data || error.message);
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
