import styles from "./ActionMenuItems.module.scss";

const ActionMenuItems = ({ items }: any) => {
  return (
    <div className="absolute top-[80%] right-0 z-[2000] w-[max-content] min-w-[180px] flex flex-col bg-white p-0 shadow-actionShadow rounded-md ">
      {items}
    </div>
  );
};
export default ActionMenuItems;
