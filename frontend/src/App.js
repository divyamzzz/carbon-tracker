// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'; // Import Home component
import Login from './components/Login'; // Import Login component
import CarbonFootprint from './components/CarbonFootprint'; // Import CarbonFootprint component
import './App.css'; // Import general styles

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carbon-footprint" element={<CarbonFootprint />} /> 
      </Routes>
    </Router>
  );
}

export default App;
