import React from "react";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

const Workout = () => {
    return (
        <div className="p-6 mt-21">
            <WorkoutForm />
            <div className="border-t border-dashed border-gray-1000 my-18"></div>
            <WorkoutList />
        </div>
    );
};

export default Workout;
