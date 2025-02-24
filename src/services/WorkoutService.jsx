import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

// Fetch all workouts
export const getAllWorkouts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
  }
};

// Fetch single workout
export const getWorkoutById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create new workout
export const createWorkout = async (workoutData) => {
  const response = await axios.post(API_URL, workoutData);
  return response.data;
};

// Update a workout
export const updateWorkout = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a workout
export const deleteWorkout = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
