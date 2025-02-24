import { useWorkout } from "../context/WorkoutContext";
import { deleteWorkout } from "../services/WorkoutService";

const WorkoutList = () => {
  const { workouts, setWorkouts, loading } = useWorkout();

  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!Array.isArray(workouts)) {
    return <div>Error: Workouts data is not an array!</div>;
  }

  if (workouts.length === 0) {
    return <div>No workouts found.</div>;
  }


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Workouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <div key={workout._id} className="border p-4 rounded-lg shadow-lg bg-white">
            <h3 className="text-lg font-semibold">{workout.name}</h3>
            <p className="text-sm text-gray-500">Category: {workout.category}</p>
            <p className="text-sm text-gray-500">Duration: {workout.duration} min</p>
            <button
              onClick={() => handleDelete(workout._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
