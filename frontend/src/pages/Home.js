// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div className="home-container">
    <div className="hero">
      <h1>Stay organized, track your tasks, and boost productivity</h1>
      <p>A clean full-stack MERN application for managing tasks efficiently.</p>
      <div className="hero-buttons">
        <Link to="/register" className="btn primary">Get Started</Link>
        <Link to="/login" className="btn secondary">Login</Link>
      </div>
      <p className="note">No credit card required. Just sign up and start managing your tasks.</p>
    </div>

    <div className="features">
      <h2>Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Task Management</h3>
          <p>Create, update, and track tasks with a clean and simple interface.</p>
        </div>
        <div className="feature-item">
          <h3>Secure Authentication</h3>
          <p>Authentication powered by Node.js, Express, and JWT for secure access.</p>
        </div>
        <div className="feature-item">
          <h3>MongoDB Backend</h3>
          <p>All your data is stored securely in MongoDB Atlas and served via a REST API.</p>
        </div>
      </div>
    </div>

    <div className="cta">
      <h2>Ready to boost your productivity?</h2>
      <Link to="/register" className="btn primary">Get Started</Link>
    </div>
  </div>
);

export default Home;
