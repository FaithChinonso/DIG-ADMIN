import React from "react";

import OperantLogo from "../assets/operant-transparent.png";
import Button from "@mui/material/Button";
import OutlineTextInput from "./OutlinedTextInput";
import DeleteIcon from "../assets/image/delete-icon.svg";
import userPic from "../assets/image/userPic.svg";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const UploadInputButton = ({
  classes,
  handleChange,
  inputValue,
  inputName,
  isFilePicked,
  data,
  saveData,
  onDelete,
  setIsFilePicked,
  selectedFile,
  required,
  helpText,
}: any) => {
  const dispatch = useDispatch();
  return (
    <>
      <Button variant="text" component="label">
        <div className="flex flex-col items-center">
          <div style={{ display: "none" }}>
            <OutlineTextInput
              handleChange={handleChange}
              inputName={inputName}
              inputLabel=""
              InputHelper="Select"
              inputType="file"
              inputShrink
              inputValue={inputValue}
              required={required}
            />
          </div>

          <Image src={userPic} />

          <div className="text-[10px]">
            {helpText ||
              "All file types supported: JPEG, JPG, PNG, PDF. Max file size: 2mb"}
          </div>
        </div>
        <input type="file" hidden />
      </Button>

      {data ? (
        <div className="text-md">
          <object
            data={data}
            width="200"
            height="200"
            style={{ marginTop: "10px", objectFit: "cover" }}
          ></object>
          {data ? (
            <div className="text-md" onClick={onDelete}>
              <Image src={DeleteIcon} />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default UploadInputButton;
