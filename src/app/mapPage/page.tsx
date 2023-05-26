"use client";

import { FormControl, Stack, TextField, Box, InputAdornment} from "@mui/material";
import Map from "../../components/maps";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function MapPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 55.705511,
    lng: 12.554729,
  });

  return (
    <main style={{ width: "100%", height: "100%", padding: "0 8px 8px 8px" }}>
      <h1 style={{marginLeft: "20px"}}>Map</h1>
      <Stack width="100%" height="100%" display="flex" alignItems="center" spacing={4}>
        <form style={{width: "80%"}} onSubmit={(evt) => {evt.preventDefault()}}>
          <FormControl fullWidth>
            <AddressAutofill
              onRetrieve={(result) => {
                const coordinates = result.features[0].geometry.coordinates
                setLocation({lng: coordinates[0], lat: coordinates[1]})
              }}
              accessToken={process.env.NEXT_PUBLIC_AUTOCOMPLETE_TOKEN as string}
            >
              <TextField
                fullWidth
                style={{ maxWidth: "70%"}}
                placeholder="Tell us where we should search for you"
                autoComplete="address-line1"
                InputProps={{
                  style: {fontSize: "18px", fontWeight: "bold", padding: "8px"},
                  startAdornment: (
                    <InputAdornment position="start">
                      < SearchIcon/>
                    </InputAdornment>
                  ),
                }}
              />
            </AddressAutofill>
          </FormControl>
        </form>
          <Map searchLocation={location} />
      </Stack>
    </main>
  );
}
