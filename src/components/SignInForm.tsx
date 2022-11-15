import { useEffect, useState } from "react";
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
import { Provider, useDispatch } from "react-redux";
import { uiActions } from "src/redux/store/ui-slice";
import {
  addPage,
  addToken,
  saveDetails,
  saveSignin,
} from "src/redux/store/data-slice";
import axios from "axios";
import store from "src/redux/store";
import { authActions } from "src/redux/store/auth-slice";

const SignInForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const is8Chars = (value: string) => value.trim().length > 7;
  const isEmail = (value: any) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  const isNotEmpty = (value: string) => value.trim() !== "";
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
      fetch("https://backendapi.flip.onl/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then(data => {
              if (data) {
              }
            });
          }
        })
        .then(data => {
          console.log(data);
          dispatch(authActions.loginHandler(data));
          router.push("/general/");
          console.log("pushed");
        })
        .catch(err => {
          alert("Authetication Failed");
        });

      // axios
      //   .post("https://backendapi.flip.onl/api/auth/login", payload)
      //   .then((res: any) => {
      //     console.log(res?.data);
      //     dispatch(dataActions.saveSignin(res?.data));
      //     console.log(res?.data);
      //     const accessToken = res.data.token;
      //     sessionStorage.setItem("accessToken", accessToken);
      //   })
      //   .then(() => {
      //     router.push("/general/");
      //     console.log("pushed");
      //   })
      //   .catch(err => {});
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
              <Image src={ShowPassword} onClick={togglePassword} alt={""} />
            ) : (
              <Image src={HidePassword} onClick={togglePassword} alt={""} />
            )}
          </span>
        </div>
        <div className="text-red-400 text-[10px]">{passwordError}</div>

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
              <Image src={Google} alt={""} />
            </div>
            <div className="h-10 w-10 border border-primary flex justify-center items-center rounded-[10px]">
              <Image src={Apple} alt={""} />
            </div>
            <div className="h-10 w-10 border border-primary flex justify-center items-center rounded-[10px]">
              <Image src={Facebook} alt={""} />
            </div>
          </div>
        </div>
      </form>
    </Provider>
  );
};
export default SignInForm;
