import { ReactNode, useState, useEffect } from "react";

const Card = ({
  children,
  width,
  height,
  backgroundColor = "#ffffff",
}: {
  children: ReactNode;
  width: { desktop: string; mobile: string };
  height: string;
  backgroundColor: string;
}) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 600);
  };
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  return (
    <div
      className="shadow-2xl, rounded-md"
      style={{
        width: isDesktop ? width.desktop : width.mobile,
        backgroundColor: backgroundColor,
        height,
      }}
    >
      {children}
    </div>
  );
};
export default Card;
