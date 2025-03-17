import React from "react";
import { useWorkout } from "../context/WorkoutContext";
import { Link } from "react-router-dom";
import DeleteWorkoutModal from "./DeleteWorkoutModal";
import { deleteWorkout } from "../services/WorkoutService";

const WorkoutList = () => {
  const { workouts, loading, refreshWorkouts } = useWorkout();
  const [selectedWorkout, setSelectedWorkout] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (loading) return <p>Loading...</p>;
  if (!Array.isArray(workouts)) {
    return <div>Error: Workouts data is not an array!</div>;
  }

  if (workouts.length === 0) {
    return <div>No workouts found.</div>;
  }

  const handleDeleteConfirm = async () => {
    if (!selectedWorkout) return;
    try {
      await deleteWorkout(selectedWorkout._id);
      setIsModalOpen(false);
      setSelectedWorkout(null);
      refreshWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-6">Workouts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div
            key={workout._id}
            className="relative bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 opacity-20 hover:opacity-30 transition-all"></div>

            <h3 className="text-2xl font-bold text-center text-blue-700 relative z-10">
              {workout.name}
            </h3>

            {/* Workout Details */}
            <div className="mt-4 space-y-3 relative z-10 text-white">
              <div className="flex items-center gap-2">
                <span className="text-lg">⏳</span>
                <span className="font-medium">Duration:</span> {workout.duration} min
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span className="font-medium">Difficulty:</span> {workout.difficulty}
              </div>
            </div>

            {/* Buttons Section */}
            <div className="mt-6 flex justify-between items-center space-x-3">

              {/* Edit Button */}
              <Link
                to={`/workouts/edit/${workout._id}`}
                className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                ✏️ Edit
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => {
                  setSelectedWorkout(workout);
                  setIsModalOpen(true);
                }}
                className="flex-1 text-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all transform hover:scale-105"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <DeleteWorkoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          workoutName={selectedWorkout?.name}
        />
      )}
    </div>
  );
};

export default WorkoutList;
