import useInput from "../../Hooks/use-input";
import MuiPhoneNumber from "material-ui-phone-number";
import { uiActions } from "../../redux/store/ui-slice";
import { useEffect, useState } from "react";
import DrawerWrapper from "../DrawerWrapper";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  createuser,
  fetchMyuser,
  getMerchantCategory,
  getStates,
  updateuser,
} from "src/redux/store/features/user-slice";
import { gender, merchantType, role } from "src/utils/analytics";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userApi } from "../api";
import { ThreeDots } from "react-loader-spinner";
import useHTTPGet from "src/Hooks/use-httpget";
import { errorFunction } from "src/utils/helperFunctions";

const AddUser = ({ title, id }: any) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const request = useHTTPGet();
  const [selectedDate, setSelectedDate] = useState();
  const dispatch = useAppDispatch();
  const {
    success,
    loading,
    loadingCategory,
    loadingState,
    error,
    message,
    states,
    merchantCategory,
  } = useAppSelector((state: any) => state.user);
  const [errorMessage, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [localGovernments, setLocalGovernments] = useState<any[]>([]);
  const dateString: any = selectedDate;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    application_name: "",
    gender: "",
    category: "",
    state: "",
    lga: "",
    address: "",
    merchantType: "",
    dateOfBirth: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeNumber = (event: any) => {
    setPhoneNumber(event);
  };

  const submitFormHandler = (e: any) => {
    e.preventDefault();

    if (data.role === "merchant" && data.merchantType === "") {
      window.scrollTo(0, 0);
      setError(true);
      return;
    }
    if (
      data.application_name === "cue" &&
      (data.state === "" || data.lga === "" || data.address === "")
    ) {
      window.scrollTo(0, 0);
      setError(true);
      return;
    }
    if (data.role === "driver" && formattedDate === "") {
      window.scrollTo(0, 0);
      setError(true);
      return;
    }
    if (
      data.firstname === "" ||
      data.lastname === "" ||
      data.email === "" ||
      data.password === "" ||
      data.role === "" ||
      data.gender === "" ||
      data.category === "" ||
      phoneNumber === 0
    ) {
      setError(true);
      return;
    }

    const payloadConsumer = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: data.role,
      application_name: data.application_name,
      gender: data.gender,
      category: data.category,
      phone: phoneNumber,
    };
    const payloadRider = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: data.role,
      application_name: data.application_name,
      gender: data.gender,
      category: data.category,
      phone: phoneNumber,
      country_id: "160",
      state_id: data.state,
      lga_id: data.lga,
      address: data.address,
    };
    const payloadDriver = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: data.role,
      application_name: data.application_name,
      gender: data.gender,
      category: data.category,
      phone: phoneNumber,
      country_id: "160",
      state_id: data.state,
      lga_id: data.lga,
      address: data.address,
      date_of_birth: formattedDate,
    };
    const payloadMerchant = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: data.role,
      application_name: data.application_name,
      gender: data.gender,
      category: data.category,
      merchant_type: data.merchantType,

      phone: phoneNumber,
    };

    const createUserFunction = () => {
      if (data.role === "merchant") {
        dispatch(createuser(payloadMerchant));
      }
      if (data.role === "consumer") {
        dispatch(createuser(payloadConsumer));
      }
      if (data.role === "rider") {
        dispatch(createuser(payloadRider));
      }
      if (data.role === "driver") {
        dispatch(createuser(payloadDriver));
      }
    };

    const updateUserFunction = () => {
      if (data.role === "merchant") {
        dispatch(updateuser({ payload: payloadMerchant, id }));
      }
      if (data.role === "consumer") {
        dispatch(updateuser({ payload: payloadConsumer, id }));
      }
      if (data.role === "rider") {
        dispatch(updateuser({ payload: payloadRider, id }));
      }
      if (data.role === "driver") {
        dispatch(updateuser({ payload: payloadDriver, id }));
      }
    };

    if (title === "Add User") {
      createUserFunction();
    }
    if (title === "Update User") {
      updateUserFunction();
    }
  };
  const fetchLocalGovernments = async (id: string) => {
    setLoad(true);
    try {
      const response = await fetch(
        `https://easy.unikmarketing.org/api/lgas/${id}`
      );
      const data = await response.json();
      setLoad(false);
      setLocalGovernments(data.data);
    } catch (error) {
      const errorMessage = errorFunction(error);
      setErr(errorMessage);
      setLoad(false);
    }
  };
  useEffect(() => {
    if (title === "Update User") {
      const getAUser = () => {
        const url = `${userApi}/single-user/${id}`;
        const dataFunction = (res: any) => {
          console.log(res);
          const response = res?.data?.data;
          setData({
            ...data,
            firstname: response?.firstName,
            lastname: response?.lastName,
            email: response?.email,
            role: response?.role,
            application_name: response?.applicationName,
            gender: response?.gender,
            password: response?.password,
            category: response?.category,
            state: response?.state,
            lga: response?.lga,
            address: response.address,
            merchantType: response?.profile?.merchantType,
            dateOfBirth: response?.dateOfBirth,
          });
          setPhoneNumber(response?.phone);

          const date = new Date(response?.dateOfBirth);
          const isoDateString = date.toISOString();

          // setSelectedDate(isoDateString);
        };

        request({ url, accessToken }, dataFunction);
      };
      getAUser();
    }
  }, [accessToken]);
  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      window.scrollTo(0, 0);
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          backgroundColor: "red",
        })
      );
      setTimeout(() => {
        dispatch(clearError());
        dispatch(uiActions.closeToast());
      }, 10000);
    }
    if (success) {
      window.scrollTo(0, 0);
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(fetchMyuser(accessToken));
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(uiActions.closeToast());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  useEffect(() => {
    dispatch(getMerchantCategory(""));
    dispatch(getStates({}));
  }, []);

  return (
    <DrawerWrapper title={title}>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={submitFormHandler}
        autoComplete="off"
      >
        {errorMessage && (
          <p className="text-red-400 text-[10px]">
            Fill form correctly to summit
          </p>
        )}

        <div className="mt-[10px]">
          <label
            htmlFor="firstname"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={data.firstname || ""}
            id="firstname"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="First Name "
          />
        </div>
        <div className="mt-[10px]">
          <label
            htmlFor="lastname"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={data.lastname || ""}
            id="lastname"
            onChange={(e: any) => handleChange(e)}
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
            value={data.gender || ""}
            id="gender"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="gender"
          >
            {gender?.map((item: any) => (
              <option
                value={item.value}
                key={item.id}
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="email"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Email Address
          </label>
          <input
            type="text"
            name="email"
            value={data.email}
            id="email"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Email Address"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="password"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Password
          </label>
          <input
            type="text"
            name="password"
            value={data.password || ""}
            id="password"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="password"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="phone"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
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
            value={phoneNumber}
            onChange={onChangeNumber}
            autoComplete="off"
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
            required
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="role"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Role
          </label>

          <select
            name="role"
            value={data.role || ""}
            id="role"
            onChange={e => {
              if (
                e.target.value === "merchant" ||
                e.target.value === "consumer"
              ) {
                setData({
                  ...data,
                  role: e.target.value,
                  application_name: "flip",
                });
              } else {
                setData({
                  ...data,
                  role: e.target.value,
                  application_name: "cue",
                });
              }
            }}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGray w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="role"
          >
            {role?.map((item: any) => (
              <option
                value={item.value}
                key={item.id}
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="category"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Category
          </label>
          {loadingCategory ? (
            <div className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] text-center w-full h-full  px-2 py-3 text-grey">
              <ThreeDots
                width={20}
                height={20}
                color="#122644"
                wrapperStyle={{ margin: "0 auto" }}
              />
            </div>
          ) : (
            <select
              name="category"
              value={data.category || ""}
              id="category"
              onChange={handleChange}
              className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
              placeholder="category"
            >
              <option
                value=""
                key="select"
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                Select Category
              </option>
              {merchantCategory?.map((item: any) => (
                <option
                  value={item.categoryID}
                  key={item.categoryID}
                  className=" text-[10px] text-[#1D2939] bg-white"
                >
                  {item.categoryName}
                </option>
              ))}
            </select>
          )}
        </div>
        {data.role === "merchant" ? (
          <div className=" mt-[30px]">
            <label
              htmlFor="merchantType"
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              merchant Type
            </label>

            <select
              name="merchantType"
              value={data.merchantType || ""}
              id="merchantType"
              onChange={handleChange}
              className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
              placeholder="merchantType"
            >
              {merchantType?.map((item: any) => (
                <option
                  value={item.value}
                  key={item.id}
                  className=" text-[10px] text-[#1D2939] bg-white"
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {data.application_name === "cue" ? (
          <>
            <div className=" mt-[30px]">
              <label
                htmlFor="state"
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                State
              </label>
              {loadingState ? (
                <div className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] text-center w-full h-full  px-2 py-3 text-grey">
                  <ThreeDots
                    width={20}
                    height={20}
                    color="#122644"
                    wrapperStyle={{ margin: "0 auto" }}
                  />
                </div>
              ) : (
                <select
                  name="state"
                  value={data.state || ""}
                  id="state"
                  onChange={e => {
                    handleChange(e);
                    fetchLocalGovernments(e?.target?.value);
                  }}
                  className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
                  placeholder="State"
                >
                  <option
                    value=""
                    key="select"
                    className=" text-[10px] text-[#1D2939] bg-white"
                  >
                    Select State
                  </option>
                  {states?.map((item: any) => (
                    <option
                      value={item.stateID}
                      key={item.stateID}
                      className=" text-[10px] text-[#1D2939] bg-white"
                    >
                      {item.stateName}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className=" mt-[30px]">
              <label
                htmlFor="state"
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                LGA
              </label>
              {load ? (
                <div className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] text-center w-full h-full  px-2 py-3 text-grey">
                  <ThreeDots
                    width={20}
                    height={20}
                    color="#122644"
                    wrapperStyle={{ margin: "0 auto" }}
                  />
                </div>
              ) : (
                <select
                  name="lga"
                  value={data.lga || ""}
                  id="lga"
                  onChange={e => {
                    handleChange(e);
                  }}
                  className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
                  placeholder="LGA"
                >
                  <option
                    value=""
                    key="select"
                    className=" text-[10px] text-[#1D2939] bg-white"
                  >
                    Select LGA
                  </option>
                  {localGovernments?.map((item: any) => (
                    <option
                      value={item.lgaID}
                      key={item.lgaID}
                      className=" text-[10px] text-[#1D2939] bg-white"
                    >
                      {item.lgaName}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className=" mt-[30px]">
              <label
                htmlFor="address"
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                address
              </label>
              <input
                type="text"
                name="address"
                value={data.address || ""}
                id="address"
                onChange={handleChange}
                className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
                placeholder="Address"
              />
            </div>
          </>
        ) : null}
        {data.role === "driver" ? (
          <div className=" mt-[30px]">
            <label
              htmlFor="date"
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              Date of Birth
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: any) => setSelectedDate(date)}
              dateFormat="yyyy-mm-dd"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText="Select Date of Birth"
              className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            />
          </div>
        ) : null}

        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-2"
          type="submit"
        >
          {loading ? "Submitting" : title}
        </button>
      </form>
    </DrawerWrapper>
  );
};
export default AddUser;
