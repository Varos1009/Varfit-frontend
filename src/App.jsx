import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { WorkoutProvider } from "./context/WorkoutContext"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"

import WorkoutEditForm from "./components/WorkoutEditForm"

function App() {


  return (
    <WorkoutProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/workouts/edit/:id" element={<WorkoutEditForm />} />
        </Routes>
      </BrowserRouter>
    </WorkoutProvider>

  )
}

export default App
