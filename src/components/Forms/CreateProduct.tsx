import useInput from "../../Hooks/use-input";
import MuiPhoneNumber from "material-ui-phone-number";
import { OutlinedInput } from "@material-ui/core";
import UploadInputButtons from "../UploadInputButtons";
import userPic from "../../assets/image/userPic.svg";
import Image from "next/image";
import { uiActions } from "../../redux/store/ui-slice";
import { useDispatch } from "react-redux";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import { NumericFormat } from "react-number-format";

const CreateProduct = ({ toggleDrawer }: any) => {
  const dispatch = useDispatch();
  const isNotEmpty = (value: string) => value.trim() !== "";
  const isEmail = (value: any) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  const productQuantity = [
    { id: 1, name: "Female" },
    { id: 2, name: "Male" },
  ];
  const {
    enteredInput: enteredProductName,
    hasError: productNameHasError,
    reset: productNameReset,
    errorMessage: productNameError,
    inputIsValid: productNameIsValid,
    updateInputHandler: productNameInputHandler,
    inputBlurHandler: productNameBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredProductId,
    hasError: productIdHasError,
    reset: productIdReset,
    errorMessage: productIdError,
    inputIsValid: productIdIsValid,
    updateInputHandler: productIdInputHandler,
    inputBlurHandler: productIdBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredProductQuantity,
    hasError: productQuantityHasError,
    reset: productQuantityReset,
    errorMessage: productQuantityError,
    inputIsValid: productQuantityIsValid,
    updateInputHandler: productQuantityInputHandler,
    inputBlurHandler: productQuantityBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredProductWeight,
    hasError: productWeightHasError,
    reset: productWeightReset,
    errorMessage: productWeightError,
    inputIsValid: productWeightIsValid,
    updateInputHandler: productWeightInputHandler,
    inputBlurHandler: productWeightBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredDeliveryTag,
    hasError: deliveryTagHasError,
    reset: deliveryTagReset,
    errorMessage: deliveryTagError,
    inputIsValid: deliveryTagIsValid,
    updateInputHandler: deliveryTagInputHandler,
    inputBlurHandler: deliveryTagBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredPrice,
    hasError: priceHasError,
    reset: priceReset,
    errorMessage: priceError,
    inputIsValid: priceIsValid,
    updateInputHandler: priceInputHandler,
    inputBlurHandler: priceBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredStatus,
    hasError: statusHasError,
    reset: statusReset,
    errorMessage: statusError,
    inputIsValid: statusIsValid,
    updateInputHandler: statusInputHandler,
    inputBlurHandler: statusBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");

  return (
    <form className="w-full h-full flex flex-col">
      <label htmlFor="resume" className=" text-sm font-medium mx-auto">
        <Image src={userPic} />
        <input
          type="file"
          name="resume"
          id="resume"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          className="hidden"
        />{" "}
      </label>

      <div className="mt-[10px]">
        <label
          htmlFor="productName"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          value={enteredProductName}
          id="productName"
          onBlur={productNameBlurHandler}
          onChange={productNameInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Product Name "
        />
      </div>
      <div className="mt-[10px]">
        <label
          htmlFor="lastName"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Product ID
        </label>
        <input
          type="text"
          name="lastName"
          value={enteredProductId}
          id="productId"
          onBlur={productIdBlurHandler}
          onChange={productIdInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Product ID"
        />
      </div>
      <div className=" mt-[10px]">
        <label
          htmlFor="productQuantity"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Product Quantity
        </label>

        <input
          type="text"
          name="lastName"
          value={enteredProductQuantity}
          id="productQuantity"
          onBlur={productQuantityBlurHandler}
          onChange={productQuantityInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Product Quatity"
        />
      </div>
      <div className=" mt-[30px]">
        <label
          htmlFor="productWeight"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Product Weight
        </label>
        <input
          type="text"
          name="productWeight"
          value={enteredProductWeight}
          id="productWeight"
          onBlur={productWeightBlurHandler}
          onChange={productWeightInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Product Weight"
        />
      </div>
      <div className=" mt-[30px]">
        <label
          htmlFor="deliveryTag"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Delivery Tag
        </label>
        <input
          type="text"
          name="deliveryTag"
          value={enteredDeliveryTag}
          id="deliveryTag"
          onBlur={deliveryTagBlurHandler}
          onChange={deliveryTagInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Delivery Tag"
        />
      </div>
      <div className=" mt-[30px]">
        <label
          htmlFor="deliveryTag"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Delivery Tag
        </label>
        <NumericFormat
          name="enteredPrice"
          value={enteredPrice || ""}
          allowNegative={false}
          thousandSeparator={true}
          required
          prefix={"₦"}
          onValueChange={(values: any, sourceInfo: any) => {
            const { formattedValue, value } = values;
            const { event, source } = sourceInfo;
            priceInputHandler(value);
          }}
        />
      </div>
      <div className=" mt-[30px]">
        <label
          htmlFor="listingStatus"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Status
        </label>
        <input
          type="text"
          name="status"
          value={enteredStatus}
          id="status"
          onBlur={statusBlurHandler}
          onChange={statusInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Listing Status"
        />
      </div>
      <button
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto"
        onClick={(e: any) => {
          e.preventDefault();
          toggleDrawer();
          dispatch(
            uiActions.openModalAndSetContent({
              modalStyles: {
                padding: 0,
              },
              modalContent: (
                <SuccessfulModal
                  title="User Added Sucessfully"
                  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo orci nisi pulvinar eu massa proin sed. "
                />
                // <div>i am here now </div>
              ),
            })
          );
        }}
      >
        Create Product
      </button>
    </form>
  );
};
export default CreateProduct;
