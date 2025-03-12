import React, { createContext, useContext, useState } from 'react';
import { getAllPlans, fetchPlan, createPlan, updatePlan, deletePlan } from '../services/PlanService';

const PlanContext = createContext();

export const usePlan = () => {
  return useContext(PlanContext);
};

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]); // Use an array for multiple plans
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state


  const getPlan = async (id) => {  // ✅ Only pass planId
    if (!id) {
      console.error("❌ Missing planId in getPlan");
      setError("Plan ID is missing.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetchPlan(id); // ✅ Fetch using planId
  
      console.log("✅ Fetched plan:", response);
      
      setPlans(response);
  
    } catch (err) {
      setError("Error fetching the plan.");
      console.error("❌ Error fetching the plan:", err);
    } finally {
      setLoading(false);
    }
  };
  


// ✅ Fetch all plans in the database
const getAllPlan = async (userId) => {
  if (!userId) {
    console.error("❌ Missing userId in getAllPlan");
    setError?.("User ID is missing.");
    return null; // Return null to avoid undefined errors
  }

  setLoading?.(true);
  try {
    const response = await getAllPlans(userId); // 🔥 Ensure this function is correctly defined
    console.log("✅ Fetched all plans:", response);

    setPlans?.(response); // Update context state if applicable
    return response; // Return the data so it can be used immediately
  } catch (err) {
    setError?.("Error fetching all plans.");
    console.error("❌ Error fetching all plans:", err);
    return null;
  } finally {
    setLoading?.(false);
  }
};



  // Create a new plan
  const addPlan = async (newPlan) => {
    setLoading(true);
    try {
      const response = await createPlan(newPlan);
      setPlans((prevPlans) => [...prevPlans, response]); // Add new plan to the state
    } catch (err) {
      setError("Error creating the plan.");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing plan
  const modifyPlan = async (updatedPlan) => {
    setLoading(true);
    try {
      const response = await updatePlan(updatedPlan);
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan._id === updatedPlan._id ? response : plan))
      ); // Update the plan in the state
    } catch (err) {
      setError("Error updating the plan.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a plan
  const removePlan = async (planId) => {
    setLoading(true);
    try {
      await deletePlan(planId);
      setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId)); // Remove the plan from state
    } catch (err) {
      setError("Error deleting the plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlanContext.Provider value={{ plans, loading, error, getPlan, getAllPlan, addPlan, modifyPlan, removePlan }}>
      {children}
    </PlanContext.Provider>
  );
};
