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
  const [showpopup, setShowpopup] = React.useState<boolean>(false);

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowpopup(true);
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
        <button
          onClick={() => {
            setIsLoggedIn(false);
            navigate("/preview");
          }}
        >
          LogOut
        </button>
      ) : (
        <button onClick={() => setShowpopup(true)}>LogIn</button>
      )}
      {showpopup && (
        <AuthPopup setShowpopup={setShowpopup} setIsLoggedIn={setIsLoggedIn} />
      )}
    </nav>
  );
};

export default Navbar;
