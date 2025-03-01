import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkoutById, updateWorkout } from "../services/WorkoutService";

const WorkoutEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [workout, setWorkout] = useState({
        name: "",
        category: "Strength",
        duration: 0,
        difficulty: "beginner",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const data = await getWorkoutById(id);
                if (data) {
                    setWorkout({
                        name: data.name || "",
                        category: data.category || "Strength",
                        duration: data.duration || 0,
                        difficulty: data.difficulty || "beginner",
                    });
                }
            } catch (err) {
                setError("Failed to fetch workout.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkout((prev) => ({
            ...prev,
            [name]: name === "duration" ? Number(value) : value, // Ensure duration is a number
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!workout.name || workout.duration <= 0) {
            setError("Please provide a valid name and duration.");
            return;
        }

        setIsSubmitting(true);
        try {
            await updateWorkout(id, workout);
            setSuccess("Workout updated successfully!");
            setError("");

            setTimeout(() => navigate("/workouts"), 1800);
        } catch (error) {
            setError(error.response?.data?.error || "Error updating workout.");
            setSuccess("");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;

    return (
        <div className="flex justify-center items-center my-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Edit Workout</h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

                <div>
                    <label className="block font-semibold mb-1 px-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={workout.name}
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1 px-2">Category</label>
                    <select
                        name="category"
                        value={workout.category}
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Flexibility">Flexibility</option>
                        <option value="Balance">Balance</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-1 px-2">Duration (in minutes)</label>
                    <input
                        type="number"
                        name="duration"
                        value={workout.duration}
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1 px-2">Difficulty</label>
                    <select
                        name="difficulty"
                        value={workout.difficulty}
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 mt-4 text-white font-semibold rounded-lg transition-all ${
                        isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Updating..." : "Update Workout"}
                </button>
            </form>
        </div>
    );
};

export default WorkoutEditForm;
