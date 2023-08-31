import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './flow2.css'; // Import your custom CSS for styling
import auxAddressJSON from './auxAddressJSON'; // Import your JSON file here
import axios from 'axios';

const Flow2 = ({ location }) => {
  const [nearbyStations, setNearbyStations] = useState([]);

  useEffect(() => {
    const fetchNearbyStations = async () => {
      if (location && location.state) {
        const { battery_percentage, currentLocation } = location.state;
    
        const response = await callDjangoAPI(battery_percentage);
        if (!response) {
          console.error('No response from Django API.');
          return;
        }
    
        const predictedDist = response.predicted_distance;
    
        const nearbyStationsList = auxAddressJSON.records.filter((station) => {
          const stationDistance = calculateHaversianDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            station.latitude,
            station.longitude
          );
          return stationDistance <= predictedDist;
        });
    
        setNearbyStations(nearbyStationsList);
      }
    };

    fetchNearbyStations();
  }, [location]);

  const callDjangoAPI = async (battery_percentage) => {
    try {
      const response = await axios.post('http://localhost:8000/predict/predict_distance/', { battery_percentage });
      return response.data;
    } catch (error) {
      console.error('Error calling Django API:', error);
    }
  };

  const calculateHaversianDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  return (
    <div className="flow-step-2">
      <h2 className="step-title">Flow Step 2</h2>
      <div className="station-list">
        {nearbyStations.length > 0 ? (
          nearbyStations.map((station, index) => (
            <div key={index} className="station-card">
              <h3 className="station-title">Charging Station {index + 1}</h3>
              <p className="station-aux">Aux Address: {station['aux addres']}</p>
              <Link
                to={{
                  pathname: '/flow3',
                  state: {
                    stationName: station.charging_station_name // Pass the station name to Flow3
                  }
                }}
                className="reach-button"
              >
                Reached
              </Link>
              <a
                href={`http://maps.google.com/maps?z=12&t=m&q=loc:${station.latitude}+${station.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-button"
              >
                View Map
              </a>
            </div>
          ))
        ) : (
          <p className="no-stations">No nearby stations found.</p>
        )}
      </div>
      <div className="buttons">
        <Link to="/" className="exit-button">
          Exit
        </Link>
        <Link to="/flow" className="back-button">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Flow2;