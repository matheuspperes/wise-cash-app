export type HistoricalTotalBalance = {
  periodStart: string;
  periodEnd: string;
  totalIncome: number;
  totalExpense: number;
  netTotal: number;
};

export type CurrentMonthTransactionRow = {
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  value: number;
};

// Legacy alias retained for compatibility with existing component naming.
export type CurrentMonthExpenseRow = CurrentMonthTransactionRow;

export type MonthlyExpenseHistoryRow = {
  date: string;
  description: string;
  category: string;
  amount: number;
};

export type MonthlyExpenseHistoryGroup = {
  monthRef: string;
  monthLabel: string;
  isCollapsedByDefault: boolean;
  rows: MonthlyExpenseHistoryRow[];
};
