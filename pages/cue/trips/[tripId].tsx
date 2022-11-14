import ActionList from "../../../src/components/ActionList";
import Trip from "../../../src/components/BoxComponents/Trip";
import Image from "next/image";
import profilePic from "../../../src/assets/image/profilePic.svg";
import verify from "../../../src/assets/image/verify.svg";
import gender from "../../../src/assets/image/gender.svg";
import birth from "../../../src/assets/image/birth.svg";
import rating from "../../../src/assets/image/rating.svg";
import TrackRide from "../../../src/components/BoxComponents/TrackRide";

const OneTrip = () => {
  return (
    <div className=" p-[10px] md:p-[30px]">
      {" "}
      <ActionList />
      <div className="bg-darkPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between mb-5">
        <div className="flex gap-[30px] items-start text-white ">
          {" "}
          <div>
            <Image src={profilePic} />
          </div>
          <div className="flex flex-col gap-[14px]">
            <h2 className="text-[16px]">
              Tope Orodeji{" "}
              <span>
                {" "}
                <Image src={verify} />
              </span>
            </h2>
            <div className="flex justify-between gap-[9px] items-center">
              <h4 className="text-[10px]">User</h4>
              <div className="bg-white w-1 h-1 rounded-[50%]"></div>
              <div className="text-[10px]">tope@user.com</div>
            </div>
            <div className="flex justify-between gap-[9px] items-center">
              <h4 className="text-[10px]">
                {" "}
                <span>
                  {" "}
                  <Image src={gender} />
                </span>
                Female
              </h4>
              <div className="bg-white w-1 h-1 rounded-[50%]"></div>
              <div className="text-[10px]">
                {" "}
                <span>
                  {" "}
                  <Image src={birth} />
                </span>
                March 10, 1989
              </div>
            </div>
            <div>
              <Image src={rating} />
            </div>
            <div className="w-[193px] bg-faintWhite flex justify-between text-white p-3 rounded-md h-[53px]">
              <div className="flex flex-col justify-between">
                <div className="text-[8px]">Lifetime Earning</div>
                <div className="text-xs font-[500]">₦ 500,000</div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="text-[8px] ">Lifetime Transactions</div>
                <div className="text-xs font-[500]">100</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white flex flex-col w-[404px]">
          <h3 className="text-[13px] mt-[28px]">About</h3>
          <p className="text-[10px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor,
            quisque cursus enim tristique pellentesque convallis fringilla nec
            metus. Malesuada lorem eleifend risus sed. Risus quis mattis amet
            viverra ornare. Eget orci non at interdum non mauris netus
            ultricies. Amet auctor sagittis etiam sit nam etiam quisque.
            Ullamcorper risus. Eget orci non at interdum non mauris
          </p>
        </div>
        <div className="flex flex-col items-center justify-around text-white">
          <div className="text-white text-[13px]">Total Orders</div>
          <div className="bg-faintWhite p-[11px] w-[97px] rounded-md ">
            <div className="text-[8px] ">Successful</div>
            <div className="text-sm font-semibold">100</div>
          </div>
          <div className="bg-faintWhite p-[11px]  w-[97px] rounded-md ">
            <div className="text-[8px] ">Cancelled</div>
            <div className="text-sm font-semibold">100</div>
          </div>
        </div>
      </div>{" "}
      <TrackRide />
    </div>
  );
};
export default OneTrip;
