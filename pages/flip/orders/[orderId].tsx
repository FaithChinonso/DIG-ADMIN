import { fontSize } from "@mui/system";
import { useRouter } from "next/router";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  order,
} from "../../../src/utils/analytics";
import profilePic from "../../../src/assets/image/profilePic.svg";
import verify from "../../../src/assets/image/verify.svg";
import gender from "../../../src/assets/image/gender.svg";
import birth from "../../../src/assets/image/birth.svg";
import rating from "../../../src/assets/image/rating.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { MyUserValue } from "../../../src/utils/boxValues";
import { useState } from "react";
import Export from "../../../src/assets/image/export.svg";
import Calender from "../../../src/assets/image/calendar.svg";
import location from "../../../src/assets/image/location.svg";
import quantity from "../../../src/assets/image/quantity.svg";
import cost from "../../../src/assets/image/cost.svg";
import date from "../../../src/assets/image/date.svg";
import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import Image from "next/image";
import SupportingDocuments from "../../../src/components/BoxComponents/SupportingDocuments";
import BankDetails from "../../../src/components/BoxComponents/BankDetails";
import OrderHistory from "../../../src/components/BoxComponents/OrderHistory";
import TransactionHistory from "../../../src/components/BoxComponents/TransactionHistory";
import MultipleSelectTable from "../../../src/components/multiple-select-table";
import StatusCell from "../../../src/components/StatusCell";
import ModalAction from "../../../src/components/ModalContent/ModalAction";
import { uiActions } from "../../../src/redux/store/ui-slice";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import { useDispatch } from "react-redux";
import ActionList from "../../../src/components/ActionList";

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
      Cell: (prop: any) => (
        <StatusCell status={prop?.value} type="businessService" />
      ),
    },
  ];
  return (
    <div className=" p-[10px] md:p-[30px]">
      <ActionList />
      <div className="bg-darkPurple flex-col rounded-[20px] px-[8px] py-[23px] md:px-[38px] flex gap-5">
        {" "}
        <div className="text-offWhite text-lg">Overview</div>
        <div className="flex flex-col md:flex-row  justify-between  items-center">
          <div className="flex flex-col gap-[14px]">
            <h2 className="text-lg text-white font-semibold">
              OrderId:
              <span className="text-offWhite text-sm ml-2"> 890099823</span>
            </h2>

            <div className="text-offWhite text-sm">
              <span style={{ marginRight: "3px" }}>
                <Image src={location} />
              </span>
              Oriental Hotel, Lekki Lagos
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <Image src={quantity} />
            </div>
            <div>
              <h3 className="text-offWhite text-sm">Order Quatity</h3>
              <h4 className="text-base text-white font-semibold mt-[10px]">
                10
              </h4>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <Image src={cost} />
            </div>
            <div>
              <h3 className="text-offWhite text-sm">Order Cost</h3>
              <h4 className="text-base text-white font-semibold mt-[10px]">
                {" "}
                ₦ 300,000
              </h4>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <Image src={date} />
            </div>
            <div>
              <h3 className="text-offWhite text-sm">Date and Time</h3>
              <h4 className="text-base text-white font-semibold mt-[10px]">
                {" "}
                April 1, 2021
              </h4>
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
  );
};

export default OneOrder;
