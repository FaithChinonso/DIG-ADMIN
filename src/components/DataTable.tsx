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
    <div className="min-h-[600px]">
      <DataTable
        columns={props.columns}
        data={props.data}
        sortIcon={<SortIcon />}
        pagination
        striped
        responsive
        noDataComponent={
          <div className="text-text text-xs font-bold">No Data</div>
        }
        theme="solarized"
      />
    </div>
  );
};
export default DataFilterTable;
