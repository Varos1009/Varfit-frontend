import React, { useEffect } from "react";
import { usePlan } from "../context/PlanContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyPlans = () => {
  const { getAllPlan, plans, loading, error, removePlan } = usePlan();
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("🔍 Checking currentUser:", currentUser);
    if (currentUser?.uid) {
      console.log("✅ Fetching plans for user:", currentUser.uid);
      getAllPlan(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("📌 Plans in MyPlans.jsx:", plans);
  }, [plans]);

  const handleDelete = async (planId) => {
    const confirmed = window.confirm("Are you sure you want to delete this plan?");
    if (confirmed) {
      try {
        await removePlan(planId);
      } catch (err) {
        console.error("Failed to delete plan", err);
      }
    }
  };

  if (loading) return <div className="text-center">Loading your plans...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">My Workout Plans</h2>

      {plans && plans.length > 0 ? (
        plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">{plan.title}</h3>
              <button
                onClick={() => handleDelete(plan._id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">Created on: {new Date(plan.createdAt).toLocaleDateString()}</p>

            {/* Link to view and edit plan */}
            <div className="text-center mt-4">
              <Link
                to={`/plan/${plan._id}`}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition duration-200"
              >
                View/Edit Plan
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-600 text-center">You have no workout plans yet.</p>
      )}
    </div>
  );
};

export default MyPlans;
