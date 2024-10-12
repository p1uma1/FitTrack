import { useState } from "react";
import AuthPopup from "../../components/AuthPopup/AuthPopup";
import './Preview.css'; // Import the CSS file

const Preview = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <section className="hero-section">
        <h1 className="headline">Transform Your Fitness Journey!</h1>
        <h2 className="subheadline">Create custom workouts and track your progress effectively.</h2>
        {/* Change from anchor tag to button and add onClick handler */}
        <button className="cta-button" onClick={() => setShowPopup(true)}>Get Started</button>
      </section>
      <main className="main">
        <section id="program-overview" className="section">
          <h2 className="section-title">Overview of Features</h2>
          <p className="section-content">Main Goal: Customize Workouts and Track Metrics</p>
          <p className="section-content">Features: Create Workouts, Track Weight, Monitor Sleep Hours</p>
          <p className="section-content">Benefits: Personalized Fitness Experience, Stay Accountable, Achieve Your Goals</p>
        </section>
        <section id="workout-plan" className="section">
          <h2 className="section-title">Custom Workout Plans</h2>
          <p className="section-content">Design a workout plan that fits your lifestyle, whether at home or in the gym.</p>
        </section>
        <section id="testimonials" className="section">
          <h2 className="section-title">User Testimonials</h2>
          <p className="section-content">"This app helped me stay consistent with my workouts!" - Alex M.</p>
          <p className="section-content">"I love being able to track my progress all in one place!" - Sara T.</p>
        </section>
        <section id="tracking-tools" className="section">
          <h2 className="section-title">Tracking Tools</h2>
          <p className="section-content">Easily monitor your weight, sleep hours, BMI, and fat rate to stay on track.</p>
        </section>
      </main>

      {/* Render AuthPopup if showPopup is true */}
      {showPopup && (
        <AuthPopup setShowpopup={setShowPopup} />
      )}
    </div>
  );
};

export default Preview;
