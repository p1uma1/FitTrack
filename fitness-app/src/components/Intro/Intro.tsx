import React from 'react';
import './Intro.css';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
interface AuthPopupProps {
    setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
  }

const IntroductionPage: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
  return (
    <div className="intro-page">
      <header className="intro-header">
        <Image src={Logo} alt="Logo" className="logo" />
      </header>
      <main className="intro-main">
        <h1>Welcome to Fitness Tracker</h1>
        <p>
          Create your own custom workout plans and track your progress to achieve your fitness goals. Our platform offers a comprehensive set of tools to help you stay on track and motivated.
        </p>
        <div className="intro-buttons">
          <button onClick={() => setShowpopup(true)} className="btn">
            Get Started
          </button>
        </div>
      </main>
      <footer className="intro-footer">
        <p>&copy; 2024 Fitness Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IntroductionPage;
