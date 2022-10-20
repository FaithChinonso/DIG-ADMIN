import styles from "./ActionMenuItems.module.scss";

const ActionMenuItem = ({ name, onClickFunction }: any) => {
  return (
    <div
      className=" bg-whitefont-[500] text-sm flex items-center py-[11px] px-[19px] text-darkPurple hover:text-white  hover:bg-faintPurple"
      onClick={onClickFunction}
    >
      {name}
    </div>
  );
};
export default ActionMenuItem;
