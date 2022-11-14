export interface ChartType {
  month: string;
  transaction: Transaction[];
}

export interface Transaction {
  id: number;
  amount: number;
  transactionType: string;
  createdAt: string;
}
export interface TransactionData {
  date: string;
  outflow: number;
  inflow: number;
}
