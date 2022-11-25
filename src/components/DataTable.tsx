import React, { useState, Fragment } from "react";

import DataTable, { createTheme } from "react-data-table-component";
import { Card } from "@mui/material";
import SortIcon from "@mui/icons-material/ArrowDownward";

createTheme("solarized", {
  striped: {
    default: "#4356e31a",
  },
});
export const DataFilterTable = (props: any) => {
  return (
    <div className="min-h-[600px] mt-3">
      <DataTable
        columns={props.columns}
        data={props.data}
        sortIcon={<SortIcon />}
        pagination
        striped
        theme="solarized"
      />
    </div>
  );
};
export default DataFilterTable;
