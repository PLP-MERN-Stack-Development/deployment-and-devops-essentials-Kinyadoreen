import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './NotFound.css';

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-home">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;