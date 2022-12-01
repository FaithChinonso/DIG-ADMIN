import { useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../src/components/Drawer";
import FilterTable from "../../src/components/filter-table";
import MultipleSelectTable from "../../src/components/multiple-select-table";

import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../src/utils/analytics";

const Carts = () => {
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
    },
  ];
  return (
    <ParentContainer>
      <DrawerCard title="Add Carts" open={isOpen} toggleDrawer={toggleDrawer}>
        <div>red</div>
      </DrawerCard>
      <div>
        <MultipleSelectTable
          columns={columnDasboard}
          data={tableData}
          emptyPlaceHolder="No carts yet!"
        />
      </div>
    </ParentContainer>
  );
};
export default Carts;
