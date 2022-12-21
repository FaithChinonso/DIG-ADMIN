import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/store/ui-slice";
import Cancel from "../assets/cancel.png";
import CloseIcon from "../assets/images/ant-design_close-circle-outlined.svg";
import { useAppDispatch } from "src/Hooks/use-redux";

export default function DrawerCard() {
  if (typeof window === "undefined") return;
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);
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
  });

  const styles = {
    main: {
      backgroundColor: "rgba(137, 146, 163, 0.1)",
      zIndex: 16000,
      position: "fixed",
      top: 0,
      right: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      overflow: "scroll",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "24px",
      bgcolor: "#FFFFFF",
    } as React.CSSProperties,
    mobile: {
      backgroundColor: "white",
      width: "95vw",
      overflow: "auto",
      height: "70vh",
      bottom: 0,
      maxHeight: "70vh",

      position: "absolute",
    } as React.CSSProperties,
    desktop: {
      backgroundColor: "white",
      width: 483,
      overflow: "auto",
      height: "100vh",
      top: 0,
      right: 0,
      position: "absolute",
    } as React.CSSProperties,
  };
  const styled = isDesktop ? styles.desktop : styles.mobile;

  const dispatch = useAppDispatch();
  const drawerOpened = useSelector((state: any) => state.ui.drawerOpened);
  const drawerContent = useSelector((state: any) => state.ui.drawerContent);
  const drawerStyles = useSelector((state: any) => state.ui.drawerStyles);

  const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(uiActions.closedrawer());
  };
  return (
    <>
      {drawerOpened ? (
        <div
          style={{
            ...styles.main,

            zIndex: 1600000,
          }}
          onClick={e => Close(e)}
        >
          <div
            style={{
              ...styled,
              ...drawerStyles,
            }}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <div
              className="text-3xl text-darkPurple absolute top-7 right-5 "
              onClick={e => Close(e)}
            >
              &times;
            </div>
            <div>{drawerContent}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
