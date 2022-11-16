import useInput from "../../Hooks/use-input";
import MuiPhoneNumber from "material-ui-phone-number";
import userPic from "../../assets/image/userPic.svg";
import Image from "next/image";
import { uiActions } from "../../redux/store/ui-slice";
import { useDispatch } from "react-redux";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import { useState } from "react";
import axios from "axios";
import useHTTPPost from "src/Hooks/use-httppost";

const AddUser = ({ toggleDrawer, applicationName, fetchAllUsers }: any) => {
  const dispatch = useDispatch();
  const [formisValid, setFormIsValid] = useState(false);
  const [formisTouched, setFormIsTouched] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(0);

  const send = useHTTPPost();

  const isNotEmpty = (value: string) => value?.trim() !== "";
  const is8Chars = (value: string) => value?.trim().length > 7;
  const isNotEmptyMerchant = (value: string) => {
    if (enteredRole === "Merchant") {
      value?.trim() !== "";
    } else {
      value?.trim() === "";
    }
  };
  const isEmail = (value: any) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  const gender = [
    { id: 1, name: "Female" },
    { id: 2, name: "Male" },
  ];
  const role = [
    { id: 1, name: "consumer" },
    { id: 2, name: "merchant" },
  ];
  const category = [
    { id: 1, name: "electronics" },
    { id: 2, name: "Car Dealership" },
    { id: 3, name: "Beauty Products" },
  ];
  const merchantType = [
    { id: 1, name: "business" },
    { id: 2, name: "personal" },
  ];

  const onChangeNumber = (event: any) => {
    setPhoneNumber(event);
  };
  const {
    enteredInput: enteredfirstName,
    hasError: firstNameHasError,
    reset: firstNameReset,
    errorMessage: firstNameError,
    inputIsValid: firstNameIsValid,
    updateInputHandler: firstNameInputHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredLastName,
    hasError: lastNameHasError,
    reset: lastNameReset,
    errorMessage: lastNameError,
    inputIsValid: lasttNameIsValid,
    updateInputHandler: lastNameInputHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredGender,
    hasError: genderHasError,
    reset: genderNameReset,
    errorMessage: genderError,
    inputIsValid: genderIsValid,
    updateInputHandler: genderInputHandler,
    inputBlurHandler: genderBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredEmail,
    hasError: emailHasError,
    reset: emailReset,
    errorMessage: emailError,
    inputIsValid: emailIsValid,
    updateInputHandler: emailInputHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail, "Email is not valid");

  const {
    enteredInput: enteredPhoneNumber,
    hasError: phoneNumberHasError,
    reset: phoneNumberReset,
    errorMessage: phoneNumberError,
    inputIsValid: phoneNumberIsValid,
    updateInputHandler: phoneNumberInputHandler,
    inputBlurHandler: phoneNumberBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredPassword,
    hasError: passwordHasError,
    reset: passwordReset,
    errorMessage: passwordError,
    inputIsValid: passwordIsValid,
    updateInputHandler: passwordInputHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(is8Chars, "Password must be atleast 8 characters");
  const {
    enteredInput: enteredRole,
    hasError: roleHasError,
    reset: roleReset,
    errorMessage: roleError,
    inputIsValid: roleIsValid,
    updateInputHandler: roleInputHandler,
    inputBlurHandler: roleBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
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
    enteredInput: enteredMerchantType,
    hasError: merchantTypeHasError,
    reset: merchantTypeReset,
    errorMessage: merchantTypeError,
    inputIsValid: merchantTypeIsValid,
    updateInputHandler: merchantTypeInputHandler,
    inputBlurHandler: merchantTypeBlurHandler,
  } = useInput(isNotEmptyMerchant, "This field cannot be empty");

  const showFormError = !formisValid && formisTouched;

  const submitFormHandler = (e: any) => {
    e.preventDefault();
    setFormIsTouched(true);

    const payload = {
      firstname: enteredfirstName,
      lastname: enteredLastName,
      email: enteredEmail,
      password: enteredPassword,
      role: enteredRole,
      application_name: applicationName,
      gender: enteredGender,
      category: enteredCategory,
      merchant_type: enteredRole === "merchant" ? enteredMerchantType : "",
      phone: phoneNumber,
    };
    console.log(payload);

    if (
      emailIsValid &&
      passwordIsValid &&
      firstNameIsValid &&
      lasttNameIsValid &&
      roleIsValid &&
      genderIsValid &&
      phoneNumber !== 0 &&
      categoryIsValid
    ) {
      setFormIsValid(true);

      dispatch(uiActions.openLoader(true));
      const dataFunction = (res: any) => {
        console.log(res);
      };
      const accessToken = sessionStorage.getItem("accessToken");

      const url = "https://backendapi.flip.onl/api/admin/user/create-user";
      send({ url, values: payload, accessToken }, dataFunction);

      emailReset();

      passwordReset();
    } else {
      setFormIsValid(false);
      return;
    }
  };

  return (
    <form
      className="w-full h-full flex flex-col"
      onSubmit={submitFormHandler}
      autoComplete="off"
    >
      {showFormError && (
        <p className="text-red-400 text-[10px]">
          Fill form correctly to summit
        </p>
      )}

      <label htmlFor="resume" className="secondary text-sm font-medium mx-auto">
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
          htmlFor="firstName"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={enteredfirstName}
          id="firstName"
          onBlur={firstNameBlurHandler}
          onChange={firstNameInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="First Name "
        />
      </div>
      <div className="mt-[10px]">
        <label
          htmlFor="lastName"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={enteredLastName}
          id="lastName"
          onBlur={lastNameBlurHandler}
          onChange={lastNameInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Last Name"
        />
      </div>
      <div className=" mt-[10px]">
        <label
          htmlFor="gender"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Gender
        </label>

        <select
          name="gender"
          value={enteredGender}
          id="gender"
          onChange={genderInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="gender"
        >
          {gender?.map((item: any) => (
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
      <div className=" mt-[30px]">
        <label htmlFor="email" className=" text-[10px] text-[#1D2939] bg-white">
          Email Address
        </label>
        <input
          type="text"
          name="email"
          value={enteredEmail}
          id="email"
          onBlur={emailBlurHandler}
          onChange={emailInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Email Address"
        />
      </div>
      <div className=" mt-[30px]">
        <label
          htmlFor="password"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Password
        </label>
        <input
          type="text"
          name="password"
          value={enteredPassword}
          id="password"
          onBlur={passwordBlurHandler}
          onChange={passwordInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="password"
        />
      </div>
      <div className=" mt-[30px]">
        <label htmlFor="phone" className=" text-[10px] text-[#1D2939] bg-white">
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
      <div className=" mt-[30px]">
        <label htmlFor="role" className=" text-[10px] text-[#1D2939] bg-white">
          Role
        </label>

        <select
          name="role"
          value={enteredRole}
          id="role"
          onChange={roleInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="role"
        >
          {role?.map((item: any) => (
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
          placeholder="category"
        >
          {category?.map((item: any) => (
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

      <div className=" mt-[30px]">
        <label
          htmlFor="merchantType"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          merchant Type
        </label>

        <select
          name="merchantType"
          value={enteredMerchantType}
          id="merchantType"
          onChange={merchantTypeInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="merchantType"
        >
          {merchantType?.map((item: any) => (
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

      <button
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto"
        type="submit"
      >
        Add User
      </button>
    </form>
  );
};
export default AddUser;
