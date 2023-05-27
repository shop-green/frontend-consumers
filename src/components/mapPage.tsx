"use client";

import { Stack, Grid, IconButton } from "@mui/material";
import Map from "./maps";
import { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import dynamic from "next/dynamic";
const AddrAutocomplete = dynamic(() => import("./autocomplete"), {
  ssr: false,
});

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useShopSearch } from "../hooks/useShopSearch";

import yn from "yn";

export default function MapPage() {
  const router = useRouter();
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 55.705511,
    lng: 12.554729,
  });
  const searchParams = useSearchParams();
  const { shopsNearby, fetchShops } = useShopSearch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetchShops({
      location: {
        latitude: location.lat,
        longitude: location.lng,
      },
      maxDistance: searchParams.get("readius")
        ? parseInt(searchParams.get("readius"))
        : undefined,
      categories: searchParams.get("selectedCategory")
        ? searchParams.get("selectedCategory").split(",")
        : [],
      organic: yn(searchParams.get("organicChecked") || undefined),
      ecoPackaging: yn(searchParams.get("packagingChecked") || undefined),
    });
  }, [searchParams.toString(), location]);

  searchParams.forEach((item) => console.log(item));

  return (
    <main style={{ width: "100%", height: "100%", padding: "0 8px 8px 8px" }}>
      <h1 style={{ marginLeft: "20px" }}>Map</h1>
      <Stack
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        spacing={3}
      >
        <Grid container style={{ width: "80%" }} spacing={2}>
          <Grid item xs={10} md={7} style={{ paddingLeft: "9px" }}>
            {isClient && <AddrAutocomplete setLocation={setLocation} />}
          </Grid>
          <Grid item xs={2} md={2} display="flex" justify-content="flex-start">
            <IconButton
              onClick={() => {
                router.push("filter");
              }}
              size="large"
              style={{
                borderRadius: "5px",
                backgroundColor: "#3E966D",
                color: "white",
              }}
            >
              <FilterAltIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Map searchLocation={location} shopsNearby={shopsNearby} />
      </Stack>
    </main>
  );
}
