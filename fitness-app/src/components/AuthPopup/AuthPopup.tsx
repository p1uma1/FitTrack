import React, { useState } from 'react';
import './AuthPopup.css';
import Logo from '../../assets/logo.png';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { storage } from "../../assets/firebaseConfig"; // Import your storage here
import { ref, getDownloadURL } from 'firebase/storage';

interface AuthPopupProps {
  setShowpopup: (showpopup: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup, setIsLoggedIn }) => {
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [error, setError] = useState<string>(''); // General error state
  const [imageUrl, setImageUrl] = useState("");

  React.useEffect(() => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!e.target) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error before new submission
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email: formData.email,
        password: formData.password
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      
      const data = response.data;
      if (data.errors) {
        // Set specific error messages or general error
        setEmailError(data.errors.email || '');
        setPasswordError(data.errors.password || '');
        setError(data.errors.general || 'An unknown error occurred during login.');
      } else {
        const userId = data.user;
        localStorage.setItem('userId', userId);
        setShowpopup(false);
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in. Please try again.'); // General error
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error before new submission
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        email: formData.email,
        password: formData.password,
      }, { headers: { 'Content-Type': 'application/json' } });
      
      console.log(response.data);
      alert('Successfully signed up');
      setShowSignup(false);
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        setEmailError(errors.email || '');
        setPasswordError(errors.password || '');
        setError(errors.general || 'An unknown error occurred during signup.');
      } else {
        setError('An error occurred while signing up. Please try again.'); // General error
      }
    }
  };

  return (
    <div className='popup'>
      <button className='close' onClick={() => setShowpopup(false)}>
        <AiOutlineClose />
      </button>
      {showSignup ? (
        <div className='authform'>
          <div className='left'>
            <img src={imageUrl} alt="Logo" />
          </div>
          <div className='right'>
            <h1>Create an account</h1>
            {error && <div className="general error">{error}</div>} {/* Display general error */}
            <form onSubmit={handleSignup}>
              <Input
                placeholder="Enter your email here"
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className='email error'>{emailError}</div>
              <Input
                placeholder="Enter your password here"
                size="lg"
                type='password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className='password error'>{passwordError}</div>
              <Input
                placeholder="Re-enter your password"
                size="lg"
                type='password'
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className='confirm password error'>{confirmPasswordError}</div>
              <button type="submit">Signup here</button>
            </form>
          </div>
        </div>
      ) : (
        <div className='authform'>
          <div className='left'>
            <img src={imageUrl} alt="Logo" />
          </div>
          <div className='right'>
            <h1>Please Login to continue</h1>
            {error && <div className="general error">{error}</div>} {/* Display general error */}
            <form onSubmit={handleLogin}>
              <Input
                placeholder="Enter your email here"
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                placeholder="Enter your password here"
                size="lg"
                type='password'
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className='authentication error'>{emailError || passwordError}</div>
              <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p>
            <button className='signup-button' onClick={() => setShowSignup(true)}>Signup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
