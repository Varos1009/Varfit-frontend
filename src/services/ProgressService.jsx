import axios from "axios";

const API_URL = "http://localhost:5000/api/progress";

export const getProgressByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching progress data:", error);
    throw error;
  }
};

export const updateWorkoutStatus = async (userId, date, workouts) => {
  try {
    // Ensure workouts is always an array, even if it's a single workout ID
    const workoutArray = Array.isArray(workouts) ? workouts : [workouts];

    console.log("Workouts as array:", workoutArray);  // Debugging to check the workouts

    const response = await axios.post(`${API_URL}/update`, {
      userId,
      date,
      workouts: workoutArray  // Send as an array
    });

    return response.data;  // Server's response
  } catch (error) {
    console.error('Error updating workout status:', error);
    throw error;  // Handle the error appropriately
  }
};

