import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { uiActions } from "../redux/store/ui-slice";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import ModalAction from "./ModalContent/ModalAction";

const ActionList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-end py-5 gap-3 z-30 relative">
      {" "}
      <button className="text-sm text-lightPurple border-2 border-lightPurple py-3 px-4 rounded-md flex items-center justify-center">
        <ActionMenuBase
          items={
            <>
              <ActionMenuItem
                name="Suspend"
                onClickFunction={() =>
                  dispatch(
                    uiActions.openModalAndSetContent({
                      modalStyles: {
                        padding: 0,
                      },
                      modalContent: (
                        <>
                          <ModalAction action="Suspend" item="user" />
                        </>
                      ),
                    })
                  )
                }
              />
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
                          <ModalAction action="Deactivate" item="user" />
                        </>
                      ),
                    })
                  )
                }
              />
              <ActionMenuItem
                name="Under Review"
                onClickFunction={() =>
                  dispatch(
                    uiActions.openModalAndSetContent({
                      modalStyles: {
                        padding: 0,
                      },
                      modalContent: (
                        <>
                          <ModalAction action="Review" item="user" />
                        </>
                      ),
                    })
                  )
                }
              />
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
