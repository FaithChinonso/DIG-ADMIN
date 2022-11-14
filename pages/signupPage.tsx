import { NextPage } from "next";
import Image from "next/image";
import SignInForm from "../src/components/SignInForm";
import SignUpForm from "../src/components/SignUpForm";
import AuthSide from "../src/assets/image/auth-side (1).png";
import Rocket from "../src/assets/image/rocket.png";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUp = (props: any) => {
  const [signUp, setSignUp] = useState(false);
  console.log(props.noNav);

  return (
    <div className="flex w-screen flex-col md:flex-row max-w-screen overflow-hidden">
      <div className=" md:w-[600px] h-screen flex flex-col md:flex-row items-center justify-center relative">
        <div className="w-full hidden md:block">
          <Image src={AuthSide} className="w-full object-cover left-0" />
        </div>

        <div className="w-[400px] h-[350px] bg-lightDark py-[113px] px-[57px] rounded-[20px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-[32px] leading-10 text-white font-semibold text-center">
            Great Deals, Unbeatable Value
          </h2>
          <p className="text-sm text-white text-center">
            Buy and sell platform for all
          </p>
        </div>
      </div>
      <div className=" px-[200px] py-[120px] w-[calc(100vw-600px)]">
        <div className="">
          <h1 className="text-primary text-[32px] leading-10">
            {signUp ? "Create An Account" : "Welcome Page"}
            <span className="w-[30px]">
              <Image src={Rocket} />
            </span>
          </h1>
          <p className="text-[14px] text-[#101828]">
            {signUp
              ? "Sign up to continue"
              : " Login to manage your collections"}
          </p>
        </div>
        {signUp ? <SignUpForm setSignUp={setSignUp} /> : <SignInForm />}

        {signUp ? (
          <div className="text-[#101828] text-xs text-center mt-[70px]">
            Already have an account?{" "}
            <span className="mx-1 text-primary text-xs" onClick={() => {}}>
              Sign In
            </span>
          </div>
        ) : (
          <div className="text-[#101828] text-xs text-center mt-[100px]">
            Not Registered yet?{" "}
            <span
              className="mx-1 text-primary text-xs"
              onClick={() => setSignUp(true)}
            >
              Create an Account
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
SignUp.getInitialProps = async (ctx: any) => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // const json = await res.json()
  // return { stars: json.stargazers_count }
  console.log(ctx);
};
export default SignUp;
