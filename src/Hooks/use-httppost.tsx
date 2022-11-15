import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify, NotifyType } from "src/components/HotToast";
import { uiActions } from "src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const useHTTPPost = () => {
  const dispatch = useDispatch();

  const request = async (
    { url, values, accessToken }: any,
    dataFunction: any
  ) => {
    await axios
      .post(url, values, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        dataFunction(res);
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

export default useHTTPPost;
