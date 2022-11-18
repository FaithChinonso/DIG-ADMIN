import moment from "moment";
import { useEffect, useState } from "react";
import ModalAction from "src/components/ModalContent/ModalAction";
import ParentContainer from "src/components/ParentContainer";
import WithdrawalTable from "src/components/tables/WithdrawalTable";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { addProductCategory, addWithdrawals } from "src/redux/store/data-slice";
import { getMywithdrawal } from "src/redux/store/features/withdrawal-slice";
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

const Withdrawals = () => {
  const dispatch = useAppDispatch();
  const { withdrawals } = useAppSelector((state: any) => state.withdrawal);
  const { token } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMywithdrawal(token));
  }, [token]);
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <WithdrawalTable data={withdrawals} />
      </div>
    </ParentContainer>
  );
};
export default Withdrawals;
