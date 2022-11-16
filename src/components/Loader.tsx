import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/store/ui-slice";
import Cancel from "../assets/cancel.png";
import CloseIcon from "../assets/images/ant-design_close-circle-outlined.svg";

const styles = {
  main: {
    backgroundColor: "rgba(137, 146, 163, 0.5)",
    zIndex: 16000,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "scroll",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "24px",

    // position: "absolute" as "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // width: 800,
    bgcolor: "#FFFFFF",
    //   border: "2px solid #000",
    // height: "500px",
    // overflow: "scroll",
  } as React.CSSProperties,
  messageBox: {
    backgroundColor: "transaparent",
    // width: "591px",
    overflow: "auto",
    textAlign: "center",
    position: "relative",
  } as React.CSSProperties,
};

export default function Modal() {
  const { modalOpened, modalContent, modalStyles } = useSelector(
    (state: any) => state.ui
  );
  const dispatch = useDispatch();

  const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(uiActions.closeModal(false));
  };
  return (
    <>
      {modalOpened ? (
        <div
          style={{
            ...styles.main,
            left: 0,
            zIndex: 16000,
          }}
          onClick={e => Close(e)}
        >
          <div style={{ ...styles.messageBox, ...modalStyles }}>
            <div
              onClick={e => {
                e.stopPropagation();
              }}
              style={{ marginTop: "0px", backgroundColor: "white" }}
            >
              {modalContent}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
