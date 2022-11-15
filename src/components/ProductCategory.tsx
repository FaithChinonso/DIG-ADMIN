import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { addProductCategory } from "src/redux/store/data-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import DrawerCard from "./Drawer";
import AddProductCategory from "./Forms/AddProductCategory";
import ModalAction from "./ModalContent/ModalAction";
import MultipleSelectTable from "./multiple-select-table";

const ProductCategory = ({ accessToken }: any) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const { productCategory } = useSelector((state: any) => state.data);

  const request = useHTTPGet();

  const fetchCategory = () => {
    const url = "api/admin/productcategory/all-product-categories";
    const dataFunction = (res: any) => {
      dispatch(addProductCategory(res.data.data));
    };
    request({ url, accessToken }, dataFunction);
  };

  type Data = {
    userID: number;
    serial: number;
    name: string;
  };
  const formatData = productCategory
    ?.slice(0)
    .reverse()
    .map((client: Data, index: number) => {
      return {
        id: client.userID,
        serial: index + 1,

        name: client.name,
      };
    });
  const columnProductCategory = [
    {
      Header: "#",
      accessor: "serial",
      Filter: false,
    },
    {
      Header: "Category Name",
      accessor: "name",
    },
    {
      Header: "Category ID",
      accessor: "id",
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
                  }}
                />

                <ActionMenuItem
                  name="Update Category"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Update" item="category" />
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
                  name="Delete Category"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="delete" item="product" />
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
      {" "}
      <DrawerCard
        title="Add Category"
        open={isOpen}
        toggleDrawer={toggleDrawer}
      >
        <AddProductCategory />
      </DrawerCard>
      <MultipleSelectTable
        columns={columnProductCategory}
        data={[]}
        emptyPlaceHolder="No products yet!"
        extraButton={{ text: "Create Product category" }}
        onClickFunction={toggleDrawer}
      />
    </div>
  );
};

export default ProductCategory;
