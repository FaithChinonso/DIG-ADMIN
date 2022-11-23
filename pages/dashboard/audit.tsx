import ParentContainer from "src/components/ParentContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { getAdminlogs, getMylogs } from "src/redux/store/features/log-slice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";

import LogTable from "src/components/tables/LogTable";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { MyLogsValue } from "src/utils/boxValues";

const Audit = () => {
  const { logs, adminLogs } = useAppSelector(state => state.log);
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMylogs(token));
    dispatch(getAdminlogs(token));
  }, [dispatch]);

  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <LogTable data={adminLogs} />
      </div>
    </ParentContainer>
  );
};
export default Audit;
