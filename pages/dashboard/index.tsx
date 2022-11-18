import { useEffect, useState } from "react";
import useHTTPGet from "src/Hooks/use-httpget";
import Dashboard from "src/components/Dashboard";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { RootState } from "src/redux/store";
import {
  createuser,
  getMymerchant,
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
import { getMylogs } from "src/redux/store/features/log-slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const request = useHTTPGet();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    dispatch(getMyuser(accessToken));
    dispatch(getMyproduct(accessToken));
    dispatch(getMyservice(accessToken));
    dispatch(getMywithdrawal(accessToken));
    dispatch(getMyproposal(accessToken));
    dispatch(getMyjobs(accessToken));
    dispatch(getMyserviceCategories(accessToken));
    dispatch(getMyproductCategories(accessToken));
    dispatch(getMyTransactions(accessToken));
    dispatch(getMylogs(accessToken));
    dispatch(getMymerchant(accessToken));
  }, [dispatch]);
  return <Dashboard />;
};

export default Home;
