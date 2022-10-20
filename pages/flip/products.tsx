import { useState } from "react";
import { useDispatch } from "react-redux";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../src/components/Drawer";
import FilterTable from "../../src/components/filter-table";
import CreateProduct from "../../src/components/Forms/CreateProduct";
import ModalAction from "../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../src/components/multiple-select-table";
import ProductDetails from "../../src/components/ProductDetails";
import { uiActions } from "../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  product,
} from "../../src/utils/analytics";

const Products = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [drawerDetails, setDraweDetails] = useState({
    title: "",
    isAdd: false,
  });
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const columnProduct = [
    {
      Header: "#",
      accessor: "serial",
      Filter: false,
    },
    {
      Header: "product Name",
      accessor: "productName",
    },
    {
      Header: "product ID",
      accessor: "productId",
    },
    {
      Header: "product Quantity",
      accessor: "productQuantity",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Product Weight",
      accessor: "productWeight",
    },
    {
      Header: "Delivery Tag",
      accessor: "deliveryTag",
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
                    setIsOpen(!isOpen);
                    setDraweDetails({
                      ...drawerDetails,
                      title: "Product Details",
                      isAdd: false,
                    });
                  }}
                />

                <ActionMenuItem
                  name="Suspend"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Suspend" item="product" />
                          </>
                        ),
                      })
                    )
                  }
                />

                <ActionMenuItem
                  name="Deactivate"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Deactivate" item="product" />
                          </>
                        ),
                      })
                    )
                  }
                />

                <ActionMenuItem
                  name="Under Review"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Review" item="product" />
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
  const toggleDrawerAdd = () => {
    setIsOpen(!isOpen);
    setDraweDetails({
      ...drawerDetails,
      title: "Create Product",
      isAdd: true,
    });
  };
  return (
    <>
      <DrawerCard
        title={drawerDetails.title}
        open={isOpen}
        toggleDrawer={toggleDrawer}
      >
        {drawerDetails.isAdd ? <CreateProduct /> : <ProductDetails />}
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px] h-screen">
        <MultipleSelectTable
          columns={columnProduct}
          data={product}
          emptyPlaceHolder="No products yet!"
          extraButton={{ text: "Create Product" }}
          onClickFunction={toggleDrawerAdd}
        />
      </div>
    </>
  );
};
export default Products;
