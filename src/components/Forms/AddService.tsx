import useInput from "../../Hooks/use-input";
import MuiPhoneNumber from "material-ui-phone-number";
import userPic from "../../assets/image/userPic.svg";
import Image from "next/image";
import { uiActions } from "../../redux/store/ui-slice";
import { useDispatch } from "react-redux";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import { NumericFormat } from "react-number-format";
import { isNotEmpty } from "src/utils/helperFunctions";
import { useEffect, useState } from "react";
import MultipleInput from "../MultipleInput";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import DrawerWrapper from "../DrawerWrapper";
import {
  clearError,
  clearMessage,
  createservice,
  updateservice,
} from "src/redux/store/features/service-slice";
import { serviceApi } from "../api";
import useHTTPGet from "src/Hooks/use-httpget";
import {
  getMyserviceCategories,
  updateserviceCategory,
} from "src/redux/store/features/service-category-slice";

const AddService = ({ id, title }: any) => {
  const dispatch = useAppDispatch();
  const request = useHTTPGet();
  const send = useHTTPPost();
  const { success, loading, error, message } = useAppSelector(
    (state: any) => state.service
  );
  const {
    serviceCategories,
    success: scsuccess,
    loading: scloading,
    error: scerror,
    message: scmessage,
  } = useAppSelector((state: any) => state.serviceCategory);

  const [items, setItems] = useState<any[]>([{ title: "", value: "" }]);

  const [data, setData] = useState({
    service: "",
    description: "",
    experience: "",
    amount: null,
    location: "",
    phone: 0,
    category: "",
  });

  const inputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let handleChange = (index: any, e: any) => {
    let newItems = [...items];

    if (e?.target?.name.startsWith("title")) {
      newItems[index].title = e.target?.value;
    } else if (e?.target?.name.startsWith("value")) {
      newItems[index].value = e?.target?.value;
    }
    setItems(newItems);
  };

  let addFormFields = () => {
    setItems([...items, { title: "", value: "" }]);
  };
  let removeFormFields = (i: any) => {
    let newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  };

  const getAService = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${serviceApi}/single-service/${id}`;
    const dataFunction = (res: any) => {
      setData({
        ...data,
        service: res.data.data.service.serviceName,
        description: res.data.data.service.description,
        experience: res.data.data.service.yearsOfExperience,
        amount: res.data.data.service.pricing,
        location: res.data.data.service.location,
        phone: res.data.data.service.phoneNumber,
        category: res.data.data.category.categoryID,
      });
      setItems(res.data.data.service.other_details);
    };
    console.log(data);
    request({ url, accessToken }, dataFunction);
  };

  const payload = {
    service_name: data.service,
    category_id: data.category,
    years_of_exp: data.experience,
    amount: data.amount,
    location: data.location,
    phone_number: data.phone,
    other_details: JSON.stringify(items),
    description: data.description,
  };

  const createService = () => {
    dispatch(createservice({ payload, id }));
  };
  const updateService = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${serviceApi}/update-service/${id}`;
    const dataFunction = (res: any) => {};
    send({ url, values: payload, accessToken }, dataFunction);
  };
  const submitFormHandler = (e: any) => {
    e.preventDefault();
    if (title === "Update Service") {
      updateService();
    } else {
      createService();
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (title === "Update Service") {
      getAService();
    }
    dispatch(getMyserviceCategories(accessToken));
  }, [title]);
  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
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
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "green",
        })
      );
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(uiActions.closeToast());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  return (
    <DrawerWrapper title={title}>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={submitFormHandler}
      >
        <div className="mt-[10px]">
          <label
            htmlFor="serviceName"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Service Name
          </label>
          <input
            type="text"
            name="service"
            value={data.service}
            id="serviceName"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="service Name "
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="category"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Category
          </label>

          <select
            name="category"
            value={data.category}
            id="category"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Category"
          >
            {serviceCategories?.map((item: any) => (
              <option
                value={item.categoryID}
                key={item.categoryID}
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-[10px]">
          <label
            htmlFor="loaction"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            value={data.location}
            id="locationd"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Location"
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
            name="phone"
            sx={{
              svg: {
                height: "20px",
              },
            }}
            value={data.phone}
            onChange={inputChange}
            autoComplete="off"
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
            required
          />
        </div>
        <div className=" mt-[10px]">
          <label
            htmlFor="experience"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Years Of Experience
          </label>

          <input
            type="number"
            name="experience"
            value={data.experience}
            id="experience"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Years Of Experience"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="description"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={data.description}
            id="description"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Description"
          />
        </div>

        <div className=" mt-[30px]">
          <label
            htmlFor="price"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Amount
          </label>
          <NumericFormat
            name="amount"
            value={data.amount || ""}
            allowNegative={false}
            thousandSeparator={true}
            required
            prefix={"₦"}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            onValueChange={(values: any, sourceInfo: any) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              setData({ ...data, amount: value });
            }}
          />
        </div>
        <div className=" text-base text-[#1D2939] bg-white">Other Details</div>

        {items?.map((element, index) => (
          <MultipleInput
            index={index}
            element={element}
            handleChange={handleChange}
            removeFormFields={removeFormFields}
          />
        ))}
        <div>
          <div onClick={addFormFields} className="text-xs text-gray-600">
            Add Items
          </div>
        </div>

        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto"
          type="submit"
        >
          {title === "Update Service" ? "Update Service" : "Create Service"}
        </button>
      </form>
    </DrawerWrapper>
  );
};
export default AddService;
