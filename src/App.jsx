import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "./context/AuthContext";
import { WorkoutProvider } from "./context/WorkoutContext"
import Home from "./pages/Home"
import Navbar from "./components/NavBar"
import LoginPage from "./pages/Login"
import SignUp from "./pages/SignUp"
import Workout from "./pages/Workouts"
import WorkoutEditForm from "./components/WorkoutEditForm"


function App() {


  return (
    <AuthProvider>
      <WorkoutProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<Workout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/workouts/edit/:id" element={<WorkoutEditForm />} />
          </Routes>
        </BrowserRouter>
      </WorkoutProvider>
    </AuthProvider>

  )
}

export default App
