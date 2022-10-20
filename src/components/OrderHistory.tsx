import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import MultipleSelectTable from "./multiple-select-table";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  bank,
  order,
} from "../utils/analytics";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";

const OrderHistory = () => {
  const columnOrder = [
    {
      Header: "User ID",
      accessor: "id",
      Filter: false,
    },
    {
      Header: "Order",
      accessor: "order",
    },
    {
      Header: "Order Price",
      accessor: "orderPrice",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Date Requested",
      accessor: "dateRequested",
    },
    {
      Header: "Merchant",
      accessor: "merchant",
    },
    {
      Header: "Phone Number",
      accessor: "number",
    },

    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Action",
      accessor: "action",
      Filter: false,
      Cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                <ActionMenuItem name="View Details" />

                <ActionMenuItem name="Edit Details" />
              </>
            }
          />
        );
      },
    },
  ];
  return (
    <div>
      {" "}
      <MultipleSelectTable
        columns={columnOrder}
        data={order}
        emptyPlaceHolder="No Orders created yet!"
        list
      />
    </div>
  );
};
export default OrderHistory;
