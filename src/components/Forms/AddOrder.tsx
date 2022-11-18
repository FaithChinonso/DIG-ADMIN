import useInput from "../../Hooks/use-input";
import MuiPhoneNumber from "material-ui-phone-number";
import userPic from "../../assets/image/userPic.svg";
import Image from "next/image";
import { uiActions } from "../../redux/store/ui-slice";
import { useDispatch } from "react-redux";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import { NumericFormat } from "react-number-format";
import { isNotEmpty } from "src/utils/helperFunctions";
import { useState } from "react";
import MultipleInput from "../MultipleInput";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppSelector } from "src/Hooks/use-redux";
import DrawerWrapper from "../DrawerWrapper";

const AddOrder = ({ merchantId, fetchAllMerchants }: any) => {
  const dispatch = useDispatch();
  const { productCategory } = useAppSelector((state: any) => state.data);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [amount, setamount] = useState(null);
  const [items, setItems] = useState<any[]>([{ title: "", value: "" }]);
  const send = useHTTPPost();

  let handleChange = (index: any, e: any) => {
    let newItems = [...items];

    if (e?.target?.name.startsWith("title")) {
      newItems[index].title = e.target?.value;
    } else if (e?.target?.name.startsWith("value")) {
      newItems[index].value = e?.target?.value;
    }
    setItems(newItems);
  };

  let addFormFields = () => {
    setItems([...items, { title: "", value: "" }]);
  };
  let removeFormFields = (i: any) => {
    let newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  };
  const onChangeNumber = (event: any) => {
    setPhoneNumber(event);
  };

  const {
    enteredInput: enteredserviceName,
    updateInputHandler: serviceNameInputHandler,
    inputBlurHandler: serviceNameBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredlocationd,
    updateInputHandler: locationdInputHandler,
    inputBlurHandler: locationdBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredexperience,
    updateInputHandler: experienceInputHandler,
    inputBlurHandler: experienceBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: entereddescription,
    updateInputHandler: descriptionInputHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredCategory,
    updateInputHandler: categoryInputHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");

  const payload = {
    service_name: enteredserviceName,
    category_id: enteredCategory,
    years_of_exp: enteredexperience,
    amount,
    location: enteredlocationd,
    phone_number: phoneNumber,
    other_details: JSON.stringify(items),
    description: entereddescription,
  };
  const submitFormHandler = (e: any) => {
    e.preventDefault();
    console.log(payload);
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/service/create-service/${merchantId}`;
    const dataFunction = (res: any) => {};
    send({ url, values: payload, accessToken }, dataFunction);
  };

  return (
    <DrawerWrapper title="Create Order">
      <form
        className="w-full h-full flex flex-col"
        onSubmit={submitFormHandler}
      >
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
            htmlFor="serviceName"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            service Name
          </label>
          <input
            type="text"
            name="serviceName"
            value={enteredserviceName}
            id="serviceName"
            onBlur={serviceNameBlurHandler}
            onChange={serviceNameInputHandler}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="service Name "
          />
        </div>
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
        <div className="mt-[10px]">
          <label
            htmlFor="loaction"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Location
          </label>
          <input
            type="text"
            name="loaction"
            value={enteredlocationd}
            id="locationd"
            onBlur={locationdBlurHandler}
            onChange={locationdInputHandler}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Location"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="phone"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Phone Number
          </label>
          <MuiPhoneNumber
            defaultCountry={"ng"}
            name="businessPhoneNumber"
            sx={{
              svg: {
                height: "20px",
              },
            }}
            value={phoneNumber}
            onChange={onChangeNumber}
            autoComplete="off"
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
            required
          />
        </div>
        <div className=" mt-[10px]">
          <label
            htmlFor="experience"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Years Of Experience
          </label>

          <input
            type="number"
            name="lastName"
            value={enteredexperience}
            id="experience"
            onBlur={experienceBlurHandler}
            onChange={experienceInputHandler}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Years Of Experience"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="description"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={entereddescription}
            id="description"
            onBlur={descriptionBlurHandler}
            onChange={descriptionInputHandler}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Description"
          />
        </div>

        <div className=" mt-[30px]">
          <label
            htmlFor="price"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Amount
          </label>
          <NumericFormat
            name="enteredPrice"
            value={amount || ""}
            allowNegative={false}
            thousandSeparator={true}
            required
            prefix={"₦"}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            onValueChange={(values: any, sourceInfo: any) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              console.log(event.target.value);
              setamount(value);
            }}
          />
        </div>
        <div className=" text-base text-[#1D2939] bg-white">Other Details</div>

        {items?.map((element, index) => (
          <MultipleInput
            index={index}
            element={element}
            handleChange={handleChange}
            removeFormFields={removeFormFields}
          />
        ))}
        <div>
          <div onClick={addFormFields} className="text-xs text-gray-600">
            &plus; Add Items
          </div>
        </div>

        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto"
          type="submit"
        >
          Create Service
        </button>
      </form>
    </DrawerWrapper>
  );
};
export default AddOrder;
