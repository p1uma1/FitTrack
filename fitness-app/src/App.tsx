import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './components/About/About';
import Navbar from './components/Navbar/Navbar';
import Preview from './pages/Preview/Preview';
import CreateExercisePlan from './components/WokoutScheduleForm/CreateExercisePlan';
import Page from './pages/WorkoutPage/page';
import ExercisePlanPage from './pages/ExercisePlanPage/ExercisePlanPage';
import UpdateExercisePlan from './components/WokoutScheduleForm/UpdateExrcisePlan';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('authToken'));
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('check auth called');
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/check-auth', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Use token in headers
          },
        });

        const data = await response.json();
        console.log(data);
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        setIsLoggedIn(false);
        console.log('error', error);
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
        <Route path='/login' element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
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
