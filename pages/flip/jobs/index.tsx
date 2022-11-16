import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddService from "src/components/Forms/AddService";
import JobsDisplay from "src/components/jobsDisplay";
import ParentContainer from "src/components/ParentContainer";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppSelector } from "src/Hooks/use-redux";
import { addJobs, addServices } from "src/redux/store/data-slice";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../../src/components/Drawer";
import FilterTable from "../../../src/components/filter-table";
import AddMerchant from "../../../src/components/Forms/AddMerchant";
import ModalAction from "../../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../../src/components/multiple-select-table";

import { uiActions } from "../../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../../src/utils/analytics";

const Jobs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const request = useHTTPGet();
  const send = useHTTPPost();
  const remove = useHTTPDelete();
  const [isOpen, setIsOpen] = useState(false);
  const { jobs } = useAppSelector(state => state.data);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const fetchAllJobs = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = "https://backendapi.flip.onl/api/admin/job/all-jobs";
    const dataFunction = (res: any) => {
      dispatch(addJobs(res.data.data));
    };
    request({ url, accessToken }, dataFunction);
  };

  // const editJobs = async (id: any, endpoint: any) => {
  //   const accessToken = sessionStorage.getItem("accessToken");
  //   const url = `https://backendapi.flip.onl/api/admin/job/${endpoint}/${id}`;
  //   const dataFunction = (res: any) => {
  //     fetchAllJobs();
  //   };
  //   send({ url, accessToken, alert: "send" }, dataFunction);
  // };
  // const deleteJobs = async (id: any) => {
  //   const accessToken = sessionStorage.getItem("accessToken");
  //   const url = `https://backendapi.flip.onl/api/admin/job/delete-job-post/${id}`;
  //   const dataFunction = (res: any) => {
  //     fetchAllJobs();
  //   };
  //   remove({ url, accessToken }, dataFunction);
  // };

  // type Data = {
  //   jobID: number;
  //   headline: string;
  //   jobDuration: string;
  //   experienceLevel: string;
  //   budget: string;
  //   jobScope: string;
  //   isBudgetNegotiable: string;
  //   datePosted: string;
  // };
  // const formatData = jobs
  //   ?.slice(0)
  //   .reverse()
  //   .map((client: any) => {
  //     return {
  //       id: client.jobID,
  //       headline: client.headline,
  //       jobDuration: client.jobDuration,
  //       experienceLevel: client.experienceLevel,
  //       budget: client.budget,
  //       jobScope: client.jobScope,
  //       isActive: client.isActive,
  //       isBudgetNegotiable: client.isBudgetNegotiable,
  //       datePosted: moment(client.datePosted).format("ll"),
  //     };
  //   });
  // const columnDasboard = [
  //   {
  //     Header: "#",
  //     accessor: "jobID",
  //   },
  //   {
  //     Header: "Headline",
  //     accessor: "headline",
  //   },
  //   {
  //     Header: "Experience Level",
  //     accessor: "experienceLevel",
  //   },
  //   {
  //     Header: "Job Duration",
  //     accessor: "jobDuration",
  //   },
  //   {
  //     Header: "Budget",
  //     accessor: "budget",
  //     Cell: (prop: any) => (
  //       <div> &#8358; {numberWithCommas(Number(prop.value || 0))}</div>
  //     ),
  //   },

  //   {
  //     Header: "Job Scope",
  //     accessor: "jobScope",
  //   },
  //   {
  //     Header: "Negotiable",
  //     accessor: "isBudgetNegotiable",
  //   },
  //   {
  //     Header: "Date Posted",
  //     accessor: "datePosted",
  //   },
  //   ,
  //   {
  //     Header: "Action",
  //     accessor: "action",
  //     Filter: false,
  //     Cell: (prop: any) => {
  //       return (
  //         <ActionMenuBase
  //           items={
  //             <>
  //               <ActionMenuItem
  //                 name="View More"
  //                 onClickFunction={() => {
  //                   router.push(
  //                     `${location.pathname}/${prop?.row.original?.id}`
  //                   );
  //                 }}
  //               />

  //               {prop?.row.original?.isActive === true ? (
  //                 <ActionMenuItem
  //                   name="Deactivate"
  //                   onClickFunction={() =>
  //                     dispatch(
  //                       uiActions.openModalAndSetContent({
  //                         modalStyles: {
  //                           padding: 0,
  //                         },
  //                         modalContent: (
  //                           <>
  //                             <ModalAction
  //                               action="deactivate"
  //                               item="job post"
  //                               actionFunction={() =>
  //                                 editJobs(
  //                                   prop?.row.original?.id,
  //                                   "deactivate-job-post"
  //                                 )
  //                               }
  //                             />
  //                           </>
  //                         ),
  //                       })
  //                     )
  //                   }
  //                 />
  //               ) : (
  //                 <ActionMenuItem
  //                   name="Activate"
  //                   onClickFunction={() =>
  //                     dispatch(
  //                       uiActions.openModalAndSetContent({
  //                         modalStyles: {
  //                           padding: 0,
  //                         },
  //                         modalContent: (
  //                           <>
  //                             <ModalAction
  //                               action="activate"
  //                               item="job post"
  //                               actionFunction={() =>
  //                                 editJobs(
  //                                   prop?.row.original?.id,
  //                                   "activate-job-post"
  //                                 )
  //                               }
  //                             />
  //                           </>
  //                         ),
  //                       })
  //                     )
  //                   }
  //                 />
  //               )}

  //               <ActionMenuItem
  //                 name="Delete Job Post"
  //                 onClickFunction={() =>
  //                   dispatch(
  //                     uiActions.openModalAndSetContent({
  //                       modalStyles: {
  //                         padding: 0,
  //                       },
  //                       modalContent: (
  //                         <>
  //                           <ModalAction
  //                             action="delete"
  //                             item="job post"
  //                             actionFunction={() =>
  //                               deleteJobs(prop?.row.original?.id)
  //                             }
  //                           />
  //                         </>
  //                       ),
  //                     })
  //                   )
  //                 }
  //               />
  //             </>
  //           }
  //         />
  //       );
  //     },
  //   },
  // ];
  useEffect(() => {
    fetchAllJobs();
  }, []);
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <JobsDisplay jobs={jobs} fetchAll={fetchAllJobs} />
      </div>
    </ParentContainer>
  );
};
export default Jobs;
