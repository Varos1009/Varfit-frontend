import { useState } from "react";
import { createWorkout } from "../services/WorkoutService";
import { useWorkout } from "../context/WorkoutContext";

const WorkoutForm = () => {
  const { workouts, setWorkouts } = useWorkout();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "Strength",
    duration: "",
    difficulty: "Beginner",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure all fields are filled
    if (!formData.name || !formData.duration) {
      setError("Please fill out all fields.");
      return;
    }
  
    const newWorkout = {
      name: formData.name.trim(), // Trim spaces
      category: formData.category || "Strength",
      duration: Number(formData.duration), // Ensure it's a number
      difficulty: formData.difficulty || "Beginner",
    };
  
    try {
      const createdWorkout = await createWorkout(newWorkout);
      setSuccess("Workout created successfully!");
      setError("");
  
      // Update the list of workouts
      setWorkouts([...workouts, createdWorkout]);
  
      // Reset form after submission
      setFormData({ name: "", category: "Strength", duration: "", difficulty: "Beginner" });
    } catch (error) {
      setError("Error creating workout. Please try again.");
      console.error("Error creating workout:", error);
    }
  };
  

  return (
    <div className=" flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Add Workout</h2>

        <input
          type="text"
          name="name"
          placeholder="Workout Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Strength">Strength</option>
          <option value="Cardio">Cardio</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Balance">Balance</option>
        </select>

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
