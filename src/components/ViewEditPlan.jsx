import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { useWorkout } from "../context/WorkoutContext";

const ViewEditPlan = () => {
    const { id } = useParams();
    const { workouts } = useWorkout(); // Fetch available workouts from context
    const { getPlan, plans, loading, error } = usePlan(); // Plan context for fetching plan

    const [resolvedWorkouts, setResolvedWorkouts] = useState([]);

    // Fetch the plan when the component mounts
    useEffect(() => {
        if (id) {
            console.log("Fetching plan for Plan ID:", id);
            getPlan(id); // Fetch the plan with the given ID
        }
    }, [id]);

    // Resolve workout names from the workouts context
    useEffect(() => {
        if (plans && workouts) {
            // Resolve workout names based on the workoutId
            const resolved = plans.workouts?.map((workout) => {
                const workoutDetails = workouts.find((w) => w._id === workout.workoutId);
                return {
                    ...workout,
                    name: workoutDetails ? workoutDetails.name : "Unknown Workout",
                };
            });
            setResolvedWorkouts(resolved || []);
        }
    }, [plans, workouts]);

    // Loading and error handling
    if (loading) return <div className="text-center text-xl font-medium text-blue-500">Loading plan...</div>;
    if (error) return <div className="text-center text-xl font-medium text-red-500">{error}</div>;

    // If no plan is found
    if (!plans) {
        return <div className="text-center text-xl font-medium text-gray-500">No plan found.</div>;
    }

    // Group workouts by days if resolvedWorkouts is available
    const workoutsList = resolvedWorkouts || [];
    const groupedWorkouts = workoutsList.reduce((acc, workout) => {
        const day = workout.day;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(workout.name); // Group workout by the day
        return acc;
    }, {});

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold text-white text-center mb-6">
                Plan Details
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-xl space-y-8">
                {/* Title */}
                <div>
                    <h3 className="text-2xl text-center  font-bold text-blue-800">Title</h3>
                    <p className="text-lg text-center text-red-600 mt-2">{plans.title}</p>
                </div>

                {/* Week */}
                <div>
                    <h3 className="text-2xl text-center font-bold text-blue-800">Created</h3>
                    <p className="text-lg text-center text-red-600 rounded-lg py-2 px-4 mt-2 ">
                        {formatDate(plans.week)}
                    </p>
                </div>

                {/* Workouts Section (Display Days with Workouts) */}
                <div>
                    <h3 className="text-2xl font-bold text-blue-800">Workouts by Day</h3>
                    <div className="mt-4">
                        {Object.keys(groupedWorkouts).length > 0 ? (
                            Object.keys(groupedWorkouts).map((day, index) => (
                                <div key={index} className="mb-6">
                                    <h4 className="text-xl font-semibold text-blue-800 mb-2">{day}</h4>
                                    <ul className="space-y-3">
                                        {groupedWorkouts[day].map((workout, idx) => (
                                            <li key={idx} className="p-4 bg-green-100 text-lg text-red-800 rounded-lg shadow-sm">
                                                {workout}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No workouts added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEditPlan;
