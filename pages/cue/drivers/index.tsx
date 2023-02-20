import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import UserTable from "src/components/tables/UserTable";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchMyDriver,
  getMyDrivers,
} from "src/redux/store/features/user-slice";
import { uiActions } from "src/redux/store/ui-slice";

const Drivers = () => {
  const dispatch = useAppDispatch();
  const { drivers, loading, success, message, error } = useAppSelector(
    (state: any) => state.user
  );
  const { token } = useAppSelector((state: any) => state.auth);

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
      dispatch(fetchMyDriver(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);

  useEffect(() => {
    dispatch(getMyDrivers(token));
  }, [dispatch, token]);

  return (
    <ParentContainer>
      <div>
        <UserTable data={drivers} type="" action="" />
      </div>
    </ParentContainer>
  );
};
export default Drivers;
