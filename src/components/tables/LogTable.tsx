import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch } from "src/Hooks/use-redux";
import { addJobs } from "src/redux/store/data-slice";
import { deletejob, editjob } from "src/redux/store/features/job-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import DrawerCard from "../Drawer";
import AddJob from "../Forms/AddJob";
import ModalAction from "../ModalContent/ModalAction";
import MultipleSelectTable from "../multiple-select-table";

const LogTable = ({ logs, fetchAll, type = "", userId }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
  const formatData = logs
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
      name: "#",
      selector: "jobID",
    },
    {
      name: "Headline",
      selector: "headline",
    },
    {
      name: "Experience Level",
      selector: "experienceLevel",
    },
    {
      name: "Job Duration",
      selector: "jobDuration",
    },
    {
      name: "Budget",
      selector: "budget",
      cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.value || 0))}</div>
      ),
    },

    {
      name: "Job Scope",
      selector: "jobScope",
    },
    {
      name: "Negotiable",
      selector: "isBudgetNegotiable",
    },
    {
      name: "Date Posted",
      selector: "datePosted",
    },
    ,
    {
      name: "Action",
      selector: "action",
      Filter: false,
      cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                <ActionMenuItem
                  name="View More"
                  onClickFunction={() => {
                    router.push(`${location.pathname}/${prop?.id}`);
                  }}
                />

                {prop?.isActive === true ? (
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
                                  dispatch(
                                    editjob({
                                      endpoint: "deactivate-job-post",
                                      jobID: prop?.id,
                                    })
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
                                  dispatch(
                                    editjob({
                                      endpoint: "activate-job-post",
                                      jobID: prop?.id,
                                    })
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
                                dispatch(deletejob(prop?.id))
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
      <DataFilterTable columns={columnDasboard} data={formatData} />
    </div>
  );
};

export default LogTable;
