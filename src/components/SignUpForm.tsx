import { useState } from "react";
import { SignUpType } from "../@types/form";
import useInput from "../Hooks/use-input";
import HidePassword from "../assets/image/hide-password.svg";
import ShowPassword from "../assets/image/show-password.svg";
import Image from "next/image";

const SignUpForm = ({ setSignUp }: any) => {
  const [data, setData] = useState<SignUpType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const isNotEmpty = (value: string) => value.trim() !== "";
  const is8Chars = (value: string) => value.trim().length > 8;
  const isSame = (value: string) => enteredPassword === value.trim();
  const isEmail = (value: any) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  const [formisValid, setFormIsValid] = useState(false);
  const [formisTouched, setFormIsTouched] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  const {
    enteredInput: enteredFirstName,
    hasError: firstNameHasError,
    reset: firstNameReset,
    errorMessage: firstNameError,
    inputIsValid: firstNameIsValid,
    updateInputHandler: firstNameInputHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isNotEmpty, "FirstName must not be empty");
  const {
    enteredInput: enteredLastName,
    hasError: lastNameHasError,
    reset: lastNameReset,
    errorMessage: lastNameError,
    inputIsValid: lastNameIsValid,
    updateInputHandler: lastNameInputHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isNotEmpty, "LastName must not be empty");
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
    enteredInput: enteredPassword,
    hasError: passwordHasError,
    reset: passwordReset,
    errorMessage: passwordError,
    inputIsValid: passwordIsValid,
    updateInputHandler: passwordInputHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(is8Chars, "Password must be atleast 8 characters");
  const {
    enteredInput: enteredConfirmPassword,
    hasError: confirmPasswordHasError,
    reset: confirmPasswordReset,
    errorMessage: confirmPasswordError,
    inputIsValid: confirmPasswordIsValid,
    updateInputHandler: confirmPasswordInputHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput(isSame, "Password is not the same");

  const showFormError = !formisValid && formisTouched;

  const submitFormHandler = (e: any) => {
    e.preventDefault();
    setFormIsTouched(true);

    if (
      firstNameIsValid &&
      emailIsValid &&
      lastNameIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid
    ) {
      setFormIsValid(true);
      firstNameReset();
      emailReset();
      lastNameReset();
      passwordReset();
      confirmPasswordReset();
      setSignUp(false);
    } else {
      setFormIsValid(false);
      return;
    }
  };

  return (
    <form onSubmit={submitFormHandler} className="w-full mt-[50px]">
      {showFormError && (
        <p className="text-red-400 text-[10px]">
          Fill form correctly to summit
        </p>
      )}
      <div className="border-[0.5px] border-lightGrey relative rounded-[10px] mt-[10px]">
        <label
          htmlFor="firstName"
          className="absolute top-[-6px] left-3 text-[10px] text-[#1D2939] bg-white"
        >
          FirstName
        </label>
        <input
          type="text"
          name="firstName"
          value={enteredFirstName}
          id="firstName"
          onBlur={firstNameBlurHandler}
          onChange={firstNameInputHandler}
          className="bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
          placeholder="First Name"
        />
      </div>
      <div className="text-red-400 text-[10px]">{firstNameError}</div>
      <div className="border-[0.5px] border-lightGrey relative rounded-[10px] mt-[30px]">
        <label
          htmlFor="lastName"
          className="absolute top-[-6px] left-3 text-[10px] text-[#1D2939] bg-white"
        >
          LastName
        </label>
        <input
          type="text"
          name="lastName"
          value={enteredLastName}
          id="LastName"
          onBlur={lastNameBlurHandler}
          onChange={lastNameInputHandler}
          className="bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
          placeholder="Last Name"
        />
      </div>
      <div className="text-red-400 text-[10px]">{lastNameError}</div>
      <div className="border-[0.5px] border-lightGrey relative rounded-[10px] mt-[30px]">
        <label
          htmlFor="email"
          className="absolute top-[-6px] left-3 text-[10px] text-[#1D2939] bg-white"
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
          className="bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
          placeholder="Email Address"
        />
      </div>
      <div className="text-red-400 text-[10px]">{emailError}</div>
      <div className="border-[0.5px] border-lightGrey relative rounded-[10px] mt-[30px] flex justify-between">
        <label
          htmlFor="password"
          className="absolute top-[-6px] left-3 text-[10px] text-[#1D2939] bg-white"
        >
          Password
        </label>
        <input
          type={passwordShown ? "text" : "password"}
          name="password"
          value={enteredPassword}
          id="password"
          onBlur={passwordBlurHandler}
          onChange={passwordInputHandler}
          className="bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
          placeholder="Password"
        />

        <span className="w-[11px]">
          {!passwordShown ? (
            <Image src={ShowPassword} onClick={togglePassword} />
          ) : (
            <Image src={HidePassword} onClick={togglePassword} />
          )}
        </span>
      </div>
      <div className="text-red-400 text-[10px]"> {passwordError}</div>
      <div className="border-[0.5px] border-lightGrey relative rounded-[10px] mt-[30px] flex justify-between">
        <label
          htmlFor="confirmPassword"
          className="absolute top-[-6px] left-3 text-[10px] text-[#1D2939] bg-white"
        >
          Confirm Password
        </label>
        <input
          type={passwordShown ? "text" : "password"}
          name="confirmpassword"
          value={enteredConfirmPassword}
          id="password"
          onBlur={confirmPasswordBlurHandler}
          onChange={confirmPasswordInputHandler}
          className="bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
          placeholder="Confirm Password"
        />

        <span className="w-[11px]">
          {!confirmPasswordShown ? (
            <Image src={ShowPassword} onClick={toggleConfirmPassword} />
          ) : (
            <Image src={HidePassword} onClick={toggleConfirmPassword} />
          )}
        </span>
      </div>
      <div className="text-red-400 text-[10px]">{confirmPasswordError}</div>
      <button
        type="submit"
        className="bg-gradient-to-r from-[#122644] to-[#015FFF] w-full text-white text-center py-2 rounded-[10px] mt-[30px]"
      >
        {" "}
        Sign Up
      </button>
    </form>
  );
};
export default SignUpForm;
