import OrderTable from "../tables/OrderTable";

const OrderHistory = ({ data }: any) => {
  return (
    <div className=" p-[10px] md:p-[30px]">
      <OrderTable data={data} type="history" />
    </div>
  );
};
export default OrderHistory;
