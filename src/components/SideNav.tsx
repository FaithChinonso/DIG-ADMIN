import InnerNav from "./InnerNav";
import OuterNav from "./OuterNav";
import { innerNav, outerNav, bottomNav } from "../utils/analytics";
import { useState } from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";

const SideNav = () => {
  const [value, setValue] = useState("first");
  const [selectedValue, setSelectedValue] = useState("DASHBOARD");
  const [selected, setSelected] = useState("DASHBOARD");
  return (
    <div className="w-[60px] md:w-[235px] h-screen min-h-screen rounded-r-3xl flex bg-lightPurple">
      <div className="bg-darkPurple w-[60px] rounded-r-3xl py-10 flex flex-col items-center">
        <div>LOGO</div>
        <ul className="mt-[50px] flex flex-col gap-5">
          {innerNav.map((item: any) => (
            <li
              onClick={() => setValue(item.value)}
              key={item.id}
              style={{
                backgroundColor: value === item.value ? "white" : "transparent",
              }}
            >
              <WidgetsIcon
                style={{
                  color: value === item.value ? "#4B0081" : item.color,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:block relative w-full pl-5">
        <ul className=" flex flex-col gap-6 mt-20 w-full">
          {outerNav
            .filter((item: any) => item.value === value)
            .map((item: any) => (
              <li
                className=" text-base w-full text-center p-2 rounded-l-full rounded-[-12px]"
                style={{
                  backgroundColor:
                    selected === item.name ? "white" : "transparent",
                  color: selected === item.name ? "#4B0081" : "white",
                  borderRadius: selected === item.name ? "-14px" : "0",
                }}
                key={item.id}
                onClick={() => setSelected(item.name)}
              >
                {item.name}
              </li>
            ))}
        </ul>

        <ul className="p-10 flex flex-col gap-6 mt-[55px] w-full absolute bottom-8 left-0">
          {bottomNav.map((item: any) => (
            <li
              className="text-white text-base "
              style={{
                backgroundColor:
                  selected === item.name ? "white" : "transparent",
                color: selected === item.name ? "#4B0081" : "white",
              }}
              key={item.id}
              onClick={() => setSelected(item.name)}
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
