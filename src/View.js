import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./view.css"
const View = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [chargeHistoryList, setChargeHistoryList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/charge-history/api/charge-history/', {
        params: {
          user_email: userEmail,
          user_password: userPassword
        }
      });
      setChargeHistoryList(response.data);
    } catch (error) {
      console.error('Error fetching charge history:', error);
    }
  };

  return (
    <div className="view-container">
      <div className="view-form">
        <h1 className="view-title">View Charge History</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userEmail">User Email:</label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userPassword">User Password:</label>
            <input
              type="password"
              id="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {chargeHistoryList.length > 0 && (
          <div className="charge-history-list">
            {chargeHistoryList.map((history, index) => (
              <div key={index} className="charge-history-card">
                <h2>{history.charging_station_name}</h2>
                <p>User Email: {history.user_email}</p>
                <p>Billing: {history.billing}</p>
                <p>Charging Time: {history.charging_time}</p>
                <p>Charging Type: {history.charging_type}</p>
                <p>Date and Time: {history.datetime}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link to="/" className="dashboard-link">Go back to Dashboard</Link>
    </div>
  );
};

export default View;