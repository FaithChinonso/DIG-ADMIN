import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../../src/components/Drawer";
import FilterTable from "../../../src/components/filter-table";
import AddUser from "../../../src/components/Forms/AddUser";
import ModalAction from "../../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../../src/components/multiple-select-table";
import StatusCell from "../../../src/components/StatusCell";
import { uiActions } from "../../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../../src/utils/analytics";

const Users = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const columnUsers = [
    {
      Header: "User ID",
      accessor: "id",
      Filter: false,
    },
    {
      Header: "User Name",
      accessor: "UserName",
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
      accessor: "dateCreated",
    },
    {
      Header: "Admin Permission",
      accessor: "permission",
    },
    {
      Header: "Phone Number",
      accessor: "number",
    },

    {
      Header: "Client Type",
      accessor: "clientType",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (prop: any) => (
        <StatusCell status={prop?.value} type="businessService" />
      ),
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
                  name="Suspend"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              onClickFunction={() =>
                                dispatch(
                                  uiActions.openModalAndSetContent({
                                    modalStyles: {
                                      padding: 0,
                                    },
                                    modalContent: (
                                      <>
                                        <ModalAction
                                          action="Suspend"
                                          item="user"
                                        />
                                      </>
                                    ),
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
                  name="Deactivate"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Deactivate" item="user" />
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
                            <ModalAction action="Review" item="user" />
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
    <>
      <DrawerCard title="Add User" open={isOpen} toggleDrawer={toggleDrawer}>
        <AddUser toggleDrawer={toggleDrawer} />
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnUsers}
          data={tableData}
          emptyPlaceHolder="No Users created yet!"
          extraButton={{ text: "Add User" }}
          list
          onClickFunction={toggleDrawer}
        />
      </div>
    </>
  );
};
export default Users;
