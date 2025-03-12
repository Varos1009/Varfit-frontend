import axios from "axios";

const API_URL = "https://varfit-backend.onrender.com/api/weights";

export const getWeightByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weight data:", error);
    throw error;
  }
};

export const addWeightEntry = async (userId, date, weight) => {
  try {
    // Log the data being sent to the server
    console.log("Sending weight data:", { userId, date, weight });

    const response = await axios.post(`${API_URL}`, {
      userId,
      date,
      weight
    });

    console.log("Weight added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding weight entry:", error);
    throw error; // Rethrow the error for the component to handle
  }
};
