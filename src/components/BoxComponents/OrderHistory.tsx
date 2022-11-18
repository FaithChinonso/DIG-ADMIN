import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import MultipleSelectTable from "../multiple-select-table";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  bank,
  order,
} from "../../utils/analytics";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import { useEffect } from "react";
import { addOrders } from "src/redux/store/data-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPPost from "src/Hooks/use-httppost";
import moment from "moment";
import { uiActions } from "src/redux/store/ui-slice";
import ModalAction from "../ModalContent/ModalAction";
import {
  editorder,
  getMyOrdersbyMerchant,
} from "src/redux/store/features/order-slice";
import OrderTable from "../tables/OrderTable";

const OrderHistory = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const request = useHTTPGet();
  const remove = useHTTPDelete();
  const send = useHTTPPost();
  const { orders } = useAppSelector((state: any) => state.data);

  const fetchAllOrder = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    dispatch(getMyOrdersbyMerchant(id));
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <div className=" p-[10px] md:p-[30px]">
      <OrderTable data={orders} fetchAllOrders={fetchAllOrder} type="history" />
    </div>
  );
};
export default OrderHistory;
