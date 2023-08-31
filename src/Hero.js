import React from 'react';
import './heroStyles.css'; // Import your custom CSS here

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Empowering with Electron</h1>
        <p className="hero-subtitle">
          We've created a solution to support EV vehicle owners.
          Learn how to charge your vehicle efficiently and sustainably.
        </p>
        <a href="/flow" className="btn btn-primary">
          Let's Charge
        </a>
      </div>
    </div>
  );
};

export default Hero;
