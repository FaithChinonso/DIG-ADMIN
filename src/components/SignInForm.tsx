import { useState } from "react";
import { SignUpType } from "../@types/form";
import useInput from "../Hooks/use-input";
import HidePassword from "../assets/image/hide-password.svg";
import ShowPassword from "../assets/image/show-password.svg";
import Google from "../assets/image/google (1).png";
import Apple from "../assets/image/apple (1).png";
import Facebook from "../assets/image/facebook (1).png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SignInForm = () => {
  const router = useRouter();
  const [data, setData] = useState<SignUpType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const is8Chars = (value: string) => value.trim().length > 8;
  const isEmail = (value: any) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  const isNotEmpty = (value: string) => value.trim() !== "";
  const [formisValid, setFormIsValid] = useState(false);
  const [formisTouched, setFormIsTouched] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const {
    enteredInput: enteredEmail,
    hasError: emailHasError,
    reset: emailReset,
    errorMessage: emailError,
    inputIsValid: emailIsValid,
    updateInputHandler: emailInputHandler,
    inputBlurHandler: emailBlurHandler,
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
    enteredRadioInput: enteredDeliveryInput,
    handleChangeHandler: deliveryChangeHandler,
  } = useInput(() => {}, "");

  const showFormError = !formisValid && formisTouched;

  const submitFormHandler = (e: any) => {
    e.preventDefault();
    setFormIsTouched(true);

    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);

      emailReset();

      passwordReset();
      router.push("/general");
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
          htmlFor="email"
          className="absolute top-[-6px] left-3 text-[10px] text-[#1D2939] bg-white"
        >
          Email Address or Username
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
      <div className="border-[0.5px] border-lightGrey relative  rounded-[10px] mt-[30px] flex justify-between">
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
          autoFocus={false}
          placeholder="Password"
          className="bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
        />

        <span className="w-[11px]">
          {!passwordShown ? (
            <Image src={ShowPassword} onClick={togglePassword} />
          ) : (
            <Image src={HidePassword} onClick={togglePassword} />
          )}
        </span>
      </div>
      <div className="text-red-400 text-[10px]">{passwordError}</div>
      <div className="w-full flex justify-between items-center">
        <div className="mt-[10px]">
          <input
            type="checkbox"
            id="pickup"
            name="delivery Option"
            value="Pick Up"
            onChange={deliveryChangeHandler}
          />
          <label
            htmlFor="pickup"
            className="text-[10px] text-[#1D2939] bg-white ml-[3px]"
          >
            Remember Me
          </label>
        </div>
        <Link href="">
          <div className="text-[10px] leading-[18px] text-primary">
            Forgot Password?
          </div>
        </Link>
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-[#122644] to-[#015FFF] w-full text-white text-center py-2 rounded-[10px] mt-[30px]"
      >
        Sign In
      </button>

      <div>
        <div className="border-t border-softGray w-full mt-[50px] relative flex items-center justify-center">
          <div className="bg-white absolute text-xs text-[#1D2939] px-0.5">
            {" "}
            Or Sign in with
          </div>
        </div>

        <div className="flex justify-center items-center gap-[30px] mt-[30px]">
          <div className="h-10 w-10 border border-primary flex justify-center items-center rounded-[10px]">
            <Image src={Google} />
          </div>
          <div className="h-10 w-10 border border-primary flex justify-center items-center rounded-[10px]">
            <Image src={Apple} />
          </div>
          <div className="h-10 w-10 border border-primary flex justify-center items-center rounded-[10px]">
            <Image src={Facebook} />
          </div>
        </div>
      </div>
    </form>
  );
};
export default SignInForm;
