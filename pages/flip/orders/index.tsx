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
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";
import useHTTPGet from "src/Hooks/use-httpget";
import { addOrders, addUsers } from "src/redux/store/data-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import AddJob from "src/components/Forms/AddJob";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPPost from "src/Hooks/use-httppost";
import { getMyOrders } from "src/redux/store/features/order-slice";
import OrderTable from "src/components/tables/OrderTable";

const Orders = () => {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector((state: any) => state.order);
  const { token } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMyOrders(token));
  }, [dispatch]);

  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <OrderTable data={orders} />
      </div>
    </ParentContainer>
  );
};
export default Orders;
