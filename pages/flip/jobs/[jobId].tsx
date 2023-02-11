import { fontSize } from "@mui/system";
import { useRouter } from "next/router";

import profilePic from "../../../src/assets/image/profilePic.svg";
import verify from "../../../src/assets/image/verify.svg";
import gender from "../../../src/assets/image/gender.svg";
import birth from "../../../src/assets/image/birth.svg";
import rating from "../../../src/assets/image/rating.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { MyJobValue } from "../../../src/utils/boxValues";
import { useEffect, useState } from "react";

import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import Image from "next/image";
import SupportingDocuments from "../../../src/components/BoxComponents/SupportingDocuments";
import BankDetails from "../../../src/components/BoxComponents/BankDetails";
import OrderHistory from "../../../src/components/BoxComponents/OrderHistory";
import TransactionHistory from "../../../src/components/BoxComponents/TransactionHistory";
import Profile from "../../../src/components/Profile";
import ModalAction from "../../../src/components/ModalContent/ModalAction";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import { uiActions } from "../../../src/redux/store/ui-slice";
import { useDispatch } from "react-redux";
import ActionList from "../../../src/components/ActionList";
import ParentContainer from "src/components/ParentContainer";
import axios from "axios";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import ProposalTable from "src/components/tables/ProposalTable";
import { GetStaticProps } from "next/types";
import JobList from "src/components/jobList";
import { clearError, clearMessage } from "src/redux/store/features/job-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";

const OneMerchant = (props: any) => {
  const { jobs, loading, error, message, success } = useAppSelector(
    state => state.job
  );
  const dispatch = useAppDispatch();
  const [job, setJob] = useState<any>();
  const [proposal, setProposal] = useState<any>();

  const fetchAJob = async (id: any) => {
    console.log(id);
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const res: any = await axios.get(
        `https://backendapi.flip.onl/api/admin/job/single-job/${id}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            authsource: "user",
          },
        }
      );
      console.log(res?.data.data);
      setJob(res?.data.data);
    } catch (error: any) {}
  };
  const fetchProposal = async (id: any) => {
    console.log(id);
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const res: any = await axios.get(
        `https://backendapi.flip.onl/api/admin/proposal/proposals-for-job/${id}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            authsource: "user",
          },
        }
      );
      console.log(res?.data.data);
      setProposal(res?.data.data);
    } catch (error: any) {}
  };

  const [selected, setSelected] = useState(1);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchAJob(props.jobId);
    fetchProposal(props.jobId);
  }, [props.jobId]);
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
      fetchAJob(props.jobId);
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  return (
    <ParentContainer>
      <div>
        <JobList job={job} />
        <div className="flex flex-wrap items-center bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] md:flex-row justify-between relative z-1 text-white">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-3">
              <div className="text-xs">Headline</div>
              <div className="text-base">{job?.headline}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs">Experience Level</div>
              <div className="text-base">{job?.experienceLevel}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs">Job Scope</div>
              <div className="text-base">{job?.jobScope} </div>
            </div>
          </div>
          <div className="flex justify-between mt-5 w-full">
            <div className="flex flex-col gap-3">
              <div className="text-xs "> Duration</div>
              <div className="text-base">{job?.duration}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs ">Date Posted</div>
              <div className="text-base">{job?.datePosted}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs ">Budget</div>
              <div className="text-base">₦ {job?.budget}</div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center gap-3">
            <div className="text-xs ">Description</div>
            <div className="text-base">{job?.description}</div>
          </div>
        </div>
        <div className="mt-[30px]">
          {" "}
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
                {MyJobValue.map(value => (
                  <Tab
                    label={value.label}
                    {...a11yProps(value.id)}
                    key={value.id}
                    style={{
                      backgroundColor:
                        selected === value.id ? "white" : "transparent",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      lineHeight: "136.52%",
                      textAlign: "center",
                      color: "rgba(132, 135, 163, 1)",
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
              {job?.skillsNeeded?.length !== 0 ? (
                <div className=" mt-5 w-full">
                  <div className="text-darkPurple text-lg text-center">
                    Skills Needed
                  </div>
                  <div className="flex justify-between mt-5 w-full">
                    {job?.skillsNeeded?.map((item: any) => (
                      <div className="mt-5">
                        <div className="text-xs text-text mb-5">
                          {item?.title}
                        </div>
                        <div className="text-base">{item?.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ProposalTable data={proposal} />
            </TabPanel>
          </Box>
        </div>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const jobId = context.params.jobId;
  return {
    props: {
      jobId,
    },
  };
};
export default OneMerchant;
