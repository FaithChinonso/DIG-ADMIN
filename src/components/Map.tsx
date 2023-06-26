/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import Script from "next/script";
import { useAppDispatch } from "src/Hooks/use-redux";

const Map = ({ address, name }: any) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: window.google?.maps.ControlPosition.RIGHT_CENTER,
    },
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <>
      <Script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        type="text/javascript"
      ></Script>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: address?.latitude, lng: address?.longitude }}
        zoom={12}
        options={options}
      >
        <Marker
          position={{ lat: address?.latitude, lng: address?.longitude }}
          key={name}
          label={name}
        />
      </GoogleMap>
    </>
  ) : (
    <div>Loading.....</div>
  );
};

export default Map;
