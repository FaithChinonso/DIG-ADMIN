import moment from "moment";
import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { addProductCategory } from "src/redux/store/data-slice";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../src/components/Drawer";
import FilterTable from "../../src/components/filter-table";
import MultipleSelectTable from "../../src/components/multiple-select-table";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../src/utils/analytics";

const Proposals = () => {
  const request = useHTTPGet();
  const dispatch = useAppDispatch();
  const { proposals } = useAppSelector((state: any) => state.data);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const formatData = proposals
    ?.slice(0)
    .reverse()
    .map((client: any, index: number) => {
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
      Header: "#",
      accessor: "serial",
      Filter: false,
    },
    {
      Header: "Business Name",
      accessor: "businessName",
    },
    {
      Header: "Contact Person",
      accessor: "contactPerson",
    },
    {
      Header: "Email",
      accessor: "email",
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
                <ActionMenuItem name="View Details" />

                <ActionMenuItem name="Edit Details" />
              </>
            }
          />
        );
      },
    },
  ];
  useEffect(() => {
    const fetchAllProposals = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url =
        "https://backendapi.flip.onl/api/admin/proposals/all-proposalss";
      const dataFunction = (res: any) => {
        dispatch(addProductCategory(res.data.data));
      };
      request({ url, accessToken }, dataFunction);
    };
    fetchAllProposals();
  }, []);
  return (
    <ParentContainer>
      <DrawerCard
        title="Add Proposals"
        open={isOpen}
        toggleDrawer={toggleDrawer}
      >
        <div>red</div>
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnDasboard}
          data={formatData}
          emptyPlaceHolder="No Proposals yet!"
        />
      </div>
    </ParentContainer>
  );
};
export default Proposals;
