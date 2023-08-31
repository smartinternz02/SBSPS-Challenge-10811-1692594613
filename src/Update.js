import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./update.css"

const Update = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [chargingStationName, setChargingStationName] = useState('');
  const [billing, setBilling] = useState('');
  const [chargingTime, setChargingTime] = useState('');
  const [chargingType, setChargingType] = useState('Standard'); // Default value

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      user_email: userEmail,
      user_password: userPassword,
      charging_station_name: chargingStationName,
      billing: parseFloat(billing),
      charging_time: parseInt(chargingTime),
      charging_type: chargingType,
      datetime: new Date().toISOString()
    };

    try {
      const response = await axios.post('http://localhost:8000/charge-history/api/charge-history/', requestData);
      console.log('API response:', response.data);
      // Reset form after successful submission
      setUserEmail('');
      setUserPassword('');
      setChargingStationName('');
      setBilling('');
      setChargingTime('');
      setChargingType('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="update-container">
      <div className="update-form">
        <h1 className="text-center">Update Charge History</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userEmail">User Email:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <label htmlFor="userPassword">User Password:</label>
          <input
            type="password"
            id="userPassword"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <label htmlFor="chargingStationName">Charging Station Name:</label>
          <input
            type="text"
            id="chargingStationName"
            value={chargingStationName}
            onChange={(e) => setChargingStationName(e.target.value)}
          />
          <label htmlFor="billing">Billing:</label>
          <input
            type="number"
            id="billing"
            value={billing}
            onChange={(e) => setBilling(e.target.value)}
          />
          <label htmlFor="chargingTime">Charging Time (minutes):</label>
          <input
            type="number"
            id="chargingTime"
            value={chargingTime}
            onChange={(e) => setChargingTime(e.target.value)}
          />
          <div className="charging-type">
            <label>Charging Type:</label>
            <div>
              <input
                type="radio"
                id="standard"
                value="Standard"
                checked={chargingType === 'Standard'}
                onChange={() => setChargingType('Standard')}
              />
              <label htmlFor="standard">Standard</label>
              <input
                type="radio"
                id="fast"
                value="Fast"
                checked={chargingType === 'Fast'}
                onChange={() => setChargingType('Fast')}
              />
              <label htmlFor="fast">Fast</label>
              <input
                type="radio"
                id="supercharger"
                value="Supercharger"
                checked={chargingType === 'Supercharger'}
                onChange={() => setChargingType('Supercharger')}
              />
              <label htmlFor="supercharger">Supercharger</label>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <Link to="/" className="back-button">
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Update;