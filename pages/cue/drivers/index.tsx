import { Router, useRouter } from "next/router";
import { useState } from "react";
import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../../src/components/Drawer";
import FilterTable from "../../../src/components/FilterTable";
import AddDriver from "../../../src/components/Forms/AddDriver";
import MultipleSelectTable from "../../../src/components/multiple-select-table";
import StatusCell from "../../../src/components/StatusCell";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  driver,
} from "../../../src/utils/analytics";

const Drivers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [id, setId] = useState();
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  type Data = {
    driverId: string;
    serial: Number;
    dateJoined: string;
    driverName: string;
    emailAddress: string;
    accountStatus: string;
    tripStatus: string;
    gender: string;
  };
  const formatData = driver
    ?.slice(0)
    .reverse()
    .map((item: any, index: number) => {
      return {
        id: item?.id,
        serial: index + 1,
        dateJoined: item?.dateJoined,
        driverName: item?.driverName,
        emailAddress: item?.emailAddress,
        accountStatus: item?.accountStatus,
        tripStatus: item?.tripStatus,
        gender: item?.gender,
      };
    });
  const columnDasboard = [
    {
      Header: "Driver ID",
      accessor: "id",
    },
    {
      Header: "Driver Name",
      accessor: "driverName",
    },

    {
      Header: "Email Address",
      accessor: "emailAddress",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },

    {
      Header: "Date Joined",
      accessor: "dateJoined",
    },
    {
      Header: "Account Status",
      accessor: "accountStatus",
    },
    {
      Header: "Trip Status",
      accessor: "tripStatus",
    },
  ];
  return (
    <>
      <DrawerCard title="Add Drivers" open={isOpen} toggleDrawer={toggleDrawer}>
        <AddDriver />
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnDasboard}
          data={driver}
          rowClickable={true}
          emptyPlaceHolder="No drivers yet!"
          list
          extraButton={{ text: "Add Driver" }}
          onClickFunction={toggleDrawer}
        />
      </div>
    </>
  );
};
export default Drivers;
