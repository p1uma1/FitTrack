import React from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import AuthPopup from "../AuthPopup/AuthPopup";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  onAboutClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, setIsLoggedIn, onAboutClick }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  const handleLogoutClick = async () => {
    console.log('handle logout');
    try {
      const response = await fetch('http://localhost:3000/api/users/logout', { // Ensure this URL is correct
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('logging out', response);

      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/preview'); 

    } catch (error) {
      console.log('Error status:', error);
    }
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowPopup(true);
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav>
      <img src={logo} alt="logo" />

      <Link to="/">Home</Link>
      <a href="#" onClick={onAboutClick} style={{ color: '#fff', marginRight: '1em' }}>About</a>
      <Link to="/profile" onClick={handleProfileClick}>
        Profile
      </Link>
      {isLoggedIn ? (
        <button onClick={handleLogoutClick}>
          LogOut
        </button>
      ) : (
        <button onClick={() => setShowPopup(true)}>LogIn</button>
      )}
      {showPopup && (
        <AuthPopup setShowpopup={setShowPopup} setIsLoggedIn={setIsLoggedIn} />
      )}
    </nav>
  );
};

export default Navbar;
