import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Preview from './pages/Preview';
import CreateExercisePlan from './components/WokoutScheduleForm/CreateExercisePlan';
import Page from './pages/WorkoutPage/page';
import ExercisePlanPage from './pages/ExercisePlanPage/ExercisePlanPage';
import UpdateExercisePlan from './components/WokoutScheduleForm/UpdateExrcisePlan';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true');
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('check auth called');
      try {
        const response = await fetch('http://localhost:3000/api/check-auth', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log(data);
        setIsLoggedIn(data.isLoggedIn);
        localStorage.setItem('isLoggedIn', data.isLoggedIn.toString());
      } catch (error){
        setIsLoggedIn(false);
        console.log('error', error);
        localStorage.setItem('isLoggedIn', 'false');
      }
    };

    checkAuthStatus();
  }, []);

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onAboutClick={handleAboutClick} />
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Preview />} />}
        {isLoggedIn && <Route path="/" element={<Home />} />}
        <Route path="/preview" element={<Preview />} />
        <Route path="/workouts/customWorkout" element={<CreateExercisePlan />} />
        <Route path="/workouts/:Type" element={<Page />} />
        <Route path="/exercise-plans/:planId" element={<ExercisePlanPage />} />
        <Route path="/workouts/customWorkout/:planId" element={<UpdateExercisePlan />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <About ref={footerRef} />
    </Router>
  );
}

export default App;
