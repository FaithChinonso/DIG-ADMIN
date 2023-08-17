import moment from "moment";
import Image from "next/image";
import { calculateAverageRating } from "src/utils/helperFunctions";

const GeneralInfo = ({ data }: any) => {
  console.log(data);
  return (
    <div>
      <div className="grid mt-[17px] grid-cols-2 items-start justify-between gap-3 border-b border-gray-300 py-3">
        <div className="flex flex-col gap-3 max-w-[150px] mb-3 overflow-clip">
          <div className="text-text text-[10px]">Email Address</div>
          <div className="text-grey text-xs">{data?.email}</div>
        </div>
        <div className="flex flex-col gap-3 max-w-[150px] overflow-clip">
          <div className="text-text text-[10px]">Phone Number</div>
          <div className="text-grey text-xs">{data?.phone}</div>
        </div>
        <div className="flex flex-col gap-3 max-w-[100px]">
          <div className="text-text text-[10px]">Gender</div>
          <div className="text-grey text-xs">{data?.gender}</div>
        </div>
        <div className="flex flex-col gap-3 max-w-[100px]">
          <div className="text-text text-[10px]">Date Joined</div>
          <div className="text-grey text-xs">
            {moment(data?.dateJoined).format("ll")}
          </div>
        </div>
        <div className="flex flex-col gap-3 max-w-[100px] w-1/2">
          <div className="text-text text-[10px]">Home Address</div>
          <div className="text-grey text-xs">{data?.address}</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Referral Code</div>
          <div className="text-grey text-xs">{data?.myRefCode}</div>
        </div>

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
      </div>
      <div className="grid mt-[37px] grid-cols-2 items-start justify-between gap-3 border-b border-gray-300 py-3">
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Drivers License Number</div>
          <div className="text-grey text-xs">
            {" "}
            {data?.profile?.driversLicenceNumber
              ? data?.profile?.driversLicenceNumber
              : " ---"}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Drivers License Front</div>
          {data?.profile?.driversLicenceFront ? (
            <Image
              src={data?.profile?.driversLicenceFront}
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <div className="text-grey text-xs">---</div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Drivers License Back</div>
          {data?.profile?.driversLicenceBack ? (
            <Image
              src={data?.profile?.driversLicenceBack}
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <div className="text-grey text-xs">---</div>
          )}
        </div>
      </div>

      <div className="grid mt-[37px] grid-cols-2 items-start justify-between gap-3 border-b border-gray-300 py-3">
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Car Manufacturer</div>
          <div className="text-grey text-xs">
            {" "}
            {data?.profile?.vehicle?.manufacturer
              ? data?.profile?.vehicle?.manufacturer
              : " ---"}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Car Model</div>
          <div className="text-grey text-xs">
            {" "}
            {data?.profile?.vehicle?.model
              ? data?.profile?.vehicle?.model
              : " ---"}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Car Plate Number</div>
          <div className="text-grey text-xs">
            {" "}
            {data?.profile?.vehicle?.plate_number
              ? data?.profile?.vehicle?.plate_number
              : " ---"}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Car Color</div>
          <div className="text-grey text-xs">
            {" "}
            {data?.profile?.vehicle?.color
              ? data?.profile?.vehicle?.color
              : " ---"}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Plate Number On Car Photo</div>
          {data?.profile?.vehicle?.plate_number_on_car_photo ? (
            <Image
              src={data?.profile?.vehicle?.plate_number_on_car_photo}
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <div className="text-grey text-xs">---</div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Drivers Exterior Photo</div>
          {data?.profile?.vehicle?.car_exterior_photo ? (
            <Image
              src={data?.profile?.vehicle?.car_exterior_photo}
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <div className="text-grey text-xs">---</div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Drivers Interior Photo</div>
          {data?.profile?.vehicle?.car_interior_photo ? (
            <Image
              src={data?.profile?.vehicle?.car_interior_photo}
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <div className="text-grey text-xs">---</div>
          )}
        </div>
      </div>
      <div className="grid mt-[37px] grid-cols-2 items-start justify-between gap-3 border-b border-gray-300 py-3">
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Escrow Balance</div>
          <div className="text-grey text-xs">
            {" "}
            {data?.wallet?.escrowBalance}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Withdrawable Balance</div>
          <div className="text-grey text-xs">
            {" "}
            {data?.wallet?.withdrawableBalance}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-text text-[10px]">Points</div>
          <div className="text-grey text-xs"> {data?.wallet?.points}</div>
        </div>
      </div>

      <div>
        <div className="text-text text-xs my-4">Riders Feedback</div>
        <div className="w-full flex justify-end gap-2 items-center">
          <div className="text-text text-xs">Average Rating</div>
          <div className="text-darkPurple">
            {calculateAverageRating(data?.profile?.reviews).toFixed(2) || 5.0}
          </div>
        </div>
        <div className="grid mt-[17px] grid-cols-2 items-start justify-between gap-3 border-b border-gray-300 py-3 max-h-[400px] overflow-auto">
          {data?.profile?.reviews?.map((item: any) => (
            <div
              className="shadow-tableShadow w-[173px] p-2 "
              key={item?.reviewID}
            >
              <div className="flex justify-between items-center">
                <div className="text-grey text-xs">{item?.reviewerName}</div>
                <div className="bg-gray-400 text-white p-2 rounded-3xl text-xs">
                  {item?.rating}
                </div>
              </div>

              <div className="text-text text-xs">{item?.review}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GeneralInfo;
