import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar/Navbar";
import Preview from "./pages/Preview";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
        {/* Default path when user isn't logged in*/ }
        {!isLoggedIn && <Route path="/" element={<Navigate to="/preview" />} />}

        {isLoggedIn && <Route path="/" element={<Home />} />}
        <Route path="/preview" element={<Preview/>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
