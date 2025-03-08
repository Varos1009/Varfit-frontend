import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create a new plan
export const createPlan = async (plan) => {
    try {
      console.log("Sending Plan Data:", plan); 
      const response = await axios.post(`${API_URL}/plans`, plan);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Server Response Data:", error.response.data);
      }
      console.error("Error creating plan:", error);
      throw new Error("Error creating plan");
    }
  };
  

// Get all plans
export const getPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/plans`);
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw new Error("Error fetching plans");
  }
};

// Delete a plan
export const deletePlan = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/plans/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw new Error("Error deleting plan");
  }
};
