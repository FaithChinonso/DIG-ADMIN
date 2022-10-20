import ReactTooltip from "react-tooltip";
import styles from "./ToolTip.module.scss";

const ToolTip = ({ children, id, place, effect, backgroundColor }: any) => {
  return (
    <ReactTooltip
      id={id}
      place={place}
      effect={effect}
      backgroundColor={backgroundColor}
    >
      {children}
    </ReactTooltip>
  );
};
export default ToolTip;
