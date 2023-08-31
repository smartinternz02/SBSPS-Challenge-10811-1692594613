import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './flow1.css'; // Import your custom CSS for styling

const Flow1 = () => {
  const [battery_percentage, setBatteryPercentage] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [manualLatitude, setManualLatitude] = useState('');
  const [manualLongitude, setManualLongitude] = useState('');
  const navigate = useNavigate();

  // Fetch the current location using geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error fetching current location:', error);
      }
    );
  }, []);

  const handleFindStations = () => {
    const finalLatitude = manualLatitude || (currentLocation && currentLocation.latitude) || '';
    const finalLongitude = manualLongitude || (currentLocation && currentLocation.longitude) || '';

    navigate('/flow2', {
      state: {
        battery_percentage,
        currentLocation: {
          latitude: finalLatitude,
          longitude: finalLongitude
        }
      }
    });
  };

  return (
    <div className="flow-step-1">
      <h2 className="step-title">Flow Step 1</h2>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="battery_percentage">Enter Battery Percentage:</label>
          <input
            type="number"
            id="battery_percentage"
            value={battery_percentage}
            onChange={(e) => setBatteryPercentage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="manualLatitude">Enter Latitude (optional):</label>
          <input
            type="number"
            id="manualLatitude"
            value={manualLatitude}
            onChange={(e) => setManualLatitude(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="manualLongitude">Enter Longitude (optional):</label>
          <input
            type="number"
            id="manualLongitude"
            value={manualLongitude}
            onChange={(e) => setManualLongitude(e.target.value)}
          />
        </div>
        <button className="find-button" onClick={handleFindStations}>
          Find Nearby Stations
        </button>
      </div>
      <div className="buttons">
        <Link to="/" className="exit-button">
          Exit
        </Link>
      </div>
    </div>
  );
};

export default Flow1;