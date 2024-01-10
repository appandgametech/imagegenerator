// HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  // State variables for expanding/collapsing sections
  const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
  const [aboutAppExpanded, setAboutAppExpanded] = useState(false);
  const [contactUsExpanded, setContactUsExpanded] = useState(false);

  // Toggle functions for expanding/collapsing sections
  const toggleAboutUsVisibility = () => {
    setAboutUsExpanded(!aboutUsExpanded);
  };

  const toggleAboutAppVisibility = () => {
    setAboutAppExpanded(!aboutAppExpanded);
  };

  const toggleContactUsVisibility = () => {
    setContactUsExpanded(!contactUsExpanded);
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log(`${label} copied to clipboard:`, text);
        // You can add additional UI feedback if needed
      })
      .catch((error) => {
        console.error(`Error copying ${label} to clipboard:`, error);
        // Handle the error or provide user feedback
      });
  };

  return (
    <div className="home-page-container">
      <h1>
        Welcome to AI Image Generator <br />
        <span className="by-text">by</span> Muzzy Games
      </h1>

      {/* About Us Section */}
      <div className="home-page-expandable-section">
        <h3>
          About Us{' '}
          <button
            className={`home-page-toggle-btn ${aboutUsExpanded ? 'expanded' : 'collapsed'}`}
            onClick={toggleAboutUsVisibility}
          >
            {aboutUsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </h3>
        {aboutUsExpanded && (
          <div className="home-page-expandable-content">
            <p>
              Welcome to Muzzy Games! We are a team of passionate individuals dedicated to
              creating innovative apps, from gaming experiences to cutting-edge AI applications.
            </p>
          </div>
        )}
      </div>

      {/* About the App Section */}
      <div className="home-page-expandable-section">
        <h3>
          About the App{' '}
          <button
            className={`home-page-toggle-btn ${aboutAppExpanded ? 'expanded' : 'collapsed'}`}
            onClick={toggleAboutAppVisibility}
          >
            {aboutAppExpanded ? 'Collapse' : 'Expand'}
          </button>
        </h3>
        {aboutAppExpanded && (
          <div className="home-page-expandable-content">
            <p>
              Explore Anything AI, our latest app that allows you to generate a wide variety
              of images using advanced AI models. From casual to photorealistic and even NSFW,
              Anything AI empowers your creativity with endless possibilities.
            </p>
          </div>
        )}
      </div>

      {/* Contact Us Section */}
      <div className="home-page-expandable-section">
        <h3>
          Contact Us{' '}
          <button
            className={`home-page-toggle-btn ${contactUsExpanded ? 'expanded' : 'collapsed'}`}
            onClick={toggleContactUsVisibility}
          >
            {contactUsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </h3>
        {contactUsExpanded && (
          <div className="home-page-expandable-content">
            <p>
              For inquiries, feel free to reach out to us:<br />
              Phone: <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => copyToClipboard('3104980346', 'Phone number')}
              >
                Click here to copy
              </span><br />
              Email: <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => copyToClipboard('devappmaker@outlook.com', 'Email')}
              >
                Click here to copy
              </span><br />
            </p>
          </div>
        )}
      </div>

      <p className="home-page-description">
        <span style={{ color: 'white' }}>
          Explore our AI-powered image generators to create unique and fascinating images.
          Choose from different models and discover the creative possibilities.
        </span>
      </p>

      <div>
        <img
          src="https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg"
          alt=""
          style={{ width: '60%', height: 'auto' }}
        />
      </div>
      <h2>Select an option below:</h2>
      <div className="home-page-options">
        <Link to="/image-generator" className="home-page-option-button">
          DALL-E Image Generator
        </Link>
        <Link to="/image-generator-sd" className="home-page-option-button">
          Image Generator SD
        </Link>
        {/* Add more options as needed */}
      </div>
    </div>
  );
};

export default HomePage;
