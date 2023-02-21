import ParentContainer from "src/components/ParentContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { clearError, getAdminlogs } from "src/redux/store/features/log-slice";
import LogTable from "src/components/tables/LogTable";
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
    dispatch(getAdminlogs({ token }));
  }, [dispatch, token]);

  return (
    <ParentContainer>
      <div className="mt-12">
        <LogTable data={adminLogs} />
      </div>
    </ParentContainer>
  );
};
export default Audit;
