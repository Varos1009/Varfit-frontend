import axios from "axios";

const API_URL = "https://varfit-backend.onrender.com/api/progress";

export const getProgressByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWorkoutStatus = async (userId, date, workouts) => {
  try {
    const workoutArray = Array.isArray(workouts) ? workouts : [workouts];

    const response = await axios.post(`${API_URL}/update`, {
      userId,
      date,
      workouts: workoutArray
    });

    return response.data;
  } catch (error) {
    console.error('Error updating workout status:', error);
    throw error;
  }
};

