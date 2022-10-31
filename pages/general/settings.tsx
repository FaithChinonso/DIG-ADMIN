import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { MySettingsValue } from "../../src/utils/boxValues";
import { useState } from "react";

const Setting = () => {
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
  return (
    <div className=" p-[10px] md:p-[30px] ">
      {" "}
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
            {MySettingsValue.map(value => (
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
                  outline: "none",
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
        <TabPanel value={value} index={0}></TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
      </Box>
    </div>
  );
};
export default Setting;
