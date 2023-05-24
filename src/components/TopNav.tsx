import { useSelector } from "react-redux";
import profile from "../../src/assets/image/profile.svg";
import setting from "../../src/assets/image/setting-3.svg";
import bell from "../../src/assets/image/bell.svg";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TopNav = () => {
  const router = useRouter();
  const [array, setArray] = useState<string[]>([]);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    setArray(router.pathname.split("/"));
    setPath(router.pathname.slice(1));
  }, [router.pathname]);

  return (
    <div className="fixed top-0 left-[60px] md:left-[265px] w-[calc(100vw-60px)] md:w-[calc(100%-265px)] p-[10px] md:p-[20px] flex flex-col-reverse gap-2 justify-center items-center md:flex-row md:justify-between mb-8 bg-white z-100">
      <div className="flex md:w-auto w-full  items-center justify-around">
        <div className="text-base text-[#1D2939] capitalize font-extrabold">
          {array[1]}
          <span className="font-extrabold ml-2">-</span>
        </div>
        <div className="text-[#475467] font-normal capitalize ml-2">
          {array[2]}
        </div>
      </div>

      <div className="w-[155px] flex justify-around">
        <div className="h-6 w-6">
          <Image src={bell} alt={""} />
        </div>
        <div className="h-6 w-6">
          <Image src={setting} alt={""} />
        </div>
        <div className="h-6 w-6">
          <Image src={profile} alt={""} />
        </div>
      </div>
    </div>
  );
};
export default TopNav;
