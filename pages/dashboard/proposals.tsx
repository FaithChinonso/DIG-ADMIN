import moment from "moment";
import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import ProposalTable from "src/components/tables/ProposalTable";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { addProductCategory, addProposal } from "src/redux/store/data-slice";
import {
  clearError,
  getMyproposal,
} from "src/redux/store/features/proposal-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../src/components/Drawer";
import FilterTable from "../../src/components/filter-table";
import MultipleSelectTable from "../../src/components/multiple-select-table";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../src/utils/analytics";

const Proposals = () => {
  const dispatch = useAppDispatch();
  const { proposals, loading, error } = useAppSelector(
    (state: any) => state.proposal
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
    
  }, [loading, error,  dispatch]);
  useEffect(() => {
    dispatch(getMyproposal(token));
  }, []);
  return (
    <ParentContainer>
      <div>
        <ProposalTable data={proposals} />
      </div>
    </ParentContainer>
  );
};
export default Proposals;
