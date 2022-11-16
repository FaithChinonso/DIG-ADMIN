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

const DashboardChart = ({ transaction }: ChartType) => {
  const [month, setMonth] = useState<any>("");
  useEffect(() => {
    setMonth(moment().format("MMM"));
  }, []);
  const filterTransactions = transaction?.filter((tr: Transaction) => {
    const formDate = moment(tr?.createdAt).format("MMM");
    return formDate === month;
  });
  const data: TransactionData[] = filterTransactions?.map((pc: Transaction) => {
    const outflow = pc.transactionType === "debit" ? pc?.amount : 0;
    const inflow = pc.transactionType === "credit" ? pc?.amount : 0;
    return {
      date: moment(pc?.createdAt).format("dddd, h:mm a"),
      outflow,
      inflow,
    };
  });
  const transactionFlow: number[] = data?.map((pc: any) => {
    return pc?.outflow || pc?.inflow;
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
            <div className="text-gray-800 text-1xl">OUTFLOW</div>
          </div>
          <div className="flex items-center">
            <div className="bg-[#00ff00] h-2 w-2 rounded-[100px] mr-2" />
            <div className="text-gray-800 text-1xl">INFLOW</div>
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
            dataKey="outflow"
            stackId="1"
            stroke="rgba(107, 93, 211, 0.4)"
            fill="rgba(107, 93, 211, 0.4)"
            activeDot={{ r: 8 }}
            strokeWidth={1.5}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="inflow"
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
