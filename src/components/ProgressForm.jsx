import { useState } from "react";
import { addProgress } from "../services/ProgressService";

const ProgressForm = ({ userId, workoutId }) => {
  const [formData, setFormData] = useState({
    weight: "",
    reps: "",
    duration: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProgress({ ...formData, user: userId, workout: workoutId });
      setSuccess("Progress logged successfully!");
      setError("");
      setFormData({ weight: "", reps: "", duration: "" });
    } catch (error) {
      setError("Error logging progress. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Log Progress</h3>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={formData.weight}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
      />

      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={formData.reps}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
      />

      <input
        type="number"
        name="duration"
        placeholder="Duration (sec)"
        value={formData.duration}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Save Progress
      </button>
    </form>
  );
};

export default ProgressForm;
