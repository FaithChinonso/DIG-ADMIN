import React, { useEffect, useState } from "react";
import { Notify, NotifyType } from "../HotToast";
import axios from "axios";
import UploadInputButton from "../UploadInputButtons";
import DrawerWrapper from "../DrawerWrapper";
import { createproductCategory } from "src/redux/store/features/product-category-slice";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import { uiActions } from "src/redux/store/ui-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";

const AddProductCategory = ({ type }: any) => {
  const [name, setName] = React.useState("");
  const [profilePic, setProfilePic] = React.useState<any>("");
  const [profilePict, saveProfilePict] = React.useState<any>("");
  const [selectedFile, setSelectedFile] = useState<any>("");
  const dispatch = useAppDispatch();
  const { success, loading, error, message } = useAppSelector(
    (state: any) => state.productCategory
  );

  const updateProps = (event: any) => {
    const newValue = event?.target?.value;
    const reader = new FileReader();
    let fileString;
    if (event.target.files[0]) {
      console.log(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = file => {
      fileString = file?.target?.result;
      console.log(file);
      if (event?.target?.files[0]?.size > 2000000) {
        Notify({
          type: NotifyType.warning,
          message: "File size to big, File must not be more than 2mb",
        });
      } else {
        saveProfilePict(fileString);
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile);
      }
    };
    setProfilePic(newValue);
    console.log(profilePict);
    console.log(profilePic);
  };

  const createCategory = async (e: any) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", name);

    dispatch(createproductCategory(formData));
    if (success === true) {
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openModalAndSetContent({
          modalStyles: {
            padding: 0,
          },
          modalContent: (
            <>
              <SuccessfulModal title="Successfull" message={message} />
            </>
          ),
        })
      );
    }
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (success === false) {
      dispatch(uiActions.openToastAndSetContent({ toastContent: error }));
    }
  };
  return (
    <DrawerWrapper title="Create Service Category">
      <form className="w-full h-full flex flex-col" onSubmit={createCategory}>
        <label className=" text-[10px] text-[#1D2939] bg-white">
          Category Image{" "}
        </label>
        <UploadInputButton
          handleChange={updateProps}
          inputValue={profilePic}
          data={profilePict}
          inputName="profilePict"
          onDelete={() => {
            saveProfilePict(undefined);
          }}
          required={profilePict ? false : true}
        />
        <div className="mt-[10px]">
          <label
            htmlFor="productName"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Category Name
          </label>
          <input
            type="text"
            name="productName"
            value={name}
            id="productName"
            onChange={e => setName(e.target.value)}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Category Name"
          />
        </div>
        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-6"
          type="submit"
        >
          Add Category
        </button>
      </form>
    </DrawerWrapper>
  );
};

export default AddProductCategory;
