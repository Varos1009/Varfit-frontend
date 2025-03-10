import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { useWorkout } from "../context/WorkoutContext";

const ViewEditPlan = () => {
    const { id } = useParams();
    const { workouts } = useWorkout(); // Fetch available workouts from the workout context
    const { getPlan, plans, loading, error, modifyPlan } = usePlan(); // Plan context for fetching and modifying plan
    const [editMode, setEditMode] = useState(false); // Track whether the user is editing
    const [updatedPlan, setUpdatedPlan] = useState({ title: "", week: "", workouts: [] });
    const navigate = useNavigate(); // Navigate after saving the plan

    // Fetch the plan when the component mounts
    useEffect(() => {
        if (id) {
            console.log("Fetching plan for Plan ID:", id);
            getPlan(id); // Fetch the plan with the given ID
        }
    }, [id]); // Depend on the plan ID in the URL

    // Update the form if plan data exists
    useEffect(() => {
        if (plans) {
            const weekDate = plans.week ? new Date(plans.week) : null;
            if (weekDate && !isNaN(weekDate)) {
                setUpdatedPlan({
                    ...plans,
                    week: weekDate.toISOString().slice(0, 10),
                });
            } else {
                setUpdatedPlan({
                    ...plans,
                    week: "", // Default to empty string if week is missing or invalid
                });
            }
        }
    }, [plans]);

    // Handle input changes for fields like title, week, etc.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPlan((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Toggle between view and edit modes
    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    // Add workout to the plan
    const handleAddWorkout = (workoutId) => {
        const selectedWorkout = workouts.find((workout) => workout._id === workoutId);
        if (selectedWorkout && !updatedPlan.workouts.some((w) => w._id === workoutId)) {
            setUpdatedPlan((prev) => ({
                ...prev,
                workouts: [...prev.workouts, selectedWorkout],
            }));
        }
    };

    // Remove workout from the plan
    const handleRemoveWorkout = (index) => {
        const updatedWorkouts = updatedPlan.workouts.filter((_, i) => i !== index);
        setUpdatedPlan({ ...updatedPlan, workouts: updatedWorkouts });
    };

    // Save the plan after editing
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await modifyPlan(updatedPlan); // Modify the plan with updated data
            navigate("/myplans"); // Navigate back to the list of plans after saving
        } catch (err) {
            console.error("Error saving plan", err);
            alert("There was an error saving the plan. Please try again.");
        }
    };

    // Loading and error handling
    if (loading) return <div className="text-center">Loading plan...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    // If no plan is found
    if (!plans) {
        return <div className="text-center text-gray-500">No plan found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{editMode ? "Edit Plan" : "View Plan"}</h2>

            <form onSubmit={handleSave}>
                <div className="space-y-6">
                    {/* Title Field */}
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

                    {/* Week Field */}
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

                    {/* Workouts Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Workouts</label>

                        {/* Available workouts (only when in edit mode) */}
                        {editMode && workouts.length > 0 && (
                            <div className="mt-4">
                                <label htmlFor="workout" className="block text-sm font-medium text-gray-600">
                                    Add a workout
                                </label>
                                <select
                                    id="workout"
                                    onChange={(e) => handleAddWorkout(e.target.value)}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a workout</option>
                                    {workouts.map((workout) => (
                                        <option key={workout._id} value={workout._id}>
                                            {workout.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Display selected workouts */}
                        {updatedPlan.workouts && updatedPlan.workouts.length > 0 ? (
                            <ul className="mt-2 space-y-2">
                                {updatedPlan.workouts.map((workout, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span>{workout.name}</span>
                                        {editMode && (
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700 text-sm"
                                                onClick={() => handleRemoveWorkout(index)}
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

                    {/* Buttons */}
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
        </div>
    );
};

export default ViewEditPlan;
