import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import MultipleSelectTable from "../multiple-select-table";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  bank,
  order,
  transaction,
} from "../../utils/analytics";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import { transactionApi } from "../api";
import { useEffect, useState } from "react";
import useHTTPGet from "src/Hooks/use-httpget";
import TransactionTable from "../tables/TransactionTable";

const transactionHistory = ({ id }: any) => {
  const request = useHTTPGet();
  const [transactions, setTrasactions] = useState([]);
  const fetchAllTransactions = () => {
    const url = `${transactionApi}/transactions-by-user/${id}`;
    const accessToken = sessionStorage.getItem("accessToken");
    const dataFunction = (res: any) => {
      console.log(res);
      setTrasactions(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);
  return (
    <div>
      {" "}
      <TransactionTable data={transactions} />
    </div>
  );
};

export default transactionHistory;
