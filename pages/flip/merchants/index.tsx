import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParentContainer from "src/components/ParentContainer";
import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../../src/components/Drawer";
import FilterTable from "../../../src/components/filter-table";
import AddUser from "../../../src/components/Forms/AddUser";
import ModalAction from "../../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../../src/components/multiple-select-table";

import { uiActions } from "../../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../../src/utils/analytics";
import axios from "axios";

import moment from "moment";

import CreateProduct from "src/components/Forms/CreateProduct";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import AddService from "src/components/Forms/AddService";
import { useAppSelector } from "src/Hooks/use-redux";
import CreateWithrawalRequest from "src/components/Forms/CreateWithdrawalRequest";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";
import { getMymerchant } from "src/redux/store/features/user-slice";
import MerchantTable from "src/components/tables/MerchantTable";
import UserTable from "src/components/tables/UserTable";

const Merchants = () => {
  const dispatch = useDispatch();

  const { users } = useAppSelector((state: any) => state.user);
  const { token } = useAppSelector((state: any) => state.auth);

  // useEffect(() => {
  //   dispatch(getMyproductCategories(accessToken));
  //   dispatch(getMymerchant(accessToken));
  // }, [dispatch]);

  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        {/* <UserTable data={users} /> */}
      </div>
    </ParentContainer>
  );
};
export default Merchants;
