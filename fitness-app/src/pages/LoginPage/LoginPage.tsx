import './LoginPage.css';
import React, { useState, useEffect } from 'react';
import { storage } from "../../assets/firebaseConfig"; // Import your storage here
import { ref, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [error, setError] = useState<string>(''); // General error state
    const navigate = useNavigate();

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error messages on input change
        if (name === 'email') {
            setEmailError('');
        } else if (name === 'password') {
            setPasswordError('');
        }
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
                setIsLoggedIn(true);
                navigate('/'); // Redirect after successful login
            }
        } catch (error: any) {
            console.error('Error logging in:', error);
            if (axios.isAxiosError(error) && error.response) {
                // Handle specific server-side validation errors
                const errors = error.response.data.errors;
                setEmailError(errors.email || '');
                setPasswordError(errors.password || '');
                setError(errors.general || 'An error occurred while logging in. Please try again.'); // General error
            } else {
                setError('An error occurred while logging in. Please try again.'); // General error
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={imageUrl} alt="Logo" />
            </div>
            <div className="login-form">
                <h2 className='Login-header'>Login</h2>
                {error && <div className="general error">{error}</div>} {/* Display general error */}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        {emailError && <div className='email error'>{emailError}</div>}
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                        {passwordError && <div className='password error'>{passwordError}</div>}
                    </div>
                    <button className='submit-button' type="submit">Login</button>
                </form>
                <p>Don't have an account?</p>
                <button className='submit-button' onClick={() => navigate('/signup')}>Signup</button>
            </div>
        </div>
    );
};

export default LoginPage;
