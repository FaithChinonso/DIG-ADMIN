import ParentContainer from "src/components/ParentContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { clearError, getAdminlogs } from "src/redux/store/features/log-slice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";

import LogTable from "src/components/tables/LogTable";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { MyLogsValue } from "src/utils/boxValues";
import { uiActions } from "src/redux/store/ui-slice";

const Audit = () => {
  const { adminLogs, loading, error } = useAppSelector(state => state.log);
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

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
  }, [loading, error, dispatch]);

  useEffect(() => {
    dispatch(getAdminlogs(token));
  }, [dispatch]);

  return (
    <ParentContainer>
      <div>
        <LogTable data={adminLogs} />
      </div>
    </ParentContainer>
  );
};
export default Audit;
