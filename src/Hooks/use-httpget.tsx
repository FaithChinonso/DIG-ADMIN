import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify, NotifyType } from "src/components/HotToast";
import { useAppDispatch } from "./use-redux";
import { uiActions } from "src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const useHTTPGet = () => {
  const dispatch = useAppDispatch();

  const request = async (
    { url, accessToken }: any,
    dataFunction: any,
    alert: any = "dont"
  ) => {
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log(res);
        dataFunction(res);
        if (alert === "send") {
          dispatch(
            uiActions.openToastAndSetContent({
              toastContent: res.data.message,
              backgroundColor: "green",
            })
          );
        }
      })
      .catch((error: any) => {
        dispatch(
          uiActions.openToastAndSetContent({
            toastContent: error.message,
            backgroundColor: "red",
          })
        );
      });
  };

  return request;
};

export default useHTTPGet;
