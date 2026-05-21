import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '24px'
};

const center = { lat: 40.7128, lng: -74.0060 }; // NYC

// Apple/Minimalist Dark Mode Map Style
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ]
};

export default function CityMap({ alertZone, userLocation }) {
  // Replace with env variable in production
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const center = userLocation || { lat: 17.3850, lng: 78.4867 }; // Default to Hyderabad
  const anomalyPos = { lat: center.lat + 0.001, lng: center.lng - 0.001 };

  if (loadError) return <div style={{ padding: '20px' }}>Error loading maps</div>;
  if (!isLoaded) return <div style={{ padding: '20px', color: '#86868B' }}>Loading Map Engine...</div>;

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker 
            position={userLocation} 
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
          />
        )}
        
        {alertZone === 'zone_central' && (
          <>
            <Circle
              center={anomalyPos}
              radius={400}
              options={{
                fillColor: '#FF3B30',
                fillOpacity: 0.3,
                strokeColor: '#FF3B30',
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
            <Marker position={anomalyPos} />
          </>
        )}
      </GoogleMap>
    </div>
  );
}
