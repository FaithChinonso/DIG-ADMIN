import Image from "next/image";
import profileDriv from "../../../src/assets/image/profileDriv.svg";
import { ridersFeedback } from "../../utils/analytics";

const GeneralInfo = () => {
  return (
    <div>
      <div className="flex mt-[37px] flex-wrap items-start justify-start">
        <div className="flex flex-col gap-3 min-w-[100px] mb-3">
          <div className="text-text text-[10px]">Email Address</div>
          <div className="text-grey text-xs">ike@text.com</div>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <div className="text-text text-[10px]">Phone Number</div>
          <div className="text-grey text-xs">08184234232</div>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <div className="text-text text-[10px]">Gender</div>
          <div className="text-grey text-xs">Male</div>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px]">
          <div className="text-text text-[10px]">Date Joined</div>
          <div className="text-grey text-xs">April 24, 2022</div>
        </div>
        <div className="flex flex-col gap-3 min-w-[100px] w-1/2">
          <div className="text-text text-[10px]">Home Address</div>
          <div className="text-grey text-xs">
            25A Abdul Akori Street, Shogbuyi Crescent Ikoyi, Lagos State.
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-[37px] ">
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Account Status</div>
          <div className="text-grey text-xs">Verified</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Company name</div>
          <div className="text-grey text-xs">Sinzu Movers</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Driver's License</div>
          <div className="text-grey text-xs">50006333</div>
        </div>
      </div>
      <div>
        <div className="text-text text-xs my-4">Rider's Feedback</div>
        <div className="flex w-full gap-3">
          {ridersFeedback?.map((item: any) => (
            <div className="shadow-tableShadow w-[173px] p-2 ">
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
