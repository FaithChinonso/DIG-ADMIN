import type { NextPage } from "next";
import "regenerator-runtime/runtime";
import Head from "next/head";
import Image from "next/image";
import InnerNav from "../../src/components/InnerNav";
import SideNav from "../../src/components/SideNav";
import ParentContainer from "../../src/components/ParentContainer";
import styles from "../../styles/Home.module.css";
import SignUp from "./../signupPage";
import { Provider } from "react-redux";
import store from "../../src/redux/store/index";

import SignInForm from "../../src/components/SignInForm";
import SignUpForm from "../../src/components/SignUpForm";
import AuthSide from "../src/assets/image/auth-side (1).png";
import Rocket from "../src/assets/image/rocket.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "../../src/components/Modal";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import StatusCell from "../../src/components/StatusCell";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import moment from "moment";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  transactions,
} from "../../src/utils/analytics";
import CountUp from "react-countup";
import { Months } from "../../src/utils/months";
import DashboardChart from "../../src/components/DashboardChart";
import DashboardPieChart from "../../src/components/DashboardPieChart";
import FilterTable from "../../src/components/filter-table";

const Home: NextPage = () => {
  const [signUp, setSignUp] = useState(false);
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
    <Provider store={store}>
      <div className={styles.container}>
        <Head>
          <title>Admin Dashboard</title>
          <meta name="Admin" content="Admin" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          {/* <div className="flex w-screen flex-col md:flex-row max-w-screen overflow-hidden">
            <div className=" md:w-[600px] h-screen flex flex-col md:flex-row items-center justify-center relative">
              <div className="w-full hidden md:block">
                <Image src={AuthSide} className="w-full object-cover left-0" />
              </div>

              <div className="w-[400px] h-[350px] bg-lightDark py-[113px] px-[57px] rounded-[20px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-[32px] leading-10 text-white font-semibold text-center">
                  Great Deals, Unbeatable Value
                </h2>
                <p className="text-sm text-white text-center">
                  Buy and sell platform for all
                </p>
              </div>
            </div>
            <div className=" px-[200px] py-[120px] w-[calc(100vw-600px)]">
              <div className="">
                <h1 className="text-primary text-[32px] leading-10">
                  {signUp ? "Create An Account" : "Welcome Page"}
                  <span className="w-[30px]">
                    <Image src={Rocket} />
                  </span>
                </h1>
                <p className="text-[14px] text-[#101828]">
                  {signUp
                    ? "Sign up to continue"
                    : " Login to manage your collections"}
                </p>
              </div>
              {signUp ? <SignUpForm setSignUp={setSignUp} /> : <SignInForm />}

              {signUp ? (
                <div className="text-[#101828] text-xs text-center mt-[70px]">
                  Already have an account?{" "}
                  <span
                    className="mx-1 text-primary text-xs"
                    onClick={() => {}}
                  >
                    Sign In
                  </span>
                </div>
              ) : (
                <div className="text-[#101828] text-xs text-center mt-[100px]">
                  Not Registered yet?{" "}
                  <span
                    className="mx-1 text-primary text-xs"
                    onClick={() => setSignUp(true)}
                  >
                    Create an Account
                  </span>
                </div>
              )}
            </div>
          </div> */}
          <div className="w-full overflow-x-hidden bg-lightGray ">
            <div className="p-[10px] md:p-[30px]  justify-between grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-center  py-6">
              {analytics.map(item => (
                <div
                  className="w-[140px] h-[100px] md:w-[240px] shadow-2xl, rounded-sm items-center p-2 flex justify-between bg-white text-black"
                  key={item.id}
                  style={{
                    boxShadow: "0px 1px 2px 1px #d7d7d7",
                  }}
                >
                  <div className="flex flex-col h-full">
                    <h3 className="text-sm">{item.name}</h3>

                    <div className="text-2xl font-extrabold">
                      ₦
                      <CountUp
                        start={0}
                        end={item.figure}
                        duration={5}
                        enableScrollSpy
                      />
                    </div>
                    <h3 className="text-xs">{item.description}</h3>
                  </div>
                  <div>
                    <Image src={item.img} />{" "}
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
        </body>
      </div>
    </Provider>
  );
};

export default Home;
