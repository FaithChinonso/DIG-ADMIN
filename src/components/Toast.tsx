import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/store/ui-slice";
import Cancel from "../assets/cancel.png";
import CloseIcon from "../assets/images/ant-design_close-circle-outlined.svg";
import { useAppDispatch } from "src/Hooks/use-redux";

export default function Toast() {
  const dispatch = useAppDispatch();
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);
  const { toastOpened, toastContent, backgroundColor } = useSelector(
    (state: any) => state.ui
  );

  const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(uiActions.closeToast());
  };
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
      bgcolor: "#FFFFFF",
    } as React.CSSProperties,
    messageBox: {
      width: isDesktop ? "591px" : "90%",
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
  const updateMedia = () => {
    if (typeof window !== "undefined") {
      setDesktop(window.innerWidth > 600);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
    }
    console.log(backgroundColor);
  });

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
          <div
            style={{
              backgroundColor: backgroundColor,
              ...styles.messageBox,
            }}
          >
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
                backgroundColor,
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
