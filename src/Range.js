import React, { useState } from 'react';
import axios from 'axios';
import './range.css';
import {Link} from 'react-router-dom';// Import your custom CSS file for styling

const Range = () => {
  const [battery_percentage, setBatteryPercentage] = useState('');
  const [predictedDistance, setPredictedDistance] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost/predict/predict_distance/', { battery_percentage });
      if (response.data && response.data.predicted_distance) {
        setPredictedDistance(response.data.predicted_distance);
      } else {
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div className="range-form-container">
      <h1 className="form-title">Find Range</h1>
      <form onSubmit={handleSubmit} className="range-form">
        <div className="form-group">
          <label htmlFor="battery_percentage">Battery Percentage:</label>
          <input
            type="number"
            id="battery_percentage"
            value={battery_percentage}
            onChange={(e) => setBatteryPercentage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="find-button">
          Find Range
        </button>
      </form>
      {predictedDistance !== null && (
        <div className="result-card">
          <h2 className="result-title">Predicted Distance</h2>
          <p className="predicted-distance">{predictedDistance} km</p>
        </div>
      )}
            <Link to="/" className="dashboard-link">Go back to Dashboard</Link>
    </div>
  );
};

export default Range;