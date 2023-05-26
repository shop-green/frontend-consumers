"use client";

// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';

// const Map = () => {
//   const mapContainer = useRef(null);
//   const [address, setAddress] = useState('');
//   const coordinates = [
//     { lng: -74.1, lat: 40.7 },
//     { lng: -73.9, lat: 40.6 },
//     { lng: -74.0, lat: 40.8 },
//   ];

//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1IjoidmFsb3ItbW1tIiwiYSI6ImNsaTNqZzB4ODBldmwzZm85MWd3bzU2dzEifQ.nV09EKu-1xl3gviNZdhYGQ';
//     const map = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-74.5, 40], // Default center coordinates
//       zoom: 9,
//     });

//     const addMarkers = () => {
//       // Add markers to the map
//       coordinates.forEach((coord) => {
//         const marker = new mapboxgl.Marker({ color: 'red' })
//           .setLngLat([coord.lng, coord.lat])
//           .addTo(map);
//       });
//     };

//     const findPath = () => {
//       if (!address) return;

//       // Use Mapbox Directions API to find the route
//       fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/${address};${coordinates[0].lng},${coordinates[0].lat};${coordinates[1].lng},${coordinates[1].lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           const route = data.routes[0];
//           const { geometry } = route;

//           // Draw the route on the map
//           map.addLayer({
//             id: 'route',
//             type: 'line',
//             source: {
//               type: 'geojson',
//               data: {
//                 type: 'Feature',
//                 geometry: geometry,
//               },
//             },
//             paint: {
//               'line-color': 'blue',
//               'line-width': 3,
//             },
//           });
//         });
//     };

//     addMarkers();
//     findPath();

//     return () => map.remove(); // Clean up the map instance
//   }, []);

//   const handleAddressChange = (event) => {
//     setAddress(event.target.value);
//   };

//   const handleGoClick = () => {
//     // Handle address geocoding
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={address}
//         onChange={handleAddressChange}
//         placeholder="Enter an address"
//       />
//       <button onClick={handleGoClick}>Go</button>
//       <div ref={mapContainer} style={{ height: '400px' }} />
//     </div>
//   );
// };

// export default Map;

// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';

// const Map = () => {
//   const mapContainer = useRef(null);
//   const [address, setAddress] = useState('');
//   const coordinates = [
//     { lng: -74.1, lat: 40.7 },
//     { lng: -73.9, lat: 40.6 },
//     { lng: -74.0, lat: 40.8 },
//   ];

//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1IjoidmFsb3ItbW1tIiwiYSI6ImNsaTNqZzB4ODBldmwzZm85MWd3bzU2dzEifQ.nV09EKu-1xl3gviNZdhYGQ';
//     const map = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-74.5, 40], // Default center coordinates
//       zoom: 9
//     });

//     // Add markers to the map
//     coordinates.forEach((coord) => {
//       const marker = new mapboxgl.Marker({ color: 'red' })
//         .setLngLat([coord.lng, coord.lat])
//         .addTo(map);
//     });

//     return () => map.remove(); // Clean up the map instance
//   }, []);

//   const handleAddressChange = (event) => {
//     setAddress(event.target.value);
//   };

//   const handleGoClick = () => {
//     // Handle address geocoding
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={address}
//         onChange={handleAddressChange}
//         placeholder="Enter an address"
//       />
//       <button onClick={handleGoClick}>Go</button>
//       <div ref={mapContainer} style={{ height: '400px' }} />
//     </div>
//   );
// };

// export default Map;

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export function Map() {
  const mapContainer = useRef(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API_KEY;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [51.1657, 10.4515], // Default center coordinates
      zoom: 9,
    });

    const updateMap = () => {
      if (address) {
        // Use Mapbox Geocoding API to convert the address to coordinates
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxgl.accessToken}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.features.length > 0) {
              const [lng, lat] = data.features[0].center;
              map.flyTo({ center: [lng, lat] });
            }
          });
      }
    };

    updateMap();

    return () => map.remove(); // Clean up the map instance
  }, [address]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleGoClick = () => {
    updateMap();
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter an address"
      />
      <button onClick={handleGoClick}>Go</button>
      <div ref={mapContainer} style={{ height: "400px" }} />
    </div>
  );
}
