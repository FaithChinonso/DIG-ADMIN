import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { NextPage } from "next";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../src/utils/analytics";
import Card from "../src/components/Card";
import DashboardChart from "../src/components/DashboardChart";
import { transactions } from "../src/utils/analytics";
import { useEffect, useState } from "react";
import moment from "moment";
import FilterTable from "../src/components/FilterTable";
import { dashboardColumn } from "../src/utils/columns";
import { Months } from "../src/utils/months";
import DashboardPieChart from "../src/components/DashboardPieChart";
import Image from "next/image";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import Person2Icon from "@mui/icons-material/Person2";

const Dashboard: NextPage = () => {
  const [month, setMonth] = useState<any>("");
  useEffect(() => {
    setMonth(moment().format("MMM"));
  }, []);
  return (
    <div className=" p-[10px] md:p-[30px]  w-full overflow-x-hidden  bg-lightGray ">
      <div className=" flex flex-col-reverse gap-2 justify-center items-center md:flex-row md:justify-between mb-8">
        <div className="rounded-full gap-2 flex items-center w-max  h-[40px] bg-white px-4">
          <h4 className="text-sm text-softGray border-r border-softGray pr-2">
            All Category
          </h4>
          <input
            className="md:w-[220px] text-softGray focus:outline-none"
            placeholder="Search Here"
          />
          <SearchIcon style={{ color: "#c1c1c1" }} />
        </div>

        <div className="w-[75px] flex">
          <NotificationsOutlinedIcon style={{ color: "#c1c1c1" }} />
          <div className="h-6 w-6 border border-gray-500 flex items-center justify-center">
            <Person2Icon style={{ color: "#525252" }} />
          </div>
          <MoreVertOutlinedIcon style={{ color: "#c1c1c1" }} />
        </div>
      </div>
      <div className="  justify-between grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-center  py-6">
        {analytics.map(item => (
          <div
            className="flex w-[160px] h-[100px] md:w-[250px] shadow-2xl, rounded-md p-8"
            key={item.id}
            style={{
              backgroundColor: item.color,
              background: `linear-gradient(to right, ${item.colorLight}50%, ${item.color})`,
              boxShadow: `5px 10px 15px ${item.colorLight}`,
            }}
          >
            <div className="w-1/2">
              <SignalCellularAltOutlinedIcon className="w-full h-full text-white" />
            </div>
            <div className="text-white flex flex-col justify-around">
              <h3 className="text-xl">{item.name}</h3>
              <h2 className="text-2xl">{item.figure}</h2>
              <h2 className="text-xl">{item.description}</h2>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex gap-5 flex-col lg:flex-row "> */}
      <div className="w-fulll flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[67%] overflow-x-auto bg-white p-4 md:p-8 rounded-sm shadow-2xl">
          {" "}
          <div className="flex gap-4 md:gap-0 flex-col justify-between items-start md:items-center md:p-5 w-full md:flex-row ">
            <h3 className="text-gray-800 text-3xl">Revenue</h3>
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
        <div className="bg-white w-full md:w-[33%] h-[auto] z-4 shadow-3xl rounded-md p-7">
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
      <div className="w-full flex flex-col md:flex-row gap-5 items-center mt-8">
        <div className=" overflow-x-auto bg-white p-8 rounded-sm shadow-2xl w-full md:w-[67%] ">
          <FilterTable
            title="Revenue"
            column={dashboardColumn}
            data={tableData}
          />
        </div>
        <div className="w-full md:w-[33%] h-[300px] bg-white rounded-md shadow-md p-8 ">
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
  );
};

export default Dashboard;
