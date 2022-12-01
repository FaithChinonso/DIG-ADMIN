import type { AppProps } from "next/app";
import { ReactNode } from "react";
import Loader from "./Loader";
import Modal from "./Modal";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const ParentContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row w-full max-w-screen relative h-screen">
      <SideNav />
      <TopNav />
      <Modal />
      <Loader />
      <div className="mt-[100px] md:mt-[67px] w-[calc(100vw-60px)] md:w-[calc(100vw-265px)] bg-lightGray ml-[62px] md:ml-[265px] p-[10px] md:p-[20px] h-max">
        {children}
      </div>
    </div>
  );
};
export default ParentContainer;
