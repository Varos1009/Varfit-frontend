import React, { createContext, useContext, useState } from 'react';
import { getAllPlans, fetchPlan, createPlan, updatePlan, deletePlan } from '../services/PlanService';

const PlanContext = createContext();

export const usePlan = () => {
  return useContext(PlanContext);
};

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const getPlan = async (id) => {
    if (!id) {
      setError("Plan ID is missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchPlan(id);

      setPlans(response);

    } catch (err) {
      setError("Error fetching the plan.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch all plans in the database
  const getAllPlan = async (userId) => {
    if (!userId) {
      setError?.("User ID is missing.");
      return null;
    }

    setLoading?.(true);
    try {
      const response = await getAllPlans(userId);
      console.log("✅ Fetched all plans:", response);

      setPlans?.(response);
      return response;
    } catch (err) {
      setError?.("Error fetching all plans.");
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
      setPlans((prevPlans) => [...prevPlans, response]);
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
      );
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
