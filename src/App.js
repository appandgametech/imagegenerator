// App.js

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageGenerator from './Components/ImageGenerator/ImageGenerator';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/image-generator" element={<ImageGenerator />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
