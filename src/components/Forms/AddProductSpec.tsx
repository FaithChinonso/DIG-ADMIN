import React, { useState } from "react";
import useHTTPPost from "src/Hooks/use-httppost";
import MultipleInput from "../MultipleInput";

const AddProductSpec = ({ id }: any) => {
  const [items, setItems] = useState<any[]>([{ title: "", value: "" }]);
  const send = useHTTPPost();

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
  console.log(items);
  const submitFormHandler = (e: any) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/product/add-product-specs/${id}`;
    const dataFunction = (res: any) => {};
    send({ url, items, accessToken }, dataFunction);
  };

  return (
    <form onSubmit={submitFormHandler}>
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
          &plus; Add Items
        </div>
      </div>
      <button
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-6"
        type="submit"
      >
        Add Specification
      </button>
    </form>
  );
};

export default AddProductSpec;
