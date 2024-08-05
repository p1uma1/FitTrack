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
  padding: 0 20px;
`;

const Headline = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Subheadline = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const CTAButton = styled.a`
  background: #ff5733;
  color: #fff;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.5rem;
  transition: background 0.3s ease;
  &:hover {
    background: #c13e20;
  }
`;

const Main = styled.main`
  padding: 4rem 2rem;
  background-color: #1e1e1e;
  color: #fff;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ff5733;
`;

const SectionContent = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
`;

const Footer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

const Preview: React.FC = () => {
  return (
    <div>
      <HeroSection>
        <Headline>Get Fit for Summer in Just 6 Weeks!</Headline>
        <Subheadline>Join our 6-week fat-burning workout plan designed for home workouts.</Subheadline>
        <CTAButton href="#join">Join Now</CTAButton>
      </HeroSection>
      <Main>
        <Section id="program-overview">
          <SectionTitle>Program Overview</SectionTitle>
          <SectionContent>Main Goal: Lose Fat</SectionContent>
          <SectionContent>Features: 5 Days a Week, 30 Minutes per Workout, Minimal Equipment</SectionContent>
          <SectionContent>Benefits: Beginner Friendly, Works Year-Round, Achieve Your Fitness Goals at Home</SectionContent>
        </Section>
        <Section id="workout-plan">
          <SectionTitle>Workout Plan</SectionTitle>
          <SectionContent>6-week plan with daily workout routines, rest days, and recovery tips.</SectionContent>
        </Section>
        <Section id="testimonials">
          <SectionTitle>Testimonials</SectionTitle>
          <SectionContent>"This program transformed my body!" - Jane D.</SectionContent>
        </Section>
        <Section id="supplements">
          <SectionTitle>Supplement Recommendations</SectionTitle>
          <SectionContent>Whey Protein, Multivitamin, Fish Oil, Pre-Workout (optional)</SectionContent>
        </Section>
        <Section id="resources">
          <SectionTitle>Additional Resources</SectionTitle>
          <SectionContent>Nutrition Plans, Recovery Tips</SectionContent>
        </Section>
        <Section id="subscribe">
          <SectionTitle>Subscribe for More Tips</SectionTitle>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </Section>
      </Main>
    </div>
  );
};

export default Preview;
