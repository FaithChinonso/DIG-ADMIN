import React, { useEffect, useState } from "react";
import useInput from "src/Hooks/use-input";
import userPic from "../../assets/image/userPic.svg";
import cardImage from "../../assets/image/cardImage.jpg";
import { Notify, NotifyType } from "../HotToast";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { uiActions } from "src/redux/store/ui-slice";
import useHTTPPost from "src/Hooks/use-httppost";
import DeleteIcon from "../../assets/image/delete-icon.svg";
import Image from "next/image";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import UploadButton from "../UploadButton";

const AddProductCategory = ({ type }: any) => {
  const send = useHTTPPost();
  const [image, setImage] = React.useState("string");
  const [name, setName] = React.useState("");

  const handleChange = (e: any) => {
    const file = e.target.value;
    setName(file);
  };

  const uploadHandler = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };
  console.log(name, image);

  const createCategory = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(name, image);
    const res = await axios.post(
      "https://backendapi.flip.onl/api/admin/productcategory/create-product-category",
      {
        name: name,
        image: image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(name, image);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <input
        type="file"
        accept="image/png, image/jpg, image/gif, image/jpeg"
        onChange={uploadHandler}
        id="image"
        name="image"
      />
      <input name="text" value={name} onChange={handleChange} />

      <button
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-6"
        onClick={createCategory}
      >
        Add Category
      </button>
    </div>
  );
};

export default AddProductCategory;
