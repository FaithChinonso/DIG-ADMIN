import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddService from "src/components/Forms/AddService";
import JobsDisplay from "src/components/tables/JobsDisplay";
import ParentContainer from "src/components/ParentContainer";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  getMyjobs,
} from "src/redux/store/features/job-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";
import { uiActions } from "src/redux/store/ui-slice";

const Jobs = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { jobs, loading, error, message, success } = useAppSelector(
    state => state.job
  );
  const { token } = useAppSelector(state => state.auth);

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
    dispatch(getMyjobs(token));
  }, []);
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <JobsDisplay jobs={jobs} />
      </div>
    </ParentContainer>
  );
};
export default Jobs;
