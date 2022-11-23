import React from "react";
import { analytics } from "src/utils/analytics";
import CountUp from "react-countup";
import Image from "next/image";
import green from "../assets/image/green.jpeg";
import orange from "../assets/image/orange.jpeg";
import blue from "../assets/image/blue.jpeg";

const CardContainer = ({ orders, transaction, users }: any) => {
  function sumofArray(sum: any, num: any) {
    return sum + num;
  }
  const totalSales = orders
    ?.map((item: any) => {
      return Number(item.price);
    })
    .reduce(sumofArray, 0);

  const totalTransactions = transaction
    ?.map((item: any) => {
      return Number(item.amount);
    })
    .reduce(sumofArray, 0);

  console.log(totalSales);
  const totalOrders = orders.length;
  const totalUsers = users.length;

  console.log(totalSales);

  const cardData = [
    {
      id: 1,
      name: "Total Sales",
      figures: totalSales,
      img: orange,
      type: "number",
    },
    {
      id: 2,
      name: "Total Revenue",
      figures: totalTransactions,
      img: green,
      type: "number",
    },
    {
      id: 3,
      name: "Total Orders",
      figures: totalOrders,
      img: blue,
      type: "string",
    },
    {
      id: 4,
      name: "Total Users",
      figures: totalUsers,
      img: orange,
      type: "string",
    },
  ];

  return (
    <div className="p-[10px] md:p-[30px] justify-center md:justify-between grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-center  py-6">
      {cardData.map(item => (
        <div
          className="w-[190px] h-[100px] md:w-[240px] shadow-2xl, rounded-sm items-center p-2 flex justify-between bg-white text-black"
          key={item.id}
          style={{
            boxShadow: "0px 1px 2px 1px #d7d7d7",
          }}
        >
          <div className="flex flex-col h-full justify-center">
            <h3 className="text-sm">{item.name}</h3>

            <div className="text-2xl font-extrabold">
              <span>{item.type === "number" ? "₦" : ""}</span>
              <CountUp
                start={0}
                end={item.figures}
                duration={5}
                enableScrollSpy
              />
            </div>
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
