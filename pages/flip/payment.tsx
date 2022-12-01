import { useState } from "react";
import { useDispatch } from "react-redux";
import ParentContainer from "src/components/ParentContainer";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../src/components/Drawer";
import FilterTable from "../../src/components/filter-table";
import ModalAction from "../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../src/components/multiple-select-table";

import { uiActions } from "../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  request,
} from "../../src/utils/analytics";

const Payments = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const columnDasboard = [
    {
      Header: "Withdrawal ID",
      accessor: "withdrawalId",
    },
    {
      Header: "Merchant",
      accessor: "merchant",
    },
    {
      Header: "Amount Requested",
      accessor: "amountRequested",
    },
    {
      Header: "Purpose",
      accessor: "purpose",
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
    <ParentContainer>
      <DrawerCard
        title="Add Payments"
        open={isOpen}
        toggleDrawer={toggleDrawer}
      >
        <div>red</div>
      </DrawerCard>
      <div>
        <MultipleSelectTable
          columns={columnDasboard}
          data={request}
          emptyPlaceHolder="No paymentss yet!"
          extraButton={{ text: "Add Payments" }}
          onClickFunction={toggleDrawer}
        />
      </div>
    </ParentContainer>
  );
};
export default Payments;
