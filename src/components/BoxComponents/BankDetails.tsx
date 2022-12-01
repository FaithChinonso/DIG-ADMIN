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

const BankDetails = ({ data }: any) => {
  console.log(data);
  return (
    <div className="w-full flex flex-col items-center">
      {data ? (
        <div className="flex flex-col items-center">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-[#8487A3]">Account Name</div>
              <div className="text-base text-[#090F47]">{data?.accoutName}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs text-[#8487A3]">Account Number</div>
              <div className="text-base text-[#090F47]">
                {data?.accoutNumber}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs text-[#8487A3]">Bank Name</div>
              <div className="text-base text-[#090F47]">{data?.bankName}</div>
            </div>
          </div>
          <div className="flex justify-between mt-5 w-full">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-text">Delivery Tag</div>
              <div className="text-base text-text">{data?.bankCode}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs text-text">Abbreviation</div>
              <div className="text-base text-text">₦ {data?.abbreviation}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-text text-xs font-bold">
          No Bank Details Available
        </div>
      )}
    </div>
  );
};
export default BankDetails;
