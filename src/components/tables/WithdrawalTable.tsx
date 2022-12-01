import moment from "moment";
import { useAppDispatch } from "src/Hooks/use-redux";
import {
  deletewithdrawal,
  editwithdrawal,
} from "src/redux/store/features/withdrawal-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import { DataFilterTable } from "../DataTable";
import ModalAction from "../ModalContent/ModalAction";
import MultipleSelectTable from "../multiple-select-table";

const WithdrawalTable = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const formatData = data?.slice(0).map((client: any, index: number) => {
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
  const columnDasboard = [
    {
      name: "#",
      selector: "serial",
      Filter: false,
    },
    {
      name: "Business Name",
      selector: "businessName",
    },
    {
      name: "Contact Person",
      selector: "contactPerson",
    },
    {
      name: "Email",
      selector: "email",
    },
    {
      name: "Phone Number",
      selector: "number",
    },

    {
      name: "Client Type",
      selector: "clientType",
    },
    {
      name: "Status",
      selector: "status",
    },
    {
      name: "Action",
      selector: "action",
      Filter: false,
      cell: (prop: any) => {
        console.log(prop);
        return (
          <ActionMenuBase
            items={
              <>
                {prop?.status !== "Rejected" && (
                  <>
                    <ActionMenuItem
                      name="Accept"
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
                                  item="withdrawal"
                                  actionFunction={() =>
                                    dispatch(
                                      editwithdrawal({
                                        endpoint: "accept-withdrawal",
                                        withdrawalID: prop?.id,
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
                      name="Disburse Fund"
                      onClickFunction={() =>
                        dispatch(
                          uiActions.openModalAndSetContent({
                            modalStyles: {
                              padding: 0,
                            },
                            modalContent: (
                              <>
                                <ModalAction
                                  action="disburse"
                                  item="fund"
                                  actionFunction={() =>
                                    dispatch(
                                      editwithdrawal({
                                        endpoint: "disburse-funds",
                                        withdrawalID: prop?.id,
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
                  </>
                )}

                <ActionMenuItem
                  name="Reject"
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
                              item="withdrawal"
                              actionFunction={() =>
                                dispatch(
                                  editwithdrawal({
                                    endpoint: "reject-withdrawal",
                                    withdrawalID: prop?.id,
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
                              item="user"
                              actionFunction={() =>
                                dispatch(deletewithdrawal(prop?.id))
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
      <DataFilterTable columns={columnDasboard} data={formatData} />
    </div>
  );
};
export default WithdrawalTable;
