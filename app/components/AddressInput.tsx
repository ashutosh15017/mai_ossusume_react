import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { mapsApiKey } from "../firebase-config";


function AddressInput(props:any) {
  
  return (
    <GooglePlacesAutocomplete
      apiOptions={{ language: "en", region: "jp" }}
      apiKey={mapsApiKey}
      selectProps={{
        onChange: (location) => props.setLocation(location),
      }}
      autocompletionRequest={{
        componentRestrictions: {
        country: ['jp'],
        }
      }}
      debounce={600}
      minLengthAutocomplete={3}
    />
  );
}

export default AddressInput;
