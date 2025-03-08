import { useState, useEffect } from "react";
import { createPlan } from "../services/PlanService";
import { useWorkout } from "../context/WorkoutContext";
import { getWorkoutsByUser } from "../services/WorkoutService";

const Plan = () => {
    const { workouts } = useWorkout();
    const [planTitle, setPlanTitle] = useState("");
    const [level, setLevel] = useState("beginner");
    const [duration, setDuration] = useState(1);
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (workouts.length === 0) {
            getWorkoutsByUser();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!planTitle || selectedWorkouts.length === 0) {
            setError("Please provide a title and select at least one workout.");
            return;
        }

        const newPlan = {
            title: planTitle.trim(),
            level,
            duration,
            workouts: selectedWorkouts,
        };

        try {
            await createPlan(newPlan);
            setSuccess("Plan created successfully!");
            setError("");
            setPlanTitle("");
            setSelectedWorkouts([]);
        } catch (error) {
            setError("Error creating plan. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create a Plan</h2>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Plan Title"
                    value={planTitle}
                    onChange={(e) => setPlanTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full p-2 border rounded mb-3">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>

                <input
                    type="number"
                    placeholder="Duration (weeks)"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <div className="mb-3">
                    <label className="font-semibold">Select Workouts:</label>
                    {workouts.length > 0 ? (
                        workouts.map((workout) => (
                            <div key={workout._id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedWorkouts.includes(workout._id)}
                                    onChange={() =>
                                        setSelectedWorkouts((prev) =>
                                            prev.includes(workout._id) ? prev.filter((id) => id !== workout._id) : [...prev, workout._id]
                                        )
                                    }
                                />
                                <span className="ml-2">{workout.name}</span>
                            </div>
                        ))
                    ) : (
                        <p>No workouts available.</p>
                    )}
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Create Plan
                </button>
            </form>
        </div>
    );
};

export default Plan;
