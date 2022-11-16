import React from "react";
import { analytics } from "src/utils/analytics";
import CountUp from "react-countup";
import Image from "next/image";

const CardContainer = () => {
  return (
    <div className="p-[10px] md:p-[30px] justify-center md:justify-between grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-center  py-6">
      {analytics.map(item => (
        <div
          className="w-[190px] h-[100px] md:w-[240px] shadow-2xl, rounded-sm items-center p-2 flex justify-between bg-white text-black"
          key={item.id}
          style={{
            boxShadow: "0px 1px 2px 1px #d7d7d7",
          }}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-sm">{item.name}</h3>

            <div className="text-2xl font-extrabold">
              ₦
              <CountUp
                start={0}
                end={item.figure}
                duration={5}
                enableScrollSpy
              />
            </div>
            <h3 className="text-xs">{item.description}</h3>
          </div>
          <div>
            <Image src={item.img} alt={""} />{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
