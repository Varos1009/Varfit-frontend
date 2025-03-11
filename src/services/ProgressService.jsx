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

export const updateWorkoutStatus = async (userId, date, workoutId, completed) => {
  try {
    const response = await axios.put(`${API_URL}/update`, {
      userId,
      date,
      workoutId,
      completed,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating workout status:", error);
    throw error;
  }
};
