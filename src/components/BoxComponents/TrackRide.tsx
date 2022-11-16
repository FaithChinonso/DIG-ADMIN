import map from "../../assets/image/map.svg";
import book from "../../assets/image/book.svg";
import tripStart from "../../assets/image/tripStart.svg";
import warning from "../../assets/image/warning.svg";
import tripComplete from "../../assets/image/tripComplete.svg";
import refresh from "../../assets/image/refresh.svg";
import Image from "next/image";
import { trackRide } from "../../utils/analytics";

const TrackRide = () => {
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
  return (
    <div>
      <div className="flex justify-between gap-2">
        <div className="bg-[#090F47] rounded-md py-1  px-[14px] text-white w-[132px] h-[87px]">
          <div className="text-[10px] mb-3">Distance Covered</div>
          <div className="text-lg">2,900 km</div>
        </div>
        <div className="bg-[#C9C2FF] rounded-md py-1  px-[14px] text-[#090F47]  w-[147px] h-[87px] ">
          <div className="text-[10px] mb-3">Time</div>
          <div className="text-sm">42 Hrs, 10 mins</div>
        </div>
        <div className="bg-darkPurple text-white text-[8px]  w-[78px] h-[28px] flex items-center justify-center rounded-md">
          <span className="mr-1">
            <Image src={map} alt={""} />
          </span>
          View Route
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 items-center">
          <div className="text-sm text-grey">Timeline</div>
          <div className="text-text text-[10px]">Updated 5 mins ago</div>
        </div>
        <div className="text-darkPurple text-[10px]">
          <span style={{ translate: "0 5px" }}>
            <Image src={refresh} alt={""} />
          </span>
          Refresh
        </div>
      </div>
      <div className="flex flex-col mt-6">
        {trackRide.map((item: any) => (
          <div className="flex justify-start" key={item.id}>
            <div className="flex flex-col mr-1">
              <div className="flex w-[150px] ">
                <Image src={imageSort(item.name)} alt={""} />
                <div className="text-grey text-[10px] ">
                  {item.name === "Booking Confirmed" && "Now"}
                  <span className="text-text ml-2">{item.time}</span>
                </div>
              </div>
              {item.name !== "Trip Completed" && (
                <div className="h-[84px] w-[1px] bg-darkPurple"></div>
              )}
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[10px]">{item.name}</div>
              <div className="text-text text-[10px]">{item.address}</div>
              <div className="text-[10px] text-lightPurple ">
                {item.duration} <span className="mr-2">{item.distance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TrackRide;
