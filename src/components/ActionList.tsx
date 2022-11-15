import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import { uiActions } from "../redux/store/ui-slice";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import ModalAction from "./ModalContent/ModalAction";

const ActionList = ({ user, type, setIsOpen }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const request = useHTTPGet();
  const remove = useHTTPDelete();

  const deleteUser = async (id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/user/delete-user/${id}`;
    const dataFunction = (res: any) => {};
    remove({ url, accessToken }, dataFunction);
  };
  const editUser = async (id: any, endpoint: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/user/${endpoint}/${id}`;
    const dataFunction = (res: any) => {};
    request({ url, accessToken }, dataFunction);
  };
  return (
    <div className="w-full flex items-center justify-end py-5 gap-3 z-30 relative">
      {" "}
      <button className="text-sm text-lightPurple border-2 border-lightPurple py-3 px-4 rounded-md flex items-center justify-center">
        <ActionMenuBase
          items={
            <>
              {user?.isActive === true ? (
                <ActionMenuItem
                  name="Deactivate"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              action="Deactivate"
                              item="user"
                              actionFunction={() =>
                                editUser(user?.userID, "deactivate-user")
                              }
                            />
                          </>
                        ),
                      })
                    )
                  }
                />
              ) : (
                <ActionMenuItem
                  name="Activate"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              action="Activate"
                              item="user"
                              actionFunction={() =>
                                editUser(user?.userID, "activate-user")
                              }
                            />
                          </>
                        ),
                      })
                    )
                  }
                />
              )}

              <ActionMenuItem
                name="Delete"
                onClickFunction={() =>
                  dispatch(
                    uiActions.openModalAndSetContent({
                      modalStyles: {
                        padding: 0,
                      },
                      modalContent: (
                        <>
                          <ModalAction
                            action="delete"
                            item="user"
                            actionFunction={() => deleteUser(user?.userID)}
                          />
                        </>
                      ),
                    })
                  )
                }
              />
              {type === "merchant" && (
                <ActionMenuItem
                  name="Add Product"
                  onClickFunction={() => {
                    setIsOpen(true);
                  }}
                />
              )}
            </>
          }
          text="Actions"
          type="export"
        />
        <span
          style={{ marginLeft: "5px", fontSize: "20px", translate: "0 -4px" }}
        >
          &#8964;
        </span>
      </button>
      <button
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center"
        onClick={() => router.back()}
      >
        <span style={{ marginRight: "5px", fontSize: "20px" }}>&lt;</span>
        Back to List
      </button>
    </div>
  );
};
export default ActionList;
