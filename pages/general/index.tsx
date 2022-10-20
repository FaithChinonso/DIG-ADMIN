import SearchIcon from "@mui/icons-material/Search";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { NextPage } from "next";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../src/utils/analytics";
import Card from "../../src/components/Card";
import DashboardChart from "../../src/components/DashboardChart";
import { transactions } from "../../src/utils/analytics";
import { useEffect, useState } from "react";
import moment from "moment";
import FilterTable from "../../src/components/filter-table";
import { dashboardColumn } from "../../src/utils/columns";
import { Months } from "../../src/utils/months";
import DashboardPieChart from "../../src/components/DashboardPieChart";
import Image from "next/image";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import Person2Icon from "@mui/icons-material/Person2";
import { Provider, useSelector } from "react-redux";

import CountUp from "react-countup";
import store from "../../src/redux/store";
import ParentContainer from "../../src/components/ParentContainer";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import StatusCell from "../../src/components/StatusCell";

const Dashboard: NextPage = () => {
  const [month, setMonth] = useState<any>("");
  useEffect(() => {
    setMonth(moment().format("MMM"));
  }, []);

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
    <div className="w-full overflow-x-hidden bg-lightGray ">
      <div className="p-[10px] md:p-[30px]  justify-between grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-center  py-6">
        {analytics.map(item => (
          <div
            className="w-[140px] h-[100px] md:w-[240px] shadow-2xl, rounded-md p-8 text-white flex flex-col justify-around items-center"
            key={item.id}
            style={{
              backgroundColor: item.color,
              background: `linear-gradient(to right, ${item.colorLight}50%, ${item.color})`,
              boxShadow: `5px 10px 15px ${item.colorLight}`,
            }}
          >
            <h3 className="text-base">{item.name}</h3>

            <div className="text-3xl">
              <CountUp
                start={0}
                end={item.figure}
                duration={5}
                enableScrollSpy
              />
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex gap-5 flex-col lg:flex-row "> */}
      <div className="w-full flex flex-col md:flex-row gap-8 p-[10px] md:p-[30px]">
        <div className="w-full md:w-[65%] overflow-x-auto bg-white p-4 md:p-8 rounded-sm shadow-2xl">
          {" "}
          <div className="flex gap-4 md:gap-0 flex-col justify-between items-start md:items-center md:p-5 w-full md:flex-row ">
            <h3 className="text-gray-800 text-3xl">Transactions</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "35%",
              }}
            >
              <div className="flex items-center">
                <div className="bg-lightPurple h-2 w-2 rounded-[100px] mr-2" />
                <h3 className="text-gray-800 text-1xl">OUTFLOW</h3>
              </div>
              <div className="flex items-center">
                <div className="bg-[#00ff00] h-2 w-2 rounded-[100px] mr-2" />
                <h3 className="text-gray-800 text-1xl">INFLOW</h3>
              </div>
            </div>

            <div>
              <select
                id="demo-simple-select"
                value={month}
                name="month"
                onChange={(e: any) => setMonth(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  background: "rgba(249, 250, 252)",
                  border: "none",
                  fontSize: "12px",
                  fontFamily: "Steradian",
                  color: "#212B4C",
                  height: "30px",
                }}
              >
                {Months?.map((month: any) => (
                  <option
                    value={month}
                    style={{
                      fontSize: "13px",
                      fontFamily: "Steradian",
                      color: "#212B4C",
                      height: "30px",
                    }}
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <DashboardChart transaction={transactions} month={month} />
          </div>
        </div>
        <div className="bg-white w-full md:w-[35%] h-[auto] z-4 shadow-3xl rounded-md p-7">
          <div className=" flex justify-between items-center mb-5 p-5">
            <h3 className="text-gray-800 text-3xl">Status</h3>
            <div>
              <select
                id="demo-simple-select"
                value={month}
                name="month"
                onChange={(e: any) => setMonth(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  background: "rgba(249, 250, 252)",
                  border: "none",
                  fontSize: "12px",
                  fontFamily: "Steradian",
                  color: "#212B4C",
                  height: "30px",
                }}
              >
                {Months?.map((month: any) => (
                  <option
                    value={month}
                    style={{
                      fontSize: "13px",
                      fontFamily: "Steradian",
                      color: "#212B4C",
                      height: "30px",
                    }}
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-[60%] w-full">
            <DashboardPieChart />
          </div>
          <div className="flex justify-between">
            {statusData.map(item => (
              <div className="flex flex-col items-center" key={item.id}>
                <h2 className="text-xl text-gray-600">{item.figure}</h2>
                <h3 className="text-base text-gray-400">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-5 items-start p-[10px] md:p-[30px]">
        <div className=" bg-white p-8 rounded-sm shadow-2xl w-full md:w-[65%] max-h-[400px] overflow-hidden ">
          <div className="text-gray-800 text-3xl"> Recent Users</div>
          <div className=" overflow-auto max-h-[calc(400px-65px)]">
            <FilterTable columns={columnDasboard} data={tableData} />{" "}
          </div>
        </div>
        <div className="w-full md:w-[35%] h-[400px] bg-white rounded-md shadow-md p-8 max-h-[400px] overflow-auto">
          <div className="flex flex-row justify-between w-full bg-white">
            <h3 className="text-gray-800 text-3xl">Tracking</h3>
            <div>
              <select
                id="demo-simple-select"
                value={month}
                name="month"
                onChange={(e: any) => setMonth(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  background: "rgba(249, 250, 252)",
                  border: "none",
                  fontSize: "12px",
                  fontFamily: "Steradian",
                  color: "#212B4C",
                  height: "30px",
                }}
              >
                {Months?.map((month: any) => (
                  <option
                    value={month}
                    style={{
                      fontSize: "13px",
                      fontFamily: "Steradian",
                      color: "#212B4C",
                      height: "30px",
                    }}
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>{" "}
          <div className=" overflow-auto max-h-[calc(400px-65px)]">
            <table className="w-full bg-white mt-6">
              <tr>
                <th className="border border-r-gray-400 text-xl text-gray-500">
                  REGION
                </th>
                <th className="border border-l-gray-400 text-xl text-gray-500">
                  AMOUNT
                </th>
              </tr>
              {tableLoad.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className="border border-r-gray-400 text-sm text-gray-500 text-center p-4">
                      {val.region}
                    </td>
                    <td className="border border-l-gray-400 text-sm text-gray-500 text-center p-4">
                      {val.amount}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
