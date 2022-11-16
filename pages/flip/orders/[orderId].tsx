import { fontSize } from "@mui/system";
import { useRouter } from "next/router";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  order,
} from "../../../src/utils/analytics";

import Calender from "../../../src/assets/image/calendar.svg";
import location from "../../../src/assets/image/location.svg";
import quantity from "../../../src/assets/image/quantity.svg";
import cost from "../../../src/assets/image/cost.svg";
import date from "../../../src/assets/image/date.svg";
import Image from "next/image";
import MultipleSelectTable from "../../../src/components/multiple-select-table";

import { useDispatch } from "react-redux";
import ActionList from "../../../src/components/ActionList";
import ParentContainer from "src/components/ParentContainer";

const OneOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.usersId;

  const columnOrders = [
    {
      Header: "#",
      accessor: "serial",
      Filter: false,
    },
    {
      Header: "Order",
      accessor: "order",
    },
    {
      Header: "Order Price",
      accessor: "orderPrice",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Date Requested",
      accessor: "dateRequested",
    },

    {
      Header: "Client Type",
      accessor: "clientType",
    },
    {
      Header: "Merchant",
      accessor: "merchant",
    },
    {
      Header: "Profile Recieved",
      accessor: "profileRecieved",
    },
    {
      Header: "Delivery Company",
      accessor: "deliveryCompany",
    },
    {
      Header: "Delivery Tag",
      accessor: "deliveryTag",
    },
    {
      Header: "Delivery Note",
      accessor: "deliveryNote",
    },
    {
      Header: "Delivery Status",
      accessor: "deliveryStatus",
    },
  ];
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <ActionList />
        <div className="bg-darkPurple flex-col rounded-[20px] px-[8px] py-[23px] md:px-[38px] flex gap-5">
          {" "}
          <div className="text-offWhite text-lg">Overview</div>
          <div className="flex flex-col md:flex-row  justify-between  items-center">
            <div className="flex flex-col gap-[14px]">
              <div className="text-lg text-white font-semibold">
                OrderId:
                <span className="text-offWhite text-sm ml-2"> 890099823</span>
              </div>

              <div className="text-offWhite text-sm">
                <span style={{ marginRight: "3px" }}>
                  <Image src={location} alt={""} />
                </span>
                Oriental Hotel, Lekki Lagos
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <Image src={quantity} alt={""} />
              </div>
              <div>
                <div className="text-offWhite text-sm">Order Quatity</div>
                <div className="text-base text-white font-semibold mt-[10px]">
                  10
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <Image src={cost} alt={""} />
              </div>
              <div>
                <div className="text-offWhite text-sm">Order Cost</div>
                <div className="text-base text-white font-semibold mt-[10px]">
                  {" "}
                  ₦ 300,000
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <Image src={date} alt={""} />
              </div>
              <div>
                <div className="text-offWhite text-sm">Date and Time</div>
                <div className="text-base text-white font-semibold mt-[10px]">
                  {" "}
                  April 1, 2021
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          {" "}
          <MultipleSelectTable
            columns={columnOrders}
            data={order}
            emptyPlaceHolder="No orders yet!"
            extraButton={{ text: "Filter by Date", img: Calender }}
            onClickFunction={() => {}}
          />
        </div>
      </div>
    </ParentContainer>
  );
};


export default OneOrder;