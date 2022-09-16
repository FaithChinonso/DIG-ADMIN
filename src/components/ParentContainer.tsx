import type { AppProps } from "next/app";
import { ReactNode } from "react";

const ParentContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col w-full">{children}</div>;
};
export default ParentContainer;
