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

const LogTable = ({ data, fetchAll, type = "", userId }: any) => {
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
  const formatData = data
    ?.slice(0)
    .reverse()
    .map((client: any) => {
      return {
        id: client.logsID,
        action: client.action,
        modelAffected: client.modelAffected,
        date: moment(client.date).format("ll"),
      };
    });
  const columnDasboard = [
    {
      name: "Log ID",
      selector: "id",
    },
    {
      name: "Action",
      selector: "action",
    },
    {
      name: "Model Affected",
      selector: "modelAffected",
    },
    {
      name: "Date",
      selector: "date",
    },
  ];

  return (
    <div>
      <DataFilterTable columns={columnDasboard} data={formatData} />
    </div>
  );
};

export default LogTable;
