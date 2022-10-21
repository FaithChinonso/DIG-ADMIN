import { useState } from "react";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../src/components/Drawer";
import FilterTable from "../../src/components/filter-table";
import AddFleet from "../../src/components/Forms/AddFleet";
import MultipleSelectTable from "../../src/components/multiple-select-table";
import StatusCell from "../../src/components/StatusCell";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../src/utils/analytics";

const Fleets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const columnDasboard = [
    {
      Header: "#",
      accessor: "serial",
      Filter: false,
    },
    {
      Header: "Business Name",
      accessor: "businessName",
    },
    {
      Header: "Contact Person",
      accessor: "contactPerson",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "number",
    },

    {
      Header: "Client Type",
      accessor: "clientType",
    },
    {
      Header: "Status",
      accessor: "status",
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
      <DrawerCard title="Add Fleets" open={isOpen} toggleDrawer={toggleDrawer}>
        <AddFleet />
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnDasboard}
          data={tableData}
          emptyPlaceHolder="No Fleets yet!"
          extraButton={{ text: "Add Fleets" }}
          onClickFunction={toggleDrawer}
        />
      </div>
    </>
  );
};
export default Fleets;
