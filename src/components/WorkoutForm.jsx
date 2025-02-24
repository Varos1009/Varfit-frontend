import { useState } from "react";
import { createWorkout } from "../services/WorkoutService";
import { useWorkout } from "../context/WorkoutContext";

const WorkoutForm = () => {
  const { workouts, setWorkouts } = useWorkout();
  const [formData, setFormData] = useState({
    name: "",
    category: "strength",
    duration: "",
    difficulty: "beginner",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWorkout = await createWorkout(formData);
      setWorkouts([...workouts, newWorkout]);
      setFormData({ name: "", category: "strength", duration: "", difficulty: "beginner" });
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Add Workout</h2>
      <input
        type="text"
        name="name"
        placeholder="Workout Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="strength">Strength</option>
        <option value="cardio">Cardio</option>
        <option value="flexibility">Flexibility</option>
        <option value="balance">Balance</option>
      </select>
      <input
        type="number"
        name="duration"
        placeholder="Duration (min)"
        value={formData.duration}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
