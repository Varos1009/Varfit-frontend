import { useEffect, useState } from "react";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const limit = 10;  // Number of exercises per page
  

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          `https://exercisedb.p.rapidapi.com/exercises?offset=${page * limit}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [page]);  // Fetch data when page changes

  if (loading) return <p>Loading exercises...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Exercise List</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id} className="mb-4 p-3 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
            <p className="text-sm">Target: {exercise.target}</p>
            <p className="text-sm">Equipment: {exercise.equipment}</p>
            <img src={exercise.gifUrl} alt={exercise.name} className="w-32 h-32 mx-auto" />
          </li>
        ))}
      </ul>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4">
        {page > 0 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Previous
          </button>
        )}
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExerciseList;
