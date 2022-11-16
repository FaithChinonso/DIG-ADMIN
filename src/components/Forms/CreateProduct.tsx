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

const CreateProduct = ({ merchantId, fetchAllProducts }: any) => {
  const [price, setPrice] = useState(null);
  const [devFee, setDevFee] = useState(null);
  const { productCategory } = useSelector((state: any) => state.data);
  const [formisValid, setFormIsValid] = useState(false);
  const [formisTouched, setFormIsTouched] = useState(false);

  const send = useHTTPPost();
  const request = useHTTPGet();

  const dispatch = useDispatch();

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
    enteredInput: enteredbrand,
    hasError: brandHasError,
    reset: brandReset,
    errorMessage: brandError,
    inputIsValid: brandIsValid,
    updateInputHandler: brandInputHandler,
    inputBlurHandler: brandBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredProductQuantity,
    hasError: productQuantityHasError,
    reset: productQuantityReset,
    errorMessage: productQuantityError,
    inputIsValid: productQuantityIsValid,
    updateInputHandler: productQuantityInputHandler,
    inputBlurHandler: productQuantityBlurHandler,
  } = useInput(isNotEmptyNumber, "This field cannot be empty");
  const {
    enteredInput: enteredCategory,
    hasError: categoryHasError,
    reset: categoryReset,
    errorMessage: categoryError,
    inputIsValid: categoryIsValid,
    updateInputHandler: categoryInputHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredProductWarranty,
    hasError: productWarrantyHasError,
    reset: productWarrantyReset,
    errorMessage: productWarrantyError,
    inputIsValid: productWarrantyIsValid,
    updateInputHandler: productWarrantyInputHandler,
    inputBlurHandler: productWarrantyBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredProductWeight,
    hasError: productWeightHasError,
    reset: productWeightReset,
    errorMessage: productWeightError,
    inputIsValid: productWeightIsValid,
    updateInputHandler: productWeightInputHandler,
    inputBlurHandler: productWeightBlurHandler,
  } = useInput(isNotEmptyNumber, "This field cannot be empty");
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
    enteredInput: enteredDiscountPercentage,
    hasError: discountPercentageHasError,
    reset: discountPercentageReset,
    errorMessage: discountPercentageError,
    inputIsValid: discountPercentageIsValid,
    updateInputHandler: discountPercentageInputHandler,
    inputBlurHandler: discountPercentageBlurHandler,
  } = useInput(isNotEmptyNumber, "This field cannot be empty");
  const {
    enteredInput: enteredDiscount,
    hasError: discountHasError,
    reset: discountReset,
    errorMessage: discountError,
    inputIsValid: discountIsValid,
    updateInputHandler: discountInputHandler,
    inputBlurHandler: discountBlurHandler,
  } = useInput(isNotEmptyNumber, "This field cannot be empty");
  const {
    enteredInput: enteredPrice,
    hasError: priceHasError,
    reset: priceReset,
    errorMessage: priceError,
    inputIsValid: priceIsValid,
    updateInputHandler: priceInputHandler,
    inputBlurHandler: priceBlurHandler,
  } = useInput(isNotEmptyNumber, "This field cannot be empty");
  const {
    enteredInput: enteredDeliveryFee,
    hasError: deliveryFeeHasError,
    reset: deliveryFeeReset,
    errorMessage: deliveryFeeError,
    inputIsValid: deliveryFeeIsValid,
    updateInputHandler: deliveryFeeInputHandler,
    inputBlurHandler: deliveryFeeBlurHandler,
  } = useInput(isNotEmptyNumber, "This field cannot be empty");
  const {
    enteredInput: enteredDescription,
    hasError: descriptionHasError,
    reset: descriptionReset,
    errorMessage: descriptionError,
    inputIsValid: descriptionIsValid,
    updateInputHandler: descriptionInputHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");

  const submitFormHandler = (e: any) => {
    e.preventDefault();
    setFormIsTouched(true);

    const payload = {
      name: enteredProductName,
      brand: enteredbrand,
      price: price,
      description: enteredDescription,
      quantity: enteredProductQuantity,
      free_delivery: enteredDeliveryTag,
      shipping_fee: devFee,
      category_id: enteredCategory,
      product_waranty: enteredProductWarranty,
      discount_available: enteredDiscount,
      discount_percentage: enteredDiscountPercentage,
      weight: enteredProductWeight,
    };
    console.log(payload);
    const dataFunction = (res: any) => {
      console.log(res);
      fetchAllProducts();
    };
    const accessToken = sessionStorage.getItem("accessToken");

    const url = `https://backendapi.flip.onl/api/admin/product/create-product/${merchantId}`;
    send({ url, values: payload, accessToken }, dataFunction);
  };
  return (
    <form className="w-full h-full flex flex-col" onSubmit={submitFormHandler}>
      <label htmlFor="resume" className=" text-sm font-medium mx-auto">
        <Image src={userPic} alt={""} />
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
      <div className="text-red-400 text-[10px]">{productNameError}</div>
      <div className="mt-[10px]">
        <label htmlFor="brand" className=" text-[10px] text-[#1D2939] bg-white">
          Brand
        </label>
        <input
          type="text"
          name="brand"
          value={enteredbrand}
          id="brand"
          onBlur={brandBlurHandler}
          onChange={brandInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Brand"
        />
      </div>
      <div className="text-red-400 text-[10px]">{brandError}</div>
      <div className=" mt-[10px]">
        <label
          htmlFor="productQuantity"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Product Quantity
        </label>

        <input
          type="number"
          name="quantity"
          value={enteredProductQuantity}
          id="productQuantity"
          onBlur={productQuantityBlurHandler}
          onChange={productQuantityInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Product Quatity"
        />
      </div>
      <div className="text-red-400 text-[10px]">{productQuantityError}</div>
      <div className=" mt-[30px]">
        <label
          htmlFor="productWarranty"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Product Warranty
        </label>
        <input
          type="text"
          name="productWarranty"
          value={enteredProductWarranty}
          id="productWarranty"
          onBlur={productWarrantyBlurHandler}
          onChange={productWarrantyInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Product Warranty"
        />
      </div>
      <div className="text-red-400 text-[10px] ">{productWarrantyError}</div>
      <div className=" mt-[30px]">
        <label
          htmlFor="productWeight"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Product Weight(in kg)
        </label>
        <input
          type="number"
          name="productweight"
          value={enteredProductWeight}
          id="productweight"
          onBlur={productWeightBlurHandler}
          onChange={productWeightInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Product weight"
        />
      </div>
      <div className="text-red-400 text-[10px] ">{productWeightError}</div>
      <div className=" mt-[30px]">
        <label
          htmlFor="category"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Category
        </label>

        <select
          name="category"
          value={enteredCategory}
          id="category"
          onChange={categoryInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Category"
        >
          {productCategory?.map((item: any) => (
            <option
              value={item.categoryID}
              key={item.categoryID}
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="text-red-400 text-[10px] ">{categoryError}</div>
      <div className=" mt-[30px]">
        <label
          htmlFor="discount"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Discount Available
        </label>

        <select
          name="discount"
          value={enteredDiscount}
          id="discount"
          onChange={discountInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="discount"
        >
          {delivery?.map((item: any) => (
            <option
              value={item.name}
              key={item.id}
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-red-400 text-[10px] ">{discountError}</div>
      {enteredDiscount === "Yes" && (
        <div className=" mt-[30px]">
          <label
            htmlFor="discountPercentage"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Discount Percentege
          </label>
          <input
            type="number"
            name="deliveryPercentage"
            value={enteredDiscountPercentage}
            id="discountPercentage"
            onBlur={discountPercentageBlurHandler}
            onChange={discountPercentageInputHandler}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Discount Percentege"
          />
        </div>
      )}

      <div className="text-red-400 text-[10px] ">{discountPercentageError}</div>

      <div className=" mt-[30px]">
        <label htmlFor="price" className=" text-[10px] text-[#1D2939] bg-white">
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
      <div className="text-red-400 text-[10px] ">{priceError}</div>

      <div className=" mt-[30px]">
        <label htmlFor="role" className=" text-[10px] text-[#1D2939] bg-white">
          Delivery Tag
        </label>

        <select
          name="delivery"
          value={enteredDeliveryTag}
          id="delivery"
          onChange={deliveryTagInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Delivery Tag"
        >
          {delivery?.map((item: any) => (
            <option
              value={item.name}
              key={item.id}
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-red-400 text-[10px]">{deliveryTagError}</div>

      {enteredDeliveryTag === "No" && (
        <div className=" mt-[30px]">
          <label
            htmlFor="deliveryFee"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Delivery Fee
          </label>
          <NumericFormat
            name="enteredDeliveryFee"
            value={devFee || ""}
            allowNegative={false}
            thousandSeparator={true}
            required
            prefix={"₦"}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            onValueChange={(values: any, sourceInfo: any) => {
              const { formattedValue, value } = values;

              const { event, source } = sourceInfo;

              setDevFee(value);
            }}
          />
        </div>
      )}

      <div className="text-red-400 text-[10px]">{deliveryFeeError}</div>

      <div className=" mt-[30px]">
        <label
          htmlFor="description"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Description
        </label>
        <input
          type="text"
          name="status"
          value={enteredDescription}
          id="status"
          onBlur={descriptionBlurHandler}
          onChange={descriptionInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Description"
        />
      </div>
      <div className="text-red-400 text-[10px]">{descriptionError}</div>

      <button
        type="submit"
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-4"
      >
        Create Product
      </button>
    </form>
  );
};
export default CreateProduct;
