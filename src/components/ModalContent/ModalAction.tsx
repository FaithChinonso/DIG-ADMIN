import { useDispatch } from "react-redux";
import { uiActions } from "../../redux/store/ui-slice";
import sucessPic from "../../assets/image/sucessPic.svg";
import Image from "next/image";
import SuccessfulModal from "./SuccessfulModal";

const ModalAction = ({ action, item, actionFunction }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="py-4 rounded-[52px] shadow-tableShadow items-center flex flex-col ">
      <Image src={sucessPic} alt={""} width={150} />
      <div className="text-lightDark  text-base">Confirmation</div>
      <div className="text-sm text-lightDark p-3">
        Are you sure you want to
        <span className="text-darkPurple ml-1">{action}</span> this{" "}
        <span className=" ml-1">{item} ?</span>
      </div>
      <div className="flex items-center gap-3 p-4">
        <div
          className="text-xs text-darkPurple border border-lightPurple py-2 px-3 rounded-md flex items-center justify-center w-[150px] mx-auto cursor-pointer"
          onClick={() => dispatch(uiActions.closeModal())}
        >
          Cancel
        </div>
        <div
          className="text-xs text-white bg-lightPurple py-2 px-3 rounded-md flex items-center justify-center w-[150px] mx-auto cursor-pointer"
          onClick={() => {
            actionFunction();
          }}
        >
          Confirm
        </div>
      </div>
    </div>
  );
};
export default ModalAction;
