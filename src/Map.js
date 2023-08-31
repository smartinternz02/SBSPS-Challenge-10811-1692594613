import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MapComponent() {
  const [map, setMap] = useState(null);
  const [chargingStations, setChargingStations] = useState([]);
  const [directions, setDirections] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Load Google Maps API and initialize the map
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    // Fetch initial location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInitialLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting initial location:', error);
      }
    );
  }, []);

  const initMap = () => {
    const mapOptions = {
      center: initialLocation,
      zoom: 14,
    };
    const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    setMap(newMap);
  };

  const findNearbyChargingStations = () => {
    if (!map) return;

    // Fetch current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        const service = new window.google.maps.places.PlacesService(map);

        service.nearbySearch(
          {
            location: currentLocation,
            radius: 5000,
            type: 'charging_station',
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setChargingStations(results);
            }
          }
        );
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  };

  // Rest of the code remains unchanged...
  const showDirections = (destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: { currentLocation },
        destination,
        travelMode: 'DRIVING',
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
          directionsRenderer.setDirections(result);
        }
      }
    );
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <button onClick={findNearbyChargingStations}>Find Charging Stations</button>
      {chargingStations.map((station) => (
        <div key={station.id}>
          <p>{station.name}</p>
          <button onClick={() => showDirections(station.geometry.location)}>
            Get Directions
          </button>
        </div>
      ))}
      {directions && (
        <Link to="/charge_history">
          <button>Reached</button>
        </Link>
      )}
    </div>
  );
}

export default MapComponent;
