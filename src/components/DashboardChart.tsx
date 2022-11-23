import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { ChartType, Transaction, TransactionData } from "../@types/chart";
import { useEffect, useState } from "react";
import { Months } from "src/utils/months";

const DashboardChart = ({ transaction }: any) => {
  const [month, setMonth] = useState<any>("");
  useEffect(() => {
    setMonth(moment().format("MMM"));
  }, []);
  const filterTransactions = transaction?.filter((tr: any) => {
    const formDate = moment(tr?.transDate).format("MMM");
    console.log(formDate);
    return formDate === month;
  });
  const data = filterTransactions?.map((pc: any) => {
    const wallet = pc.paymentMethod === "wallet" ? pc?.amount : 0;
    const paystack = pc.paymentMethod === "paystack" ? pc?.amount : 0;
    return {
      date: moment(pc?.transDate).format("dddd, h:mm a"),
      wallet,
      paystack,
    };
  });
  const transactionFlow: number[] = data?.map((pc: any) => {
    return pc?.wallet || pc?.paystack;
  });
  const mode = Math.max(...(transactionFlow || []));
  return (
    <div className="w-full">
      <div className="flex gap-4 md:gap-0 flex-col justify-between items-start md:items-center md:p-5 w-full md:flex-row ">
        <div className="text-gray-800 text-3xl">Transactions</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "35%",
          }}
        >
          <div className="flex items-center">
            <div className="bg-lightPurple h-2 w-2 rounded-[100px] mr-2" />
            <div className="text-gray-800 text-1xl">Wallet</div>
          </div>
          <div className="flex items-center">
            <div className="bg-[#00ff00] h-2 w-2 rounded-[100px] mr-2" />
            <div className="text-gray-800 text-1xl">Paystack</div>
          </div>
        </div>

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
      <ResponsiveContainer height={300} width="100%" className="">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="0 100" />
          <XAxis
            dataKey="date"
            type="number"
            padding={{ left: 40, right: 30 }}
            tick={false}
            label={{ value: month.toUpperCase() }}
          />
          {filterTransactions?.length > 1 ? (
            <YAxis domain={[0, mode]} />
          ) : (
            <YAxis />
          )}
          <Legend />
          <Area
            type="monotone"
            dataKey="wallet"
            stackId="1"
            stroke="rgba(107, 93, 211, 0.4)"
            fill="rgba(107, 93, 211, 0.4)"
            activeDot={{ r: 8 }}
            strokeWidth={1.5}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="paystack"
            stackId="1"
            stroke="rgba(107, 93, 211, 1)"
            fill="rgba(107, 93, 211, 0.4))"
            activeDot={{ r: 8 }}
            strokeWidth={1.5}
            style={{ fontFamily: "Steradian !important" }}
            dot={false}
          />

          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>{" "}
    </div>
  );
};
export default DashboardChart;
