import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { addServiceCategory } from "src/redux/store/data-slice";
import {
  clearError,
  clearMessage,
  deleteserviceCategory,
  editserviceCategory,
  getMyserviceCategories,
} from "src/redux/store/features/service-category-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import DataFilterTable from "./DataTable";
import DrawerCard from "./Drawer";
import AddServiceCategory from "./Forms/AddServiceCategory";
// import AddServiceCategory from "./Forms/AddServiceCategory";
import ModalAction from "./ModalContent/ModalAction";
import SuccessfulModal from "./ModalContent/SuccessfulModal";
import MultipleSelectTable from "./multiple-select-table";

const ServiceCategory = () => {
  const dispatch = useDispatch();
  const { serviceCategories, loading, error, message, success } = useSelector(
    (state: any) => state.serviceCategory
  );
  const { token } = useSelector((state: any) => state.auth);

  const toggleDrawer = () => {
    dispatch(
      uiActions.openDrawerAndSetContent({
        drawerStyles: {
          padding: 0,
        },
        drawerContent: (
          <>
            <AddServiceCategory />
          </>
        ),
      })
    );
  };
  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
        })
      );
      setTimeout(() => {
        dispatch(clearError());
      }, 10000);
    }
    if (success) {
      dispatch(
        uiActions.openModalAndSetContent({
          modalContent: (
            <>
              <SuccessfulModal title="Successful" message={message} />
            </>
          ),
        })
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  useEffect(() => {
    dispatch(getMyserviceCategories(token));
  }, [dispatch]);

  type Data = {
    categoryID: number;
    serial: number;
    name: string;
    isActive: boolean;
  };
  const formatData = serviceCategories
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
  const columnServiceCategory = [
    {
      name: "#",
      selector: "serial",
      Filter: false,
    },
    {
      name: "Category Name",
      selector: "name",
    },
    {
      name: "Status",
      selector: "isActive",
      cell: (prop: any) => {
        <div> {prop.isActive ? "Active" : "Inactive"}</div>;
      },
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
                <ActionMenuItem
                  name="Update Category"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <AddServiceCategory type="edit" id={prop?.id} />
                          </>
                        ),
                      })
                    );
                  }}
                />

                {prop?.isActive === true ? (
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
                                  dispatch(
                                    editserviceCategory({
                                      endpoint: "deactivate-category",
                                      serviceCategoryID: prop?.id,
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
                                item="category"
                                actionFunction={() =>
                                  dispatch(
                                    editserviceCategory({
                                      endpoint: "activate-category",
                                      serviceCategoryID: prop?.id,
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
                                dispatch(deleteserviceCategory(prop?.id))
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
      <div>
        {" "}
        <button
          onClick={toggleDrawer}
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center"
        >
          <span style={{ marginRight: "3px", translate: "0 3px" }}>
            {/* <Image src={Add} alt="" /> */}
          </span>
          Create Category
        </button>
      </div>
      <DataFilterTable columns={columnServiceCategory} data={formatData} />
    </div>
  );
};

export default ServiceCategory;
