import { useState } from "react";
import { createWorkout } from "../services/WorkoutService";
import { useWorkout } from "../context/WorkoutContext";
import { useAuth } from "../context/AuthContext";

const WorkoutForm = () => {
  const { currentUser } = useAuth();
  const { workouts, setWorkouts } = useWorkout();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    difficulty: "Beginner",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError("You must be logged in to add a workout.");
      return;
    }

    if (!formData.name.trim() || !formData.duration) {
      setError("Please fill out all fields.");
      return;
    }

    const newWorkout = {
      name: formData.name.trim(),
      duration: parseInt(formData.duration, 10),
      difficulty: formData.difficulty,
      userId: currentUser.uid,
    };

    try {
      const createdWorkout = await createWorkout(newWorkout);
      setSuccess("Workout created successfully!");
      setError("");

      setWorkouts([...workouts, createdWorkout]);

      setFormData({ name: "", duration: "", difficulty: "Beginner" });

      setTimeout(() => {
        setSuccess("");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.errors?.[0]?.msg || "Error creating workout.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Add Workout</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="flex items-center justify-between w-full mb-3">
          <label className="text-gray-700 font-semibold">Workout Name</label>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setShowInfo(!showInfo)}
          >
            ℹ️
          </button>
        </div>

        {showInfo && (
          <p className="text-gray-600 text-sm mb-3 bg-gray-100 p-2 rounded-lg">
            Create 7 workouts for every day of the week, or you can use one workout for different days.
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Workout Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (min)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
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
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
