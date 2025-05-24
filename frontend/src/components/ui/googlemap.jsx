import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from '../../styles/GoogleMap.css'; // Import CSS styles

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE'; // Paste your Google Maps API key here

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 21.0285, // Default: Hanoi
  lng: 105.8542,
};

function GoogleMapComponent({ address }) {
  const [center, setCenter] = useState(defaultCenter);
  const [error, setError] = useState(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          setCenter({ lat, lng });
        } else {
          setError('Không tìm thấy địa chỉ trên bản đồ');
        }
      } catch (err) {
        setError('Lỗi khi tải bản đồ');
      }
    };
    if (address) {
      geocodeAddress();
    }
  }, [address]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Vị trí bất động sản</h3>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
}

export default GoogleMapComponent;
