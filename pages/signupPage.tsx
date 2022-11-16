import { ReactElement, useEffect } from "react";
import Image from "next/image";
import SignInForm from "../src/components/SignInForm";
import AuthSide from "../src/assets/image/auth-side (1).png";
import Rocket from "../src/assets/image/rocket.png";
import { ReactNode, useState } from "react";
import { Router, useRouter } from "next/router";
import { authActions } from "src/redux/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { success, loading } = useSelector((state: any) => state.auth);
  const handleSignin = (data: any) => {
    dispatch(authActions.loginHandler(data));
  };

  return (
    <div className="flex w-screen items-center justify-center md:items-start md:justify-start flex-col md:flex-row max-w-screen overflow-hidden">
      <div className="hidden md:w-[600px] h-screen md:flex flex-col md:flex-row items-center justify-center relative">
        <div className="w-full hidden md:block">
          <Image
            src={AuthSide}
            className="w-full object-cover left-0"
            alt={""}
          />
        </div>

        <div className="w-[400px] h-[350px] bg-lightDark py-[113px] px-[57px] rounded-[20px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-[32px] leading-10 text-white font-semibold text-center">
            Great Deals, Unbeatable Value
          </div>
          <div className="text-sm text-white text-center">
            Buy and sell platform for all
          </div>
        </div>
      </div>
      <div className="w-full px-[60px] py-[30px] md:px-[200px] md:py-[120px] md:w-[calc(100vw-600px)]">
        <div className="">
          <div className="text-primary text-[32px] leading-10">
            Welcome Page
            <span className="w-[30px]">
              <Image src={Rocket} alt={""} />
            </span>
          </div>
          <div className="text-[14px] text-[#101828]">
            Login to manage your collections
          </div>
        </div>
        <SignInForm login={handleSignin} />
      </div>
    </div>
  );
};
export default SignUp;
