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
import { addUsers } from "src/redux/store/data-slice";
import CreateProduct from "src/components/Forms/CreateProduct";

const Merchants = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.data.token);
  console.log(token);

  const request = useHTTPGet();

  const [allMerchants, setAllMerchants] = useState<any>();
  const [merchantId, setMerchantId] = useState<any>("");

  const { users } = useSelector((state: any) => state.data);
  const fetchAllMerchants = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/user/all-users?role=merchant`;
    const dataFunction = (res: any) => {
      console.log(res);
      dispatch(addUsers(res?.data.data));
    };
    request({ url, accessToken }, dataFunction);
  };
  const deleteUser = async (id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    dispatch(uiActions.closeModal(true));
    try {
      const res: any = await axios.delete(
        `https://backendapi.flip.onl/api/admin/user/delete-user/${id}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            authsource: "user",
          },
        }
      );
      console.log(res.data.message);

      dispatch(
        uiActions.openModalAndSetContent({
          modalStyles: {
            padding: 0,
          },
          modalContent: (
            <>
              <SuccessfulModal title="Successfull" message={res.data.message} />
            </>
          ),
        })
      );

      fetchAllMerchants();
    } catch (error: any) {}
  };
  const editUser = async (id: any, endpoint: any) => {
    const accessToken = sessionStorage.getItem("accessToken");

    try {
      const res: any = await axios.get(
        `https://backendapi.flip.onl/api/admin/user/${endpoint}/${id}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            authsource: "user",
          },
        }
      );
      dispatch(
        uiActions.openModalAndSetContent({
          modalStyles: {
            padding: 0,
          },
          modalContent: (
            <>
              <SuccessfulModal title="Successfull" message={res.data.message} />
            </>
          ),
        })
      );

      fetchAllMerchants();
    } catch (error: any) {}
  };
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
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
  const formatData = users
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
  const columnMerchants = [
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
                                item="user"
                                actionFunction={() =>
                                  editUser(
                                    prop?.row.original?.id,
                                    "deactivate-user"
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
                                item="user"
                                actionFunction={() =>
                                  editUser(
                                    prop?.row.original?.id,
                                    "activate-user"
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
                                deleteUser(prop?.row.original?.id)
                              }
                            />
                          </>
                        ),
                      })
                    )
                  }
                />
                <ActionMenuItem
                  name="Add Product"
                  onClickFunction={() => {
                    toggleDrawer();
                    setMerchantId(prop?.row.original?.id);
                  }}
                />
              </>
            }
          />
        );
      },
    },
  ];
  useEffect(() => {
    fetchAllMerchants();
  }, []);
  return (
    <ParentContainer>
      <DrawerCard title="Add User" open={isOpen} toggleDrawer={toggleDrawer}>
        <CreateProduct merchantId={merchantId} />
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnMerchants}
          data={formatData}
          emptyPlaceHolder="No Merchant created yet!"
          list
          onClickFunction={toggleDrawer}
        />
      </div>
    </ParentContainer>
  );
};
export default Merchants;
