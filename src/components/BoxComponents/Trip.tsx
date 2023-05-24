import Image from "next/image";
import emptyState from "../../assets/image/illustrations.svg";
import profileDriv from "../../../src/assets/image/profileDriv.svg";
import point from "../../../src/assets/image/points.svg";
import finish from "../../../src/assets/image/finish.svg";
import progress from "../../../src/assets/image/progres.svg";
import transit from "../../../src/assets/image/transit.svg";
import line from "../../../src/assets/image/line.svg";
import complete from "../../../src/assets/image/complete.svg";
import moment from "moment";
import StatusCell from "../StatusCell";

const Trip = ({ data, type }: any) => {
  console.log(data);
  return data.length > 0 ? (
    <div className="flex flex-col gap-4 w-full md:w-[400px] max-h-[700px] overflow-auto">
      {data?.map((item: any) => (
        <div
          className="shadow-tableShadow w-full p-[10px] md:p-[20px]"
          key={item.id}
        >
          <div className="flex justify-between items-start mb-5">
            <div className=" w-[70px]">
              <div className="text-text text-[10px] mt-[10px]">
                {moment(item?.requestDateTime).calendar()}
              </div>
              <div className="text-grey text-[20px]">
                {item.totalDistanceCovered}
              </div>
            </div>

            <div className="flex flex-col gap-1 ">
              <Image src={point} alt={""} />
              <Image src={line} alt={""} />
              <Image
                src={item.status === "completed" ? progress : finish}
                alt={""}
              />
            </div>
            <div className=" w-[250px]">
              <div>
                <div className="text-text text-[10px] ">Pickup Location</div>
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
              <div></div>
              {type === "rider" ? (
                <div>
                  {item?.driver?.image ? (
                    <Image
                      src={item?.driver?.image}
                      alt={""}
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <Image src={profileDriv} alt={""} width={20} height={20} />
                  )}
                </div>
              ) : (
                <div>
                  {item?.rider?.image ? (
                    <Image
                      src={item?.rider?.image}
                      alt={""}
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <Image src={profileDriv} alt={""} width={20} height={20} />
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div className="text-grey text-[10px] md:text-xs ">
                  {type === "rider"
                    ? item?.driver?.fullName
                    : item?.rider.fullName}{" "}
                </div>
                <div className="text-text text-[10px] ">
                  {" "}
                  {type === "rider" ? item?.driver?.email : item.rider.email}
                </div>
                <div className={`text-[8px]`}>
                  <StatusCell status={item?.status} />
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
  ) : (
    <div className="flex flex-col items-center justify-center mx-auto mt-10">
      <Image src={emptyState} alt="" />
      <div className="text-[#8487A3] text-xs -mt-2">No Trips Available</div>
    </div>
  );
};
export default Trip;
