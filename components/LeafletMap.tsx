import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface LeafletMapProps {
  coordinates: { latitude: number; longitude: number };
}

const LeafletMap: React.FC<LeafletMapProps> = ({ coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([coordinates.latitude, coordinates.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      L.marker([coordinates.latitude, coordinates.longitude]).addTo(map);
    }
  }, [coordinates]);

  return mapRef.current ? (
    <div ref={mapRef} style={{ height: '400px' }}></div>
  ) : null;
};

export default LeafletMap;
