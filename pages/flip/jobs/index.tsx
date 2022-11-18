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
import { getMyjobs } from "src/redux/store/features/job-slice";

const Jobs = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { jobs } = useAppSelector(state => state.job);
  const { token } = useAppSelector(state => state.auth);

  // const fetchAllJobs = () => {
  //   const accessToken = sessionStorage.getItem("accessToken");

  // };

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
