import moment from "moment";
import Image from "next/image";
import profileDriv from "../../../src/assets/image/profileDriv.svg";

const GeneralInfo = ({ data }: any) => {
  return (
    <div>
      <div className="flex mt-[37px] flex-wrap items-start justify-start">
        <div className="flex flex-col gap-3 min-w-[100px] mb-3">
          <div className="text-text text-[10px]">Email Address</div>
          <div className="text-grey text-xs">{data?.email}</div>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <div className="text-text text-[10px]">Phone Number</div>
          <div className="text-grey text-xs">{data?.phone}</div>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <div className="text-text text-[10px]">Gender</div>
          <div className="text-grey text-xs">{data?.gender}</div>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <div className="text-text text-[10px]">Date Joined</div>
          <div className="text-grey text-xs">
            {moment(data?.dateJoined).format("ll")}
          </div>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px] w-1/2">
          <div className="text-text text-[10px]">Home Address</div>
          <div className="text-grey text-xs">{data?.address}</div>
        </div>
      </div>
      <div className="flex justify-between mt-[37px] ">
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Account Status</div>
          <div className="text-grey text-xs">{data?.emailVerifiedStatus}</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Completed Rides</div>
          <div className="text-grey text-xs">
            {data?.profile?.numOfCompletedRides}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Drivers License</div>
          <div className="text-grey text-xs">
            {" "}
            {data?.profile?.driversLicenceNumber}
          </div>
        </div>
      </div>
      <div>
        <div className="text-text text-xs my-4">Riders Feedback</div>
        <div className="flex w-full gap-3">
          {data?.profile?.reviews.map((item: any) => (
            <div className="shadow-tableShadow w-[173px] p-2 " key={item.id}>
              <div className="text-grey text-[8px]">{item.text}</div>
              <div className="flex  items-center justify-center gap-3">
                <div>
                  <Image src={profileDriv} alt={""} />
                </div>
                <div className="flex flex-col mt-3">
                  <div className="text-grey text-xs">{item.name}</div>
                  <div className="text-text text-xs">{item.email}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GeneralInfo;
