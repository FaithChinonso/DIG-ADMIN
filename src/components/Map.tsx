/* eslint-disable react-hooks/rules-of-hooks */
import Dialog from "@mui/material/Dialog";
import { GoogleMap, Marker, Polygon, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useAppSelector } from "src/Hooks/use-redux";


const Map = ({ address, name,type='all' }: any) => {
   const { activeDrivers: drivers }: any = useAppSelector(
    (state: any) => state.user
  )
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [img, setImg] = useState<any>({})

  const handleAvatarClick = (data) => {
    setIsModalOpen(true)
    setImg(data)
  }
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
  const optionPolygon = {
    fillColor: "rgba(47, 156, 233, 0.3)",
    fillOpacity: 1,
    strokeColor: "#092356",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 10,
  }
   const onLoad = (polygon) => {}
  const polygonCoords = drivers
    ?.filter((item) => item?.currentLocation?.lat)
    ?.map((item) => {
      return {
        lat: item?.currentLocation?.lat,
        lng: item?.currentLocation?.lng,
      }
    })
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
 const center = useMemo(() => {
    return {
      lat: address?.latitude,
      lng: address?.longitude,
    }
  }, [address])
  return isLoaded ? (
    <>
      {/* <Script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        type="text/javascript"
      ></Script> */}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
      >
       {type=='track' &&    <Polygon
        paths={polygonCoords}
        options={optionPolygon}
        onLoad={onLoad}
        visible
      />}
        <Marker
          position={center}
          key={name}
          label={name}
        />
          {type === 'track'  && drivers?.map((item) => (
        <Marker
          position={item?.currentLocation}
          key={item?.id}
          label={item?.name}
          icon={item?.image}
          clickable
          onClick={() => {
            handleAvatarClick(item)
          }}
        />
      ))}
       <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h3>{img && img?.name}</h3>
          <Image
            src={img?.image}
            alt="Larger Avatar"
            style={{ width: "400px", height: "400px" }}
          />
        </div>
      </Dialog>
      </GoogleMap>
    </>
  ) : (
    <div>Loading.....</div>
  );
};

export default Map;
