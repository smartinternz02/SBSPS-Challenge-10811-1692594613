import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useHistory, useNavigate } from 'react-router-dom';

const Flow4 = ({ location }) => {
  const history = useNavigate(); // React Router history object

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [chargingStationName, setChargingStationName] = useState('');
  const [billing, setBilling] = useState('');
  const [chargingTime, setChargingTime] = useState('');
  const [chargingType, setChargingType] = useState('Standard'); // Default value

  // If station name and charging time were passed from Flow3
  if (location.state) {
    setChargingStationName(location.state.chargeStationName);
    setChargingTime(location.state.chargingTime);
  }

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
      const response = await axios.post('your_django_api_url', requestData);
      console.log('API response:', response.data);
      // Reset form after successful submission
      setUserEmail('');
      setUserPassword('');
      setChargingStationName('');
      setBilling('');
      setChargingTime('');
      setChargingType('');
      // Redirect to dashboard after submission
      history('/dashboard');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="update-form" style={{ maxWidth: '400px' }}>
        <h1 className="text-center">Finish Charging</h1>
        <Form onSubmit={handleSubmit}>
         <Form.Group controlId="userPassword">
            <Form.Label>User Password:</Form.Label>
            <Form.Control
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="chargingStationName">
            <Form.Label>Charging Station Name:</Form.Label>
            <Form.Control
              type="text"
              value={chargingStationName}
              onChange={(e) => setChargingStationName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="billing">
            <Form.Label>Billing:</Form.Label>
            <Form.Control
              type="number"
              value={billing}
              onChange={(e) => setBilling(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="chargingTime">
            <Form.Label>Charging Time (minutes):</Form.Label>
            <Form.Control
              type="number"
              value={chargingTime}
              onChange={(e) => setChargingTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="chargingType">
            <Form.Label>Charging Type:</Form.Label>
            <div>
              <Form.Check
                type="radio"
                id="standard"
                label="Standard"
                value="Standard"
                checked={chargingType === 'Standard'}
                onChange={() => setChargingType('Standard')}
              />
              <Form.Check
                type="radio"
                id="fast"
                label="Fast"
                value="Fast"
                checked={chargingType === 'Fast'}
                onChange={() => setChargingType('Fast')}
              />
              <Form.Check
                type="radio"
                id="supercharger"
                label="Supercharger"
                value="Supercharger"
                checked={chargingType === 'Supercharger'}
                onChange={() => setChargingType('Supercharger')}
              />
            </div>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Finish Charged
          </Button>
        </Form>
        <Link to="/flow3" className="btn btn-secondary mt-3 w-100">
          Back to Previous Step
        </Link>
      </div>
    </Container>
  );
};

export default Flow4;
