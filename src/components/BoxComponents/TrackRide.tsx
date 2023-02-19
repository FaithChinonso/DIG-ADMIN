import map from "../../assets/image/map.svg";
import book from "../../assets/image/book.svg";
import tripStart from "../../assets/image/tripStart.svg";
import warning from "../../assets/image/warning.svg";
import tripComplete from "../../assets/image/tripComplete.svg";
import refresh from "../../assets/image/refresh.svg";
import Image from "next/image";
import { trackRide } from "../../utils/analytics";
import moment from "moment";

const TrackRide = ({ trip, refreshHandler }: any) => {
  console.log(trip);
  const imageSort = (name: any) => {
    if (name === "Booking Confirmed") {
      return book;
    }
    if (name === "Trip Started") {
      return tripStart;
    }
    if (name === "Trip Cancelled") {
      return warning;
    }
    if (name === "Trip Completed") {
      return tripComplete;
    }
  };
  const trackTrip = [
    {
      validation: trip?.tripDate,
      name: "Booking Confirmed",
      address: trip?.requestLocation,
      duration: trip?.tripDuration,
      distance: trip?.totalDistanceCovered,
      time: moment(trip?.tripDate).calendar(),
    },
    {
      validation: trip?.startTime,
      name: "Trip Started",
      address: trip?.startTripLocation,
      time: moment(trip?.startTime).format("LT"),
    },
    {
      validation: trip?.cancelDateTime,
      name: "Trip Cancelled",
      address: trip?.cancelLocation,
      time: trip?.cancelDateTime,
    },
    {
      name: "Trip Completed",
      address: "25B Jakande Street, Ojota, Lagos",

      time: "03:55pm",
    },
  ];

  return (
    <div>
      <div className="flex justify-between gap-2 md:max-w-[50vw]">
        <div className="bg-[#090F47] rounded-md py-1  px-[14px] text-white w-[132px] h-[100px] md:h-[87px]">
          <div className="text-[10px] mb-3">Distance Covered</div>
          <div className="text-xs">
            {trip?.totalDistanceCovered
              ? trip?.totalDistanceCovered
              : "Trip yet to be completed"}
          </div>
        </div>
        <div className="bg-[#C9C2FF] rounded-md py-1  px-[14px] text-[#090F47]  w-[147px] h-[100px] md:h-[87px] ">
          <div className="text-[10px] mb-3">Time</div>
          <div className="text-sm">{trip?.tripDuration} minutes</div>
        </div>
        <div className="bg-darkPurple text-white text-[8px]  w-[78px] h-[28px] flex items-center justify-center rounded-md cursor-pointer">
          <span className="mr-1">
            <Image src={map} alt={""} />
          </span>
          View Route
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 md:max-w-[50vw] ">
        <div className="flex gap-2 items-center">
          <div className="text-sm text-grey">Timeline</div>
          <div className="text-text text-[10px]">Updated 5 mins ago</div>
        </div>
        <div
          className="text-darkPurple text-[10px] cursor-pointer"
          onClick={refreshHandler}
        >
          <span style={{ translate: "0 5px" }}>
            <Image src={refresh} alt={""} />
          </span>
          Refresh
        </div>
      </div>
      <div className="flex flex-col mt-6">
        {trip?.requestAcceptanceTime && (
          <div className={`justify-start flex `}>
            <div className="flex flex-col mr-1">
              <div className="flex w-[150px] ">
                <Image src={imageSort("Booking Confirmed")} alt={""} />
                <div className="text-grey text-[10px] ">
                  Now
                  <span className="text-text ml-2">
                    {moment(trip?.requestAcceptanceTime).calendar()}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[10px]">Booking Confirmed</div>
              <div className="text-text text-[10px]">
                {trip?.requestLocation}
              </div>
              <div className="text-[10px] text-lightPurple ">
                {trip?.tripDuration}{" "}
                <span className="mr-2">{trip?.totalDistanceCovered}</span>
              </div>
            </div>
          </div>
        )}
        {trip?.startTime && (
          <div className={`justify-start flex `}>
            <div className="flex flex-col mr-1">
              <div className="flex w-[150px] ">
                <Image src={imageSort("Trip Started")} alt={""} />
                <div className="text-grey text-[10px] ">
                  Now
                  <span className="text-text ml-2">
                    {moment(trip?.startTime).format("LT")}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[10px]">Trip Started</div>
              <div className="text-text text-[10px]">
                {trip?.startTripLocation}
              </div>
            </div>
          </div>
        )}
        {trip?.cancelDateTime && (
          <div className={`justify-start flex `}>
            <div className="flex flex-col mr-1">
              <div className="flex w-[150px] ">
                <Image src={imageSort("Trip Cancelled")} alt={""} />
                <div className="text-grey text-[10px] ">
                  Now
                  <span className="text-text ml-2">
                    {moment(trip?.cancelDateTime).format("LT")}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[10px]">Trip Cancelled</div>
              <div className="text-text text-[10px]">
                {trip?.cancelLocation}
              </div>
            </div>
          </div>
        )}
        {trip?.endTime && (
          <div className={`justify-start flex `}>
            <div className="flex flex-col mr-1">
              <div className="flex w-[150px] ">
                <Image src={imageSort("Trip Completed")} alt={""} />
                <div className="text-grey text-[10px] ">
                  Now
                  <span className="text-text ml-2">
                    {moment(trip?.endTime).format("LT")}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[10px]">Trip Completed</div>
              <div className="text-text text-[10px]">
                {trip?.dropoffLocation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TrackRide;
