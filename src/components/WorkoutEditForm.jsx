import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkoutById, updateWorkout } from "../services/WorkoutService";

const WorkoutEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [workout, setWorkout] = useState({
        name: "",
        category: "strength",
        duration: 0,
        difficulty: "beginner",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                console.log("Fetching workout for ID:", id);
                const data = await getWorkoutById(id);
                if (data) {
                    setWorkout({
                        name: data.name || "",
                        category: data.category || "strength",
                        duration: data.duration || 0,
                        difficulty: data.difficulty || "beginner",
                    });
                }
            } catch (err) {
                console.error("Failed to fetch workout:", err);
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
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating workout:", workout);
            await updateWorkout(id, workout);

            setSuccess("Workout updated successfully!");
            setError("");

            setTimeout(() => {
                navigate("/");
            }, 1800);
        } catch (error) {
            console.error("Error updating workout:", error);
            setError("Error updating workout.");
            setSuccess("");
        }
    };


    if (loading) return <div className="text-center text-gray-600">Loading...</div>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Workout</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={workout.name}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Category</label>
                    <select
                        name="category"
                        value={workout.category}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="strength">Strength</option>
                        <option value="cardio">Cardio</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="balance">Balance</option>
                    </select>
                </div>
                <div>
                    <label className="block font-semibold">Duration (in minutes)</label>
                    <input
                        type="number"
                        name="duration"
                        value={workout.duration}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Difficulty</label>
                    <select
                        name="difficulty"
                        value={workout.difficulty}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                    Update Workout
                </button>
            </form>
        </div>
    );
};

export default WorkoutEditForm;
