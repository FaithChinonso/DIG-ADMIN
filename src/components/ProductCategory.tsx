import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHTTPDelete from "src/Hooks/use-httpdelete";
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

const ProductCategory = () => {
  const dispatch = useDispatch();
  const remove = useHTTPDelete();
  const accessToken = sessionStorage.getItem("accessToken");
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("edit");
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const { productCategory } = useSelector((state: any) => state.data);

  const request = useHTTPGet();
  const send = useHTTPPost();

  const fetchAllCategory = () => {
    const url =
      "https://backendapi.flip.onl/api/admin/productcategory/all-product-categories";
    const dataFunction = (res: any) => {
      dispatch(addProductCategory(res.data.data));
    };
    request({ url, accessToken }, dataFunction);
  };
  const deleteCategory = async (id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/productcategory/delete-category/${id}`;
    const dataFunction = (res: any) => {};
    remove({ url, accessToken }, dataFunction);
  };
  const editCategory = async (id: any, endpoint: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/productcategory/${endpoint}/${id}`;
    const dataFunction = (res: any) => {};
    send({ url, accessToken }, dataFunction);
  };

  type Data = {
    categoryID: number;
    serial: number;
    name: string;
    isActive: boolean;
  };
  const formatData = productCategory
    ?.slice(0)
    .reverse()
    .map((client: Data, index: number) => {
      return {
        id: client?.categoryID,
        serial: index + 1,
        isActive: client?.isActive,
        name: client?.name,
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
      Header: "Status",
      accessor: "isActive",
      Cell: (prop: any) => {
        <div> {prop.value ? "Active" : "Inactive"}</div>;
      },
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
                  name="Update Category"
                  onClickFunction={() => {
                    toggleDrawer();
                    setType("edit");
                  }}
                />

                {prop?.row.original?.isActive === true ? (
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
                              <ModalAction
                                action="deactivate"
                                item="category"
                                actionFunction={() =>
                                  editCategory(
                                    prop?.row.original?.id,
                                    "deactivate-category"
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                ) : (
                  <ActionMenuItem
                    name="Activate"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="activate"
                                item="product"
                                actionFunction={() =>
                                  editCategory(
                                    prop?.row.original?.id,
                                    "activate-category"
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
                  name="Delete Category"
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
                              item="category"
                              actionFunction={() =>
                                deleteCategory(prop?.row.original?.id)
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
  // useEffect(() => {
  //   fetchAllCategory();
  // }, [fetchAllCategory]);
  return (
    <div>
      <DrawerCard
        title={type === "edit" ? "Update Category" : "Create Category"}
        open={isOpen}
        toggleDrawer={toggleDrawer}
      >
        <AddProductCategory type="edit" />
      </DrawerCard>
      <MultipleSelectTable
        columns={columnProductCategory}
        data={formatData}
        emptyPlaceHolder="No category yet!"
        extraButton={{ text: "Create Product category" }}
        onClickFunction={toggleDrawer}
      />
    </div>
  );
};

export default ProductCategory;
