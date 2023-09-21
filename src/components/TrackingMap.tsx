// /* eslint-disable camelcase */
// /* eslint-disable react-hooks/rules-of-hooks */
// import Dialog from "@mui/material/Dialog"
// import {
//   GoogleMap,
//   Marker, Polygon, useJsApiLoader
// } from "@react-google-maps/api"
// import Image from "next/image"
// import Script from 'next/script'
// import { useMemo, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import useLocation from "src/components/useLocation"
// import { useAppSelector } from "src/Hooks/use-redux"

// function TrackingMap() {
//   const dispatch = useDispatch()
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
//   const [img, setImg] = useState<any>({})

//   const handleAvatarClick = (data) => {
//     setIsModalOpen(true)
//     setImg(data)
//   }
//   const { activeDrivers: drivers }: any = useSelector(
//     (state: any) => state.user
//   )
//   const { adminDetails } = useAppSelector((state) => state.auth)
//   //   const {profile: {f_name, l_name,image}} = useSelector((state) => state?.admin);
//   const { location } = useLocation()
// console.log(location, 'hhhh');
//   const containerStyle = {
//     width: "100%",
//     height: "100%",
//   }
//   const options = {
//     // styles: mapStyles,
//     disableDefaultUI: true,
//     zoomControl: true,
//     zoomControlOptions: {
//       position: window.google?.maps.ControlPosition.RIGHT_CENTER,
//     },
//   }
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   })
//   const center = useMemo(() => {
//     return {
//       lat: location?.latitude,
//       lng: location?.longitude,
//     }
//   }, [location])
// console.log(center,'centter')
//   //  useEffect(() => {
//   //   dispatch(getProfile({}));
//   //  }, [dispatch])

//   const optionPolygon = {
//     fillColor: "rgba(47, 156, 233, 0.3)",
//     fillOpacity: 1,
//     strokeColor: "#092356",
//     strokeOpacity: 1,
//     strokeWeight: 2,
//     clickable: false,
//     draggable: false,
//     editable: false,
//     geodesic: false,
//     zIndex: 10,
//   }
//   const onLoad = (polygon) => {}
//   const polygonCoords = drivers
//     ?.filter((item) => item?.currentLocation?.lat)
//     ?.map((item) => {
//       return {
//         lat: item?.currentLocation?.lat,
//         lng: item?.currentLocation?.lng,
//       }
//     })
//   // const renderMap = () => {
//   //   <GoogleMap
//   //     id="marker-example"
//   //     mapContainerStyle={containerStyle}
//   //     center={center}
//   //     zoom={12}
//   //     options={options}
//   //   >
//   //     <Polygon
//   //       paths={polygonCoords}
//   //       options={optionPolygon}
//   //       onLoad={onLoad}
//   //       visible
//   //     />
//   //     {drivers.map((item) => (
//   //       <Marker
//   //         position={item?.currentLocation}
//   //         key={item?.id}
//   //         label={item?.name}
//   //         icon={item?.image}
//   //         clickable
//   //         onClick={() => {
//   //           handleAvatarClick(item)
//   //         }}
//   //       />
//   //     ))}
//   //     <Marker
//   //       position={center}
//   //       key="key"
//   //       label="Admin"
//   //       // icon={image}
//   //       clickable
//   //       // onClick={() => {
//   //       //   handleAvatarClick({
//   //       //     image,
//   //       //     name: `${f_name} ${l_name}`,
//   //       //   })
//   //       // }}
//   //     />
//   //     <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//   //       <div>
//   //         <h3>{img && img?.name}</h3>
//   //         <Image
//   //           src={img?.image}
//   //           alt="Larger Avatar"
//   //           style={{ width: "400px", height: "400px" }}
//   //         />
//   //       </div>
//   //     </Dialog>
//   //   </GoogleMap>
//   // }

//   if (loadError) {
//     return (
//       <div className="text-red-300">Map cannot be loaded right now, sorry.</div>
//     )
//   }
//   return isLoaded ?     <>
//       <Script
//         async
//         defer
//         src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
//         type="text/javascript"
//       ></Script>
//       <GoogleMap
//       id="marker-exampled"
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={12}
//       options={options}
//     >
//       <Polygon
//         paths={polygonCoords}
//         options={optionPolygon}
//         onLoad={onLoad}
//         visible
//       />
//       {drivers?.map((item) => (
//         <Marker
//           position={item?.currentLocation}
//           key={item?.id}
//           label={item?.name}
//           icon={item?.image}
//           clickable
//           onClick={() => {
//             handleAvatarClick(item)
//           }}
//         />
//       ))}
//       <Marker
//         position={center}
//         key="key"
//         label="Admin"
//         // icon={image}
//         clickable
//         // onClick={() => {
//         //   handleAvatarClick({
//         //     image,
//         //     name: `${f_name} ${l_name}`,
//         //   })
//         // }}
//       />
//       <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div>
//           <h3>{img && img?.name}</h3>
//           <Image
//             src={img?.image}
//             alt="Larger Avatar"
//             style={{ width: "400px", height: "400px" }}
//           />
//         </div>
//       </Dialog>
//     </GoogleMap>
//     </> : <div>Loading.....</div>
// }

// export default TrackingMap
import React from 'react'

const TrackingMap = () => {
  return (
    <div>TrackingMap</div>
  )
}

export default TrackingMap