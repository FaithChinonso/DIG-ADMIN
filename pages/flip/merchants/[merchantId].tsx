import { fontSize } from "@mui/system";
import { useRouter } from "next/router";
import profilePic from "../../../src/assets/image/profilePic.svg";
import verify from "../../../src/assets/image/verify.svg";
import gender from "../../../src/assets/image/gender.svg";
import birth from "../../../src/assets/image/birth.svg";
import rating from "../../../src/assets/image/rating.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MyUserValue } from "../../../src/utils/boxValues";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import SupportingDocuments from "../../../src/components/BoxComponents/SupportingDocuments";
import BankDetails from "../../../src/components/BoxComponents/BankDetails";
import OrderHistory from "../../../src/components/BoxComponents/OrderHistory";
import TransactionHistory from "../../../src/components/BoxComponents/TransactionHistory";
import { useDispatch, useSelector } from "react-redux";
import ActionList from "../../../src/components/ActionList";
import ParentContainer from "src/components/ParentContainer";
import axios from "axios";
import useHTTPGet from "src/Hooks/use-httpget";
import JobsDisplay from "../../../src/components/tables/JobsDisplay";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { userApi } from "src/components/api";
import { GetStaticProps } from "next/types";
import { uiActions } from "src/redux/store/ui-slice";
import { clearError, clearMessage } from "src/redux/store/features/user-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { merchantType } from "src/@types/data";

const OneMerchant = (props: any) => {
  const router = useRouter();
  const request = useHTTPGet();
  const dispatch = useAppDispatch();
  const { users, loading, success, message, error } = useAppSelector(
    (state: any) => state.user
  );
  // const {
  //   jobs,
  //   loading: loadJob,
  //   success: successJob,
  //   message: messageJob,
  //   error: errorJob,
  // } = useAppSelector((state: any) => state.job);
  const [user, setUser] = useState<merchantType>();
  const [orders, setOrders] = useState<any>([]);
  const [job, setJob] = useState<any>();
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState(0);

  const fetchAMerchant = useCallback(async (id: any) => {
    const url = `${userApi}/single-user/${id}`;
    const accessToken = sessionStorage.getItem("accessToken");
    const dataFunction = (res: any) => {
      console.log(res);
      setUser(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  }, [request]);
  const fetchAllJobs = useCallback((id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/job/jobs-by-user/${id}`;
    const dataFunction = (res: any) => {
      setJob(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  }, [request]);
  const fetchOrdersByAMerchant = useCallback((id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/order/orders-for-merchant/${id}`;
    const dataFunction = (res: any) => {
      setOrders(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  }, [request]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchAMerchant(props.merchantId);
    fetchAllJobs(props.merchantId);
    fetchOrdersByAMerchant(props.merchantId);
  }, [
    props.merchantId,
    dispatch,
    fetchAMerchant,
    fetchAllJobs,
    fetchOrdersByAMerchant,
  ]);

  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          backgroundColor: "red",
        })
      );
      setTimeout(() => {
        dispatch(clearError());
      }, 10000);
    }
    if (success) {
      dispatch(uiActions.closeModal());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "rgba(24, 160, 251, 1)",
        })
      );
      fetchAMerchant(props.merchantId);
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [
    loading,
    error,
    message,
    success,
    dispatch,
    fetchAMerchant,
    props.merchantId,
  ]);
  return (
    <ParentContainer>
      <div>
        <ActionList user={user} />
        <div className="bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between relative z-1">
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
                  {user?.phone}
                </div>
              </div>
              <div>
                <Image src={rating} alt={""} />
              </div>
              <div className="w-full md:w-[193px] bg-faintWhite flex justify-between text-white p-3 rounded-md h-[53px]">
                <div className="flex flex-col justify-between">
                  <div className="text-[8px]">Escrow Balance</div>
                  <div className="text-xs font-[500]">
                    ₦ {user?.wallet?.escrowBalance}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-[8px] ">Withdrawable Balance</div>
                  <div className="text-xs font-[500]">
                    {" "}
                    ₦ {user?.wallet?.withdrawableBalance}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {user?.role === "merchant" && (
            <div className="flex flex-col items-center justify-around text-white">
              <div className="flex flex-row gap-3 text-white">
                <div className="text-white flex flex-col">
                  <h3 className="text-[13px] mt-[28px]">Merchant Type</h3>
                  <p className="text-[10px]">{user?.profile?.merchantType}</p>
                </div>
                <div className="text-white flex flex-col">
                  <h3 className="text-[13px] mt-[28px]">Merchant Category</h3>
                  <p className="text-[10px]">
                    {user?.profile?.merchantCategory.categoryName}
                  </p>
                </div>
              </div>

              <div className="text-white flex flex-col ">
                <h3 className="text-[13px] mt-[28px]">About</h3>
                <p className="text-[10px]">{user?.profile?.bio}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-around text-white">
            <div className="text-white text-[13px]">Total Orders</div>
            <div className="bg-faintWhite p-[11px] w-full md:w-[97px] rounded-md mb-2">
              <div className="text-[8px] ">Successful</div>
              <div className="text-sm font-semibold">100</div>
            </div>
            <div className="bg-faintWhite p-[11px] w-full  md:w-[97px] rounded-md ">
              <div className="text-[8px] ">Cancelled</div>
              <div className="text-sm font-semibold">100</div>
            </div>
          </div>
        </div>
        <div className="mt-[30px] w-full max-w-full overflow-x-auto">
          {" "}
          <Box
            sx={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}
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
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      lineHeight: "136.52%",
                      textAlign: "center",
                      color: "rgba(132, 135, 163, 1)",
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
              <OrderHistory data={orders} />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <TransactionHistory id={user?.userID} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <div></div>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <JobsDisplay jobs={job} type="profile" />
            </TabPanel>
          </Box>
        </div>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const merchantId = context.params.merchantId;
  return {
    props: {
      merchantId,
    },
  };
};
export default OneMerchant;
