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
import ProgressList from "../components/ProgressList";
import ProgressForm from "../components/ProgressForm";
import ExerciseList from "../components/ExerciseList";

const AppRouter = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Rutas protegidas solo para usuarios logueados */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/:uid" element={<Dashboard />} />
          <Route path="/workouts" element={<Workout />} />
          <Route path="/workouts/edit/:id" element={<WorkoutEditForm />} />
          <Route path="/exercises" element={<ExerciseList />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/progress" element={<ProgressList />} />
          <Route path="/progress/edit/:id" element={<ProgressForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
