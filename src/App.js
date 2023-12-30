// App.js

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageGenerator from './Components/ImageGenerator/ImageGenerator';
import ImageGeneratorSD from './Components/ImageGeneratorSD/ImageGeneratorSD'; // Import the new component
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/image-generator" element={<ImageGenerator />} />
        <Route path="/image-generator-sd" element={<ImageGeneratorSD />} /> {/* Add a route for ImageGeneratorSD */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
