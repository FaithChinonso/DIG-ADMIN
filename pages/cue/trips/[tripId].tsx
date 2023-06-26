import Image from "next/image";
import verify from "../../../src/assets/image/verify.svg";
import TrackRide from "../../../src/components/BoxComponents/TrackRide";
import ParentContainer from "src/components/ParentContainer";
import { GetStaticProps } from "next/types";
import { tripApi } from "src/components/api";
import { useCallback, useEffect, useState } from "react";
import useHTTPGet from "src/Hooks/use-httpget";
import moment from "moment";
import { tripType } from "src/@types/data";
import { useRouter } from "next/router";
import MapComponent from "src/components/MapComponent";

const OneTrip = ({ tripId }: any) => {
  const request = useHTTPGet();
  const router = useRouter();
  const [trip, setTrip] = useState<tripType>();
  const fetchATrip = useCallback(async (id: any) => {
    const url = `${tripApi}/single-trip/${id}`;
    const accessToken = sessionStorage.getItem("accessToken");
    const dataFunction = (res: any) => {
      console.log(res);
      setTrip(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  }, []);
  useEffect(() => {
    fetchATrip(tripId);
  }, []);
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <div className="w-full flex items-center justify-end pb-5 gap-3 z-30 relative">
          <button
            className="text-sm text-white bg-darkPurple py-3 px-4 rounded-md flex items-center justify-center"
            onClick={() => router.back()}
          >
            <span style={{ marginRight: "5px", fontSize: "20px" }}>&lt;</span>
            Back to List
          </button>
        </div>
        <div className="bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between mb-5 gap-3">
          <div className="text-white flex flex-col rounded-[20px] px-4 w-1/3">
            <div className="text-[13px] my-4">Trip Details</div>
            <div className="flex gap-[30px] items-start text-white flex-col">
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Pickup Address</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.pickupLocation}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Dropoff Address</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.dropoffLocation}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Trip Date</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]">
                  {" "}
                  {moment(trip?.tripDate).format("ll")}
                </div>
              </div>
              <div className="w-[253px] bg-faintWhite gap-2 flex justify-between text-white p-3 rounded-md h-[53px]">
                <div className="flex flex-col justify-between">
                  <div className="text-[8px]">Base Price</div>
                  <div className="text-xs font-[500]">₦ {trip?.basePrice}</div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-[8px] ">Trip Duration</div>
                  <div className="text-xs font-[500]">{trip?.tripDuration}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col bg-lightPurple rounded-[20px] px-4 w-1/3">
            <div className="text-[13px] my-4">Driver Details</div>
            <div className="flex gap-[30px] items-start text-white flex-col">
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Full Name</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="flex gap-1">
                  <div className="text-[10px]">{trip?.driver?.fullName}</div>
                  <div className="">
                    {" "}
                    {trip?.driver?.emailVerifiedStatus === "verified" && (
                      <Image src={verify} alt={""} />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Phone Number</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.driver?.phone}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Email</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.driver?.email}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Gender</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.driver?.gender}</div>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col bg-lightPurple rounded-[20px] px-4 w-1/3">
            <div className="text-[13px] my-4 ">Rider Details</div>
            <div className="flex gap-[30px] items-start text-white flex-col">
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Full Name</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="flex gap-1">
                  <div className="text-[10px]"> {trip?.rider?.fullName}</div>
                  <div className="left-1">
                    {" "}
                    {trip?.rider?.emailVerifiedStatus === "verified" && (
                      <Image src={verify} alt={""} />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Phone Number</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.rider?.phone}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Email</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.rider?.email}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Gender</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.rider?.gender}</div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-full flex gap-2">
          <div className="w-1/2">
            <TrackRide trip={trip} refreshHandler={() => fetchATrip(tripId)} />
          </div>
          <div className="w-1/2">
            <MapComponent
              pickup={trip?.pickupLocation}
              dropoff={trip?.dropoffLocation}
            />
          </div>
        </div>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const tripId = context.params.tripId;
  return {
    props: {
      tripId,
    },
  };
};
export default OneTrip;
