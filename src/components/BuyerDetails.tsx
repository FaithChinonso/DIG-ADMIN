import React from "react";

const DetailsPage = ({ data, title }: any) => {
  return (
    <div>
      <div className="text-2xl text-darkPurple font-bold">{title}</div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> User ID</div>
            <div className="text-md">{data?.userID}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Full Name</div>
            <div className="text-md">{data?.fullName}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Email Address</div>
            <div className="text-md">{data?.email}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Phone Number</div>
            <div className="text-md">{data?.phone}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Gender</div>
            <div className="text-md">{data?.gender}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Address</div>
            <div className="text-md">{data?.address}</div>
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Role</div>
            <div className="text-md">{data?.role}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Date Of Birth</div>
            <div className="text-md">{data?.dateOfBirth}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm">Date Joined</div>
            <div className="text-md">{data?.dateJoined}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm">
              {" "}
              Bank Account Name
            </div>
            <div className="text-md">{data?.bank.accountName}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm">
              {" "}
              Bank Account Number
            </div>
            <div className="text-md">{data?.bank.accountNumber}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm">
              {" "}
              Verification Status
            </div>
            <div className="text-md">{data?.emailVerifiedStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
