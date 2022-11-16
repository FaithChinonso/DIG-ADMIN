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
        dataFunction(res);
        if (alert === "send") {
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
        }
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  return request;
};

export default useHTTPGet;
