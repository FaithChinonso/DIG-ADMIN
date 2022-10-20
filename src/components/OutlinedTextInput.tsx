import * as React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles, Select } from "@material-ui/core";
// import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useDispatch } from "react-redux";

interface TextInputProps {
  inputLabel: string;
  inputType?: string;
  inputShrink?: boolean;
  required?: boolean;
  InputHelper?: string;
  inputSelect?: boolean;
  inputOption?: string[] | number[];
  multiline?: boolean;
  inputName: string;
  inputValue?: string | number;
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

const OutlineTextInput = ({
  inputLabel,
  inputType,
  required,
  InputHelper,
  inputShrink,
  inputSelect = false,
  inputOption,
  multiline = false,
  inputName,
  inputValue,
  handleChange,
}: TextInputProps) => {
  const dispatch = useDispatch();
  interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

  const useStyles = makeStyles({
    root: { color: "orange !important" },
    cssFocused: {
      fontFamily: "Steradian",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px !important",
      lineHeight: "15px",
      color: "#fffff !important",
    },
    cssLabel: {
      color: "rgba(255, 255, 255, 0.81)",
    },
    cssOutlinedInput: {
      "&$cssFocused $notchedOutline": {
        borderColor: `rgba(255, 255, 255, 0.86) !important`,
        borderWidth: "1px !important",
      },
    },
    notchedOutline: {
      borderColor: "rgba(255, 255, 255, 0.21) !important",
    },
    helperText: {
      fontFamily: "Steradian",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "15px",
      color: "#A9A9A9 !important",
    },
  });
  const classes = useStyles();
  return (
    <TextField
      id="outlined-basic"
      label={inputLabel}
      onChange={handleChange}
      placeholder={inputLabel}
      select={inputSelect}
      required={required}
      classes={{ root: classes.root }}
      className="text-black text-sm "
      name={inputName}
      value={inputValue}
      variant="outlined"
      multiline={multiline}
      type={inputType ? inputType : ""}
      helperText={InputHelper ? InputHelper : ""}
      FormHelperTextProps={{ classes: { root: classes.helperText } }}
      rows={multiline ? 4 : ""}
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
        shrink: inputShrink,
      }}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
      }}
    >
      {inputOption?.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </TextField>
  );
};

export default OutlineTextInput;
