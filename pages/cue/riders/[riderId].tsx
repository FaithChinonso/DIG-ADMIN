import verify from "../../../src/assets/image/verify.svg";
import gender from "../../../src/assets/image/gender.svg";
import birth from "../../../src/assets/image/birth.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MyRidersValue } from "../../../src/utils/boxValues";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import BankDetails from "../../../src/components/BoxComponents/BankDetails";
import { useDispatch, useSelector } from "react-redux";
import ActionList from "../../../src/components/ActionList";
import ParentContainer from "src/components/ParentContainer";
import useHTTPGet from "src/Hooks/use-httpget";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { tripApi, userApi } from "src/components/api";
import { GetStaticProps } from "next/types";
import { useAppSelector } from "src/Hooks/use-redux";
import { uiActions } from "src/redux/store/ui-slice";
import { clearError, clearMessage } from "src/redux/store/features/user-slice";
import Trip from "src/components/BoxComponents/Trip";
import { tripType, riderType } from "src/@types/data";
import TrackRide from "../../../src/components/BoxComponents/TrackRide";

const OneUser = ({ riderID }: any) => {
  const request = useHTTPGet();
  const dispatch = useDispatch();
  const [user, setUser] = useState<riderType>();
  const [trips, setTrips] = useState<tripType[]>([]);
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState(0);
  const { loading, success, message, error } = useAppSelector(
    (state: any) => state.user
  );
  console.log(trips);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchAUser = useCallback(
    async (id: any) => {
      const url = `${userApi}/single-user/${id}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const dataFunction = (res: any) => {
        console.log(res);
        setUser(res.data.data);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );
  const fetchAllTrips = useCallback(
    (id: any) => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = `${tripApi}/trips-by-rider/${id}`;
      const dataFunction = (res: any) => {
        setTrips(res.data.data);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );
  useEffect(() => {
    fetchAUser(riderID);
    fetchAllTrips(riderID);
  }, [riderID]);

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
          backgroundColor: "#49D3BA",
        })
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  return (
    <ParentContainer>
      <div className="">
        <ActionList user={user} />
        <div className="bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between relative z-1 md:items-start items-center">
          <div className="flex gap-[30px] items-start text-white md:w-[300px] w-full">
            {user?.image && (
              <div>
                <Image src={user?.image} alt={""} width={100} height={100} />
              </div>
            )}
            <div className="flex flex-col gap-[14px]">
              <div className="flex gap-1">
                <div className="text-[16px] bg-red-300">{user?.fullName}</div>
                {user?.emailVerifiedStatus === "verified" && (
                  <div className="ml-1">
                    <Image src={verify} alt={""} />
                  </div>
                )}
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <h4 className="text-[12px]">{user?.role}</h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[12px]">{user?.email}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                {user?.gender && (
                  <h4 className="text-[12px]">
                    {" "}
                    <span>
                      {" "}
                      <Image src={gender} alt={""} />
                    </span>
                    {user?.gender}
                  </h4>
                )}
                {user?.phone && user?.gender && (
                  <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                )}

                {user?.phone && (
                  <div className="text-[12px]">
                    {" "}
                    <span>
                      {" "}
                      <Image src={birth} alt={""} />
                    </span>
                    {user?.phone}
                  </div>
                )}
              </div>

              <div className="md:w-[213px] w-full bg-faintWhite flex justify-between text-white p-3 rounded-md h-[53px] gap-3">
                <div className="flex flex-col justify-between">
                  <div className="text-[10px]">Escrow Balance</div>
                  <div className="text-xs font-[500]">
                    ₦ {user?.wallet?.escrowBalance}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-[10px] ">Withdrawable Balance</div>
                  <div className="text-xs font-[500]">
                    {" "}
                    ₦ {user?.wallet?.withdrawableBalance}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col  my-3 items-center justify-around text-white w-full">
            <div className="flex flex-row gap-3 text-white">
              <div className="text-white flex flex-col">
                <h3 className="text-[13px] mt-[28px]"> House Address</h3>
                <p className="text-[10px] text-center">
                  {user?.profile?.homeLocation?.homeAddress}
                </p>
              </div>
              {user?.profile?.workLocation ? (
                <div className="text-white flex flex-col">
                  <h3 className="text-[13px] mt-[28px]">Work Location</h3>
                  <p className="text-[10px] text-center">
                    {user?.profile?.workLocation?.workAddress}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="text-white flex flex-col ">
              <h3 className="text-[13px] mt-[28px]">Completed Rides</h3>
              <p className="text-[10px] text-center">
                {user?.profile?.completedRides}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-around text-white w-full md:w-[200px]">
            <div className="text-white text-[13px] my-2 md:text-center">
              Total Trips
            </div>
            <div className="flex md:flex-col flex-row w-full gap-3 items-center">
              <div className="bg-faintWhite p-[11px] w-[117px] rounded-md ">
                <div className="text-[10px] ">Successful</div>
                <div className="text-sm font-semibold">
                  {" "}
                  {
                    trips?.filter((item: any) => item.status === "Completed")
                      .length
                  }
                </div>
              </div>
              <div className="bg-faintWhite p-[11px]  w-[117px] rounded-md ">
                <div className="text-[10px] ">Cancelled</div>
                <div className="text-sm font-semibold">
                  {" "}
                  {
                    trips?.filter((item: any) => item.status === "Canceled")
                      .length
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          {" "}
          <Box
            sx={{ width: "100%" }}
            style={{
              background: "white",
              height: "100vh",
              fontFamily: "ClashDisplay",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{ background: "#edf2f7" }}
                // classes={{ flexContainer: classes.flexContainer }}
              >
                {MyRidersValue.map(value => (
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
              <Trip data={trips} type="rider" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <BankDetails data={user?.bank} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="w-[500px]">
                {trips && <TrackRide trip={trips[0]} />}
              </div>
            </TabPanel>
          </Box>
        </div>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const riderID = context.params.riderId;
  return {
    props: {
      riderID,
    },
  };
};
export default OneUser;