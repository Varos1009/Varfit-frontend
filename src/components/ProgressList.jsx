import { useEffect, useState } from "react";
import { getAllProgress, deleteProgress } from "../services/ProgressService";

const ProgressList = ({ userId }) => {
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProgress = async () => {
      try {
        const data = await getAllProgress(userId);
        setProgress(data);
      } catch (err) {
        setError("Failed to fetch progress.");
      }
    };
    getProgress();
  }, [userId]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this progress record?")) {
      try {
        await deleteProgress(id);
        setProgress(progress.filter((p) => p._id !== id));
      } catch (err) {
        setError("Failed to delete record.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Workout Progress</h2>
      {error && <p className="text-red-500">{error}</p>}

      {progress.length === 0 ? (
        <p>No progress records found.</p>
      ) : (
        progress.map((p) => (
          <div key={p._id} className="border p-4 rounded-lg mb-3">
            <p><strong>Workout:</strong> {p.workout?.name || "N/A"}</p>
            <p><strong>Weight:</strong> {p.weight} kg</p>
            <p><strong>Reps:</strong> {p.reps}</p>
            <p><strong>Duration:</strong> {p.duration} sec</p>
            <p><strong>Date:</strong> {new Date(p.date).toLocaleDateString()}</p>
            <button
              onClick={() => handleDelete(p._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProgressList;
