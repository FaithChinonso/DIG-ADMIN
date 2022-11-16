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
import { delivery, productLevel } from "../../utils/analytics";

const AddJob = ({ userId }: any) => {
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
    enteredInput: enteredheadline,
    updateInputHandler: headlineInputHandler,
    inputBlurHandler: headlineBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: entereddurationd,
    updateInputHandler: durationdInputHandler,
    inputBlurHandler: durationdBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredscope,
    updateInputHandler: scopeInputHandler,
    inputBlurHandler: scopeBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: entereddescription,
    updateInputHandler: descriptionInputHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const { enteredInput: enteredlevel, updateInputHandler: levelInputHandler } =
    useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enterednegotiate,
    updateInputHandler: negotiateInputHandler,
    inputBlurHandler: negotiateBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");

  const payload = {
    headline: enteredheadline,
    experience_level: enteredlevel,
    job_scope: enteredscope,
    budget: amount,
    job_duration: entereddurationd,
    is_budget_negotiable: enterednegotiate,
    skills_needed: JSON.stringify(items),
    description: entereddescription,
  };
  const submitFormHandler = (e: any) => {
    e.preventDefault();
    console.log(payload);
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/job/create-job/${userId}`;
    const dataFunction = (res: any) => {};
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
          htmlFor="headline"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Headline
        </label>
        <input
          type="text"
          name="headline"
          value={enteredheadline}
          id="headline"
          onBlur={headlineBlurHandler}
          onChange={headlineInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Headline "
        />
      </div>
      <div className=" mt-[30px]">
        <label htmlFor="level" className=" text-[10px] text-[#1D2939] bg-white">
          Experience Level
        </label>

        <select
          name="level"
          value={enteredlevel}
          id="level"
          onChange={levelInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder=" Experience Level"
        >
          {productLevel?.map((item: any) => (
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
      <div className="mt-[10px]">
        <label
          htmlFor="duration"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Duration
        </label>
        <input
          type="text"
          name="duration"
          value={entereddurationd}
          id="durationd"
          onBlur={durationdBlurHandler}
          onChange={durationdInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="duration"
        />
      </div>

      <div className=" mt-[10px]">
        <label htmlFor="scope" className=" text-[10px] text-[#1D2939] bg-white">
          Job Scope
        </label>

        <input
          type="text"
          name="scope"
          value={enteredscope}
          id="scope"
          onBlur={scopeBlurHandler}
          onChange={scopeInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Job Scope"
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
        <label htmlFor="price" className=" text-[10px] text-[#1D2939] bg-white">
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

      <div className=" mt-[30px]">
        <label
          htmlFor="negotiate"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Negotiable
        </label>

        <select
          name="negotiate"
          value={enterednegotiate}
          id="negotiate"
          onChange={negotiateInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder=" Negotiatiable"
        >
          {delivery?.map((item: any) => (
            <option
              value={item.id}
              key={item.id}
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              {item.name}
            </option>
          ))}
        </select>
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
        Create Job Posting
      </button>
    </form>
  );
};
export default AddJob;
