import useInput from "../../Hooks/use-input";

import userPic from "../../assets/image/userPic.svg";
import Image from "next/image";
import { uiActions } from "../../redux/store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import useHTTPPost from "src/Hooks/use-httppost";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { addProductCategory } from "src/redux/store/data-slice";
import useHTTPGet from "src/Hooks/use-httpget";
import { delivery } from "src/utils/analytics";
import { isNotEmpty, isNotEmptyNumber } from "src/utils/helperFunctions";
import DrawerWrapper from "../DrawerWrapper";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { createwithdrawal } from "src/redux/store/features/withdrawal-slice";
import SuccessfulModal from "../ModalContent/SuccessfulModal";

const CreateWithrawalRequest = ({ merchantId, fetchAllProducts }: any) => {
  const dispatch = useAppDispatch();
  const { success, loading, error, message } = useAppSelector(
    (state: any) => state.withdrawal
  );
  const [price, setPrice] = useState(null);
  const send = useHTTPPost();

  const submitFormHandler = (e: any) => {
    e.preventDefault();

    const payload = {
      amount: price,
    };
    console.log(payload);
    dispatch(createwithdrawal(payload));
    if (success === true) {
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openModalAndSetContent({
          modalStyles: {
            padding: 0,
          },
          modalContent: (
            <>
              <SuccessfulModal title="Successful" message={message} />
            </>
          ),
        })
      );
    }
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (success === false) {
      dispatch(uiActions.openToastAndSetContent({ toastContent: error }));
    }
  };
  return (
    <DrawerWrapper title="Create Withdrawal Request">
      <form
        className="w-full h-full flex flex-col"
        onSubmit={submitFormHandler}
      >
        <div className=" mt-[30px]">
          <label
            htmlFor="price"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Price
          </label>
          <NumericFormat
            name="enteredPrice"
            value={price || ""}
            allowNegative={false}
            thousandSeparator={true}
            required
            prefix={"₦"}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            onValueChange={(values: any, sourceInfo: any) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              console.log(event.target.value);
              setPrice(value);
            }}
          />
        </div>

        <button
          type="submit"
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-4"
        >
          Create Request
        </button>
      </form>
    </DrawerWrapper>
  );
};
export default CreateWithrawalRequest;
