import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/store/ui-slice";
import Cancel from "../assets/cancel.png";
import CloseIcon from "../assets/images/ant-design_close-circle-outlined.svg";
import { Bars } from "react-loader-spinner";
import { useAppSelector } from "src/Hooks/use-redux";

const styles = {
  loaderContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 20000000,
  } as CSSProperties,
};

export default function Loader() {
  const { loaderOpened } = useAppSelector((state: any) => state.ui);

  return (
    <>
      {loaderOpened ? (
        <div style={styles.loaderContainer}>
          <Bars color="#0157ff" height={33} width={35} />
          <div
            style={{
              fontFamily: "SteradianBold",
              color: "#0157ff",
              fontSize: "17px",
              paddingTop: "8px",
            }}
          >
            Loading...
          </div>
        </div>
      ) : null}
    </>
  );
}
