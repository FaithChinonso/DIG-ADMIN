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
import {
  addMerchants,
  addProductCategory,
  addUsers,
} from "src/redux/store/data-slice";
import CreateProduct from "src/components/Forms/CreateProduct";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import AddService from "src/components/Forms/AddService";
import { useAppSelector } from "src/Hooks/use-redux";
import CreateWithrawalRequest from "src/components/Forms/CreateWithdrawalRequest";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";
import { getMymerchant } from "src/redux/store/features/user-slice";
import MerchantTable from "src/components/tables/MerchantTable";

const Merchants = () => {
  const dispatch = useDispatch();

  const { merchants } = useAppSelector((state: any) => state.user);
  const { token } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMyproductCategories(accessToken));
    dispatch(getMymerchant(accessToken));
  }, [dispatch]);

  type Data = {
    userID: number;
    serial: number;
    firstname: string;
    lastname: string;
    fullName: string;
    phoneNumber: string;
    applicationName: string;
    gender: string;
    category: string;
    phone: string;
    email: string;
    role: string;
    status: string;
    emailVerifiedStatus: string;
    dateAdded: string;
    profile: {
      merchantCategory: string;
    };
    isActive: boolean;
  };
  const formatData = merchants
    ?.slice(0)
    .reverse()
    .map((client: Data, index: number) => {
      return {
        id: client.userID,
        serial: index + 1,
        gender: client.gender,
        fullName: client.fullName,
        email: client.email,
        phone: client.phone,
        applicationName: client.applicationName,
        emailVerifiedStatus: client.emailVerifiedStatus,
        role: client.role,
        isActive: client.isActive,
        dateAdded: moment(client.dateAdded).format("ll"),
      };
    });
  const columnUsers = [
    {
      Header: "Full Name",
      accessor: "fullName",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Email Address",
      accessor: "email",
    },
    {
      Header: "Date Created",
      accessor: "dateAdded",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },

    {
      Header: "Application Name",
      accessor: "applicationName",
    },
    {
      Header: "Status",
      accessor: "emailVerifiedStatus",
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
                                action="Deactivate"
                                item="merchant"
                                actionFunction={() =>
                                  dispatch(
                                    edituser({
                                      endpoint: "deactivate-user",
                                      userID: prop?.row.original?.id,
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
                                action="Activate"
                                item="merchant"
                                actionFunction={() =>
                                  dispatch(
                                    edituser({
                                      endpoint: "activate-user",
                                      userID: prop?.row.original?.id,
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
                  name="Create Job posting"
                  onClickFunction={() => {
                    setUserId(prop?.row.original?.id);
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <AddJob userId={prop?.row.original?.id} />
                          </>
                        ),
                      })
                    );
                  }}
                />

                <ActionMenuItem
                  name="Delete"
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
                              item="merchant"
                              actionFunction={() =>
                                dispatch(
                                  deleteuser({
                                    userID: prop?.row.original?.id,
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
                <ActionMenuItem
                  name="Create Withdrawal Request"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <CreateWithrawalRequest
                              merchantId={prop?.row.original?.id}
                            />
                          </>
                        ),
                      })
                    );
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: <></>,
                      })
                    );
                  }}
                />
                <ActionMenuItem
                  name="Add Product"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <CreateProduct
                              merchantId={prop?.row.original?.id}
                            />
                          </>
                        ),
                      })
                    );
                  }}
                />

                <ActionMenuItem
                  name="Add Service"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <AddService merchantId={prop?.row.original?.id} />;
                          </>
                        ),
                      })
                    );
                  }}
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
  //   fetchAllMerchants();
  // }, []);
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnUsers}
          data={formatData}
          emptyPlaceHolder="No Merchant created yet!"
        />
      </div>
    </ParentContainer>
  );
};
export default Merchants;
