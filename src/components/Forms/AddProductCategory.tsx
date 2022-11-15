import React, { useEffect, useState } from "react";
import useInput from "src/Hooks/use-input";
import userPic from "../../assets/image/userPic.svg";
import cardImage from "../../assets/image/cardImage.jpg";
import { Notify, NotifyType } from "../HotToast";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { uiActions } from "src/redux/store/ui-slice";
import useHTTPPost from "src/Hooks/use-httppost";
import { saveProfilePicture } from "src/redux/store/data-slice";
import DeleteIcon from "../../assets/image/delete-icon.svg";
import Image from "next/image";

const AddProductCategory = () => {
  const request = useHTTPPost();

  const dispatch = useDispatch();
  const { profilePicture } = useSelector((state: any) => state.data);
  const [selectedFile, setSelectedFile] = useState({});

  const handleChange = (e: any) => {
    let file = e.target.files[0];
    setSelectedFile(file);
    // dispatch(saveProfilePicture(selectedFile));
  };
  console.log(selectedFile);

  const isNotEmpty = (value: string) => value.trim() !== "";
  const {
    enteredInput: enteredProductCategory,
    reset: productCategoryReset,
    inputIsValid: productCategoryIsValid,
    updateInputHandler: productCategoryInputHandler,
    inputBlurHandler: productCategoryBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");

  const submitFormHandler = (e: any) => {
    e.preventDefault();

    const payload = {
      name: enteredProductCategory,
      image: selectedFile,
    };

    console.log(payload);

    if (productCategoryIsValid) {
      const dataFunction = (res: any) => {
        console.log(res);
      };
      const accessToken = sessionStorage.getItem("accessToken");
      const url =
        "https://backendapi.flip.onl/api/admin/productcategory/create-product-category";
      request(
        {
          url,
          values: payload,
          accessToken,
        },
        dataFunction
      );

      productCategoryReset();
    } else {
      return;
    }
  };

  return (
    <form
      className="w-full h-full flex flex-col"
      onSubmit={submitFormHandler}
      autoComplete="off"
    >
      <input
        type="file"
        accept="image/png, image/jpg, image/gif, image/jpeg"
        onChange={handleChange}
      />
      {/* <div className="text-sm font-medium mx-auto">
        <label htmlFor="profile" className="text-sm">
          <Image src={userPic} alt={""} />
          <input
            type="file"
            name="profilePicture"
            id="profile"
            onChange={uploadImage}
            value={profilePicture}
            accept="image/png, image/jpg, image/gif, image/jpeg"
            className="hidden"
            required={profilePicture ? false : true}
          />

          <div className="text-grey text-xs">Browse for a file to upload.</div>
          <div className="text-[8px] text-lightPurple">
            "All file types supported: JPEG, JPG, PNG, PDF. Max file size: 2mb"
          </div>

          {profilePicture ? (
            <div className="text-sm w-1/2 text-darkPurple">
              <Image
                src={
                  profilePicture.toString().includes("image")
                    ? profilePicture
                    : userPic
                }
                alt=""
                width="150"
                height="250"
              />
              {profilePicture ? (
                <div className="" onClick={onDelete}>
                  <DeleteIcon />
                </div>
              ) : null}
            </div>
          ) : null}
        </label>
      </div> */}

      <div className="mt-[10px]">
        <label
          htmlFor="productCategory"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Product Category
        </label>
        <input
          type="text"
          name="productCategory"
          value={enteredProductCategory}
          id="productCategory"
          onBlur={productCategoryBlurHandler}
          onChange={productCategoryInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Product Category"
        />
        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-6"
          type="submit"
        >
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddProductCategory;
