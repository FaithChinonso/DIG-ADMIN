import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/store/ui-slice";
import Cancel from "../assets/cancel.png";
import CloseIcon from "../assets/images/ant-design_close-circle-outlined.svg";
import { useAppDispatch } from "src/Hooks/use-redux";

const styles = {
  main: {
    backgroundColor: "rgba(137, 146, 163, 0.1)",
    zIndex: 19000,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "scroll",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",

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
    backgroundColor: "red",
    width: "591px",
    height: "50px",
    overflow: "auto",
    borderRadius: "5px",
    color: "white",
    top: 2,
    right: 2,
    textAlign: "center",
    position: "absolute",
  } as React.CSSProperties,
};

export default function Toast() {
  const dispatch = useAppDispatch();
  const toastOpened = useSelector((state: any) => state.ui.toastOpened);
  const toastContent = useSelector((state: any) => state.ui.toastContent);

  const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(uiActions.closeToast());
  };
  {
    toastContent;
  }
  return (
    <>
      {toastOpened ? (
        <div
          style={{
            ...styles.main,
            left: 0,
            zIndex: 1900000,
          }}
          onClick={e => Close(e)}
        >
          <div style={{ ...styles.messageBox }}>
            <div
              onClick={e => {
                e.stopPropagation();
              }}
              style={{
                marginTop: "0px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div className="text-white text-center">{toastContent}</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
