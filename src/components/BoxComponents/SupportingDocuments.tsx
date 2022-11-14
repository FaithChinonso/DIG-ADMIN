import { supportingDocument } from "../../utils/analytics";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import Image from "next/image";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import { useState } from "react";
const supportingDocuments = () => {
  const [showModal, setShowModal] = useState({
    show: false,
    value: "",
  });
  return (
    <div className="flex gap-[30px]">
      {supportingDocument?.map((item: any) => (
        <div
          key={item.id}
          className="w-[250px] flex flex-col "
          onMouseOver={() =>
            setShowModal({ ...showModal, show: true, value: item.name })
          }
        >
          <div className="relative w-full">
            {showModal.value === item.name && (
              <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,.2)] z-10 flex items-center justify-center">
                <div className="bg-darkPurple text-white px-[20px] py-[10px] w-[150px] text-sm rounded-lg">
                  View Document
                </div>
              </div>
            )}
            <Image src={item.img} className="object-cover w-full" />
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-xs font-semibold">{item.name}</div>
              <div className="text-[10px] font-light text-[#8487A3]">
                {item.uploaded}
              </div>
            </div>
            <ActionMenuBase
              items={
                <>
                  <ActionMenuItem name="View Document" />
                  <ActionMenuItem name="Remove Document" />
                </>
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default supportingDocuments;
