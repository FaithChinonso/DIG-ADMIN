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
        dataFunction(res);
        console.log("here");
        dispatch(
          uiActions.openModalAndSetContent({
            modalStyles: {
              padding: 0,
            },
            modalContent: (
              <>
                <SuccessfulModal
                  title="Successfull"
                  message={res.data.message}
                />
              </>
            ),
          })
        );
      })
      .catch((error: any) => {
        dispatch(uiActions.closeLoader());
        if (error.response) {
          Notify({ message: "" });
        } else if (error.request) {
          Notify({ message: "A Error occured on our end" });
        } else {
          Notify({ message: "A Error occured" });
        }
      });
  };

  return send;
};

export default useHTTPPost;
