import React from "react";
import { useWorkout } from "../context/WorkoutContext";
import { Link } from "react-router-dom";
import DeleteWorkoutModal from "./DeleteWorkoutModal";

const WorkoutList = () => {
  const { workouts, loading } = useWorkout(); // ✅ Get workouts from context
  console.log("Workouts in WorkoutList:", workouts); // ✅ Debugging log
  const [selectedWorkout, setSelectedWorkout] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (loading) return <p>Loading...</p>;
  if (!Array.isArray(workouts)) {
    console.error("Workouts is not an array:", workouts);
    return <div>Error: Workouts data is not an array!</div>;
  }
  
  if (workouts.length === 0) {
    console.warn("Workouts array is empty!");
    return <div>No workouts found.</div>;
  }
  

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
            <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-between items-center">
              <Link to={`/workouts/edit/${workout._id}`} className="flex items-center gap-2 text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all w-full sm:w-auto justify-center">✏️ Edit</Link>
              <button onClick={() => setSelectedWorkout(workout)} className="flex items-center gap-2 text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all w-full sm:w-auto justify-center">🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && <DeleteWorkoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={() => {/* delete logic */}} workoutName={selectedWorkout?.name} />}
    </div>
  );
};

export default WorkoutList;
