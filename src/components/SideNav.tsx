import InnerNav from "./InnerNav";
import OuterNav from "./OuterNav";
import { innerNav, outerNav, bottomNav } from "../utils/analytics";
import { useState } from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";

const SideNav = () => {
  const [value, setValue] = useState("first");
  const [selected, setSelected] = useState("DASHBOARD");
  return (
    <div className="w-[60px] md:w-[235px] h-screen min-h-screen rounded-r-3xl flex bg-lightPurple">
      <div className="bg-darkPurple w-[60px] rounded-r-3xl py-10 flex flex-col items-center">
        <div>LOGO</div>
        <ul className="mt-[50px] flex flex-col gap-5">
          {innerNav.map((item: any) => (
            <li onClick={() => setValue(item.value)} key={item.id}>
              <WidgetsIcon style={{ color: item.color }} />
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:block">
        {value === "first" && (
          <ul className="pl-4 flex flex-col gap-6 mt-10">
            {outerNav.map((item: any) => (
              <li
                className=" text-base w-full text-center p-2"
                style={{
                  backgroundColor:
                    selected === item.name ? "white" : "transparent",
                  color: selected === item.name ? "#4B0081" : "white",
                }}
                key={item.id}
                onChange={() => setSelected(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
        <ul className="p-10 flex flex-col gap-6 mt-[55px]">
          {bottomNav.map((item: any) => (
            <li
              className="text-white text-base "
              // style={{
              //   backgroundColor:
              //     selected === item.name ? "white" : "transparent",
              //   color: selected === item.name ? "#4B0081" : "white",
              // }}
              key={item.id}
              onChange={() => setSelected(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SideNav;
