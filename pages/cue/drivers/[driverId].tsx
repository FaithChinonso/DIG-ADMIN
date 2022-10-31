import GoogleMapReact from "google-map-react";
import driverPic from "../../../src/assets/image/driverPic.svg";
import message from "../../../src/assets/image/message.svg";
import call from "../../../src/assets/image/call.svg";

import Image from "next/image";
import { useRouter } from "next/router";
import { MyDriversValue } from "../../../src/utils/boxValues";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import GeneralInfo from "../../../src/components/BoxComponents/GeneralInfo";
import Trip from "../../../src/components/BoxComponents/Trip";
import TrackRide from "../../../src/components/BoxComponents/TrackRide";
import ActionList from "../../../src/components/ActionList";
import maps from "../../../src/assets/image/maps.png";

const OneDriver = () => {
  const router = useRouter();
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
  const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div className=" p-[10px] md:p-[30px] absolute top-0 z-20 bg-white w-full h-[150vh]">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src={maps} className="object-cover w-full h-full" />
      </div>
      <div>
        <button
          className="text-base text-text bg-white mb-4 py-[18px] px-[21px] rounded-2xl flex items-center justify-center "
          onClick={() => router.back()}
        >
          <span style={{ marginRight: "5px", fontSize: "20px" }}>&lt;</span>
          All Drivers
        </button>
        <div className="rounded-[20px] bg-darkPurple w-[435px] p-5">
          <div className="flex justify-between">
            <div className="flex gap-[17px]">
              <div>
                <Image src={driverPic} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg text-white">Joseph Ike</h3>
                <div className="text-textD text-xs">
                  <span className="w-1 h-1 rounded-[50%] bg-white mr-1"></span>
                  Inactive
                </div>
              </div>
            </div>
            <div className="flex gap-[17px]">
              <div>
                <Image src={message} />
              </div>
              <div>
                <Image src={call} />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[37px]">
            <div className="flex flex-col gap-3">
              <h5 className="text-textD text-[10px]">Vehicle Type</h5>
              <p className="text-white text-xs">HatchBack</p>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-textD text-[10px]">Vehicle (Model)</h5>
              <p className="text-white text-xs">Honda (Accord)</p>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-textD text-[10px]">Vehicle Color</h5>
              <p className="text-white text-xs">Red</p>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-textD text-[10px]">Vehicle Plate Number</h5>
              <p className="text-white text-xs">FKJ-254XA</p>
            </div>
          </div>
        </div>
        <div className="rounded-[20px] bg-white w-[435px] p-5 mt-[23px]">
          <Box
            sx={{ width: "100%" }}
            style={{
              background: "white",
              height: "100vh",
              maxWidth: "100vw",
              overflow: "auto",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "rgba(75,0,129, .2)" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{ background: "white" }}
                // classes={{ flexContainer: classes.flexContainer }}
              >
                {MyDriversValue.map(value => (
                  <Tab
                    label={value.label}
                    {...a11yProps(value.id)}
                    style={{
                      backgroundColor:
                        selected === value.id
                          ? "rgba(107, 93, 211, 1)"
                          : "transparent",
                      fontFamily: "Steradian",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "136.52%",
                      textAlign: "center",
                      color: selected === value.id ? "white" : "#979797",
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
              <GeneralInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Trip />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <TrackRide />
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default OneDriver;
