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
import DrawerWrapper from "../DrawerWrapper";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { createuser } from "src/redux/store/features/user-slice";
import { is8Chars, isEmail, isNotEmpty } from "src/utils/helperFunctions";
import { category, gender, merchantType, role } from "src/utils/analytics";

const AddUser = ({ toggleDrawer, applicationName, fetchAllUsers }: any) => {
  const dispatch = useAppDispatch();
  const { success, loading, error, message } = useAppSelector(
    (state: any) => state.user
  );
  const [formisValid, setFormIsValid] = useState(false);
  const [formisTouched, setFormIsTouched] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(0);

  const isNotEmptyMerchant = (value: string) => {
    if (enteredRole === "Merchant") {
      value?.trim() !== "";
    } else {
      value?.trim() === "";
    }
  };

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
      dispatch(createuser(payload));
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
    }
  };

  return (
    <DrawerWrapper title="Create User">
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

        <label
          htmlFor="resume"
          className="secondary text-sm font-medium mx-auto"
        >
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
          <label
            htmlFor="email"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
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
        <div className=" mt-[30px]">
          <label
            htmlFor="role"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
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
    </DrawerWrapper>
  );
};
export default AddUser;
