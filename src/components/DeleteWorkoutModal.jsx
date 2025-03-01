import React from "react";

const DeleteWorkoutModal = ({ isOpen, onClose, onConfirm, workoutName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg text-center font-bold text-red-800 mb-4">Are you sure?</h3>
        <p className="text-gray-600 mb-4">Do you really want to delete the workout <strong>"{workoutName}"</strong> ? This action cannot be undone.</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWorkoutModal;
