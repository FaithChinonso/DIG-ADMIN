import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Cell } from "recharts";
import ParentContainer from "src/components/ParentContainer";
import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../../src/components/Drawer";
import FilterTable from "../../../src/components/filter-table";
import ModalAction from "../../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../../src/components/multiple-select-table";

import { uiActions } from "../../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  order,
} from "../../../src/utils/analytics";
import axios from "axios";

const Orders = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const uploadHandler = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const createCategory = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(image);
    const res = axios.post(
      "https://backendapi.flip.onl/api/admin/productcategory/create-product-category",
      {
        name: "name",
        image: image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(image);
  };
  const columnOrders = [
    {
      Header: "#",
      accessor: "serial",
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
      Header: "Client Type",
      accessor: "clientType",
    },
    {
      Header: "Merchant",
      accessor: "merchant",
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
                <ActionMenuItem
                  name="View More"
                  onClickFunction={() => {
                    router.push(
                      `${location.pathname}/${prop?.row.original?.id}`
                    );
                  }}
                />

                <ActionMenuItem
                  name="Cancel Order"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Cancel" item="order" />
                          </>
                        ),
                      })
                    )
                  }
                />
                <ActionMenuItem name="Modify Order" />
              </>
            }
          />
        );
      },
    },
  ];
  return (
    <ParentContainer>
      <div>
        {" "}
        <input
          type="file"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          onChange={uploadHandler}
          id="image"
          name="image"
        />
        <button onClick={() => createCategory()}>send</button>
      </div>
      <DrawerCard title="Add Orders" open={isOpen} toggleDrawer={toggleDrawer}>
        <div>red</div>
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnOrders}
          data={order}
          emptyPlaceHolder="No orders yet!"
          list
          extraButton={{ text: "Add Orders" }}
          onClickFunction={toggleDrawer}
        />
      </div>
    </ParentContainer>
  );
};
export default Orders;
