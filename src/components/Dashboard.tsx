import React from "react";
import { tableData, transactions } from "src/utils/analytics";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import CardContainer from "./CardContainer";
import DashboardChart from "./DashboardChart";
import DashboardPieChart from "./DashboardPieChart";
import FilterTable from "./filter-table";
import ParentContainer from "./ParentContainer";
import SmallTable from "./SmallTable";

const Dashboard = ({ recentUsers }: any) => {
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
    <ParentContainer>
      <div className="w-full overflow-x-hidden bg-lightGray ">
        <CardContainer />
        {/* <div className="flex gap-5 flex-col lg:flex-row "> */}
        <div className="w-full flex flex-col md:flex-row gap-8 p-[10px] md:p-[30px]">
          <div className="w-full md:w-[65%] overflow-x-auto bg-white p-4 md:p-8 rounded-sm shadow-2xl">
            {" "}
            <DashboardChart transaction={transactions} />
          </div>
          <DashboardPieChart />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5 items-start p-[10px] md:p-[30px]">
          <div className=" bg-white p-8 rounded-sm shadow-2xl w-full md:w-[65%] max-h-[400px] overflow-hidden ">
            <div className="text-gray-800 text-3xl"> Recent Users</div>
            <div className=" overflow-auto max-h-[calc(400px-65px)]">
              <FilterTable columns={columnDasboard} data={[]} />{" "}
            </div>
          </div>
          <div className="w-full md:w-[35%] h-[400px] bg-white rounded-md shadow-md p-8 max-h-[400px] overflow-auto">
            {" "}
            <SmallTable />
          </div>
        </div>
      </div>
    </ParentContainer>
  );
};

export default Dashboard;
