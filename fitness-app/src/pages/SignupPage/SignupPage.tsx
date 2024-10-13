import './SignupPage.css';
import React, { useState, useEffect } from 'react';
import { storage } from "../../assets/firebaseConfig"; // Import your storage here
import { ref, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignupPageProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ setIsLoggedIn }) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
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
        } else if (name === 'confirmPassword') {
            setConfirmPasswordError('');
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
            const data = response.data;
            if (data.errors) {
                // Set specific error messages or general error
                setEmailError(data.errors.email || '');
                setPasswordError(data.errors.password || '');
                setError(data.errors.general || 'An unknown error occurred during signup.');
            } else {
                const userId = data.user;
                localStorage.setItem('userId', userId);
                setIsLoggedIn(true);
                navigate('/'); // Redirect after successful signup
            }
        } catch (error) {
            console.error('Error signing up:', error);
            if (error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
                setEmailError(errors.email || '');
                setPasswordError(errors.password || '');
                setError(errors.general || 'An unknown error occurred during signup.'); // General error
            } else {
                setError('An error occurred while signing up. Please try again.'); // General error
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-logo">
                <img src={imageUrl} alt="Logo" />
            </div>
            <div className="signup-form">
                <h2 className='signup-header'>Signup</h2>
                {error && <div className="general error">{error}</div>} {/* Display general error */}
                <form onSubmit={handleSignup}>
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
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Re-enter your password" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                        />
                        {confirmPasswordError && <div className='confirm-password error'>{confirmPasswordError}</div>}
                    </div>
                    <button className='submit-button' type="submit">Signup</button>
                </form>
                <p>Already have an account?</p>
                <button className='submit-button' onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
};

export default SignupPage;
