import { innerNav } from "../utils/analytics";
const InnerNav = () => {
  return (
    <div className="bg-darkPurple w-[60px] rounded-r-3xl">
      {innerNav.map((item: any) => (
        <div>{item.icon}</div>
      ))}
    </div>
  );
};
export default InnerNav;
