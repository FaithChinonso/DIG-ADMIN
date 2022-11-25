import { useEffect, useState } from "react";
import useHTTPGet from "src/Hooks/use-httpget";
import Dashboard from "src/components/Dashboard";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { RootState } from "src/redux/store";
import {
  clearError,
  clearMessage,
  createuser,
  getMyuser,
} from "src/redux/store/features/user-slice";
import { getMyproduct } from "src/redux/store/features/product-slice";
import { getMyservice } from "src/redux/store/features/service-slice";
import { getMywithdrawal } from "src/redux/store/features/withdrawal-slice";
import { getMyproposal } from "src/redux/store/features/proposal-slice";
import { getMyjobs } from "src/redux/store/features/job-slice";
import { getMyserviceCategories } from "src/redux/store/features/service-category-slice";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";
import { getMyTransactions } from "src/redux/store/features/transaction-slice";
import { getAdminlogs } from "src/redux/store/features/log-slice";
import { useSelector } from "react-redux";
import { getMyOrders } from "src/redux/store/features/order-slice";
import { uiActions } from "src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem("accessToken");
  const request = useHTTPGet();
  const { users, loading, error, message, success } = useAppSelector(
    state => state.user
  );
  const { transactions } = useAppSelector(state => state.transaction);
  const { orders } = useAppSelector(state => state.order);
  const last10Users = users.slice(users.length - 10);

  useEffect(() => {
    dispatch(getMyuser(accessToken));
    dispatch(getMyproduct(accessToken));
    dispatch(getMyservice(accessToken));
    dispatch(getMywithdrawal(accessToken));
    dispatch(getMyproposal(accessToken));
    dispatch(getMyjobs(accessToken));
    dispatch(getMyserviceCategories(accessToken));
    dispatch(getMyproductCategories(accessToken));
    dispatch(getMyTransactions(accessToken));
    dispatch(getAdminlogs(accessToken));
    dispatch(getMyOrders(accessToken));
  }, [dispatch, accessToken]);
  return (
    <Dashboard
      recentUsers={last10Users}
      transactions={transactions}
      orders={orders}
      users={users}
    />
  );
};

export default Home;
