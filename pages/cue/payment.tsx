import { useState } from "react";
import { useDispatch } from "react-redux";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../src/components/Drawer";
import FilterTable from "../../src/components/filter-table";
import ModalAction from "../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../src/components/multiple-select-table";
import StatusCell from "../../src/components/StatusCell";
import { uiActions } from "../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../src/utils/analytics";

const Payments = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
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
                <ActionMenuItem name="View Details" />

                <ActionMenuItem
                  name="Disburse"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Disburse" item="payment" />
                          </>
                        ),
                      })
                    )
                  }
                />
                <ActionMenuItem
                  name="Decline"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Decline" item="payment" />
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
      <DrawerCard
        title="Add Payments"
        open={isOpen}
        toggleDrawer={toggleDrawer}
      >
        <div>red</div>
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnDasboard}
          data={tableData}
          emptyPlaceHolder="No paymentss yet!"
          extraButton={{ text: "Add Payments" }}
          onClickFunction={toggleDrawer}
        />
      </div>
    </>
  );
};
export default Payments;
