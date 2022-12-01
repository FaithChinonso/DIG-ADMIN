import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify, NotifyType } from "src/components/HotToast";
import { uiActions } from "src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const useHTTPDelete = () => {
  const dispatch = useDispatch();

  const remove = async ({ url, accessToken }: any, dataFunction: any) => {
    dispatch(uiActions.openLoader());
    await axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        dispatch(uiActions.closeLoader());
        dataFunction(res);
        dispatch(uiActions.closedrawer());
        dispatch(
          uiActions.openToastAndSetContent({
            toastContent: res.data.message,
            backgroundColor: "rgba(24, 160, 251, 1)",
          })
        );
      })
      .catch((error: any) => {
        dispatch(uiActions.closeLoader());
        if (error.response) {
          dispatch(
            uiActions.openToastAndSetContent({
              toastContent: error.response.data.message,
              backgroundColor: "red",
            })
          );
        } else if (error.request) {
          dispatch(
            uiActions.openToastAndSetContent({
              toastContent: "A Error occured on our end",
              backgroundColor: "red",
            })
          );
        } else {
          dispatch(
            uiActions.openToastAndSetContent({
              toastContent: "A Error occured",
              backgroundColor: "red",
            })
          );
        }
      });
  };

  return remove;
};

export default useHTTPDelete;
