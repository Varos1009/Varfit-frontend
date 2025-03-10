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

  if (loading) return <div className="text-center text-xl font-semibold text-blue-500">Loading your plans...</div>;
  if (error) return <div className="text-center text-xl font-semibold text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 rounded-xl shadow-lg">

      {/* Create New Plan Button - Now at the Top */}
      <div className="text-center mb-6">
        <Link
          to="/createplan"
          className="inline-block px-10 py-4 bg-green-500 text-white text-lg font-bold rounded-full 
          shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-110 hover:shadow-xl"
        >
          ➕ Create New Plan
        </Link>
      </div>

      <h2 className="text-4xl text-center font-extrabold text-white mb-8">My Workout Plans</h2>

      {plans && plans.length > 0 ? (
        plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-blue-800 hover:text-blue-600 transition duration-200">{plan.title}</h3>
              <button
                onClick={() => handleDelete(plan._id)}
                className="text-red-500 hover:text-red-700 font-semibold text-lg transition duration-300"
              >
                🗑️ Delete
              </button>
            </div>
            <p className="text-sm text-center lg:text-left text-gray-600 mb-2">
              Created on: {new Date(plan.createdAt).toLocaleDateString()}
            </p>

            {/* Link to view and edit plan */}
            <div className="text-center mt-6">
              <Link
                to={`/plan/${plan._id}`}
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 font-semibold transition duration-200 transform hover:scale-105"
              >
                View/Edit Plan
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-600 text-center">You have no workout plans yet.</p>
      )}

      {/* Create New Plan Button - Also at the Bottom */}
      <div className="text-center mt-8">
        <Link
          to="/createplan"
          className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg 
          hover:bg-green-700 font-semibold transition duration-200 transform hover:scale-105"
        >
          ➕ Create New Plan
        </Link>
      </div>
    </div>
  );

};

export default MyPlans;
