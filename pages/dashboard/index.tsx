import { useEffect, useState } from "react";
import {
  addProductCategory,
  addProducts,
  addUsers,
} from "src/redux/store/data-slice";
import useHTTPGet from "src/Hooks/use-httpget";
import Dashboard from "src/components/Dashboard";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { RootState } from "src/redux/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const request = useHTTPGet();

  useEffect(() => {
    const fetchAllCategory = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url =
        "https://backendapi.flip.onl/api/admin/productcategory/all-product-categories";
      const dataFunction = (res: any) => {
        dispatch(addProductCategory(res.data.data));
      };
      request({ url, accessToken }, dataFunction);
    };
    const fetchAllUsers = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = "https://backendapi.flip.onl/api/admin/user/all-users";
      const dataFunction = (res: any) => {
        dispatch(addUsers(res?.data.data));
      };
      request({ url, accessToken }, dataFunction);
    };
    const fetchAllProducts = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = "https://backendapi.flip.onl/api/admin/product/all-products";
      const dataFunction = (res: any) => {
        dispatch(addProducts(res.data.data));
      };
      request({ url, accessToken }, dataFunction);
    };
    fetchAllCategory();
    fetchAllUsers();
    fetchAllProducts();
  }, []);
  return <Dashboard />;
};

export default Home;
