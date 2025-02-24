import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import { WorkoutProvider } from "./context/WorkoutContext"

function App() {


  return (
    <BrowserRouter>
    <WorkoutProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </WorkoutProvider>
    </BrowserRouter>
  )
}

export default App
