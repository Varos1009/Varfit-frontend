import axios from "axios";

const API_URL = "https://varfit-backend.onrender.com/api/plans";

// ✅ Fetch all plans
export const getAllPlans = async (userId) => {
  if (!userId) throw new Error("User ID is required");
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error fetching plans.");
  }
};

// ✅ Fetch the current user's plans
export const fetchPlan = async (planId) => {
  try {
    const response = await axios.get(`${API_URL}/plan/${planId}`); // ✅ Fetch using planId
    console.log("✅ API response:", response.data);
    return response.data; // ✅ No need to wrap in an array
  } catch (error) {
    console.error("❌ Error fetching plan:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error fetching plan.");
  }
};


// ✅ Create a new plan
export const createPlan = async (newPlan) => {
  try {
    const response = await axios.post(API_URL, newPlan);
    return response.data;
  } catch (error) {
    console.error("Error creating plan:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error creating plan.");
  }
};

// ✅ Update an existing plan
export const updatePlan = async (updatedPlan) => {
  if (!updatedPlan?._id) throw new Error("Plan ID is required for updating");

  try {
    const response = await axios.put(`${API_URL}/${updatedPlan._id}`, updatedPlan);
    return response.data;
  } catch (error) {
    console.error("Error updating plan:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error updating plan.");
  }
};

// ✅ Delete a plan by ID
export const deletePlan = async (planId) => {
  if (!planId) throw new Error("Plan ID is required for deletion");

  try {
    const response = await axios.delete(`${API_URL}/${planId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting plan:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error deleting plan.");
  }
};
