import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import TripTable from "src/components/tables/TripTable";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchMyTrips,
  getMyTrips,
} from "src/redux/store/features/trip-slice";
import { uiActions } from "src/redux/store/ui-slice";

const Trips = () => {
  const { token } = useAppSelector((state: any) => state.auth);
  const { trips, loading, success, error, message } = useAppSelector(
    state => state.trip
  );
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
    if (success) {
      dispatch(uiActions.closeModal());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "rgba(24, 160, 251, 1)",
        })
      );
      dispatch(fetchMyTrips(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);
  useEffect(() => {
    dispatch(getMyTrips(token));
  }, [dispatch, token]);
  return (
    <ParentContainer>
      <TripTable data={trips} />
    </ParentContainer>
  );
};
export default Trips;
