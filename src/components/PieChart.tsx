import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Months } from "src/utils/months";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartDashboard = ({ orders }: any) => {
  const [month, setMonth] = useState<any>("");
  const [statusGroup, setStatusGroup] = useState<any>([]);

  const filterOrders = orders?.filter((tr: any) => {
    const formDate = moment(tr?.orderDate).format("MMM");
    return formDate === month;
  });

  useEffect(() => {
    setMonth(moment().format("MMM"));
    let pending = 0;
    let rejected = 0;
    let completed = 0;

    filterOrders?.forEach((order: any) => {
      if (order.status === "Pending") return pending++;
      if (order.status === "Rejected") return rejected++;
      if (order.status === "Completed") return completed++;
    });
    setStatusGroup([
      {
        name: "Pending",
        value: pending,
      },
      {
        name: "Rejected",
        value: rejected,
      },
      {
        name: "Completed",
        value: completed,
      },
    ]);
    console.log(orders, statusGroup);
  }, []);
  return (
    <div className="bg-white w-full md:w-[35%] h-[auto] z-4 shadow-3xl rounded-md p-7">
      <div className=" flex justify-between items-center mb-5 p-5">
        <div className="text-gray-800 text-2xl">Order Status</div>
        <div>
          <select
            id="demo-simple-select"
            value={month}
            name="month"
            onChange={(e: any) => setMonth(e.target.value)}
            style={{
              width: "100%",
              marginTop: "8px",
              background: "rgba(249, 250, 252)",
              border: "none",
              fontSize: "12px",
              fontFamily: "Steradian",
              color: "#212B4C",
              height: "30px",
            }}
          >
            {Months?.map((month: any) => (
              <option
                value={month}
                style={{
                  fontSize: "13px",
                  fontFamily: "Steradian",
                  color: "#212B4C",
                  height: "30px",
                }}
                key={month}
              >
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-[60%] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={statusGroup}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusGroup.map((_entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

          {/* <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {COLORS.map((color, i) => (
              <Stack key={color} alignItems="center" spacing={1}>
                <Box sx={{ width: 20, height: 20, background: color }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {statusGroup[i]?.name}
                </Typography>
              </Stack>
            ))}
          </Box> */}
        </ResponsiveContainer>

        <div className="flex w-full items-center justify-around">
          {COLORS.map((color, i) => (
            <div key={color} className="flex flex-col items-center">
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: color,
                  borderRadius: "50%",
                }}
              />
              <div>{statusGroup[i]?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PieChartDashboard;
