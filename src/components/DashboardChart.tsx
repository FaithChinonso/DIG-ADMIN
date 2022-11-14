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

const DashboardChart = ({ month, transaction }: ChartType) => {
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
          padding={{ left: 40, right: 30 }}
          tick={false}
          label={{ value: month.toUpperCase() }}
        />
        {filterTransactions?.length > 1 ? (
          <YAxis domain={[0, mode]} />
        ) : (
          <YAxis domain={[0, 2000]} />
        )}
        <Legend />
        <Area
          type="monotone"
          dataKey="outflow"
          stackId="1"
          stroke="#36013F"
          fill="#9873AC"
          activeDot={{ r: 8 }}
          strokeWidth={1.5}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="inflow"
          stackId="1"
          stroke="rgba(37, 82, 59, .9)"
          fill="rgba(37, 82, 59, .4)"
          activeDot={{ r: 8 }}
          strokeWidth={1.5}
          style={{ fontFamily: "Steradian !important" }}
          dot={false}
        />

        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default DashboardChart;
