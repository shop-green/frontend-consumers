"use client";

import {
  FormControl,
  Stack,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Map from "../../components/maps";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function MapPage() {
  const router = useRouter();
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 55.705511,
    lng: 12.554729,
  });
  const searchParams = useSearchParams();
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
          <Grid item xs={8} md={7} style={{ paddingLeft: "9px" }}>
            <form
              onSubmit={(evt) => {
                evt.preventDefault();
              }}
            >
              <FormControl fullWidth>
                <AddressAutofill
                  onRetrieve={(result) => {
                    const coordinates = result.features[0].geometry.coordinates;
                    setLocation({ lng: coordinates[0], lat: coordinates[1] });
                  }}
                  accessToken={
                    process.env.NEXT_PUBLIC_AUTOCOMPLETE_TOKEN as string
                  }
                >
                  <TextField
                    fullWidth
                    placeholder="Tell us where we should search for you"
                    autoComplete="address-line1"
                    InputProps={{
                      style: {
                        fontSize: "18px",
                        padding: "8px",
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </AddressAutofill>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={4} md={2} display="flex" justify-content="flex-start">
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
        <Map
          searchLocation={location}
          shopsNearby={[
            {
              location: {
                lat: 55.704511,
                lng: 12.554729,
              },
            },
            {
              location: {
                lat: 55.706511,
                lng: 12.554729,
              },
            },
            {
              location: {
                lat: 55.705511,
                lng: 12.554729,
              },
            },
          ]}
        />
      </Stack>
    </main>
  );
}
