import DataTable, { createTheme } from "react-data-table-component";
import { FilterTableType } from "../@types/table";

export const FilterTable = ({ title, column, data, onClicked }: any) => {
  return (
    <div className="bg-gray-100">
      <DataTable
        columns={column}
        data={data}
        pagination
        striped
        theme="solarized"
        selectableRows
        onRowClicked={onClicked}
      />
    </div>
  );
};
export default FilterTable;
