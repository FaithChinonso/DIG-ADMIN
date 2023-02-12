import TransactionTable from "../tables/TransactionTable";

const transactionHistory = ({ id, transactions }: any) => {
  return (
    <div>
      <TransactionTable data={transactions} type="profile" />
    </div>
  );
};

export default transactionHistory;
