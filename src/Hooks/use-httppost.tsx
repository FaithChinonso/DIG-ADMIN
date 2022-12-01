import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify, NotifyType } from "src/components/HotToast";
import { uiActions } from "src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const useHTTPPost = () => {
  const dispatch = useDispatch();

  const send = async ({ url, values, accessToken }: any, dataFunction: any) => {
    dispatch(uiActions.openLoader());
    await axios
      .post(url, values, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        dispatch(uiActions.closeLoader());
        dispatch(uiActions.closedrawer());
        dataFunction(res);
        dispatch(
          uiActions.openToastAndSetContent({
            toastContent: res.data.message,
            backgroundColor: "green",
          })
        );
      })
      .catch((error: any) => {
        dispatch(uiActions.closeLoader());
        console.log(error.message);
        dispatch(
          uiActions.openToastAndSetContent({
            toastContent: error.message,
            backgroundColor: "red",
          })
        );
      });
  };

  return send;
};

export default useHTTPPost;
