
// src/Home.js
import React from 'react';
import './Home.css';
import earthGif from './assets/earth3.webp'; // Path to your GIF

function Home() {
  return (
    <div className="home-container">
      <div className="earth-container">
        <img src={earthGif} alt="Earth Animation" className="earth-gif" />
      </div>
      <h1 className="animated-heading">Welcome to Carbon Tracker</h1>
      <p className="animated-paragraph">Track and reduce your carbon footprint with ease.</p>
    </div>
  );
}

export default Home;

