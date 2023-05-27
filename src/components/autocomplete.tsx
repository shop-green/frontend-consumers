import { InputAdornment } from "@mui/material";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AddressAutofill } from "@mapbox/search-js-react";
export default function AddrAutocomplete({ setLocation }) {
  return (
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
          accessToken={process.env.NEXT_PUBLIC_AUTOCOMPLETE_TOKEN as string}
        >
          <TextField
            fullWidth
            placeholder="Search for location"
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
  );
}
