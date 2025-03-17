import axios from "axios";

const API_URL = "https://varfit-backend.onrender.com/api/weights";

export const getWeightByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addWeightEntry = async (userId, date, weight) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      userId,
      date,
      weight
    });

    console.log("Weight added successfully:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
