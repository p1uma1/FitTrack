import React, { useState } from 'react';
import './AuthPopup.css';
import Logo from '../../assets/logo.png';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    age: '',
    weight: '',
    gender: '',
    height: '',
  });
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!e.target) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      } else {
        const userId = data.user;
        localStorage.setItem('userId', userId);
        console.log(userId,' was the userId');
        setShowpopup(false);
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        email: formData.email,
        password: formData.password,
        age: formData.age,
        weight: formData.weight,
        gender: formData.gender,
        height: formData.height,
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
            <img src={Logo} alt="Logo" />
          </div>
          <div className='right'>
            <h1>Create an account</h1>
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
              <div className='form_input_leftright'>
                <Input
                  size="lg"
                  variant="outlined"
                  type="number"
                  placeholder='Age'
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                <Input
                  size="lg"
                  variant="outlined"
                  type="number"
                  placeholder='Weight'
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
                <br />
                <Select
                  placeholder="Gender"
                  size="lg"
                  name="gender"
                  value={formData.gender}
                  onChange={(_, newValue) => handleChange({ target: { name: 'gender', value: newValue } } as any)}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </div>
              <div className='form_input_leftright'>
                <label htmlFor='height'>Height</label>
                <Input
                  size="lg"
                  variant="outlined"
                  type="number"
                  placeholder='cm'
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Signup here</button>
            </form>
          </div>
        </div>
      ) : (
        <div className='authform'>
          <div className='left'>
            <img src={Logo} alt="Logo" />
          </div>
          <div className='right'>
            <h1>Please Login to continue</h1>
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
