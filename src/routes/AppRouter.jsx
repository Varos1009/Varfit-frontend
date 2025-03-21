import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import Home from "../pages/Home";
import Navbar from "../components/NavBar";
import LoginPage from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Workout from "../pages/Workouts";
import WorkoutEditForm from "../components/WorkoutEditForm";
import Plan from "../pages/Plan";
import ExerciseList from "../components/ExerciseList";
import CreatePlan from "../components/CreatePlan";
import ViewEditPlan from "../components/ViewEditPlan";

const AppRouter = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<Workout />} />
          <Route path="/workouts/edit/:id" element={<WorkoutEditForm />} />
          <Route path="/exercises" element={<ExerciseList />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/createplan" element={<CreatePlan />} />
          <Route path="/plan/:id" element={<ViewEditPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
