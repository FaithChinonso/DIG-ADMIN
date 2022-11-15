import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify, NotifyType } from "src/components/HotToast";

const useHTTPGet = () => {
  const dispatch = useDispatch();

  const request = async ({ url, accessToken }: any, dataFunction: any) => {
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        dataFunction(res);
        Notify({ type: NotifyType.success, message: res?.data?.message });
      })
      .catch((error: any) => {
        if (error.response) {
          Notify({ message: "" });
        } else if (error.request) {
          Notify({ message: "A Error occured on our end" });
        } else {
          Notify({ message: "A Error occured" });
        }
      });
  };

  return request;
};

export default useHTTPGet;
