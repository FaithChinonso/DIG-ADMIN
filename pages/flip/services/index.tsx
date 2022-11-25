import { Box, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ParentContainer from "src/components/ParentContainer";
import ServiceCategory from "src/components/ServiceCategory";
import { useAppSelector } from "src/Hooks/use-redux";
import { MyServiceValue } from "src/utils/boxValues";
import { a11yProps, TabPanel } from "src/utils/helperFunctions";
import { uiActions } from "../../../src/redux/store/ui-slice";
import {
  clearError,
  clearMessage,
  getMyservice,
} from "src/redux/store/features/service-slice";
import ServiceTable from "src/components/tables/ServiceTable";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const Service = () => {
  const dispatch = useDispatch();

  const { services, loading, error, message, success } = useAppSelector(
    state => state.service
  );
  const { token } = useAppSelector(state => state.auth);

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
        })
      );
      setTimeout(() => {
        dispatch(clearError());
      }, 10000);
    }
    if (success) {
      dispatch(
        uiActions.openModalAndSetContent({
          modalContent: (
            <>
              <SuccessfulModal title="Successful" message={message} />
            </>
          ),
        })
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);

  useEffect(() => {
    dispatch(getMyservice(token));
  }, [dispatch]);
  return (
    <ParentContainer>
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
            {MyServiceValue.map(value => (
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
          <div className=" p-[10px] md:p-[30px]">
            <ServiceTable data={services} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ServiceCategory />
        </TabPanel>
      </Box>
    </ParentContainer>
  );
};
export default Service;
