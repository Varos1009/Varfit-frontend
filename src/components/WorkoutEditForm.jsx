import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkout } from "../context/WorkoutContext";
import { updateWorkouts } from "../services/WorkoutService";

const WorkoutEditForm = (handle) => {
    const { id } = useParams();
    const [workout, setWorkout] = useState({
        name: "",
        duration: "",
        difficulty: "",
    });
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { workouts, refreshWorkouts } = useWorkout();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const workoutToEdit = workouts.find((w) => w._id === id);

        if (workoutToEdit) {
            setWorkout(workoutToEdit);
            setLoading(false);
        } else {
            setLoading(false);
            setError("Workout not found!");
        }
    }, [id, workouts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkout((prevWorkout) => ({
            ...prevWorkout,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await updateWorkouts(id, workout, userId);
            setSuccess("Workout updated successfully!");
            setLoading(false);
            setError("");
            refreshWorkouts();
            setTimeout(() => navigate("/workouts"), 1500);
        } catch (error) {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex items-center justify-center mt-22">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Edit Workout</h2>

                {/* Show error message */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Show success message */}
                {success && <p className="text-green-500 text-center">{success}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Workout Name"
                    value={workout.name}
                    onChange={handleInputChange}
                    className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (min)"
                    value={workout.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <select
                    name="difficulty"
                    value={workout.difficulty}
                    onChange={handleInputChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 hover:shadow-lg transition-all"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default WorkoutEditForm;
