import ParentContainer from "src/components/ParentContainer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { getMylogs } from "src/redux/store/features/log-slice";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import FilterTable from "../../src/components/filter-table";
import MultipleSelectTable from "../../src/components/multiple-select-table";

import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../src/utils/analytics";
import LogTable from "src/components/tables/LogTable";

const Audit = () => {
  const { logs } = useAppSelector(state => state.log);
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMylogs(token));
  }, [dispatch]);

  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <LogTable data={logs} />
      </div>
    </ParentContainer>
  );
};
export default Audit;
