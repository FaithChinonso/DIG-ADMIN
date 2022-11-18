import moment from "moment";
import React from "react";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import MultipleSelectTable from "../multiple-select-table";

const ProposalTable = ({ data }: any) => {
  const formatData = data
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
      name: "#",
      selector: "serial",
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
      <DataFilterTable columns={columnDasboard} data={formatData} />
    </div>
  );
};

export default ProposalTable;
