import { useEffect, useState } from "react";
import { fetchExercises, fetchTargets } from "../services/ExerciseApi";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [targets, setTargets] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 9; // Exercises per page

  // Fetch all exercises
  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true);
      try {
        const data = await fetchExercises();
        console.log("Fetched exercises:", data); // Log the fetched data

        setExercises(data);
        setFilteredExercises(data);
      } catch (err) {
        setError("Failed to load exercises.");
      }
      setLoading(false);
    };

    loadExercises();
  }, []);

  // Fetch available targets
  useEffect(() => {
    const loadTargets = async () => {
      const targetList = await fetchTargets();
      setTargets(targetList);
    };

    loadTargets();
  }, []);

  useEffect(() => {
    const filtered = selectedTarget
      ? exercises.filter((exercise) => exercise.target.toLowerCase() === selectedTarget.toLowerCase())
      : exercises;

    setFilteredExercises(filtered);

    setPage(0);
  }, [selectedTarget, exercises]);


  const currentPageExercises = filteredExercises.slice(page * limit, (page + 1) * limit);

  return (
    <div className="max-w-5xl mx-auto mt-21 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Exercise Library</h2>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          value={selectedTarget}
          onChange={(e) => setSelectedTarget(e.target.value)}
        >
          <option value="">All Targets</option>
          {targets.map((target) => (
            <option key={target} value={target}>
              {target}
            </option>
          ))}
        </select>
      </div>

      {/* Exercise List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading exercises...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : filteredExercises.length === 0 ? (
        <p className="text-center text-gray-500">No exercises found for the selected target.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentPageExercises.map((exercise, index) => {
            console.log("Exercise gifUrl:", exercise.gifUrl); // Log gifUrl to check it
            const globalIndex = page * limit + index + 1;

            return (
              <div
                key={exercise.id}
                className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
              >
                <h2 className="text-2xl text-gray-900">
                  {globalIndex}. {exercise.target} - {exercise.id}
                </h2>
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="w-full h-48 object-cover rounded-lg"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold mt-3">{exercise.name}</h3>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Buttons */}
      {filteredExercises.length > limit && (
        <div className="flex justify-center mt-6 space-x-4">
          {page > 0 && (
            <button
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-white text-blue-500 font-medium rounded-lg hover:bg-gray-400 transition"
            >
              Previous
            </button>
          )}
          {(page + 1) * limit < filteredExercises.length && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-white text-blue-500 font-medium rounded-lg hover:bg-gray-400 transition"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
