import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaGem, FaHome, FaEnvelope, FaPhone } from 'react-icons/fa';
import './About.css'; // Import the CSS file

const About = React.forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <footer ref={ref} className="about-footer" style={{padding:"20px 0 0 0"}}>
      {/* Section: Social media */}
      <section className="social-media">
        <div className="social-media-left">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="social-media-right">
          <a href="https://www.facebook.com/nimsara.piumal/">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaGoogle />
          </a>
          <a href="https://www.instagram.com/p1uma1/">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="https://github.com/p1uma1">
            <FaGithub />
          </a>
        </div>
      </section>

      {/* Section: Links */}
      <section>
  <div className="footer-container">
    <div className="col">
      <h6 className="footer-title">
        <FaGem className="me-3" /> FitTrack
      </h6>
      <p className="text-reset">Track your workouts, weight, sleep, BMI, and body fat percentage all in one place.</p>
    </div>

    <div className="col">
      <h6 className="footer-title">Features</h6>
      <p><a href="#!" className="text-reset">Custom Workouts</a></p>
      <p><a href="#!" className="text-reset">Progress Tracking</a></p>
      <p><a href="#!" className="text-reset">Nutrition Tips</a></p>
      <p><a href="#!" className="text-reset">Recovery Strategies</a></p>
    </div>

    <div className="col">
      <h6 className="footer-title">Resources</h6>
      <p><a href="#!" className="text-reset">Blog</a></p>
      <p><a href="#!" className="text-reset">Help Center</a></p>
      <p><a href="#!" className="text-reset">FAQs</a></p>
      <p><a href="#!" className="text-reset">Contact Support</a></p>
    </div>

    <div className="col">
      <h6 className="footer-title">Contact</h6>
      <p className="text-reset"><FaHome className="me-3" /><br></br> Kurunegala, Sri Lanka</p>
      <p className="text-reset"><FaEnvelope className="me-3" /> <br/>nimsarapiumalfreelance@gmail.com</p>
      <p className="text-reset"><FaPhone className="me-3" /> <br/>+94 70 352 2847</p>
    </div>
  </div>
</section>


      {/* Copyright */}
      <div className="footer-copyright">
        © 2024 FitTrack. All rights reserved.
      </div>
    </footer>
  );
});

export default About;
