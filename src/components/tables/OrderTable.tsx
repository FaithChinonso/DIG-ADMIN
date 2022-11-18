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
import { editorder, getMyOrders } from "src/redux/store/features/order-slice";
import { useRouter } from "next/router";
import { DataFilterTable } from "../DataTable";

const OrderHistory = ({ data, fetchAllOrders, type }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formatData = data
    ?.slice(0)
    .reverse()
    .map((client: any, index: number) => {
      return {
        id: client.orderID,
        serial: client.serial,
        name: client.product.product.name,
        categoryName: client.product.category.name,
        paymentStatus: client.paymentStatus,
        phone: client.phone,
        quantityPurchased: client.quantityPurchased,
        expectedDeliveryDate: moment(client.expectedDeliveryDate).format("ll"),
        price: client.price,
        status: client.status,
        isActive: client.isActive,
      };
    });
  const columnOrders = [
    {
      name: "Serial",
      selector: "serial",
    },
    {
      name: "Product Name",
      selector: "name",
    },
    {
      name: "Payment Status",
      selector: "paymentStatus",
    },
    {
      name: "Phone Number",
      selector: "phone",
    },
    {
      name: "Quantity",
      selector: "quantityPurchased",
    },
    {
      name: "Delivery Date",
      selector: "expectedDeliveryDate",
    },
    {
      name: "Price",
      selector: "price",
    },

    {
      name: "Status",
      selector: "status",
    },
    {
      name: "Category Name",
      selector: "categoryName",
    },
    {
      name: "Action",
      selector: "action",
      Filter: false,
      cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                {type === "main" && (
                  <ActionMenuItem
                    name="View More"
                    onClickFunction={() => {
                      router.push(`${location.pathname}/${prop?.id}`);
                    }}
                  />
                )}
                {(prop?.status === "Pending" ||
                  prop?.status === "Rejected") && (
                  <ActionMenuItem
                    name="Accept Order"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="accept"
                                item="order"
                                actionFunction={() =>
                                  dispatch(
                                    editorder({
                                      endpoint: "accept-order",
                                      orderID: prop?.id,
                                    })
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                )}

                {(prop?.status === "Pending" ||
                  prop?.status === "Accepted") && (
                  <ActionMenuItem
                    name="Reject Order"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="reject"
                                item="order"
                                actionFunction={() =>
                                  dispatch(
                                    editorder({
                                      endpoint: "reject-order",
                                      orderID: prop?.id,
                                    })
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                )}
                <ActionMenuItem
                  name="Delete Order"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              action="delete"
                              item="order"
                              actionFunction={() =>
                                dispatch(deleteorder(prop?.id))
                              }
                            />
                          </>
                        ),
                      })
                    )
                  }
                />
              </>
            }
          />
        );
      },
    },
  ];

  return (
    <div>
      <DataFilterTable columns={columnOrders} data={formatData} />
    </div>
  );
};
export default OrderHistory;
