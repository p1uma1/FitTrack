import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: url('path_to_your_image.jpg') no-repeat center center/cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
`;

const Headline = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subheadline = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled.a`
  background: #ff5733;
  color: #fff;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
  &:hover {
    background: #c13e20;
  }
`;

const Preview: React.FC = () => {
  return (
    <div>
      <HeroSection>
        <Headline>Get Fit for Summer in Just 6 Weeks!</Headline>
        <Subheadline>Join our 6-week fat-burning workout plan designed for home workouts.</Subheadline>
        <CTAButton href="#join">Join Now</CTAButton>
      </HeroSection>
      <main>
        <section id="program-overview">
          <h2>Program Overview</h2>
          <p>Main Goal: Lose Fat</p>
          <p>Features: 5 Days a Week, 30 Minutes per Workout, Minimal Equipment</p>
          <p>Benefits: Beginner Friendly, Works Year-Round, Achieve Your Fitness Goals at Home</p>
        </section>
        <section id="workout-plan">
          <h2>Workout Plan</h2>
          <p>6-week plan with daily workout routines, rest days, and recovery tips.</p>
        </section>
        <section id="testimonials">
          <h2>Testimonials</h2>
          <p>"This program transformed my body!" - Jane D.</p>
        </section>
        <section id="supplements">
          <h2>Supplement Recommendations</h2>
          <p>Whey Protein, Multivitamin, Fish Oil, Pre-Workout (optional)</p>
        </section>
        <section id="resources">
          <h2>Additional Resources</h2>
          <p>Nutrition Plans, Recovery Tips</p>
        </section>
        <section id="subscribe">
          <h2>Subscribe for More Tips</h2>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>
      <footer>
        <p>Contact Us: info@example.com</p>
        <p>Follow Us: [Social Media Links]</p>
      </footer>
    </div>
  );
};

export default Preview;
