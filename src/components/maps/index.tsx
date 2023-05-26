"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";

export default function Maps() {
  const [map, setMap] = useState<any>();
  const [points, setPoints] = useState<{ lat: number; lng: number }[]>([]);

  // Example of how to load data from a server
  const loadData = () => new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            lat: 55.704511,
            lng: 12.554729,
          },
          {
            lat: 55.705511,
            lng: 12.554729,
          },
          {
            lat: 55.706511,
            lng: 12.554729,
          },
        ]),
      6000
    );
  });

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_KEY as string;
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [12.554729, 55.70651], // starting position [lng, lat]
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
  }, []);

  useEffect(() => {
    loadData().then((data) => {
      setPoints(data);
    })
  }, [map, setPoints]);

  useEffect(() => {
    points.forEach((point) => {
      new mapboxgl.Marker()
        .setLngLat([point.lng, point.lat])
        .addTo(map);
    })
  }, [points, map]);

  return <div id="map" style={{ width: "90%", height: "90%" }}></div>;
}
