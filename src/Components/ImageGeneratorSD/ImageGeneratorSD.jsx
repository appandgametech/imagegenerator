// ImageGeneratorSD.js

import React from 'react';
import Iframe from 'react-iframe';
import './ImageGeneratorSD.css';

const ImageGeneratorSD = () => {
  return (
    <div className="image-generator-sd">
      <h1>AI Image Generator SD</h1>
      <Iframe
        url="https://www.msn.com"
        width="100%"
        height="600px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen
      />
    </div>
  );
};

export default ImageGeneratorSD;
