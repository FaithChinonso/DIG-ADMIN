import Image from "next/image";
import profileDriv from "../../../src/assets/image/profileDriv.svg";
import { ridersFeedback } from "../../utils/analytics";

const GeneralInfo = () => {
  return (
    <div>
      <div className="flex mt-[37px] flex-wrap items-start justify-start">
        <div className="flex flex-col gap-3 min-w-[100px] mb-3">
          <h5 className="text-text text-[10px]">Email Address</h5>
          <p className="text-grey text-xs">ike@text.com</p>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <h5 className="text-text text-[10px]">Phone Number</h5>
          <p className="text-grey text-xs">08184234232</p>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <h5 className="text-text text-[10px]">Gender</h5>
          <p className="text-grey text-xs">Male</p>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <h5 className="text-text text-[10px]">Date Joined</h5>
          <p className="text-grey text-xs">April 24, 2022</p>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px] w-1/2">
          <h5 className="text-text text-[10px]">Home Address</h5>
          <p className="text-grey text-xs">
            25A Abdul Akori Street, Shogbuyi Crescent Ikoyi, Lagos State.
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-[37px] ">
        <div className="flex flex-col gap-3">
          <h5 className="text-text text-[10px]">Account Status</h5>
          <p className="text-grey text-xs">Verified</p>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-text text-[10px]">Company name</h5>
          <p className="text-grey text-xs">Sinzu Movers</p>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-text text-[10px]">Driver's License</h5>
          <p className="text-grey text-xs">50006333</p>
        </div>
      </div>
      <div>
        <h2 className="text-text text-xs my-4">Rider's Feedback</h2>
        <div className="flex w-full gap-3">
          {ridersFeedback?.map((item: any) => (
            <div className="shadow-tableShadow w-[173px] p-2 ">
              <p className="text-grey text-[8px]">{item.text}</p>
              <div className="flex  items-center justify-center gap-3">
                <div>
                  <Image src={profileDriv} />
                </div>
                <div className="flex flex-col mt-3">
                  <h4 className="text-grey text-xs">{item.name}</h4>
                  <p className="text-text text-xs">{item.email}</p>
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
