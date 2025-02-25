import React from "react";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Workout Tracker</h1>
            <WorkoutForm />
            <WorkoutList />
        </div>
    );
};

export default Home;
