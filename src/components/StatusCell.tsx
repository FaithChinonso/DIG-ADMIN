import React, { Fragment } from "react";
import { StatusColor } from "../utils/setStatusColor";
import ToolTip from "./ToolTip";

export default function StatusCell({ status, type = "" }: any) {
  const capitlaizeStatus = status?.charAt(0).toUpperCase() + status?.slice(1);
  const statusArray = [
    { name: "New Request", id: 1, desc: "A New Request" },
    { name: "Sent", id: 2, desc: "Request has been SENT to service provider" },
    {
      name: "Pending",
      id: 3,
      desc: "Request has been VIEWED by service provider",
    },
    {
      name: "In Progress",
      id: 4,
      desc: "Payment has been made and Service Provider has began service",
    },
    {
      name: "Accepted",
      id: 5,
      desc: "Request has been ACCEPTED by service provider",
    },
    {
      name: "Completed",
      id: 8,
      desc: "Service Provider has COMPLETED service",
    },
    { name: "Done", id: 9, desc: "Service has been cofirmed DONE by customer" },
    {
      name: "Rejected",
      id: 10,
      desc: "Request was Rejected by Service Provider",
    },
  ];
  return (
    <Fragment>
      <div
        style={{ color: StatusColor(capitlaizeStatus) }}
        data-tip
        data-for={capitlaizeStatus}
      >
        {" "}
        {capitlaizeStatus}{" "}
      </div>
      {type === "businessService" && (
        <ToolTip
          id={capitlaizeStatus}
          place="bottom"
          effect="solid"
          backgroundColor="white"
        >
          <div
            style={{
              width: "350px",
              backgroundColor: "white",
              opacity: 1,
              padding: "10px",
              zIndex: 300,
              borderRadius: "20px",
              boxShadow: "2px 2px 5px 2px #9e9e9e",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {statusArray
              .filter((item: any) => {
                return item.name === capitlaizeStatus;
              })
              .map((item: any) => (
                <div
                  style={{
                    fontSize: "12px",
                    color: StatusColor(item.name),
                  }}
                >
                  {item.name}:{" "}
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#9e9e9e",
                      marginLeft: "5px",
                    }}
                  >
                    {item.desc}
                  </span>
                </div>
              ))}
          </div>
        </ToolTip>
      )}
    </Fragment>
  );
}
