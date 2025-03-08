import React from "react";
import {AuthProvider} from "./context/AuthContext";
import { WorkoutProvider } from "./context/WorkoutContext";
import { PlanProvider } from "./context/PlanContext";
import AppRouter from "./routes/AppRouter"; 

function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <PlanProvider>
          <AppRouter />
        </PlanProvider>
      </WorkoutProvider>
    </AuthProvider>
  );
}

export default App;
