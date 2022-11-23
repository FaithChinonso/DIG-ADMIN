import { innerNav, outerNav, bottomNav } from "../utils/analytics";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import Image from "next/image";
import profile from "../assets/image/profile.svg";
import Link from "next/link";

import { useRouter } from "next/router";
import { authActions } from "src/redux/store/auth-slice";

const SideNav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [array, setArray] = useState<string[]>([]);
  const [path, setPath] = useState<string>("");
  const [value, setValue] = useState("dashboard");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setArray(router.pathname.split("/"));
    setPath(router.pathname.slice(1));
    setValue(path);
  }, [path, router.pathname]);

  console.log(router.pathname.split("/"));

  useEffect(() => {}, [value]);
  return (
    <div className="fixed left-0 top-0 w-[60px] md:w-[265px] h-screen min-h-screen rounded-r-3xl flex bg-darkPurple z-30">
      <div className="bg-lightPurple w-[70px] rounded-r-3xl py-10 flex flex-col items-center">
        <div>LOGO</div>
        <ul className="mt-[70px] flex flex-col gap-5">
          {innerNav.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center"
            >
              <div
                className="px-4"
                onClick={() => {
                  setValue(item.value);
                }}
                style={{
                  borderLeft: value === item.value ? "3px solid white" : "none",
                }}
              >
                <li
                  className="p-2 md:w-full text-white rounded"
                  style={{
                    border: value === item.value ? "1px solid" : "none",

                    borderColor: value === item.value ? "white" : "transparent",

                    backgroundColor: item.color,
                  }}
                >
                  {item.initials}
                </li>
              </div>
              {value === item.value && (
                <ul className="flex flex-col md:hidden max-h-[100px] overflow-y-auto pl-4 mt-2">
                  {item?.navItems?.map((nav: any) => (
                    <li
                      className=" text-[8px] w-full  p-2  rounded-[-12px]"
                      style={{
                        backgroundColor:
                          selected === nav.name
                            ? "rgba(255,255,255, .2)"
                            : "transparent",
                        color: selected === nav.name ? "#4B0081" : "white",
                        borderRadius: selected === nav.name ? "4px" : "0",
                      }}
                      key={nav.id}
                      onClick={() => {
                        setSelected(nav.name);
                      }}
                    >
                      <Link href={nav.route} legacyBehavior>
                        <a> {nav.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="hidden md:block relative w-full px-6 mt-8">
        <div className="bg-faintWhite flex items-center gap-3 rounded p-3">
          <div className="w-8 h-8 rounded-[50%]">
            <Image src={profile} alt={""} />
          </div>

          <div>
            <div className="text-xs text-white">Jude Chikezie</div>

            <div className="text-xs text-white">Administrator</div>
          </div>
        </div>
        <ul className=" flex flex-col gap-2 mt-10 w-full">
          {outerNav
            .filter((item: any) => item.value === value)
            .map((item: any) => (
              <li
                className=" text-xs w-full  p-2 rounded-l-full rounded-[-12px]"
                style={{
                  backgroundColor:
                    selected === item.name
                      ? "rgba(255,255,255, .2)"
                      : "transparent",
                  color: selected === item.name ? "#4B0081" : "white",
                  borderRadius: selected === item.name ? "4px" : "0",
                }}
                key={item.id}
                onClick={() => {
                  setSelected(item.name);
                }}
              >
                <Link href={item.route} legacyBehavior>
                  <a> {item.name}</a>
                </Link>
              </li>
            ))}
        </ul>

        {/* <ul className="p-10 flex flex-col gap-6 mt-[55px] w-full absolute bottom-8 left-0">
          {bottomNav.map((item: any) => (
            <li
              className="text-xs w-full text-center p-2 rounded-l-full rounded-[-12px] "
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
        </ul> */}
        <button
          className="text-xs w-full text-center p-2 rounded-l-full rounded-[-12px] absolute bottom-6 text-white border border-faintWhite"
          onClick={() => dispatch(authActions.logoutHandler())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default SideNav;
