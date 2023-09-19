
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { getMyProfile } from "src/redux/store/auth-slice";
import { setDriversLocation } from "src/redux/store/features/user-slice";
import { db } from "../../firebase";

import SideNav from "./SideNav";
import TopNav from "./TopNav";

const ParentContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
    const { adminDetails } = useAppSelector(state => state.auth);
    useEffect(() => {
    const watchDrivers = () => {
      console.log();
      const unsub = onSnapshot(
        query(collection(db, "driver"), where('onTrip', '==', true)),
        s => {
  
          if (s.empty) return;

          let set = s.docs.map(i => {
            const data = i.data();
            console.log('all',  data);
            return {
              id: data.profile?.driverID,
              name: data?.fullName,
              image: data.image,
              currentLocation: {
                lat: data?.currentLocation?.latitude,
                lng: data?.currentLocation?.longitude,
              },
            };
          });

          console.log(set);
          dispatch(setDriversLocation(set));
        }
      );
      return unsub;
    };
    
      const unsub = watchDrivers();
      return () => unsub();
  
  }, [ dispatch]);
  useEffect(() => {
    dispatch(getMyProfile({}));
  }, []);

  return (
    <div className="flex flex-row w-full max-w-screen relative h-screen overflow-x-hidden">
      <SideNav />
      <TopNav />

      <div className="mt-[100px] md:mt-[67px] w-[calc(100vw-60px)] md:w-[calc(100vw-265px)] bg-lightGray ml-[62px] md:ml-[265px] p-[10px] md:p-[20px] overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default ParentContainer;
