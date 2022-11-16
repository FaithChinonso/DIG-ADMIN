import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch } from "src/Hooks/use-redux";
import { addJobs } from "src/redux/store/data-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import DrawerCard from "./Drawer";
import AddJob from "./Forms/AddJob";
import ModalAction from "./ModalContent/ModalAction";
import MultipleSelectTable from "./multiple-select-table";

const JobsDisplay = ({ jobs, fetchAll, type = "", userId }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const request = useHTTPGet();
  const send = useHTTPPost();
  const remove = useHTTPDelete();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const editJobs = async (id: any, endpoint: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/job/${endpoint}/${id}`;
    const dataFunction = (res: any) => {
      fetchAll();
    };
    send({ url, accessToken, alert: "send" }, dataFunction);
  };
  const deleteJobs = async (id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/job/delete-job-post/${id}`;
    const dataFunction = (res: any) => {
      fetchAll();
    };
    remove({ url, accessToken }, dataFunction);
  };

  type Data = {
    jobID: number;
    headline: string;
    jobDuration: string;
    experienceLevel: string;
    budget: string;
    jobScope: string;
    isBudgetNegotiable: string;
    datePosted: string;
  };
  const formatData = jobs
    ?.slice(0)
    .reverse()
    .map((client: any) => {
      return {
        id: client.jobID,
        headline: client.headline,
        jobDuration: client.jobDuration,
        experienceLevel: client.experienceLevel,
        budget: client.budget,
        jobScope: client.jobScope,
        isActive: client.isActive,
        isBudgetNegotiable: client.isBudgetNegotiable,
        datePosted: moment(client.datePosted).format("ll"),
      };
    });
  const columnDasboard = [
    {
      Header: "#",
      accessor: "jobID",
    },
    {
      Header: "Headline",
      accessor: "headline",
    },
    {
      Header: "Experience Level",
      accessor: "experienceLevel",
    },
    {
      Header: "Job Duration",
      accessor: "jobDuration",
    },
    {
      Header: "Budget",
      accessor: "budget",
      Cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.value || 0))}</div>
      ),
    },

    {
      Header: "Job Scope",
      accessor: "jobScope",
    },
    {
      Header: "Negotiable",
      accessor: "isBudgetNegotiable",
    },
    {
      Header: "Date Posted",
      accessor: "datePosted",
    },
    ,
    {
      Header: "Action",
      accessor: "action",
      Filter: false,
      Cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                <ActionMenuItem
                  name="View More"
                  onClickFunction={() => {
                    router.push(
                      `${location.pathname}/${prop?.row.original?.id}`
                    );
                  }}
                />

                {prop?.row.original?.isActive === true ? (
                  <ActionMenuItem
                    name="Deactivate"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="deactivate"
                                item="job post"
                                actionFunction={() =>
                                  editJobs(
                                    prop?.row.original?.id,
                                    "deactivate-job-post"
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                ) : (
                  <ActionMenuItem
                    name="Activate"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="activate"
                                item="job post"
                                actionFunction={() =>
                                  editJobs(
                                    prop?.row.original?.id,
                                    "activate-job-post"
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                )}

                <ActionMenuItem
                  name="Delete Job Post"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              action="delete"
                              item="job post"
                              actionFunction={() =>
                                deleteJobs(prop?.row.original?.id)
                              }
                            />
                          </>
                        ),
                      })
                    )
                  }
                />
              </>
            }
          />
        );
      },
    },
  ];

  return (
    <div>
      <DrawerCard title="Add Job" open={isOpen} toggleDrawer={toggleDrawer}>
        <AddJob userId={userId} />
      </DrawerCard>

      <MultipleSelectTable
        columns={columnDasboard}
        data={formatData}
        emptyPlaceHolder="No Job Post created yet!"
        extraButton={{ text: "Add Job Post" }}
        s
        list
        onClickFunction={toggleDrawer}
      />
    </div>
  );
};

export default JobsDisplay;
