/* eslint-disable react-hooks/rules-of-hooks */
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api"
import { useEffect, useMemo, useState } from "react"
import { useAppSelector } from "src/Hooks/use-redux"
import MapDialog from "./MapDialog"

const Map = ({
  address,
  name,
  type = "all",
  image = "https://easy.unikmarketing.org/storage/profile/VhGIKKDrWcjFxwKx1MyS",
}: any) => {
  const { activeDrivers: drivers }: any = useAppSelector(
    (state: any) => state.user
  )
  const { activeTrips }: any = useAppSelector((state: any) => state.trip)
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [directions, setDirections] = useState<any>(null)
  const [markerPositions, setMarkerPositions] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [duration, setDuration] = useState<any>(null)
  const [distance, setDistance] = useState<any>(null)
  const [img, setImg] = useState<any>({})
  const center = useMemo(() => {
    return {
      lat: address?.latitude,
      lng: address?.longitude,
    }
  }, [address])
  console.log(markerPositions)
  const centerMarker = useMemo(() => {
    return markerPositions
  }, [markerPositions])
  const handleAvatarClick = (data) => {
    setIsModalOpen(true)
    setImg(data)
  }
  console.log(center)
  const containerStyle = {
    width: "100%",
    height: "100%",
  }
  const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position:
        typeof window !== "undefined" &&
        window.google?.maps.ControlPosition.RIGHT_CENTER,
    },
  }
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
    zIndex: 30,
  }
  const onLoad = (polygon) => {
    console.log(polygon, "polyyyy")
  }
  const polygonCoords = drivers
    ?.filter((item) => item?.currentLocation?.lat)
    ?.map((item) => {
      return {
        lat: item?.currentLocation?.lat,
        lng: item?.currentLocation?.lng,
      }
    })
  console.log(polygonCoords, "poly")
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })
  console.log(selectedTrip)
  useEffect(() => {
    const calculateRoute = async () => {
      const google = window.google
      const directionsService = new window.google.maps.DirectionsService()
      const routeData: any = {
        origin: selectedTrip?.currentLocation,
        destination: selectedTrip?.dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      }

      await directionsService
        ?.route(routeData)
        .then((results: any) => {
          console.log("rr", results)
          setDirections(results)
          setMarkerPositions(selectedTrip?.currentLocation)
          //           animateMarker(selectedTrip.currentLocation, results.routes[0].overview_path);
          const dist = results?.routes[0].legs[0].distance.text
          setDistance(dist)
          const dur = results?.routes[0].legs[0].duration.text
          setDuration(dur)
        })
        .catch((err) => {
          // console.log(err);
        })
    }

    if (selectedTrip) {
      calculateRoute()
    }
  }, [selectedTrip])

  const animateMarker = (startPosition, path) => {
    let step = 0
    const numSteps = path.length - 1
    const timePerStep = 1000

    function moveMarker() {
      const newPosition = path[step]
      setMarkerPositions(newPosition)

      if (step < numSteps) {
        step++
        setTimeout(moveMarker, timePerStep)
      }
    }

    moveMarker()
  }

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
        {selectedTrip ? (
          <>
            {/* <Marker
              position={centerMarker}
              key={selectedTrip?.tripID}
              label={selectedTrip?.driver?.name}
              icon={{
                url: selectedTrip?.driver?.image,
                scaledSize: new window.google.maps.Size(20, 20), // adjust the size as needed
              }}
            /> */}
            {directions ? (
              <DirectionsRenderer directions={directions} />
            ) : null}
            <InfoWindow
              position={{
                lat: selectedTrip?.currentLocation.lat,
                lng: selectedTrip?.currentLocation.lng,
              }}
              onCloseClick={() => {
                setSelectedTrip(null)
                setDirections(null)
              }}
            >
              <div>
                <h3>
                  {distance} {duration}
                </h3>
                {/* Add any additional information you want to display */}
              </div>
            </InfoWindow>
          </>
        ) : (
          <>
            {/* {type  === 'track' &&   <Polygon
        paths={polygonCoords}
        options={optionPolygon}
        onLoad={onLoad}
        visible
      />} */}

            <Marker
              position={center}
              key={name}
              label={name}
              icon={{
                url: image,
                scaledSize: new window.google.maps.Size(20, 20), // adjust the size as needed
              }}
            />
            {type === "track" &&
              activeTrips?.map((item) => (
                <Marker
                  position={item?.currentLocation}
                  key={item?.tripID}
                  label={item?.driver?.name}
                  icon={{
                    url: item?.driver?.image,
                    scaledSize: new window.google.maps.Size(20, 20), // adjust the size as needed
                  }}
                  clickable
                  onClick={() => {
                    setSelectedTrip(null)
                    setDirections(null)
                    handleAvatarClick(item)
                  }}
                />
              ))}
          </>
        )}

        <MapDialog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          img={img}
          setSelectedTrip={setSelectedTrip}
        />
      </GoogleMap>
    </>
  ) : (
    <div>Loading.....</div>
  )
}

export default Map
