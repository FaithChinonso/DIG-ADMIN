import Image from "next/image";
import profileDriv from "../../../src/assets/image/profileDriv.svg";
import point from "../../../src/assets/image/points.svg";
import finish from "../../../src/assets/image/finish.svg";
import progress from "../../../src/assets/image/progres.svg";
import transit from "../../../src/assets/image/transit.svg";
import line from "../../../src/assets/image/line.svg";
import complete from "../../../src/assets/image/complete.svg";
import { ridersFeedback, tripHistory } from "../../utils/analytics";

const Trip = ({ data, type }: any) => {
  console.log(data);
  return (
    <div className="flex flex-col gap-4 w-full md:w-[400px]">
      {data?.map((item: any) => (
        <div
          className="shadow-tableShadow w-full p-[10px] md:p-[20px]"
          key={item.id}
        >
          <div className="flex justify-between items-start mb-5">
            <div>
              <div className="text-text text-[10px] mt-[10px]">Distance</div>
              <div className="text-grey text-[20px]">
                {item.totalDistanceCovered}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Image src={point} alt={""} />
              <Image src={line} alt={""} />
              <Image
                src={item.status === "completed" ? progress : finish}
                alt={""}
              />
            </div>
            <div>
              <div>
                <div className="text-text text-[10px] mt-[10px]">
                  Pickup Location
                </div>
                <div className="text-grey text-[10px] md:text-xs w-[200px]">
                  {item.pickupLocation}{" "}
                </div>
              </div>
              <div>
                <div className="text-text text-[10px] mt-[10px]">Drop-Off</div>
                <div className="text-grey text-[10px] md:text-xs ">
                  {item.dropoffLocation}{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Image src={profileDriv} alt={""} />
              <div className="flex flex-col gap-2">
                <div className="text-grey text-[10px] md:text-xs ">
                  {type === "rider"
                    ? item?.driver?.fullName
                    : item.rider.fullName}{" "}
                </div>
                <div className="text-text text-[10px] ">
                  {" "}
                  {type === "rider" ? item?.driver?.email : item.rider.email}
                </div>
                <div
                  className={`text-[8px] ${
                    item.status === "completed"
                      ? "text-[(rgba(67, 192, 87, 1))] bg-['rgba(67, 192, 87, .2)']"
                      : "text-['rgba(249, 196, 91, 1)'] bg-['rgba(249, 196, 91, .2)']"
                  }`}
                >
                  {item.status}{" "}
                </div>
              </div>
            </div>
            <div>
              <Image
                src={item.status === "completed" ? transit : complete}
                alt={""}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Trip;
