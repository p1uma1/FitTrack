import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../../assets/firebaseConfig"; // Import your storage here
import { ref, getDownloadURL } from 'firebase/storage';
import "./Navbar.css";
import AuthPopup from "../AuthPopup/AuthPopup";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  onAboutClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, setIsLoggedIn, onAboutClick }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'gs://taskmanager-b3c80.appspot.com/Fitness_Tracker-removebg-preview.png'); // Replace with your image path
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/preview');
    } catch (error) {
      console.error('Error status:', error);
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
      {imageUrl && <img src={imageUrl} alt="Logo" />} {/* Adjust styles as needed */}
      
      <Link to="/">Home</Link>
      <a href="#" className="about-link" onClick={onAboutClick}>About</a> {/* Changed to className */}
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
