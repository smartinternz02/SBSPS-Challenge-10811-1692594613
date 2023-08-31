import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Flow3 = ({ location }) => {
  const [chargingTimer, setChargingTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startPauseButtonText, setStartPauseButtonText] = useState('Start');
  const [chargeStationName, setChargeStationName] = useState('');
  const [timerIntervalId, setTimerIntervalId] = useState(null); // Add this line
  const navigate = useNavigate(); // Initialize useNavigate
  // If station name was passed from Flow2
  if (location.state && location.state.stationName) {
    setChargeStationName(location.state.stationName);
  }

  const handleStartPauseTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    setStartPauseButtonText(isTimerRunning ? 'Start' : 'Pause');
    if (!isTimerRunning) {
      const timerInterval = setInterval(() => {
        setChargingTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      // Save the interval ID to clear later
      setTimerIntervalId(timerInterval);
    } else {
      clearInterval(timerIntervalId);
    }
  };

  const handleResetTimer = () => {
    clearInterval(timerIntervalId);
    setChargingTimer(0);
    setIsTimerRunning(false);
    setStartPauseButtonText('Start');
  };

  const handleFinishCharged = () => {
    clearInterval(timerIntervalId);
    navigate('/flow4', {
      state: {
        chargeStationName,
        chargingTime: chargingTimer
      }
    });
  };
  return (
    <div>
      <h2>Flow Step 3</h2>
      <div className="timer">
        <h3>Charging Timer: {chargingTimer} seconds</h3>
        <Button variant="primary" onClick={handleStartPauseTimer}>
          {startPauseButtonText}
        </Button>
        <Button variant="secondary" onClick={handleResetTimer}>
          Reset
        </Button>
      </div>
      <div className="buttons mt-3">
        <Link to="/dashboard">
          <Button variant="secondary">Exit</Button>
        </Link>
        <Link to="/flow2">
          <Button variant="secondary">Back</Button>
        </Link>
        <Button variant="primary" onClick={handleFinishCharged}>
          Finish Charged
        </Button>
        
        <Link to="/">
          <Button variant="secondary">Exit</Button>
        </Link>
        <Link to="/flow1">
          <Button variant="secondary">Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default Flow3;
