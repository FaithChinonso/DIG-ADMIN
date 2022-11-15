import { useSelector } from "react-redux";
import profile from "../../src/assets/image/profile.svg";
import setting from "../../src/assets/image/setting-3.svg";
import bell from "../../src/assets/image/bell.svg";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

const TopNav = () => {
  const { page, section } = useSelector((state: any) => state.data);
  return (
    <div className="fixed top-0 left-[60px] md:left-[265px] w-[calc(100vw-60px)] md:w-[calc(100%-265px)] p-[10px] md:p-[30px] flex flex-col-reverse gap-2 justify-center items-center md:flex-row md:justify-between mb-8 bg-white z-20">
      <div className="flex flex-col md:w-[350px] w-full  items-center justify-around">
        {/* <div className="text-sm text-grey">
          {page}/ <span className="text-softGray">{section}</span>
        </div>
        <div className="text-lg text-grey">{section}</div> */}
      </div>

      <div className="rounded gap-2 flex items-center w-max  h-[40px] bg-lightGray px-4">
        <h4 className="text-sm text-softGrey border-r border-softGray pr-2">
          All Category
        </h4>
        <input
          className="md:w-[220px] text-softGray focus:outline-none bg-transparent"
          placeholder="Search Here"
        />
        <SearchIcon style={{ color: "#d7d7d7" }} />
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
