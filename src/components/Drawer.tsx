import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const DrawerCard = ({ title, open, toggleDrawer, children }: any) => {
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
  if (typeof window === "undefined") {
    return <div></div>;
  }
  return (
    <div>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        direction={isDesktop ? "right" : "bottom"}
        zIndex={1200}
        size={isDesktop ? 483 : 500}
        style={{
          overflowY: "scroll",
          maxHeight: "100vh",
        }}
      >
        <div className="flex py-9 px-[26px]  border-b border-softGray">
          <div className="font-bold text-darkPurple text-lg">{title}</div>
          <div className="text-lg text-lightGray">&times;</div>
        </div>
        <div className="text-lg text-lightGray p-8">{children}</div>
      </Drawer>
    </div>
  );
};
export default DrawerCard;
