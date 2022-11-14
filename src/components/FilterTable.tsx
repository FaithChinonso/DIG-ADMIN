import DataTable, { createTheme } from "react-data-table-component";
import { FilterTableType } from "../@types/table";

export const FilterTable = ({ title, column, data }: FilterTableType) => {
  return (
    <div className="bg-gray-100">
      <DataTable
        title={title}
        columns={column}
        data={data}
        pagination
        striped
        theme="solarized"
      />
    </div>
  );
};
export default FilterTable;
