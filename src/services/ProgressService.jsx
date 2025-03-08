import axios from "axios";

const API_URL = "http://localhost:5000/api/progress";

// Fetch user progress
export const getAllProgress = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching progress:", error);
    return [];
  }
};

// Add new progress
export const addProgress = async (progressData) => {
  try {
    await axios.post(API_URL, progressData);
  } catch (error) {
    console.error("Error adding progress:", error);
    throw new Error("Failed to add progress");
  }
};

// Delete progress
export const deleteProgress = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting progress with ID ${id}:`, error);
    throw new Error("Failed to delete progress");
  }
};
