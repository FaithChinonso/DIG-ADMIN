import React, { useState, Fragment } from "react";
import Image from "next/image";
import DataTable, { createTheme } from "react-data-table-component";
import emptyState from "../assets/image/illustrations.svg";
import SortIcon from "@mui/icons-material/ArrowDownward";

createTheme("solarized", {
  striped: {
    default: "#4356e31a",
  },
});
const customStyles = {
  rows: {
    style: {
      // zIndex: 0,
    },
  },

  pagination: {
    style: {
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};

const paginationComponentOptions = {
  noRowsPerPage: false,
  rowsPerPageText: "",
};

export const DataFilterTable = (props: any) => {
  const [filterText, setFilterText] = useState("");
  const customFilter = (rows: any[], text: string) => {
    return rows?.filter(row =>
      Object.keys(row).some(key =>
        row[key]?.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  return (
    <div className="min-h-[600px] flex flex-col space-y-2 bg-white relative">
      <input
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        placeholder="Search here"
        className="absolute right-1 -top-12 bg-lightGray rounded-md border border-darkGray w-[200px] self-end my-2 p-2 mr-1 outline-none placeholder:text-sm placeholder:text-text text-text text-sm"
      />
      <DataTable
        columns={props.columns}
        data={customFilter(props.data, filterText)}
        sortIcon={<SortIcon />}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        striped
        responsive
        noDataComponent={
          <div className="flex flex-col items-center justify-center mx-auto mt-10">
            <Image src={emptyState} alt="" />
            <div className="text-[#8487A3] text-xs -mt-2">
              Nothing to show here{" "}
            </div>
          </div>
        }
        theme="solarized"
        customStyles={customStyles}
      />
    </div>
  );
};
export default DataFilterTable;
