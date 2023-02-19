import { useEffect, useState } from "react";
import { SignUpType } from "../@types/form";
import useInput from "../Hooks/use-input";
import HidePassword from "../assets/image/hide-password.svg";
import ShowPassword from "../assets/image/show-password.svg";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Provider, useDispatch } from "react-redux";
import { uiActions } from "src/redux/store/ui-slice";
import axios from "axios";
import store from "src/redux/store";
import { authActions } from "src/redux/store/auth-slice";
import { is8Chars, isNotEmpty } from "src/utils/helperFunctions";

const SignInForm = ({ login }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formisValid, setFormIsValid] = useState(false);
  const [formisTouched, setFormIsTouched] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
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

  const showFormError = !formisValid && formisTouched;

  const payload = {
    email: enteredEmail,
    password: enteredPassword,
  };

  const submitFormHandler = (e: any) => {
    e.preventDefault();
    setFormIsTouched(true);

    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
      const loginHandler = async () => {
        try {
          const res = await axios.post(
            "https://easy.unikmarketing.org/api/auth/login/admin",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          dispatch(authActions.loginHandler(res.data));
        } catch (err: any) {
          console.log(err);
          dispatch(authActions.errorHandler(err));
        }
      };
      loginHandler();

      // login(payload);
    }
  };
  useEffect(() => {}, []);
  return (
    <Provider store={store}>
      <form onSubmit={submitFormHandler} className="w-full mt-[50px]">
        {showFormError && (
          <div className="text-red-400 text-[10px]">
            Fill form correctly to summit
          </div>
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
        <div className="border-[0.5px] border-lightGrey relative bg-white  rounded-[10px] mt-[30px] flex justify-between">
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

          <span className="w-[11px] absolute right-1 top-[50%] -translate-y-[50%]">
            {!passwordShown ? (
              <Image src={ShowPassword} onClick={togglePassword} alt={""} />
            ) : (
              <Image src={HidePassword} onClick={togglePassword} alt={""} />
            )}
          </span>
        </div>
        <div className="text-red-400 text-[10px]">{passwordError}</div>

        <button
          type="submit"
          className="bg-lightPurple w-full text-white text-center py-2 rounded-[10px] mt-[30px]"
        >
          Sign In
        </button>
      </form>
    </Provider>
  );
};
export default SignInForm;
