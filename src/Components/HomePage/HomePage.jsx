import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>
        Welcome to AI Image Generator <br />
        <span className="by-text">by</span> Muzzy Games
      </h1>

      <p>
        Explore our AI-powered image generators to create unique and fascinating images.
        Choose from different models and discover the creative possibilities.
      </p>
      <div>
        <img
          src="https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg"
          alt=""
          style={{ width: '60%', height: 'auto' }}
        />
      </div>
      <h2>Select an option below:</h2>
      <div className="options">
        <Link to="/image-generator" className="option-button">
          DALL-E Image Generator
        </Link>
        <Link to="/image-generator-sd" className="option-button"> {/* New Link for ImageGeneratorSD */}
          Image Generator SD
        </Link>
        {/* Add more options as needed */}
      </div>
    </div>
  );
};

export default HomePage;
