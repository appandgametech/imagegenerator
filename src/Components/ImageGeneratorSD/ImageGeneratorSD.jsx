// ImageGeneratorSD.js
import React, { useEffect } from 'react';
import Iframe from 'react-iframe';
import './ImageGeneratorSD.css';

const ImageGeneratorSD = () => {
  useEffect(() => {
    const iframe = document.getElementById('myId');
    const overlayDiv = document.createElement('div');

    overlayDiv.classList.add('overlay');
    iframe.parentNode.insertBefore(overlayDiv, iframe);

    return () => {
      // Clean up the overlay when the component unmounts.
      if (overlayDiv.parentNode) {
        overlayDiv.parentNode.removeChild(overlayDiv);
      }
    };
  }, []);

  return (
    <div className="image-generator-sd">
      <h1>AI Image Generator SD</h1>
      <div className="iframe-container">
        <Iframe
          url="https://app.prodia.com/"
          width="100%"
          height="600px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ImageGeneratorSD;
