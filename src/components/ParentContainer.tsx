import type { AppProps } from "next/app";
import { ReactNode } from "react";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const ParentContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row w-full max-w-screen relative">
      <SideNav />
      <TopNav />
      <div className="mt-[140px] md:mt-[120px] w-[calc(100vw-60px)] md:w-[calc(100vw-265px)] bg-[#f9f9f9] ml-[62px] md:ml-[265px]">
        {children}
      </div>
    </div>
  );
};
export default ParentContainer;
