import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar/Navbar";
import Preview from "./pages/Preview";
import CreateExercisePlan from "./components/WokoutScheduleForm/CreateExercisePlan";
import Page from "./pages/WorkoutPage/page";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
        {/* Default path when user isn't logged in*/ }
        {!isLoggedIn && <Route path="/" element={<Navigate to="/preview" />} />}
        {isLoggedIn && <Route path="/preview" element={<Navigate to="/" />} />}
        {isLoggedIn && <Route path="/" element={<Home />} />}
        <Route path="/preview" element={<Preview/>} />
        <Route path="/workouts/customWorkout" element={<CreateExercisePlan />} />
        <Route path="/workouts/:type" element={<Page />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
