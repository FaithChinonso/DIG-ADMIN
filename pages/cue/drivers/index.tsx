import { useState } from "react";
import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../../src/components/Drawer";
import FilterTable from "../../../src/components/filter-table";
import MultipleSelectTable from "../../../src/components/multiple-select-table";
import StatusCell from "../../../src/components/StatusCell";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../../src/utils/analytics";

const Drivers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const columnDasboard = [
    {
      Header: "Driver ID",
      accessor: "driverID",
      Filter: false,
    },
    {
      Header: "Driver Name",
      accessor: "driverName",
    },

    {
      Header: "Email Address",
      accessor: "email",
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
      Cell: (prop: any) => (
        <StatusCell status={prop?.value} type="businessService" />
      ),
    },
    {
      Header: "Trip Status",
      accessor: "tripStatus",
      Cell: (prop: any) => (
        <StatusCell status={prop?.value} type="businessService" />
      ),
    },
    {
      Header: "Action",
      accessor: "action",
      Filter: false,
      Cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                <ActionMenuItem name="View Details" />

                <ActionMenuItem name="Edit Details" />
              </>
            }
          />
        );
      },
    },
  ];
  return (
    <>
      <DrawerCard title="Add Drivers" open={isOpen} toggleDrawer={toggleDrawer}>
        <div>red</div>
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnDasboard}
          data={tableData}
          emptyPlaceHolder="No Drivers yet!"
          extraButton={{ text: "Add Drivers" }}
          onClickFunction={toggleDrawer}
        />
      </div>
    </>
  );
};
export default Drivers;
