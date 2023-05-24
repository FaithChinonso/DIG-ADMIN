import type { AppProps } from "next/app";
import { GetStaticProps } from "next/types";
import { ReactNode } from "react";
import DrawerCard from "./DrawerCard";

import Loader from "./Loader";
import Modal from "./Modal";
import SideNav from "./SideNav";
import Toast from "./Toast";
import TopNav from "./TopNav";

const ParentContainer = ({ children }: { children: ReactNode }) => {
  if (typeof window === "undefined") return <div></div>;

  return (
    <div className="flex flex-row w-full max-w-screen relative h-screen overflow-x-hidden">
      <SideNav />
      <TopNav />
      <Toast />
      <DrawerCard />
      <Modal />
      <Loader />
      <div className="mt-[100px] md:mt-[67px] w-[calc(100vw-60px)] md:w-[calc(100vw-265px)] bg-lightGray ml-[62px] md:ml-[265px] p-[10px] md:p-[20px] overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default ParentContainer;
