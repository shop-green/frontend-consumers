"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";

export interface Shop {
  location: {lat: number, lng: number}
  categories: string[];
  name: string;
}

interface MapProps {
  searchLocation: { lat: number; lng: number };
  shopsNearby: Shop[];
}

export default function Maps({ searchLocation, shopsNearby }: MapProps) {
  const [map, setMap] = useState<any>();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_KEY as string;
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [searchLocation.lng, searchLocation.lat], // starting position [lng, lat]
      zoom: 16, // starting zoom
    });

    map.on("load", () => {
      map.addLayer({
        id: "terrain-data",
        type: "line",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-terrain-v2",
        },
        "source-layer": "contour",
      });
    });

    setMap(map);
  }, [searchLocation]);

  function popup(name, location) {
    //  return new mapboxgl.Popup({ offset: 20 }).setText(
    //   address
    //   );
    return new mapboxgl.Popup({ offset: 20 }).setHTML(`
  <p><stong>${name}</strong></p>
  <p>
      <a target="_blank" href="https://www.google.com/maps?q=${location.lat},${location.lng}"; style={{ textDecoration: 'none' }}>Start Navigation</a>
    </p>
  `);
  }

  useEffect(() => {
    if (map) {
      shopsNearby.forEach(({ location, name }) => {
        new mapboxgl.Marker({ color: "#3E966D" })
          .setLngLat([location.lng, location.lat])
          .addTo(map)
          .setPopup(popup(name, location));
      });
    }
  }, [shopsNearby, map]);

  return <div id="map" style={{ width: "80%", height: "80%" }}></div>;
}
