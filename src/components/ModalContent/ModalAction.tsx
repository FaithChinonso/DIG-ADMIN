import { useDispatch } from "react-redux";
import { uiActions } from "../../redux/store/ui-slice";
import sucessPic from "../../assets/image/sucessPic.svg";
import Image from "next/image";
import SuccessfulModal from "./SuccessfulModal";

const ModalAction = ({ action, item, actionFunction }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="py-6 rounded-3xl shadow-tableShadow">
      <Image src={sucessPic} alt={""} />
      <div className="text-lightDark  text-lg">Confirmation</div>
      <div className="text-lg text-lightDark p-8">
        Are you sure you want to
        <span className="text-darkPurple ml-1">{action}</span> this{" "}
        <span className=" ml-1">{item} ?</span>
      </div>
      <div className="flex items-center gap-5 p-8">
        <div
          className="text-sm text-darkPurple border border-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto cursor-pointer"
          onClick={() => dispatch(uiActions.closeModal(false))}
        >
          Cancel
        </div>
        <div
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto cursor-pointer"
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
