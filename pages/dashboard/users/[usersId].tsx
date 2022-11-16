import { fontSize } from "@mui/system";
import { useRouter } from "next/router";

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
import { useEffect, useState } from "react";

import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import Image from "next/image";
import SupportingDocuments from "../../../src/components/BoxComponents/SupportingDocuments";
import BankDetails from "../../../src/components/BoxComponents/BankDetails";
import OrderHistory from "../../../src/components/BoxComponents/OrderHistory";
import TransactionHistory from "../../../src/components/BoxComponents/TransactionHistory";
import Profile from "../../../src/components/Profile";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import ModalAction from "../../../src/components/ModalContent/ModalAction";
import { uiActions } from "../../../src/redux/store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import ActionList from "../../../src/components/ActionList";
import ParentContainer from "src/components/ParentContainer";
import axios from "axios";
import useHTTPGet from "src/Hooks/use-httpget";
import JobsDisplay from "src/components/jobsDisplay";

const OneUser = () => {
  const router = useRouter();
  const request = useHTTPGet();
  const dispatch = useDispatch();

  const [user, setUser] = useState<any>();
  const [job, setJob] = useState<any>();

  const id = router.query.usersId;
  console.log(router.query.usersId);

  const fetchAUser = async (id: any) => {
    const dataFunction = (res: any) => {
      setUser(res?.data.data);
    };
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/user/single-user/${id}`;
    request({ url, accessToken }, dataFunction);
  };
  const fetchAllJobs = (id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/job/jobs-by-user/${id}`;
    const dataFunction = (res: any) => {
      dispatch(setJob(res.data.data));
    };
    request({ url, accessToken }, dataFunction);
  };
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [selected, setSelected] = useState(1);
  const useStyles = makeStyles({
    flexContainer: {
      alignItems: "center",
      justifyContent: "space-between !important",
    },
    check: {
      padding: "0px",
    },
  });

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    const id = router.query.usersId;
    fetchAUser(id);
    fetchAllJobs(id);
  }, [router]);
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <ActionList user={user} />
        <div className="bg-darkPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between relative z-1">
          <div className="flex gap-[30px] items-start text-white ">
            {" "}
            <div>
              <Image src={profilePic} alt={""} />
            </div>
            <div className="flex flex-col gap-[14px]">
              <h2 className="text-[16px]">
                {user?.fullName}
                <span>
                  {" "}
                  {user?.emailVerifiedStatus === "verified" && (
                    <Image src={verify} alt={""} />
                  )}
                </span>
              </h2>
              <div className="flex justify-between gap-[9px] items-center">
                <h4 className="text-[10px]">{user?.role}</h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]">{user?.email}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <h4 className="text-[10px]">
                  {" "}
                  <span>
                    {" "}
                    <Image src={gender} alt={""} />
                  </span>
                  {user?.gender}
                </h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]">
                  {" "}
                  <span>
                    {" "}
                    <Image src={birth} alt={""} />
                  </span>
                  {user?.dateOfBirth}
                </div>
              </div>
              <div>
                <Image src={rating} alt={""} />
              </div>
              <div className="w-[193px] bg-faintWhite flex justify-between text-white p-3 rounded-md h-[53px]">
                <div className="flex flex-col justify-between">
                  <div className="text-[8px]">Lifetime Earning</div>
                  <div className="text-xs font-[500]">₦ 500,000</div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-[8px] ">Lifetime Transactions</div>
                  <div className="text-xs font-[500]">100</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col w-[404px]">
            <h3 className="text-[13px] mt-[28px]">About</h3>
            <p className="text-[10px]">{user?.profile.bio}</p>
          </div>
          <div className="flex flex-col items-center justify-around text-white">
            <div className="text-white text-[13px]">Total Orders</div>
            <div className="bg-faintWhite p-[11px] w-[97px] rounded-md ">
              <div className="text-[8px] ">Successful</div>
              <div className="text-sm font-semibold">100</div>
            </div>
            <div className="bg-faintWhite p-[11px]  w-[97px] rounded-md ">
              <div className="text-[8px] ">Cancelled</div>
              <div className="text-sm font-semibold">100</div>
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          {" "}
          <Box
            sx={{ width: "100%" }}
            style={{ background: "white", height: "100vh" }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{ background: "#edf2f7" }}
                // classes={{ flexContainer: classes.flexContainer }}
              >
                {MyUserValue.map(value => (
                  <Tab
                    label={value.label}
                    {...a11yProps(value.id)}
                    key={value.id}
                    style={{
                      backgroundColor:
                        selected === value.id ? "white" : "transparent",
                      fontFamily: "Steradian",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "136.52%",
                      textAlign: "center",
                      color: "#979797",
                      textTransform: "capitalize",
                    }}
                    onClick={() => {
                      setSelected(value.id);
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <SupportingDocuments />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <BankDetails data={user?.bank} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OrderHistory />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <TransactionHistory />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <OrderHistory />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <JobsDisplay
                jobs={job}
                fetchAll={fetchAllJobs}
                type="user"
                userId={id}
              />
            </TabPanel>
          </Box>
        </div>
      </div>
    </ParentContainer>
  );
};

export default OneUser;
