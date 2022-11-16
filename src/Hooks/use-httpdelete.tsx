import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify, NotifyType } from "src/components/HotToast";
import { uiActions } from "src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const useHTTPDelete = () => {
  const dispatch = useDispatch();

  const remove = async ({ url, accessToken }: any, dataFunction: any) => {
    await axios
      .delete(url, {
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
        alert(error);
      });
  };

  return remove;
};

export default useHTTPDelete;
