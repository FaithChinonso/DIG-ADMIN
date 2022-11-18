import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { deleteuser, edituser } from "src/redux/store/features/user-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import AddJob from "../Forms/AddJob";
import AddService from "../Forms/AddService";
import AddUser from "../Forms/AddUser";
import CreateProduct from "../Forms/CreateProduct";
import CreateWithrawalRequest from "../Forms/CreateWithdrawalRequest";
import ModalAction from "../ModalContent/ModalAction";
import MultipleSelectTable from "../multiple-select-table";

const MerchantTable = ({ data }: any) => {
  const [userId, setUserId] = useState();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toggleDrawer = () => {
    dispatch(
      uiActions.openDrawerAndSetContent({
        drawerStyles: {
          padding: 0,
        },
        drawerContent: (
          <>
            <AddUser applicationName="flip" />
          </>
        ),
      })
    );
  };

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
  const formatData = data
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
      name: "Full Name",
      selector: "fullName",
    },
    {
      name: "Gender",
      selector: "gender",
    },
    {
      name: "Email Address",
      selector: "email",
    },
    {
      name: "Date Created",
      selector: "dateAdded",
    },
    {
      name: "Role",
      selector: "role",
    },
    {
      name: "Phone Number",
      selector: "phone",
    },

    {
      name: "Application Name",
      selector: "applicationName",
    },
    {
      name: "Status",
      selector: "emailVerifiedStatus",
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
                  name="View More"
                  onClickFunction={() => {
                    router.push(`${location.pathname}/${prop?.id}`);
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
                                action="Deactivate"
                                item="merchant"
                                actionFunction={() =>
                                  dispatch(
                                    edituser({
                                      endpoint: "deactivate-user",
                                      userID: prop?.id,
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
                                      userID: prop?.id,
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
                    setUserId(prop?.id);
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <AddJob userId={prop?.id} />
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
                                    userID: prop?.id,
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
                            <CreateWithrawalRequest merchantId={prop?.id} />
                          </>
                        ),
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
                            <CreateProduct merchantId={prop?.id} />
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
                            <AddService merchantId={prop?.id} />;
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
  return <DataFilterTable columns={columnUsers} data={formatData} />;
};

export default MerchantTable;
