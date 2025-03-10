import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";

const ViewEditPlan = () => {
  const { id } = useParams(); // Get the planId from the URL
  const { getPlan, plan, loading, error, modifyPlan } = usePlan(); // Get plan and modifyPlan from context
  const [editMode, setEditMode] = useState(false); // Track if the user is editing
  const [updatedPlan, setUpdatedPlan] = useState({ title: "", week: "", workouts: [] });
  const navigate = useNavigate(); // Updated hook for navigation

  // Fetch the plan when the component mounts
  useEffect(() => {
    if (id) {
      getPlan(id); // Get the plan by its ID
    }
  }, [id, getPlan]);

  useEffect(() => {
    if (plan) {
      setUpdatedPlan({
        ...plan,
        week: new Date(plan.week).toISOString().slice(0, 10), // Formatting the week date for input
      });
    }
  }, [plan]);

  const handleEditToggle = () => {
    setEditMode(!editMode); // Toggle between edit and view mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await modifyPlan(updatedPlan); // Modify the plan with updated data
      navigate("/myplans"); // Navigate back to the list of plans using useNavigate
    } catch (err) {
      console.error("Error saving plan", err);
    }
  };

  if (loading) return <div className="text-center">Loading plan...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{editMode ? "Edit Plan" : "View Plan"}</h2>

      {plan ? (
        <form onSubmit={handleSave}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Title</label>
              <input
                type="text"
                name="title"
                value={updatedPlan.title}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Week</label>
              <input
                type="date"
                name="week"
                value={updatedPlan.week}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Optional Workouts Section */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Workouts</label>
              {/* You can dynamically render workouts if applicable */}
              {updatedPlan.workouts && updatedPlan.workouts.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {updatedPlan.workouts.map((workout, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{workout.name}</span>
                      {editMode && (
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 text-sm"
                          onClick={() => {
                            const updatedWorkouts = updatedPlan.workouts.filter((_, i) => i !== index);
                            setUpdatedPlan({ ...updatedPlan, workouts: updatedWorkouts });
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No workouts added yet.</p>
              )}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handleEditToggle}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                {editMode ? "Cancel" : "Edit Plan"}
              </button>
              {editMode && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Plan
                </button>
              )}
            </div>
          </div>
        </form>
      ) : (
        <p className="text-lg text-gray-600">No plan found.</p>
      )}
    </div>
  );
};

export default ViewEditPlan;
