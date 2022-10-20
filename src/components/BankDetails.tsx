import FilterTable from "../components/multiple-select-table";

import MultipleSelectTable from "../components/multiple-select-table";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  bank,
} from "../utils/analytics";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";

const BankDetails = () => {
  const columnBank = [
    {
      Header: "S/N",
      accessor: "id",
      Filter: false,
    },

    {
      Header: "Account Number",
      accessor: "accountNumber",
    },
    {
      Header: "Account Name",
      accessor: "accoutName",
    },
    {
      Header: "Destination Bank",
      accessor: "destinationBank",
    },
    {
      Header: "Account Type",
      accessor: "accountType",
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
  return (
    <div>
      {" "}
      <MultipleSelectTable
        columns={columnBank}
        data={bank}
        emptyPlaceHolder="No Bank Details yet!"
        list
      />
    </div>
  );
};
export default BankDetails;
