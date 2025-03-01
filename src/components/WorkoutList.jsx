import React, { useState, useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext";
import { Link } from "react-router-dom";
import DeleteWorkoutModal from "./DeleteWorkoutModal";
import { deleteWorkout } from "../services/WorkoutService";

const WorkoutList = () => {
  const { workouts, setWorkouts, loading,  updateWorkouts } = useWorkout();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    updateWorkouts();
  }, []);

  const openDeleteModal = (workout) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedWorkout(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedWorkout) {
      try {
        await deleteWorkout(selectedWorkout._id);
        setWorkouts(workouts.filter((workout) => workout._id !== selectedWorkout._id));
        closeDeleteModal();
      } catch (error) {
        console.error("Failed to delete workout:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!Array.isArray(workouts)) return <div>Error: Workouts data is not an array!</div>;
  if (workouts.length === 0) return <div>No workouts found.</div>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-6">Workouts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div key={workout._id} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all">
            <h3 className="text-xl font-bold text-center text-blue-800">{workout.name}</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center"><span className="mr-2 text-lg">🏋️</span>Category: {workout.category}</div>
              <div className="flex items-center"><span className="mr-2 text-lg">⏳</span>Duration: {workout.duration} min</div>
              <div className="flex items-center"><span className="mr-2 text-lg">🔥</span>Difficulty: {workout.difficulty}</div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Link to={`/workouts/edit/${workout._id}`} className="flex items-center text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
                <span className="mr-2">✏️</span> Edit
              </Link>
              <button onClick={() => openDeleteModal(workout)} className="flex items-center text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
                <span className="mr-2">🗑️</span> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteWorkoutModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        workoutName={selectedWorkout ? selectedWorkout.name : ""}
      />
    </div>
  );
};

export default WorkoutList;
