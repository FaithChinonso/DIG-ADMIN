import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function Loader() {
  const { loaderOpened } = useSelector((state: any) => state.ui);

  return (
    <>
      {loaderOpened ? (
        <div className="flex justify-center items-center z-100">
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
