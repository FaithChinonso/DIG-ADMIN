import FilterTable from "../multiple-select-table";

import MultipleSelectTable from "../multiple-select-table";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  bank,
} from "../../utils/analytics";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";

const BankDetails = ({ data: [] }: any) => {
  const formatData = data
    ?.slice(0)
    .reverse()
    .map((client: any) => {
      return {
        abbreviation: client.abbreviation,
        accountNumber: client.accountNumber,
        accoutName: client.accoutName,
        bankName: client.bankName,
        bankCode: client.bankCode,
      };
    });
  const columnBank = [
    {
      Header: "S/N",
      accessor: "abbreviation",
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
      Header: "Bank Name",
      accessor: "bankName",
    },
    {
      Header: "Bank Code",
      accessor: "bankCode",
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
        data={formatData || []}
        emptyPlaceHolder="No Bank Details yet!"
        list
      />
    </div>
  );
};
export default BankDetails;
