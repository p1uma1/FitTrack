import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar/Navbar";
import Preview from "./pages/Preview";
import CreateExercisePlan from "./components/WokoutScheduleForm/CreateExercisePlan";
import Page from "./pages/WorkoutPage/page";
import ExercisePlanPage from "./pages/ExercisePlanPage/ExercisePlanPage";
import UpdateExercisePlan from "./components/WokoutScheduleForm/UpdateExrcisePlan";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onAboutClick={handleAboutClick}/>
        <Routes>
        {/* Default path when user isn't logged in*/ }
        {!isLoggedIn && <Route path="/" element={<Navigate to="/preview" />} />}
        {isLoggedIn && <Route path="/preview" element={<Navigate to="/" />} />}
        {isLoggedIn && <Route path="/" element={<Home />} />}
        <Route path="/preview" element={<Preview/>} />
        <Route path="/workouts/customWorkout" element={<CreateExercisePlan />} />
        <Route path="/workouts/:type" element={<Page />} />
        <Route path="/exercise-plans/:planId" element={<ExercisePlanPage/>} />
        <Route path="/workouts/customWorkout/:planId" element={<UpdateExercisePlan  />} />
        </Routes>
        <About ref={footerRef}/>
        
      </Router>
    </>
  );
}

export default App;
