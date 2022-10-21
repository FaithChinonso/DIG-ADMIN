import useInput from "../../Hooks/use-input";
import MuiPhoneNumber from "material-ui-phone-number";
import { OutlinedInput } from "@material-ui/core";
import UploadInputButtons from "../UploadInputButtons";
import userPic from "../../assets/image/userPic.svg";
import Image from "next/image";
import { uiActions } from "../../redux/store/ui-slice";
import { useDispatch } from "react-redux";
import SuccessfulModal from "../ModalContent/SuccessfulModal";

const AddFleet = ({ toggleDrawer }: any) => {
  const dispatch = useDispatch();
  const isNotEmpty = (value: string) => value.trim() !== "";
  const isEmail = (value: any) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  const gender = [
    { id: 1, name: "Female" },
    { id: 2, name: "Male" },
  ];
  const {
    enteredInput: enteredfirstName,
    hasError: firstNameHasError,
    reset: firstNameReset,
    errorMessage: firstNameError,
    inputIsValid: firstNameIsValid,
    updateInputHandler: firstNameInputHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredLastName,
    hasError: lastNameHasError,
    reset: lastNameReset,
    errorMessage: lastNameError,
    inputIsValid: lasttNameIsValid,
    updateInputHandler: lastNameInputHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredGender,
    hasError: genderHasError,
    reset: genderNameReset,
    errorMessage: genderError,
    inputIsValid: genderIsValid,
    updateInputHandler: genderInputHandler,
    inputBlurHandler: genderBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  const {
    enteredInput: enteredEmail,
    hasError: emailHasError,
    reset: emailReset,
    errorMessage: emailError,
    inputIsValid: emailIsValid,
    updateInputHandler: emailInputHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail, "Email is not valid");

  const {
    enteredInput: enteredPhoneNumber,
    hasError: phoneNumberHasError,
    reset: phoneNumberReset,
    errorMessage: phoneNumberError,
    inputIsValid: phoneNumberIsValid,
    updateInputHandler: phoneNumberInputHandler,
    inputBlurHandler: phoneNumberBlurHandler,
  } = useInput(isNotEmpty, "This field cannot be empty");
  return (
    <form className="w-full h-full flex flex-col">
      <label htmlFor="resume" className="secondary text-sm font-medium mx-auto">
        <Image src={userPic} />
        <input
          type="file"
          name="resume"
          id="resume"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          className="hidden"
        />{" "}
        {/* <div className=" border-dotted border-2 border-[#E7E7E7] bg-[#F9FAFC] px-[28px] py-[18px] w-full mt-[24px]">
            <div className="text-[12px] text-secondary leadig-[20px]">
              Drag a file here or browse for a file to upload.
            </div>

            <div className="text-[10px] leading-[13px] text-[#718096]">
              Supported file types: JPEG, PNG. Max file size: 5MB
            </div>
          </div> */}
      </label>

      <div className="mt-[10px]">
        <label
          htmlFor="firstName"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={enteredfirstName}
          id="firstName"
          onBlur={firstNameBlurHandler}
          onChange={firstNameInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="First Name "
        />
      </div>
      <div className="mt-[10px]">
        <label
          htmlFor="lastName"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={enteredLastName}
          id="lastName"
          onBlur={lastNameBlurHandler}
          onChange={lastNameInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Last Name"
        />
      </div>
      <div className=" mt-[10px]">
        <label
          htmlFor="gender"
          className=" text-[10px] text-[#1D2939] bg-white"
        >
          Gender
        </label>

        <select
          name="gender"
          value={enteredGender}
          id="gender"
          onChange={genderInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="gender"
        >
          {gender?.map((priceType: any) => (
            <option
              value={priceType.name}
              key={priceType.id}
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              {priceType.name}
            </option>
          ))}
        </select>
      </div>
      <div className=" mt-[30px]">
        <label htmlFor="email" className=" text-[10px] text-[#1D2939] bg-white">
          Email Address
        </label>
        <input
          type="text"
          name="email"
          value={enteredEmail}
          id="email"
          onBlur={emailBlurHandler}
          onChange={emailInputHandler}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          placeholder="Email Address"
        />
      </div>
      <div className=" mt-[30px]">
        <label htmlFor="email" className=" text-[10px] text-[#1D2939] bg-white">
          Phone Number
        </label>
        <MuiPhoneNumber
          defaultCountry={"ng"}
          name="businessPhoneNumber"
          sx={{
            svg: {
              height: "20px",
            },
          }}
          value={enteredPhoneNumber}
          onChange={() => {}}
          className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
          required
        />
      </div>
      <button
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto"
        onClick={(e: any) => {
          e.preventDefault();
          toggleDrawer();
          dispatch(
            uiActions.openModalAndSetContent({
              modalStyles: {
                padding: 0,
              },
              modalContent: (
                <SuccessfulModal
                  title="User Added Sucessfully"
                  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo orci nisi pulvinar eu massa proin sed. "
                />
                // <div>i am here now </div>
              ),
            })
          );
        }}
      >
        Add User
      </button>
    </form>
  );
};
export default AddFleet;
